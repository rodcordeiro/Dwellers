"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRepository = void 0;
var database_connection_1 = require("../database.connection");
var Jobs_1 = require("../entities/Jobs");
exports.jobRepository = database_connection_1.AppDataSource.getRepository(Jobs_1.Job);
//# sourceMappingURL=jobs.repository.js.map