"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Dweller_1 = require("./entities/Dweller");
var Buildings_1 = require("./entities/Buildings");
var Jobs_1 = require("./entities/Jobs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: "".concat(__dirname, "/../dwellers.sqlite3"),
    synchronize: true,
    logging: false,
    entities: [Dweller_1.Dweller, Buildings_1.Building, Jobs_1.Job],
    migrations: ["".concat(__dirname, "/migrations/*.{ts,js}")],
    subscribers: [],
});
//# sourceMappingURL=database.connection.js.map