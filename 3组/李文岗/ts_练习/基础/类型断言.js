"use strict";
// 断言
// 语法：值 as 类型   或 <类型>值
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
function isFish(animal) {
    if (typeof animal.swim() === 'function') { // 断言方式 (animal as Fish).swim()
        return true;
    }
    return false;
}
//  注意：滥用类型断言可能会导致运行时错误
// 2.将父类断言作为子类 ( class类之间有继承关系)
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = 0;
        return _this;
    }
    return APIError;
}(Error));
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusCode = 200;
        return _this;
    }
    return HttpError;
}(Error));
function isPP(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    return false;
}
function isP(error) {
    if (error instanceof APIError) {
        return true;
    }
    return false;
}
// 3.将任何一个类型断言为 any
// window.foo=1  保存
window.foo = 1; // as断言为any类型不会报错  
