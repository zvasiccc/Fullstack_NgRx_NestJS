import { Injectable, NotFoundException } from '@nestjs/common';
import { IgracEntity } from './igrac.entity';
import { In, Like, Not, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import passport from 'passport';
@Injectable()
export class IgracService {
  constructor(
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
    private jwtService: JwtService,
  ) {}
  //!
  async vratiSveIgrace() {
    return await this.igracRepository.find();
  }
  async vratiSveIgraceOsimTrenutnog(igracId: number) {
    return await this.igracRepository
      .createQueryBuilder('igrac')
      .where({ id: Not(igracId) })
      .getMany();
  }
  async vratiIgracaIzTokena(token: string) {
    try {
      const noviToken = token.split(' ')[1];

      const dekodiraniToken = (await this.jwtService.verify(noviToken, {
        secret: 'SECRET',
      })) as any;
      const igrac = await this.igracRepository.findOne({
        where: { korisnickoIme: dekodiraniToken.username },
      });
      console.log('IGRAC JE ', igrac);

      if (!igrac) {
        throw new NotFoundException('Igrac nije pronadjen');
      }

      const { lozinka, ...igracBezLozinke } = igrac;
      return igracBezLozinke;
    } catch (error) {
      throw new NotFoundException('nevazeci token');
    }
  }
  async dohvatiIgraca(korisnickoIme: string) {
    return await this.igracRepository.findOne({
      where: { korisnickoIme: korisnickoIme },
    });
  }
  async slobodniIgraciZaTurnir(turnirId: number) {
    //?ne radii
    //da vratimo sve igrace koji se ne nalaze u prijavama za turnir
    const prijavljeniIgraciIds = await this.igracRepository
      .createQueryBuilder('igrac')
      .leftJoinAndSelect('igrac.prijave', 'prijava')
      .leftJoinAndSelect('prijava.turnir', 'turnir')
      .where({ id: Not(turnirId) }) //!
      .select(['igrac.id'])
      .getMany();
    const slobodniIgraci = await this.igracRepository
      .createQueryBuilder('igrac')
      .leftJoin('igrac.prijave', 'prijava')
      .leftJoin('prijava.turnir', 'turnir')
      .where('turnir.id != :id OR prijava.id IS NULL', { id: turnirId })
      .getMany();

    return slobodniIgraci;

    // const subQuery = (qb: SelectQueryBuilder<PrijavaEntity>) => {
    //   return qb
    //     .select('prijava_igrac.id')
    //     .from(PrijavaEntity, 'prijava')
    //     .innerJoin('prijava.igraci', 'prijava_igrac')
    //     .where('prijava.turnir.id = :turnirId', { turnirId });
    // };
    // const [subQuerySql, subQueryParameters] = subQuery(
    //   this.prijavaRepository.createQueryBuilder(),
    // ).getQueryAndParameters();
    // const query = this.igracRepository
    //   .createQueryBuilder('igrac')
    //   .where(`igrac.id NOT IN (${subQuerySql})`)
    //   .setParameters(subQueryParameters)
    //   .setParameter('turnirId', turnirId);
    // const igraci = await query.getMany();
    // return igraci;
    // const queryBuilder1 = this.igracRepository.createQueryBuilder('igrac1');
    // //.select('igrac1.id');
    // const queryBuilder2 = this.igracRepository.createQueryBuilder('igrac2');
    // //.select('igrac2.id')
    // //.leftJoin('igrac2.prijave', 'prijava')
    // //.leftJoin('prijava.turnir', 'turnir');
    // //.where('turnir.id = :id', { id: turnirId });
    // // Napravimo upit za presek koristeći podupite
    // const presekUpita = this.igracRepository
    //   .createQueryBuilder('igrac')
    //   .from('(' + queryBuilder1.getQuery() + ')', 'subquery1')
    //   //.addSelect(['subquery1.igrac1.id'])
    //   .innerJoinAndSelect(
    //     '(' + queryBuilder2.getQuery() + ')',
    //     'subquery2',
    //     //'subquery1.id = subquery2.id',
    //   );
    // //.addSelect(['subquery2.id']);
    // // Izvršavanje upita za presek
    // const presekRezultat = await presekUpita.getRawMany();
    // return presekRezultat as IgracEntity[];
  }

  async igraciSaSlicnimKorisnickimImenom(korisnickoIme: string) {
    return await this.igracRepository.find({
      where: {
        korisnickoIme: Like(`%${korisnickoIme}%`),
      },
    });
  }
  //!
  async findOne(username: string): Promise<IgracEntity | undefined> {
    return this.igracRepository.findOne({ where: { korisnickoIme: username } });
  }

  async registrujIgraca(igrac: IgracEntity) {
    const noviIgrac = this.igracRepository.create();
    const postojeciIgrac = await this.igracRepository.findOne({
      where: { korisnickoIme: igrac.korisnickoIme },
    });
    if (postojeciIgrac) return null; //ako vec postoji igrac sa tim korisnickim imenom
    noviIgrac.korisnickoIme = igrac.korisnickoIme;
    const salt = await bcrypt.genSalt();
    noviIgrac.lozinka = await this.hashPassword(igrac.lozinka, salt);
    console.log(noviIgrac.lozinka);
    noviIgrac.lozinka = igrac.lozinka;
    noviIgrac.ime = igrac.ime;
    noviIgrac.prezime = igrac.prezime;
    noviIgrac.vodjaTima = igrac.vodjaTima;
    //noviIgrac.roles = igrac.roles;
    return await this.igracRepository.save(noviIgrac);
  }
  async izmeniPodatkeOIgracu(igracId: number, noviIgrac: IgracEntity) {
    console.log('primljen id je' + noviIgrac.id);
    console.log('primljeno ime je' + noviIgrac.ime);
    const postojeciIgrac = await this.igracRepository.findOne({
      where: { id: igracId },
    });
    if (!postojeciIgrac) return null; //ne postoji takav igrac
    if (postojeciIgrac.lozinka != noviIgrac.lozinka) return null; //pogresna lozinka
    postojeciIgrac.korisnickoIme = noviIgrac.korisnickoIme;
    postojeciIgrac.ime = noviIgrac.ime;
    postojeciIgrac.prezime = noviIgrac.prezime;
    console.log('izmenjeni igrac je' + postojeciIgrac.ime);
    return await this.igracRepository.save(postojeciIgrac);
  }
  async pronadjiIgraceZaPrijavu(prijavaId: number) {
    const prijava = await this.prijavaRepository.findOne({
      where: { id: prijavaId },
    });

    if (!prijava) {
      console.log('ne opstoji prijava sa tim id');
      return [];
    }
    const igraci = await this.igracRepository.find({
      where: {
        id: In([...prijava.igraci]),
      },
    });
    return igraci;
  }
  async vratiIgraceIzIstogTima(turnirId: number, igracId: number) {
    const igraci = await this.igracRepository
      .createQueryBuilder('igrac')
      .leftJoinAndSelect('igrac.prijave', 'prijava')
      .leftJoinAndSelect('prijava.turnir', 'turnir')
      .where('turnir.id = :id', { id: turnirId })
      //.andWhere('igrac.id !=:id', { id: igracId })
      .andWhere({ id: Not(igracId) }) //!
      .getMany();

    return igraci;
  }
  async daLiJeIgracPrijavljenNaTurnir(turnirId: number, igracId: number) {
    const trazenaPrijava: PrijavaEntity = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .innerJoin('prijava.igraci', 'igrac')
      .innerJoin('prijava.turnir', 'turnir')
      .where('turnir.id = :turnirId', { turnirId }) //! bez id:
      .andWhere('igrac.id = :igracId', { igracId })
      .getOne();
    //*inner join da ne dobijemo prijavu ako ne postoji igracId ili turnirId
    return trazenaPrijava ? true : false;
  }
  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
