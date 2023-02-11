#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var path_1 = require("path");
var fs_1 = require("fs");
require("reflect-metadata");
var pkg = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, './package.json'), 'utf8'));
var database_connection_1 = require("./src/database.connection");
var dweller_1 = require("./src/commands/dweller");
var build_1 = require("./src/commands/build");
var jobs_1 = require("./src/commands/jobs");
database_connection_1.AppDataSource.initialize()
    .then(function () {
    var cli = commander_1.program;
    console.log("".concat(__dirname, "/**/migrations/*.{ts,js}"));
    cli
        .version(pkg.version, '-v,--version', 'Shows cli version')
        .allowUnknownOption(false)
        .allowExcessArguments(false);
    cli.addCommand(dweller_1.default);
    cli.addCommand(build_1.default);
    cli.addCommand(jobs_1.default);
    cli.parse(process.argv);
})
    .catch(function (err) {
    throw err;
});
//# sourceMappingURL=cli.js.map