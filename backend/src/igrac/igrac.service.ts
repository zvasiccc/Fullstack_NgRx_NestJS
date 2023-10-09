import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { Like, Not, Repository } from 'typeorm';
import { IgracEntity } from './igrac.entity';
@Injectable()
export class IgracService {
  constructor(
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
  ) {}

  async vratiMoguceSaigrace(igracId: number) {
    return await this.igracRepository
      .createQueryBuilder('igrac')
      .where({ id: Not(igracId) })
      .andWhere({ vodjaTima: false })
      .getMany();
  }

  async dohvatiIgraca(korisnickoIme: string) {
    return await this.igracRepository.findOne({
      where: { korisnickoIme: korisnickoIme },
    });
  }

  async igraciSaSlicnimKorisnickimImenom(korisnickoIme: string) {
    return await this.igracRepository.find({
      where: {
        korisnickoIme: Like(`%${korisnickoIme}%`),
      },
    });
  }

  async findOne(username: string): Promise<IgracEntity | undefined> {
    return this.igracRepository.findOne({ where: { korisnickoIme: username } });
  }

  async registrujIgraca(igrac: IgracEntity) {
    const noviIgrac: IgracEntity = this.igracRepository.create();
    const postojeciIgrac: IgracEntity = await this.igracRepository.findOne({
      where: { korisnickoIme: igrac.korisnickoIme },
    });
    if (postojeciIgrac) return null; //ako vec postoji igrac sa tim korisnickim imenom
    noviIgrac.korisnickoIme = igrac.korisnickoIme;
    const saltOrRounds = 10;
    const hesiranaLozinka = await bcrypt.hash(igrac.lozinka, saltOrRounds);
    noviIgrac.lozinka = hesiranaLozinka;
    console.log(noviIgrac.lozinka);
    noviIgrac.ime = igrac.ime;
    noviIgrac.prezime = igrac.prezime;
    noviIgrac.vodjaTima = igrac.vodjaTima;
    noviIgrac.id = igrac.id;
    return await this.igracRepository.save(noviIgrac);
  }

  async izmeniPodatkeOIgracu(igracId: number, noviIgrac: IgracEntity) {
    console.log('primljen id je' + igracId);
    const postojeciIgrac = await this.igracRepository.findOne({
      where: { id: igracId },
    });
    if (!postojeciIgrac) return null; //ne postoji takav igrac
    console.log('postojeci igrac je' + postojeciIgrac.ime);
    postojeciIgrac.korisnickoIme = noviIgrac.korisnickoIme;
    postojeciIgrac.ime = noviIgrac.ime;
    postojeciIgrac.prezime = noviIgrac.prezime;
    postojeciIgrac.vodjaTima = noviIgrac.vodjaTima;
    console.log('izmenjeni igrac je' + postojeciIgrac.ime);
    return await this.igracRepository.save(postojeciIgrac);
  }

  async vratiSaigrace(turnirId: number, igracId: number) {
    const prijaveZaTurnir = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .leftJoinAndSelect('prijava.igraci', 'igrac')
      .leftJoinAndSelect('prijava.turnir', 'turnir')
      .where('turnir.id = :turnirId', { turnirId })
      .getMany();

    const trazenaPrijava = prijaveZaTurnir.find((prijava) => {
      return prijava.igraci.some((igrac) => igrac.id == igracId);
    });
    if (!trazenaPrijava) return null;

    const saigraci: IgracEntity[] = trazenaPrijava.igraci.filter(
      (igrac) => igrac.id != igracId,
    );
    return saigraci;
  }
  async daLiJeIgracPrijavljenNaTurnir(turnirId: number, igracId: number) {
    const trazenaPrijava: PrijavaEntity = await this.prijavaRepository
      .createQueryBuilder('prijava')
      .innerJoin('prijava.igraci', 'igrac')
      .innerJoin('prijava.turnir', 'turnir')
      .where('turnir.id = :turnirId', { turnirId })
      .andWhere('igrac.id = :igracId', { igracId })
      .getOne();

    return trazenaPrijava ? true : false;
  }
}
