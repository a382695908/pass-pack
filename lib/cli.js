#! /usr/bin/env node
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var save2File = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(detail) {
    var fileObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileObj = {};
            _context.prev = 1;
            _context.next = 4;
            return fse.readJson(toolsJsonFile);

          case 4:
            fileObj = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);

            if (_context.t0.code === 'ENOENT') {
              console.log('init file:', toolsJsonFile);
            }

          case 10:
            _context.next = 12;
            return fse.outputJson(toolsJsonFile, (0, _assign2.default)(fileObj, (0, _defineProperty3.default)({}, detail.account, encrypt(detail))));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));

  return function save2File(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getLocalData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var fileObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fileObj = {};
            _context2.prev = 1;
            _context2.next = 4;
            return fse.readJson(toolsJsonFile);

          case 4:
            fileObj = _context2.sent;
            _context2.next = 9;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](1);

          case 9:
            return _context2.abrupt('return', fileObj);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 7]]);
  }));

  return function getLocalData() {
    return _ref2.apply(this, arguments);
  };
}();

var doAction = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, opt) {
    var result, localPass, _ref4, item, handleType, data, _data, _result;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(action === 'add')) {
              _context3.next = 8;
              break;
            }

            _context3.next = 3;
            return add();

          case 3:
            result = _context3.sent;
            _context3.next = 6;
            return save2File(result);

          case 6:
            _context3.next = 34;
            break;

          case 8:
            if (!(action === 'show')) {
              _context3.next = 20;
              break;
            }

            _context3.next = 11;
            return getLocalData();

          case 11:
            localPass = _context3.sent;
            _context3.next = 14;
            return inquirer.prompt([{
              type: 'list',
              name: 'item',
              message: '请选择账号',
              choices: (0, _keys2.default)(localPass),
              paginated: true
            }, {
              type: 'list',
              name: 'handleType',
              message: '操作',
              choices: [{
                name: '查看',
                value: 'showDetail'
              }, {
                name: '修改',
                value: 'modifyDetail'
              }]
            }]);

          case 14:
            _ref4 = _context3.sent;
            item = _ref4.item;
            handleType = _ref4.handleType;

            doAction(handleType, localPass[item]);
            _context3.next = 34;
            break;

          case 20:
            if (!(action === 'showDetail')) {
              _context3.next = 27;
              break;
            }

            data = decrypt(opt);

            console.log(chalk.blue('用户名'), data.username);
            console.log(chalk.blue('密码'), data.password);
            console.log(chalk.blue('备注'), data.other);
            _context3.next = 34;
            break;

          case 27:
            if (!(action === 'modifyDetail')) {
              _context3.next = 34;
              break;
            }

            _data = decrypt(opt);
            _context3.next = 31;
            return add(_data.account);

          case 31:
            _result = _context3.sent;
            _context3.next = 34;
            return save2File(_result);

          case 34:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function doAction(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inquirer = require('inquirer');
var os = require('os');
var path = require('path');
var fse = require('fs-extra');
var chalk = require('chalk');
var add = require('./add');
var encrypt = require('./encrypt');
var decrypt = require('./decrypt');
var toolsJsonFile = path.join(os.homedir(), '.pass-pack', 'pass.json');

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
  var result, _ref6, action;

  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return inquirer.prompt({
            type: 'input',
            name: 'key',
            message: '请输入加密KEY：'
          });

        case 2:
          result = _context4.sent;

          // key = result.key;
          global.key = result.key;
          _context4.next = 6;
          return inquirer.prompt({
            type: 'list',
            name: 'action',
            message: '请选择操作',
            choices: [{
              name: '新建密码记录',
              value: 'add'
            }, {
              name: '查看密码记录',
              value: 'show'
            }]
          });

        case 6:
          _ref6 = _context4.sent;
          action = _ref6.action;

          doAction(action);

        case 9:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
}))();