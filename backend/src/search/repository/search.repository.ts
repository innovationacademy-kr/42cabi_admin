import { InjectRepository } from '@nestjs/typeorm';
import BanLog from 'src/entities/ban.log.entity';
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
    const result = await this.userRepository
      .createQueryBuilder('u')
      .select(['u.intra_id', 'u.state', 'u.user_id'])
      .addSelect([
        'c.cabinet_id',
        'c.cabinet_num',
        'c.location',
        'c.section',
        'c.floor',
        'c.cabinet_status',
      ])
      .addSelect(['l.lent_id', 'l.lent_time', 'l.expire_time'])
      .leftJoin('lent', 'l', 'l.lent_user_id = u.user_id')
      .leftJoin('cabinet', 'c', 'c.cabinet_id = l.lent_cabinet_id')
      .where('u.intra_id = :intraId', { intraId })
      .execute();
    if (result.length === 0) {
      return [];
    }
    const blocked = await this.userRepository.manager.findOne(BanLog, {
      where: {
        ban_user_id: result.u_user_id,
      },
      order: {
        unbanned_date: 'DESC',
      },
    });
    const banned = blocked && blocked.unbanned_date > new Date();
    return result.map((val) => ({
      intra_id: val.u_intra_id,
      auth: banned ? 0 : 1,
      cabinet_id: val.c_cabinet_id,
      cabinet_num: val.c_cabinet_num,
      location: val.c_location,
      section: val.c_section,
      floor: val.c_floor,
      activation: val.cabinet_status === 'BROKEN' ? 0 : 1,
      lent_id: val.l_lent_id,
      lent_time: val.l_lent_time,
      expire_time: val.l_expire_time,
    }));
  }

  async getLentLogByIntraId(intraId: string): Promise<LentLogDto[]> {
    const result = await this.lentLogRepository
      .createQueryBuilder('ll')
      .innerJoinAndSelect(Cabinet, 'c', 'll.log_cabinet_id = c.cabinet_id')
      .where('ll.log_intra_id = :intraId', { intraId })
      .orderBy('ll.lent_time', 'DESC')
      .execute();
    return result.map((val) => ({
      intra_id: val.ll_log_intra_id,
      cabinet_id: val.c_cabinet_id,
      cabinet_num: val.c_cabinet_num,
      location: val.c_location,
      section: val.c_section,
      floor: val.c_floor,
      activation: val.c_cabinet_status === 'BROKEN' ? 0 : 1,
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
        activation: val.status === 'BROKEN' ? 0 : 1,
        lent_id: null,
        lent_time: null,
        expire_time: null,
        auth: 1, // 현재 빌리고 있는데 블럭 당할수가 없음.
      }));
    }
    return result.map((val) => ({
      intra_id: val.lent[0].user.intra_id,
      cabinet_id: val.cabinet_id,
      cabinet_num: val.cabinet_num,
      location: val.location,
      section: val.section,
      floor: val.floor,
      activation: val.status === 'BROKEN' ? 0 : 1,
      lent_id: val.lent[0].lent_id,
      lent_time: val.lent[0].lent_time,
      expire_time: val.lent[0].expire_time,
      auth: 1, // 현재 빌리고 있는데 블럭 당할수가 없음.
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
      activation: val.c_cabinet_status === 'BROKEN' ? 0 : 1,
      log_id: val.ll_log_id,
      lent_time: val.ll_lent_time,
      return_time: val.ll_return_time,
    }));
  }
}
