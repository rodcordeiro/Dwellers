import { Dweller } from '../entities/Dweller';
import { Job } from '../entities/Jobs';
import { jobRepository } from '../repositories/jobs.repository';
import { assignRepository } from '../repositories/assignment.repository';
import { BuildingService } from './building.service';
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
    return await jobRepository
      .find({
        loadRelationIds: true,
      })
      .then((response) => {
        return response.filter((job) => job.place === place);
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

  async assing(job: Job, dweller: Dweller) {
    const builds = new BuildingService();

    const build = await builds.findById(job.place);
    const currentWorkers = await assignRepository
      .find({ loadRelationIds: true })
      .then(
        (response) =>
          response.filter((assign) => assign.job === job._id).length,
      );
    if (currentWorkers === build.max_workers) {
      throw new Error('This job already rechead its maximum workers');
    }
    const alreadyRegistered = await assignRepository
      .find({
        loadRelationIds: true,
      })
      .then(
        (response) =>
          response.filter((d) => d.dweller === dweller._id).length > 0,
      )
      .catch((err) => {
        console.error(err);
        return false;
      });
    if (alreadyRegistered) {
      await assignRepository
        .delete({
          dweller: dweller._id,
        })
        // .then((response) => console.log(response))
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }

    const assignment = assignRepository.create({
      dweller: dweller._id,
      job: job._id,
    });

    await assignRepository.save(assignment).catch((err) => {
      throw err;
    });
  }
}
