"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
var typeorm_1 = require("typeorm");
var Buildings_1 = require("./Buildings");
var Job = /** @class */ (function () {
    function Job() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: '100' }),
        __metadata("design:type", String)
    ], Job.prototype, "_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 40, nullable: false }),
        __metadata("design:type", String)
    ], Job.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Buildings_1.Building; }, function (build) { return build._id; }, {
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
        }),
        (0, typeorm_1.JoinColumn)({ name: 'build', referencedColumnName: '_id' }),
        __metadata("design:type", String)
    ], Job.prototype, "place", void 0);
    Job = __decorate([
        (0, typeorm_1.Entity)('jobs'),
        (0, typeorm_1.Index)('idx_assignment', ['_id', 'name', 'place'])
    ], Job);
    return Job;
}());
exports.Job = Job;
//# sourceMappingURL=Jobs.js.map