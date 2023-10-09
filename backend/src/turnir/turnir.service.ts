import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from 'src/auth/constants';
import { OrganizatorEntity } from 'src/organizator/organizator.entity';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { Role } from 'src/roles/role.enum';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { TurnirEntity } from './turnir.entity';

@Injectable()
export class TurnirService {
  constructor(
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
    @InjectRepository(OrganizatorEntity)
    private organizatorRepository: Repository<OrganizatorEntity>,
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    private jwtService: JwtService,
  ) {}
  async vratiSveTurnire() {
    return await this.turnirRepository.find();
  }
  async vratiMojeTurnire(token: string) {
    const noviToken = token.split(' ')[1];
    const dekodiraniToken = (await this.jwtService.verify(noviToken, {
      secret: jwtConstants.secret,
    })) as any;
    if (dekodiraniToken.role === Role.Igrac) {
      const idIgraca = dekodiraniToken.sub;
      const turniri = this.turnirRepository
        .createQueryBuilder('turnir')
        .leftJoinAndSelect('turnir.prijave', 'prijava')
        .leftJoinAndSelect('prijava.igraci', 'igrac')
        .where('igrac.id=:id', { id: idIgraca })
        .select([
          'turnir.id',
          'turnir.naziv',
          'turnir.datumOdrzavanja',
          'turnir.mestoOdrzavanja',
          'turnir.maxBrojTimova',
          'turnir.trenutniBrojTimova',
          'turnir.nagrada',
        ])
        .getMany();
      return turniri;
    }
    if (dekodiraniToken.role === Role.Organizator) {
      const idOrganizatora = dekodiraniToken.sub;
      const turniri = this.turnirRepository
        .createQueryBuilder('turnir')
        .leftJoinAndSelect('turnir.organizator', 'organizator')
        .where('organizator.id=:id', { id: idOrganizatora })
        .select([
          'turnir.id',
          'turnir.naziv',
          'turnir.datumOdrzavanja',
          'turnir.mestoOdrzavanja',
          'turnir.maxBrojTimova',
          'turnir.trenutniBrojTimova',
          'turnir.nagrada',
        ])
        .getMany();
      return turniri;
    }
  }

  async dodajTurnir(turnir: TurnirEntity, token: string) {
    const noviToken = token.split(' ')[1];
    const dekodiraniToken = (await this.jwtService.verify(noviToken, {
      secret: jwtConstants.secret,
    })) as any;
    const noviTurnir = this.turnirRepository.create();
    noviTurnir.naziv = turnir.naziv;
    noviTurnir.datumOdrzavanja = turnir.datumOdrzavanja;
    noviTurnir.mestoOdrzavanja = turnir.mestoOdrzavanja;
    noviTurnir.maxBrojTimova = turnir.maxBrojTimova;
    noviTurnir.nagrada = turnir.nagrada;
    noviTurnir.trenutniBrojTimova = 0;
    const organizator = await this.organizatorRepository.findOne({
      where: { id: dekodiraniToken.sub },
    });
    noviTurnir.organizator = organizator;
    return await this.turnirRepository.save(noviTurnir);
  }
  async obrisiTurnir(turnirId: number) {
    const turnirZaBrisanje = await this.turnirRepository.findOne({
      where: { id: turnirId },
    });
    if (!turnirZaBrisanje) {
      return null;
    }
    const prijaveZaBrisanje = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .leftJoin('prijava.turnir', 'turnir')
      .where('turnir.id=:id', { id: turnirId })
      .getMany();
    if (prijaveZaBrisanje)
      await this.prijavaRepository.remove(prijaveZaBrisanje);
    return await this.turnirRepository.delete(turnirId);
  }
  async filtrirajTurnire(
    pretragaNaziv: string,
    pretragaMesto: string,
    pretragaPocetniDatum: string,
    pretragaKrajnjiDatum: string,
    pretragaPocetnaNagrada: number,
    pretragaKrajnjaNagrada: number,
  ) {
    const whereClause: any = {};

    if (pretragaNaziv !== undefined) {
      whereClause.naziv = pretragaNaziv;
    }

    if (pretragaMesto !== undefined) {
      whereClause.mestoOdrzavanja = pretragaMesto;
    }

    if (
      pretragaPocetniDatum !== undefined &&
      pretragaKrajnjiDatum !== undefined
    ) {
      whereClause.datumOdrzavanja = Between(
        pretragaPocetniDatum,
        pretragaKrajnjiDatum,
      );
    }

    if (
      pretragaKrajnjaNagrada !== undefined &&
      pretragaPocetnaNagrada !== undefined
    ) {
      whereClause.nagrada = Between(
        pretragaPocetnaNagrada,
        pretragaKrajnjaNagrada,
      );
    } else if (pretragaPocetnaNagrada !== undefined) {
      whereClause.nagrada = MoreThanOrEqual(pretragaPocetnaNagrada);
    } else if (pretragaKrajnjaNagrada !== undefined) {
      whereClause.nagrada = LessThanOrEqual(pretragaKrajnjaNagrada);
    }

    console.log(whereClause);
    const turniri: TurnirEntity[] = await this.turnirRepository.find({
      where: whereClause,
    });

    if (!turniri) return [];
    return turniri;
  }
}
