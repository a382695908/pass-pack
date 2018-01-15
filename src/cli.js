#! /usr/bin/env node
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const add = require('./add');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
const toolsJsonFile = path.join(os.homedir(), '.pass-pack', 'pass.json');

async function save2File (detail) {
  let fileObj = {};
  try {
    fileObj = await fse.readJson(toolsJsonFile);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('init file:', toolsJsonFile);
    }
  }

  await fse.outputJson(toolsJsonFile, Object.assign(fileObj, {
    [detail.account]: encrypt(detail)
  }))
}

async function getLocalData () {
  let fileObj = {};
  try {
    fileObj = await fse.readJson(toolsJsonFile);
  } catch (e) {}
  return fileObj;
}

async function doAction (action, opt) {
  if (action === 'add') {
    const result = await add();
    await save2File(result);
  } else if (action === 'show') {
    let localPass = await getLocalData();
    let {item, handleType} = await inquirer.prompt([{
      type: 'list',
      name: 'item',
      message: '请选择账号',
      choices: Object.keys(localPass),
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
    doAction(handleType, localPass[item])
  } else if (action === 'showDetail') {
    let data = decrypt(opt);
    console.log(chalk.blue('用户名'), data.username);
    console.log(chalk.blue('密码'), data.password);
    console.log(chalk.blue('备注'), data.other);
  } else if (action === 'modifyDetail') {
    let data = decrypt(opt);
    const result = await add(data.account);
    await save2File(result);
  }
}
(async () => {
  let result = await inquirer.prompt({
    type: 'input',
    name: 'key',
    message: '请输入加密KEY：'
  });
  // key = result.key;
  global.key = result.key;
  const {action} = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '请选择操作',
    choices: [{
      name: '新建密码记录',
      value: 'add'
    },{
      name: '查看密码记录',
      value: 'show'
    }]
  });
  doAction(action)
})()