import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { TurnirEntity } from './turnir.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TurnirService {
  constructor(
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
  ) {}
  async vratiSveTurnire() {
    return await this.turnirRepository.find();
  }
  // async odgovarajuciTurniri(naziv: string, mesto: string, datum: string) {
  //   return await this.turnirRepository.find({
  //     where: {
  //       naziv: naziv,
  //       mestoOdrzavanja: mesto,
  //       datumOdrzavanja: datum,
  //     },
  //   });
  // }
  async dodajTurnir(turnir: TurnirEntity) {
    const noviTurnir = this.turnirRepository.create();
    noviTurnir.naziv = turnir.naziv;
    noviTurnir.datumOdrzavanja = turnir.datumOdrzavanja;
    noviTurnir.mestoOdrzavanja = turnir.mestoOdrzavanja;
    noviTurnir.maxBrojTimova = turnir.maxBrojTimova;
    noviTurnir.nagrada = turnir.nagrada;
    noviTurnir.trenutniBrojTimova = 0;
    return await this.turnirRepository.save(noviTurnir);
  }
  async obrisiTurnir(turnirId: number) {
    const turnirZaBrisanje = await this.turnirRepository.findOne({
      where: { id: turnirId },
    });
    if (!turnirZaBrisanje) {
      return null;
    }
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

    if (pretragaNaziv != '') {
      whereClause.naziv = pretragaNaziv;
    }

    if (pretragaMesto != '') {
      whereClause.mestoOdrzavanja = pretragaMesto;
    }

    if (!pretragaPocetniDatum && !pretragaKrajnjiDatum) {
      whereClause.datumOdrzavanja = Between(
        pretragaPocetniDatum,
        pretragaKrajnjiDatum,
      );
    }
    if (pretragaKrajnjaNagrada != 0 && pretragaPocetnaNagrada != 0) {
      whereClause.nagrada = Between(
        pretragaPocetnaNagrada,
        pretragaKrajnjaNagrada,
      );
    }
    console.log(whereClause);
    const turniri: TurnirEntity[] = await this.turnirRepository.find({
      where: whereClause,
    });
    if (!turniri) return [];
    return turniri;
  }
}
