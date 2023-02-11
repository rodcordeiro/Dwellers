"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dwellerRepository = void 0;
var database_connection_1 = require("../database.connection");
var Dweller_1 = require("../entities/Dweller");
exports.dwellerRepository = database_connection_1.AppDataSource.getRepository(Dweller_1.Dweller);
//# sourceMappingURL=dwellers.repository.js.map