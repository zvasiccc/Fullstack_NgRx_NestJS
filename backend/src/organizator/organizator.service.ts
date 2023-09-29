import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizatorEntity } from './organizator.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrganizatorService {
  constructor(
    @InjectRepository(OrganizatorEntity)
    private organizatorRepository: Repository<OrganizatorEntity>,
    private jwtService: JwtService,
  ) {}
  async vratiSveOrganizatore() {
    return await this.organizatorRepository.find();
  }
  async vratiOrganizatoraIzTokena(token: string) {
    try {
      const noviToken = token.split(' ')[1];

      const dekodiraniToken = (await this.jwtService.verify(noviToken, {
        secret: 'SECRET',
      })) as any;
      const organizator = await this.organizatorRepository.findOne({
        where: { korisnickoIme: dekodiraniToken.username },
      });

      if (!organizator) {
        throw new NotFoundException('organizator nije pronadjen');
      }

      const { lozinka, ...organizatorBezLozinke } = organizator;
      return organizatorBezLozinke;
    } catch (error) {
      throw new NotFoundException('nevazeci token');
    }
  }
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
    noviOrganizator.turniri = [];
    return await this.organizatorRepository.save(noviOrganizator);
  }
}
