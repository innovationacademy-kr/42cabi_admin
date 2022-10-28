import { InjectRepository } from "@nestjs/typeorm";
import Cabinet from "src/entities/cabinet.entity";
import LentLog from "src/entities/lent.log.entity";
import User from "src/entities/user.entity";
import { Repository } from "typeorm";
import { ISearchRepository } from "./search.repository.interface";

export class SearchRepository implements ISearchRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Cabinet) private cabinetRepository: Repository<Cabinet>,
    @InjectRepository(LentLog) private lentLogRepository: Repository<LentLog>,
  ) {}
}
