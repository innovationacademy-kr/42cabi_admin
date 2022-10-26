import { InjectRepository } from '@nestjs/typeorm';
import Cabinet from 'src/entities/cabinet.entity';
import LentLog from 'src/entities/lent.log.entity';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LentDto } from '../dto/search-lent.dto';
import { LentLogDto } from '../dto/search-lentlog.dto';
import { ISearchRepository } from './search.repository.interface';

export class SearchRepository implements ISearchRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Cabinet) private cabinetRepository: Repository<Cabinet>,
    @InjectRepository(LentLog) private lentLogRepository: Repository<LentLog>,
  ) {}

  async getLentByIntraId(intraId: string): Promise<LentDto[]> {
    const result = await this.userRepository.find({
      relations: {
        Lent: {
          cabinet: true,
        },
      },
      where: {
        intra_id: intraId,
      },
    });
    if (result.length === 0 || result[0].Lent === null) {
      return [];
    }
    return result.map((val) => ({
      intra_id: val.intra_id,
      auth: val.state === 'NORMAL' ? 1 : 0,
      cabinet_id: val.Lent.cabinet.cabinet_id,
      cabinet_num: val.Lent.cabinet.cabinet_num,
      location: val.Lent.cabinet.location,
      section: val.Lent.cabinet.section,
      floor: val.Lent.cabinet.floor,
      activation: val.Lent.cabinet.status === 'AVAILABLE' ? 1 : 0,
      lent_id: val.Lent.lent_id,
      lent_time: val.Lent.lent_time,
      expire_time: val.Lent.expire_time,
    }));
  }

  async getLentLogByIntraId(intraId: string): Promise<LentLogDto[]> {
    const result = await this.userRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect(LentLog, 'll', 'u.user_id = ll.log_user_id')
      .leftJoinAndSelect(Cabinet, 'c', 'll.log_cabinet_id = c.cabinet_id')
      .where('u.intra_id = :intraId', { intraId })
      .orderBy('ll.lent_time', 'DESC')
      .execute();
    return result.map((val) => ({
      intra_id: val.u_intra_id,
      cabinet_id: val.c_cabinet_id,
      cabinet_num: val.c_cabinet_num,
      location: val.c_location,
      section: val.c_section,
      floor: val.c_floor,
      activation: val.c_cabinet_status === 'AVAILABLE' ? 1 : 0,
      log_id: val.ll_log_id,
      lent_time: val.ll_lent_time,
      return_time: val.ll_return_time,
    }));
  }

  async getLentByCabinetNum(
    cabinetNum: number,
    floor: number,
  ): Promise<LentDto[]> {
    const result = await this.cabinetRepository.find({
      relations: {
        lent: {
          user: true,
        },
      },
      where: {
        cabinet_num: cabinetNum,
        floor,
      },
    });
    if (result.length === 0) {
      return [];
    }
    if (result[0].lent.length === 0) {
      return result.map((val) => ({
        intra_id: null,
        cabinet_id: val.cabinet_id,
        cabinet_num: val.cabinet_num,
        location: val.location,
        section: val.section,
        floor: val.floor,
        activation: val.status === 'AVAILABLE' ? 1 : 0,
        lent_id: null,
        lent_time: null,
        expire_time: null,
        auth: 0,
      }));
    }
    return result.map((val) => ({
      intra_id: val.lent[0].user.intra_id,
      cabinet_id: val.cabinet_id,
      cabinet_num: val.cabinet_num,
      location: val.location,
      section: val.section,
      floor: val.floor,
      activation: val.status === 'AVAILABLE' ? 1 : 0,
      lent_id: val.lent[0].lent_id,
      lent_time: val.lent[0].lent_time,
      expire_time: val.lent[0].expire_time,
      auth: 0,
    }));
  }

  async getLentLogByCabinetNum(
    cabinetNum: number,
    floor: number,
  ): Promise<LentLogDto[]> {
    const result = await this.lentLogRepository
      .createQueryBuilder('ll')
      .innerJoinAndSelect(Cabinet, 'c', 'll.log_cabinet_id = c.cabinet_id')
      .where('cabinet_num = :cabinetNum', { cabinetNum })
      .andWhere('floor = :floor', { floor })
      .orderBy('ll.lent_time', 'DESC')
      .execute();
    return result.map((val) => ({
      intra_id: val.ll_log_intra_id,
      cabinet_id: val.c_cabinet_id,
      cabinet_num: val.c_cabinet_num,
      location: val.c_location,
      section: val.c_section,
      floor: val.c_floor,
      activation: val.c_cabinet_status === 'AVAILABLE' ? 1 : 0,
      log_id: val.ll_log_id,
      lent_time: val.ll_lent_time,
      return_time: val.ll_return_time,
    }));
  }
}
