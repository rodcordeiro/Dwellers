"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingRepository = void 0;
var database_connection_1 = require("../database.connection");
var Buildings_1 = require("../entities/Buildings");
exports.buildingRepository = database_connection_1.AppDataSource.getRepository(Buildings_1.Building);
//# sourceMappingURL=building.repository.js.map