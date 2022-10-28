import { InjectRepository } from "@nestjs/typeorm";
import User from "src/entities/user.entity";
import { Repository } from "typeorm";
import { IUserRepository } from "./user.repository.interface";

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
}
