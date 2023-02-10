import { Dweller } from '../entities/Dweller';
import { dwellerRepository } from '../repositories/dwellers.repository';

export class DwellerService {
  async list() {
    return await dwellerRepository.find({
      relationLoadStrategy: 'join',
      loadRelationIds: true,
    });
  }

  async findById(_id: string) {
    return await dwellerRepository.findOneBy({
      _id,
    });
  }

  async register(data: Dweller) {
    const dweller = dwellerRepository.create(data);
    return await dwellerRepository
      .save(dweller)
      .then(() => {
        return dweller;
      })
      .catch((err) => {
        throw err;
      });
  }

  async getMale() {
    return await dwellerRepository
      .findBy({
        gender: 'M',
      })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  async getFemale() {
    return await dwellerRepository
      .findBy({
        gender: 'F',
      })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }
}
