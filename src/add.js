const inquirer = require('inquirer');

module.exports = async (account) => {
  let inputs = [];
  if (!account) {
    inputs.push({
      type: 'input',
      name: 'account',
      message: "请输入账户名称（如：微信，邮箱）：",
      validate: (value) => {
        if (value) {
          return true
        }
        return '不能为空'
      }
    })
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
  }])
  let result = await inquirer.prompt(inputs)
  return Object.assign({
    account: account
  }, result)
}