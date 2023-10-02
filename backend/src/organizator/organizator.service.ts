import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizatorEntity } from './organizator.entity';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, map } from 'rxjs';
import { TurnirEntity } from 'src/turnir/turnir.entity';

@Injectable()
export class OrganizatorService {
  constructor(
    @InjectRepository(OrganizatorEntity)
    private organizatorRepository: Repository<OrganizatorEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
    private jwtService: JwtService,
  ) {}
  async vratiSveOrganizatore() {
    return await this.organizatorRepository.find();
  }
  // async vratiOrganizatoraIzTokena(token: string) {
  //   try {
  //     const noviToken = token.split(' ')[1];
  //     const dekodiraniToken = (await this.jwtService.verify(noviToken, {
  //       secret: 'SECRET',
  //     })) as any;
  //     const organizator = await this.organizatorRepository.findOne({
  //       where: { korisnickoIme: dekodiraniToken.username },
  //     });

  //     if (!organizator) {
  //       throw new NotFoundException('organizator nije pronadjen');
  //     }

  //     const { lozinka, ...organizatorBezLozinke } = organizator;
  //     return organizatorBezLozinke;
  //   } catch (error) {
  //     throw new NotFoundException('nevazeci token');
  //   }
  // }
  async findOne(username: string): Promise<OrganizatorEntity | undefined> {
    return this.organizatorRepository.findOne({
      where: { korisnickoIme: username },
    });
  }

  async registrujOrganizatora(organizator: OrganizatorEntity) {
    const noviOrganizator: OrganizatorEntity =
      this.organizatorRepository.create();
    noviOrganizator.korisnickoIme = organizator.korisnickoIme;
    noviOrganizator.lozinka = organizator.lozinka;
    noviOrganizator.ime = organizator.ime;
    noviOrganizator.prezime = organizator.prezime;
    noviOrganizator.turniri = [];
    return await this.organizatorRepository.save(noviOrganizator);
  }
  daLiJeOrganizatorTurnira(
    organizationId: number,
    turnirId: number,
  ): Observable<boolean> {
    let flag = false;
    return from(
      this.turnirRepository
        .createQueryBuilder('turnir')
        .leftJoinAndSelect('turnir.organizator', 'organizator')
        .where('organizator.id = :id', { id: organizationId })
        .getMany(),
    ).pipe(
      map((turniri) => {
        return turniri.some((turnir) => turnir.id == turnirId);
      }),
    );
    // turniriOrganizatora.forEach((turnir) => {
    //   if (turnir.id == turnirId) {
    //     flag = true;
    //   }
    // });
  }
}
