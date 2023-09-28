import { Injectable } from '@nestjs/common';
import { PrijavaEntity } from './prijava.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { IgracEntity } from 'src/igrac/igrac.entity';

@Injectable()
export class PrijavaService {
  constructor(
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
  ) {}
  async vratiPrijavuPoId(id: number) {
    return this.prijavaRepository.findOne({ where: { id: id } });
  }
  async dodajPrijavu(prijava: PrijavaEntity) {
    const novaPrijava: PrijavaEntity = this.prijavaRepository.create();
    novaPrijava.nazivTima = prijava.nazivTima;
    novaPrijava.potrebanBrojMiseva = prijava.potrebanBrojMiseva;
    novaPrijava.potrebanBrojRacunara = prijava.potrebanBrojRacunara;
    novaPrijava.potrebanBrojSlusalica = prijava.potrebanBrojSlusalica;
    novaPrijava.potrebanBrojTastatura = prijava.potrebanBrojTastatura;
    const turnir = await this.turnirRepository.findOne({
      where: { id: prijava.turnir.id },
    });
    const postojecePrijave = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .where('prijava.turnir = :id', { id: turnir.id })
      .leftJoinAndSelect('prijava.igraci', 'igrac')
      .getMany();
    // let ukupanBroj = 0;
    // postojecePrijave.forEach((prijava) => {
    //   ukupanBroj += prijava.igraci.length;
    // });
    // if (ukupanBroj + prijava.igraci.length > turnir.maxBrojUcesnika)
    //   return null;
    if (postojecePrijave.length + 1 > turnir.maxBrojTimova) return null;
    novaPrijava.turnir = turnir;
    novaPrijava.igraci = prijava.igraci;
    turnir.trenutniBrojTimova++;
    await this.turnirRepository.save(turnir);
    return await this.prijavaRepository.save(novaPrijava);
  }
  async prijaveNaTurniru(turnirId: number) {
    // const turnir = await this.turnirRepository
    //   .createQueryBuilder('turnir')
    //   .where('turnir.id = :id', { id: turnirId })
    //   .leftJoinAndSelect('turnir.prijave', 'prijava')
    //   .leftJoinAndSelect('prijava.igraci', 'igrac')
    //   .getOne();
    const prijave = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .where('prijava.turnir = :id', { id: turnirId })
      .leftJoinAndSelect('prijava.igraci', 'igrac')
      .getMany();
    return prijave;
  }
  async izbaciTimSaTurnira(prijavaId: number) {
    const trazenaPrijava = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .where('prijava.id=:id', { id: prijavaId })
      .leftJoinAndSelect('prijava.turnir', 'turnir')
      .getOne();
    console.log(trazenaPrijava); //! radi
    // const turnir = prijava.turnir;
    // if (turnir) {

    const turnir = await this.turnirRepository
      .createQueryBuilder('turnir')
      .leftJoinAndSelect('turnir.prijave', 'prijava')
      .where('turnir.id=:id', { id: trazenaPrijava.turnir.id })
      .getOne();
    if (turnir) {
      turnir.prijave = turnir.prijave.filter((p) => p.id !== prijavaId);
    }
    console.log(turnir);
    turnir.trenutniBrojTimova--;
    await this.prijavaRepository.remove(trazenaPrijava);
    return await this.turnirRepository.save(turnir);
  }
}
