import { InjectRepository } from "@nestjs/typeorm";
import Cabinet from "src/entities/cabinet.entity";
import { Repository } from "typeorm";
import { IReturnRepository } from "./return.repository.interface";

export class ReturnRepository implements IReturnRepository {
  constructor(
  @InjectRepository(Cabinet) private cabinetRepository: Repository<Cabinet>,
  ) {}
}
