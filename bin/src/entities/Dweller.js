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
exports.Dweller = void 0;
var typeorm_1 = require("typeorm");
var Dweller = /** @class */ (function () {
    function Dweller() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: '100' }),
        __metadata("design:type", String)
    ], Dweller.prototype, "_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: '100' }),
        __metadata("design:type", String)
    ], Dweller.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', enum: ['F', 'M'] }),
        __metadata("design:type", String)
    ], Dweller.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "lvl", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: '100', nullable: true }),
        __metadata("design:type", String)
    ], Dweller.prototype, "father", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: '100', nullable: true }),
        __metadata("design:type", String)
    ], Dweller.prototype, "mother", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "Strength", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "Perception", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "Endurance", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "Charisma", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "Intelligence", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "Agility", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Dweller.prototype, "Luck", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Dweller.prototype, "born", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Dweller.prototype, "updated", void 0);
    Dweller = __decorate([
        (0, typeorm_1.Entity)('dwellers'),
        (0, typeorm_1.Index)('idx_attrb', [
            '_id',
            'Strength',
            'Perception',
            'Endurance',
            'Charisma',
            'Intelligence',
            'Agility',
            'Luck',
        ], { unique: true, background: true })
    ], Dweller);
    return Dweller;
}());
exports.Dweller = Dweller;
//# sourceMappingURL=Dweller.js.map