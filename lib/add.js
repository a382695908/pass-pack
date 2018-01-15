'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inquirer = require('inquirer');

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(account) {
    var inputs, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inputs = [];

            if (!account) {
              inputs.push({
                type: 'input',
                name: 'account',
                message: "请输入账户名称（如：微信，邮箱）：",
                validate: function validate(value) {
                  if (value) {
                    return true;
                  }
                  return '不能为空';
                }
              });
            }
            inputs = inputs.concat([{
              type: 'input',
              name: 'username',
              message: "请输入用户名："
            }, {
              type: 'input',
              name: 'password',
              message: "请输入密码："
            }, {
              type: 'input',
              name: 'other',
              message: "如有额外信息请输入："
            }]);
            _context.next = 5;
            return inquirer.prompt(inputs);

          case 5:
            result = _context.sent;
            return _context.abrupt('return', (0, _assign2.default)({
              account: account
            }, result));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();