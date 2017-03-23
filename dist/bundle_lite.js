(function (modules) {
  // 存放模块初始化函数
  const installedModules = {}
  
  function require(moduleId) {
    // 检查 installedModules 中是否存在该模块
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
  // a.js 的 moduleId 为 2
  require(2)

})(
  [ /* b.js, moduleId = 0 */
    (function (module, exports, require) {
      console.log('module b runs')

      exports['a'] = ({
        name: 'b'
      })
    }),
    /* c.js, moduleId = 1 */
    (function (module, exports, require) {
      const module_b = require(0)
      
      exports['a'] = ({
        name: 'c'
      })
    }),
    /* a.js, moduleId = 2 */
    (function (module, exports, require) {
      const module_b = require(0)
      const module_c = require(1)

      console.log(module_b['a'].name)
      console.log(module_c['a'].name)
    })
  ]
)