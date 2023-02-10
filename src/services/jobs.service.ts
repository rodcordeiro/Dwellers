import { Job } from '../entities/Jobs';
import { jobRepository } from '../repositories/jobs.repository';

export class JobService {
  async list() {
    return await jobRepository.find({
      relationLoadStrategy: 'join',
      loadRelationIds: true,
    });
  }

  async findById(_id: string) {
    return await jobRepository.findOneBy({
      _id,
    });
  }
  async findByPlace(place: string) {
    return await jobRepository.findOneBy({
      place,
    });
  }

  async register(data: Job) {
    const build = jobRepository.create(data);
    return await jobRepository
      .save(build)
      .then(() => {
        return build;
      })
      .catch((err) => {
        throw err;
      });
  }
}
