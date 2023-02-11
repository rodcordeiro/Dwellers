"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var uuid_1 = require("uuid");
var utils_1 = require("../../utils");
var building_service_1 = require("../../services/building.service");
var jobs_service_1 = require("../../services/jobs.service");
var dwellers_service_1 = require("../../services/dwellers.service");
var command = new commander_1.Command('job');
var spinner = new utils_1.Spinner().spinner;
command.helpOption('-h,--help', 'Dweller feature');
command.description('Job features. Allow view, create, update and delete jobs');
command.alias('j');
command
    .command('list')
    .alias('l')
    .description('View all buildings')
    .helpOption('-h,--help', 'Shows all buildings ')
    .option('--i, --id [job]', 'Filter by job id')
    .option('--p, --place [place]', 'Filter by place name')
    .action(function (_a) {
    var id = _a.id, place = _a.place;
    return __awaiter(void 0, void 0, void 0, function () {
        var service, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    spinner.start('Hello Sir, requesting information...');
                    service = new jobs_service_1.JobService();
                    if (!id) return [3 /*break*/, 2];
                    return [4 /*yield*/, service
                            .findById(id)
                            .then(function (response) { return response; })
                            .catch(function (err) {
                            spinner.fail(err.message);
                            spinner.stop();
                        })];
                case 1:
                    data = _b.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!place) return [3 /*break*/, 4];
                    return [4 /*yield*/, service
                            .findByPlace(place)
                            .then(function (response) { return response; })
                            .catch(function (err) {
                            spinner.fail(err.message);
                            spinner.stop();
                        })];
                case 3:
                    data = _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, service
                        .list()
                        .then(function (response) { return response; })
                        .catch(function (err) {
                        spinner.fail(err.message);
                        spinner.stop();
                    })];
                case 5:
                    data = _b.sent();
                    _b.label = 6;
                case 6:
                    spinner.succeed('Here are your dwellers Sir!');
                    spinner.stop();
                    console.table(data);
                    return [2 /*return*/];
            }
        });
    });
});
command
    .command('create')
    .alias('c')
    .description('Create a new build')
    .helpOption('-h,--help', 'Create a new build')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var service, prompt, buildingList, data, _id, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(chalk_1.default.cyan("Hello Sir, I see there is a new build today! Let's register it now"));
                service = new jobs_service_1.JobService();
                prompt = (0, inquirer_1.createPromptModule)();
                return [4 /*yield*/, new building_service_1.BuildingService().list()];
            case 1:
                buildingList = _a.sent();
                return [4 /*yield*/, prompt([
                        {
                            type: 'string',
                            name: 'name',
                            message: 'Job name:',
                            validate: function (input) { return input !== '' && input !== undefined; },
                        },
                        {
                            type: 'list',
                            name: 'place',
                            message: 'Working place:',
                            choices: buildingList.map(function (build) { return build.name; }),
                        },
                    ])];
            case 2:
                data = _a.sent();
                spinner.start('Wait a moment, registering...');
                _id = (0, uuid_1.v4)();
                payload = __assign(__assign({}, data), { place: buildingList.filter(function (build) { return data.place === build.name; })[0]._id, _id: _id });
                return [4 /*yield*/, service
                        .register(payload)
                        .then(function () {
                        spinner.succeed("New Job successfully registered! Job registration id: ".concat(_id, " "));
                        spinner.stop();
                    })
                        .catch(function (err) {
                        console.error(err);
                        spinner.fail(err.message);
                        spinner.stop();
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
command
    .command('assign')
    .alias('a')
    .description('Assign a job to a dweller')
    .helpOption('-h,--help', 'Assign a job to a dweller')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var service, dwellersService, prompt, jobs, dwellers, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(chalk_1.default.cyan("They're working hard, aren't they!?"));
                service = new jobs_service_1.JobService();
                dwellersService = new dwellers_service_1.DwellerService();
                prompt = (0, inquirer_1.createPromptModule)();
                return [4 /*yield*/, service.list()];
            case 1:
                jobs = _a.sent();
                return [4 /*yield*/, dwellersService.list()];
            case 2:
                dwellers = _a.sent();
                return [4 /*yield*/, prompt([
                        {
                            type: 'list',
                            name: 'dweller',
                            message: 'Select the dweller:',
                            choices: dwellers.map(function (dweller) { return dweller.name; }),
                        },
                        {
                            type: 'list',
                            name: 'job',
                            message: 'Select the new job:',
                            choices: jobs.map(function (job) { return job.name; }),
                        },
                    ])];
            case 3:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/];
        }
    });
}); });
exports.default = command;
//# sourceMappingURL=index.js.map