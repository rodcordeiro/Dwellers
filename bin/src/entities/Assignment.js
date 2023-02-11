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
exports.Assignment = void 0;
var typeorm_1 = require("typeorm");
var Buildings_1 = require("./Buildings");
var Dweller_1 = require("./Dweller");
var Assignment = /** @class */ (function () {
    function Assignment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", String)
    ], Assignment.prototype, "_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Dweller_1.Dweller; }, function (dweller) { return dweller._id; }, {
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
        }),
        (0, typeorm_1.JoinColumn)({ name: 'dweller', referencedColumnName: '_id' }),
        __metadata("design:type", String)
    ], Assignment.prototype, "dweller", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Buildings_1.Building; }, function (build) { return build._id; }, {
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
        }),
        (0, typeorm_1.JoinColumn)({ name: 'place', referencedColumnName: '_id' }),
        __metadata("design:type", String)
    ], Assignment.prototype, "place", void 0);
    Assignment = __decorate([
        (0, typeorm_1.Entity)('assignments'),
        (0, typeorm_1.Index)('idx_assignment', ['_id', 'dweller', 'place'])
    ], Assignment);
    return Assignment;
}());
exports.Assignment = Assignment;
//# sourceMappingURL=Assignment.js.map