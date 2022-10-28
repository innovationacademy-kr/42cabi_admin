import { InjectRepository } from "@nestjs/typeorm";
import Cabinet from "src/entities/cabinet.entity";
import { Repository } from "typeorm";
import { ICabinetRepository } from "./cabinet.repository.interface";

export class CabinetRepository implements ICabinetRepository {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
  ) {}
}
