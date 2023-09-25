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
  async odgovarajuciTurniri(naziv: string, mesto: string, datum: string) {
    return await this.turnirRepository.find({
      where: {
        naziv: naziv,
        mestoOdrzavanja: mesto,
        datumOdrzavanja: datum,
      },
    });
  }
  async dodajTurnir(turnir: TurnirEntity) {
    const noviTurnir = this.turnirRepository.create();
    noviTurnir.naziv = turnir.naziv;
    noviTurnir.datumOdrzavanja = turnir.datumOdrzavanja;
    noviTurnir.mestoOdrzavanja = turnir.mestoOdrzavanja;
    noviTurnir.maxBrojUcesnika = turnir.maxBrojUcesnika;
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
  ) {
    const whereClause: any = {};

    if (pretragaNaziv != '') {
      whereClause.naziv = pretragaNaziv;
    }

    if (pretragaMesto != '') {
      whereClause.mestoOdrzavanja = pretragaMesto;
    }

    if (pretragaPocetniDatum != '' && pretragaKrajnjiDatum != '') {
      whereClause.datumOdrzavanja = Between(
        pretragaPocetniDatum,
        pretragaKrajnjiDatum,
      );
    }
    return await this.turnirRepository.find({
      where: whereClause,
    });
  }
}
