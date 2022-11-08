import { InjectRepository } from '@nestjs/typeorm';
import BanLog from 'src/entities/ban.log.entity';
import Cabinet from 'src/entities/cabinet.entity';
import User from 'src/entities/user.entity';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import LentType from 'src/enums/lent.type.enum';
import { Like, MoreThan, Repository } from 'typeorm';
import { BlockedUserInfoPagenationDto } from '../dto/blocked-user-info.pagenation.dto';
import { BrokenCabinetInfoPagenationDto } from '../dto/broken-cabinet-info.pagenation.dto';
import { CabinetInfoPagenationDto } from '../dto/cabinet-info.pagenation.dto';
import { UserInfoPagenationDto } from '../dto/user-info.pagenation.dto';
import { ISearchRepository } from './search.repository.interface';

export class SearchRepository implements ISearchRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Cabinet) private cabinetRepository: Repository<Cabinet>,
    @InjectRepository(BanLog) private banLogRepository: Repository<BanLog>,
  ) {}

  async searchByIntraId(
    intra_id: string,
    index: number,
    length: number,
  ): Promise<UserInfoPagenationDto> {
    const result = await this.userRepository.findAndCount({
      select: {
        user_id: true,
        intra_id: true,
      },
      where: {
        intra_id: Like(`%${intra_id}%`),
      },
      order: { user_id: 'ASC' },
      take: length,
      skip: index,
    });
    const rtn = {
      result: result[0].map((r) => ({
        user_id: r.user_id,
        intra_id: r.intra_id,
      })),
      total_length: result[1],
    };
    return rtn;
  }

  async searchByLentType(
    lent_type: LentType,
    index: number,
    length: number,
  ): Promise<CabinetInfoPagenationDto> {
    const result = await this.cabinetRepository.findAndCount({
      relations: ['lent', 'lent.user'],
      where: {
        lent_type,
      },
      order: { cabinet_id: 'ASC' },
      take: length,
      skip: index,
    });
    const rtn = {
      result: result[0].map((cabinet) => ({
        cabinet_id: cabinet.cabinet_id,
        cabinet_num: cabinet.cabinet_num,
        lent_type: cabinet.lent_type,
        cabinet_title: cabinet.title,
        max_user: cabinet.max_user,
        status: cabinet.status,
        section: cabinet.section,
        lent_info: cabinet.lent.map((lent) => ({
          user_id: lent.user.user_id,
          intra_id: lent.user.intra_id,
          lent_id: lent.lent_id,
          lent_time: lent.lent_time,
          expire_time: lent.expire_time,
        })),
      })),
      total_length: result[1],
    };
    return rtn;
  }

  async searchByCabinetNumber(
    visible_num: number,
  ): Promise<CabinetInfoPagenationDto> {
    const result = await this.cabinetRepository.find({
      relations: ['lent', 'lent.user'],
      where: {
        cabinet_num: visible_num,
      },
      order: { cabinet_id: 'ASC' },
    });
    const rtn = {
      result: result.map((cabinet) => ({
        cabinet_id: cabinet.cabinet_id,
        cabinet_num: cabinet.cabinet_num,
        lent_type: cabinet.lent_type,
        cabinet_title: cabinet.title,
        max_user: cabinet.max_user,
        status: cabinet.status,
        section: cabinet.section,
        lent_info: cabinet.lent.map((lent) => ({
          user_id: lent.user.user_id,
          intra_id: lent.user.intra_id,
          lent_id: lent.lent_id,
          lent_time: lent.lent_time,
          expire_time: lent.expire_time,
        })),
      })),
      total_length: result.length,
    };
    return rtn;
  }

  async searchByBannedCabinet(
    index: number,
    length: number,
  ): Promise<CabinetInfoPagenationDto> {
    const result = await this.cabinetRepository.findAndCount({
      relations: ['lent', 'lent.user'],
      where: {
        status: CabinetStatusType.BANNED,
      },
      order: { cabinet_id: 'ASC' },
      take: length,
      skip: index,
    });
    const rtn = {
      result: result[0].map((cabinet) => ({
        cabinet_id: cabinet.cabinet_id,
        cabinet_num: cabinet.cabinet_num,
        lent_type: cabinet.lent_type,
        cabinet_title: cabinet.title,
        max_user: cabinet.max_user,
        status: cabinet.status,
        section: cabinet.section,
        lent_info: cabinet.lent.map((lent) => ({
          user_id: lent.user.user_id,
          intra_id: lent.user.intra_id,
          lent_id: lent.lent_id,
          lent_time: lent.lent_time,
          expire_time: lent.expire_time,
        })),
      })),
      total_length: result[1],
    };
    return rtn;
  }

  async searchByBrokenCabinet(
    index: number,
    length: number,
  ): Promise<BrokenCabinetInfoPagenationDto> {
    const result = await this.cabinetRepository.findAndCount({
      where: {
        status: CabinetStatusType.BROKEN,
      },
      order: { cabinet_id: 'ASC' },
      take: length,
      skip: index,
    });
    const rtn = {
      result: result[0].map((cabinet) => ({
        cabinet_id: cabinet.cabinet_id,
        cabinet_num: cabinet.cabinet_num,
        lent_type: cabinet.lent_type,
        note: cabinet.title,
        max_user: cabinet.max_user,
        section: cabinet.section,
      })),
      total_length: result[1],
    };
    return rtn;
  }

  async searchByBanUser(
    index: number,
    length: number,
  ): Promise<BlockedUserInfoPagenationDto> {
    const result = await this.banLogRepository.findAndCount({
      relations: ['user'],
      where: {
        unbanned_date: MoreThan(new Date()),
      },
      order: { ban_log_id: 'ASC' },
      take: length,
      skip: index,
    });
    const rtn = {
      result: result[0].map((ban) => ({
        user_id: ban.ban_user_id,
        intra_id: ban.user.intra_id,
        banned_date: ban.banned_date,
        unbanned_date: ban.unbanned_date,
      })),
      total_length: result[1],
    };
    return rtn;
  }
}
