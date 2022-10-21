import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import Cabinet from 'src/entities/cabinet.entity';
import { IActivationRepository } from './activation.repository.interface';
import { InactivatedCabinetDto } from '../dto/inactivated-cabinet.dto';
import { BanCabinetDto } from '../dto/ban-cabinet.dto';
import { PatchActivationDto } from '../dto/patch-activation.dto';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';

export class ActivationRepository implements IActivationRepository {
  constructor(
    @InjectRepository(Cabinet)
    private activationRepository: Repository<Cabinet>,
    private dataSource: DataSource,
  ) {}

  async getInactivatedCabinetList(): Promise<InactivatedCabinetDto[]> {
    const result = await this.activationRepository
      .createQueryBuilder(this.getInactivatedCabinetList.name)
      .select(['floor', 'cabinet_num', 'memo as note'])
      .where({
        status: CabinetStatusType.BROKEN,
      })
      .getRawMany();
    console.log(result);
    return result;
  }

  async getBanCabinetList(): Promise<BanCabinetDto[]> {
    const result = await this.activationRepository.find({
      select: {
        floor: true,
        section: true,
        cabinet_num: true,
      },
      where: {
        status: CabinetStatusType.BANNED,
      },
    });
    console.log(result);
    return result;
  }

  // FIXME: activation 대신 cabinet_status와 lent_type을 변경하도록 기능이 변경되었지만
  // 일단 v3로의 포팅에서는 activation 대신 cabinet_status로 대체하도록 하겠습니다.
  async modifyCabinetActivation(
    queryRunner: QueryRunner,
    cabinetIdx: number,
    activation: number,
  ) {
    await this.activationRepository
      .createQueryBuilder(this.modifyCabinetActivation.name, queryRunner)
      .update(Cabinet)
      .set({
        status: activation
          ? CabinetStatusType.AVAILABLE
          : CabinetStatusType.BROKEN,
      })
      .where({
        cabinet_id: cabinetIdx,
      })
      .execute();
  }

  // disable 테이블 대신 cabinet.memo에 저장
  async addDisableLog(
    queryRunner: QueryRunner,
    cabinetIdx: number,
    reason: string,
  ) {
    await this.activationRepository
      .createQueryBuilder(this.addDisableLog.name, queryRunner)
      .update(Cabinet)
      .set({
        memo: reason,
      })
      .where({
        cabinet_id: cabinetIdx,
      })
      .execute();
  }

  async modifyDisableLog(queryRunner: QueryRunner, cabinetIdx: number) {
    await this.activationRepository
      .createQueryBuilder(this.modifyDisableLog.name, queryRunner)
      .update(Cabinet)
      .set({
        memo: null,
      })
      .where({
        cabinet_id: cabinetIdx,
      })
      .execute();
  }

  async patchActivation(cabinetInfo: PatchActivationDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.modifyCabinetActivation(
        queryRunner,
        cabinetInfo.cabinetIdx,
        cabinetInfo.activation,
      );

      if (cabinetInfo.activation === 0)
        await this.addDisableLog(
          queryRunner,
          cabinetInfo.cabinetIdx,
          cabinetInfo.reason,
        );
      else await this.modifyDisableLog(queryRunner, cabinetInfo.cabinetIdx);
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
