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
exports.Building = void 0;
var typeorm_1 = require("typeorm");
var Building = /** @class */ (function () {
    function Building() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: '100' }),
        __metadata("design:type", String)
    ], Building.prototype, "_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 40 }),
        __metadata("design:type", String)
    ], Building.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', default: 1 }),
        __metadata("design:type", Number)
    ], Building.prototype, "lvl", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', enum: ['S', 'P', 'E', 'C', 'I', 'A', 'L'] }),
        __metadata("design:type", String)
    ], Building.prototype, "attribute", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', default: 2 }),
        __metadata("design:type", Number)
    ], Building.prototype, "max_workers", void 0);
    Building = __decorate([
        (0, typeorm_1.Entity)('build'),
        (0, typeorm_1.Index)('idx_build', ['_id', 'name', 'attribute'], {
            unique: true,
            background: true,
        })
    ], Building);
    return Building;
}());
exports.Building = Building;
//# sourceMappingURL=Buildings.js.map