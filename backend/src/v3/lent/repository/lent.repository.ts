import { InjectRepository } from "@nestjs/typeorm";
import Lent from "src/entities/lent.entity";
import { Repository } from "typeorm";
import { ILentRepository } from "./lent.repository.interface";

export class LentRepository implements ILentRepository {
  constructor(
    @InjectRepository(Lent)
    private lentRepository: Repository<Lent>,
  ) {}
}
