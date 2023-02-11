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
    return await buildingRepository
      .find({
        loadRelationIds: true,
      })
      .then((response) => {
        const build = response.filter((build) => build._id === _id);
        // console.log(build);
        return build[0];
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
