import { Building } from '../entities/Buildings';
import { buildingRepository } from '../repositories/building.repository';

export class BuildingService {
  async list() {
    return await buildingRepository.find({
      relationLoadStrategy: 'join',
      loadRelationIds: true,
    });
  }

  async findById(_id: string) {
    return await buildingRepository.findOneBy({
      _id,
    });
  }

  async register(data: Building) {
    const build = buildingRepository.create(data);
    return await buildingRepository
      .save(build)
      .then(() => {
        return build;
      })
      .catch((err) => {
        throw err;
      });
  }
}
