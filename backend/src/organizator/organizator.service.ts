import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizatorEntity } from './organizator.entity';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, map } from 'rxjs';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class OrganizatorService {
  constructor(
    @InjectRepository(OrganizatorEntity)
    private organizatorRepository: Repository<OrganizatorEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
    private jwtService: JwtService,
  ) {}

  async findOne(username: string): Promise<OrganizatorEntity | undefined> {
    return this.organizatorRepository.findOne({
      where: { korisnickoIme: username },
    });
  }

  async registrujOrganizatora(organizator: OrganizatorEntity) {
    const noviOrganizator: OrganizatorEntity =
      this.organizatorRepository.create();
    noviOrganizator.korisnickoIme = organizator.korisnickoIme;
    const saltOrRounds = 10;
    const hesiranaLozinka = await bcrypt.hash(
      organizator.lozinka,
      saltOrRounds,
    );
    noviOrganizator.lozinka = hesiranaLozinka;
    noviOrganizator.ime = organizator.ime;
    noviOrganizator.prezime = organizator.prezime;
    noviOrganizator.turniri = [];
    return await this.organizatorRepository.save(noviOrganizator);
  }
  async izmeniPodatkeOOrganizatoru(
    organizatorId: number,
    noviOrganizator: OrganizatorEntity,
  ) {
    console.log('primljen id je' + organizatorId);
    const postojeciOrganizator = await this.organizatorRepository.findOne({
      where: { id: organizatorId },
    });
    if (!postojeciOrganizator) return null; //ne postoji takav igrac
    console.log('postojeci igrac je' + postojeciOrganizator.ime);
    postojeciOrganizator.korisnickoIme = noviOrganizator.korisnickoIme;
    postojeciOrganizator.ime = noviOrganizator.ime;
    postojeciOrganizator.prezime = noviOrganizator.prezime;

    return await this.organizatorRepository.save(postojeciOrganizator);
  }
  daLiJeOrganizatorTurnira(
    organizatorId: number,
    turnirId: number,
  ): Observable<boolean> {
    let flag = false;
    return from(
      this.turnirRepository
        .createQueryBuilder('turnir')
        .leftJoinAndSelect('turnir.organizator', 'organizator')
        .where('organizator.id = :id', { id: organizatorId })
        .getMany(),
    ).pipe(
      map((turniri) => {
        return turniri.some((turnir) => turnir.id == turnirId);
      }),
    );
  }
}
