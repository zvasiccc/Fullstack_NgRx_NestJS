import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizatorEntity } from './organizator.entity';

@Injectable()
export class OrganizatorService {
  constructor(
    @InjectRepository(OrganizatorEntity)
    private organizatorRepository: Repository<OrganizatorEntity>,
  ) {}
  async vratiSveOrganizatore() {
    return await this.organizatorRepository.find();
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
