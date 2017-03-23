(function (modules) {
  const installedModules = {}
  
  function require(moduleId) {
    // 检查 installedModules 中是否存在该模块对象
    // 如果存在就返回
    if (installedModules[moduleId])
      return installedModules[moduleId].exports

    // 创建一个新的 module 对象，用于下面函数的调用
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    }

    // 从 modules 中找到对应的模块初始化函数并执行
    modules[moduleId].call(module.exports, module, module.exports, require)

    // 标识模块已被加载过
    module.l = true;

    return module.exports
  }

  // 执行入口模块
  // a.js 的 moduleId === 2
  require(2)

})(
  [
    (function (module, exports, require) {
      console.log('module b runs')

      exports['a'] = ({
        name: 'b'
      })
    }),
    (function (module, exports, require) {
      const module_0_b = require(0)
      
      exports['a'] = ({
        name: 'c'
      })
    }),
    (function (module, exports, require) {
      const module_0_b = require(0)
      const module_1_c = require(1)

      console.log(module_0_b['a'].name)
      console.log(module_1_c['a'].name)
    })
  ]
)