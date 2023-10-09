import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { Repository } from 'typeorm';
import { PrijavaEntity } from './prijava.entity';

@Injectable()
export class PrijavaService {
  constructor(
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
  ) {}
  async vratiPrijavuPoId(id: number) {
    return this.prijavaRepository.findOne({ where: { id: id } });
  }
  async dodajPrijavu(prijava: PrijavaEntity) {
    const igrajuVecPrijavljeni = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .innerJoin('prijava.igraci', 'igrac')
      .where('igrac.id IN (:...igracIds) AND prijava.turnirId = :turnirId', {
        igracIds: prijava.igraci.map((igrac) => igrac.id),
        turnirId: prijava.turnir.id,
      })
      .getCount();
    console.log(igrajuVecPrijavljeni);
    if (igrajuVecPrijavljeni > 0) {
      return { porukaGreske: 'neki igraci su vec prijavljeni na ovaj turnir' };
    }
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

    if (postojecePrijave.length + 1 > turnir.maxBrojTimova)
      return { porukaGreske: 'nema mesta na turniru' };
    novaPrijava.turnir = turnir;
    if (prijava.igraci.length != 3) {
      return { porukaGreske: 'broj igraca u timu mora biti 3' };
    }
    novaPrijava.igraci = prijava.igraci;
    turnir.trenutniBrojTimova++;
    await this.turnirRepository.save(turnir);

    return await this.prijavaRepository.save(novaPrijava);
  }
  async prijaveNaTurniru(turnirId: number) {
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
  async odjaviSvojTimSaTurnira(turnirId: number, igracId: number) {
    const trazenaPrijava: PrijavaEntity = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .innerJoin('prijava.igraci', 'igrac')
      .innerJoin('prijava.turnir', 'turnir')
      .where('turnir.id = :turnirId', { turnirId })
      .andWhere('igrac.id = :igracId', { igracId })
      .getOne();

    const turnir = await this.turnirRepository
      .createQueryBuilder('turnir')
      .leftJoinAndSelect('turnir.prijave', 'prijava')
      .getOne();
    if (turnir) {
      turnir.prijave = turnir.prijave.filter((p) => p.id !== trazenaPrijava.id);
    }
    console.log(turnir);
    turnir.trenutniBrojTimova--;
    await this.prijavaRepository.remove(trazenaPrijava);
    return await this.turnirRepository.save(turnir);
  }
}
