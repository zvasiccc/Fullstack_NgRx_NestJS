import { Injectable, NotFoundException } from '@nestjs/common';
import { IgracEntity } from './igrac.entity';
import { In, Like, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';

@Injectable()
export class IgracService {
  constructor(
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
  ) {}
  //!
  async vratiSveIgrace() {
    return await this.igracRepository.find();
  }
  async slobodniIgraciZaTurnir(turnirId: number) {
    //da vratimo sve igrace koji se ne nalaze u prijavama za turnir
    // const slobodniIgraci = await this.igracRepository
    //   .createQueryBuilder('igrac')
    //   .leftJoinAndSelect('igrac.prijave', 'prijava')
    //   .leftJoinAndSelect('prijava.turnir', 'turnir')
    //   .where('turnir.id Not(:id)', { id: turnirId })
    //   .getMany();
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

  async vratiIgracePoKorisnickomImenu(korisnickoIme: string) {
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

  vratiPrijavljenogIgraca() {
    return {
      id: 3,
      korisnickoIme: 'ludjakat',
      ime: 'Petar',
      prezime: 'Mancic',
      vodjaTima: false,
    };
  }
  async registrujIgraca(igrac: IgracEntity) {
    const noviIgrac = this.igracRepository.create();
    noviIgrac.korisnickoIme = igrac.korisnickoIme;
    noviIgrac.lozinka = igrac.lozinka;
    noviIgrac.ime = igrac.ime;
    noviIgrac.prezime = igrac.prezime;
    noviIgrac.vodjaTima = igrac.vodjaTima;
    //noviIgrac.roles = igrac.roles;
    return await this.igracRepository.save(noviIgrac);
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
}
