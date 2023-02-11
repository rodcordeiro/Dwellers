"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = require("ora");
var Spinner = /** @class */ (function () {
    function Spinner() {
        this.spinner = (0, ora_1.default)();
        this.spinner.spinner = 'bounce';
        return this;
    }
    return Spinner;
}());
exports.default = Spinner;
//# sourceMappingURL=loader.js.map