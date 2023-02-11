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

  async findByName(name: string) {
    return (await buildingRepository.find()).filter((building) => {
      if (building.name.toLowerCase().includes(name.toLowerCase()))
        return building;
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
  async update(data: Building) {
    return await buildingRepository
      .update({ _id: data._id }, data)
      .then(() => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }
  async delete(data: Building) {
    return await buildingRepository
      .delete({ _id: data._id })
      .then(() => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }
}
