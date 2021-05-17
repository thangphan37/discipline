// sources: You Dont Know Js (Kyle Simpson)

// Modern Modules

var MyModules = (function () {
  var modules = {}

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]]
    }

    modules[name] = impl.apply(impl, deps)
  }

  function get(name) {
    return modules[name]
  }

  return {
    define,
    get,
  }
})()

MyModules.define('bar', [], function () {
  function hello(who) {
    return 'Let me introduce: ' + who
  }

  return {hello}
})

MyModules.define('foo', ['bar'], function (bar) {
  let hungry = 'hungry'

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase())
  }

  return {awesome}
})

var bar = MyModules.get('bar')
var foo = MyModules.get('foo')

foo.awesome()
