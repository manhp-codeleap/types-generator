"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeScriptGenerator = void 0;
var function_1 = require("fp-ts/lib/function");
var pipeable_1 = require("fp-ts/lib/pipeable");
var utils_1 = require("../services/utils");
exports.typeScriptGenerator = {
    getTypeString: function () { return "string"; },
    getTypeNumber: function () { return "number"; },
    getTypeInteger: function () { return "number"; },
    getTypeBoolean: function () { return "boolean"; },
    getTypeEnum: function_1.flow(utils_1.map(utils_1.surround("'", "'")), utils_1.join("|")),
    getTypeArray: utils_1.surround("Array<", ">"),
    getTypeAnyOf: utils_1.join("|"),
    getTypeOneOf: utils_1.join("|"),
    getTypeAllOf: utils_1.join("&"),
    getTypeObject: function_1.flow(utils_1.join(","), utils_1.surround("{", "}")),
    getTypeReference: utils_1.toPascalCase,
    getProperty: function (key, isRequired) {
        return pipeable_1.pipe(key, utils_1.surround('"', '"'), utils_1.doIf(function_1.not(function_1.constant(isRequired)), utils_1.suffix("?")), utils_1.suffix(":"), utils_1.prefix);
    },
    getTypeUnknown: function_1.constant("unknown"),
    addHeader: utils_1.prefix('"use strict";\n'),
    combineTypes: utils_1.join(";"),
    getTypeDefinition: function (key) { return utils_1.prefix("export type " + utils_1.toPascalCase(key) + "="); },
    makeTypeNullable: function_1.flow(utils_1.suffix("|null"), utils_1.surround("(", ")"))
};
