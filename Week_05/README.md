### week5学习笔记
## vue3响应式系统
* 核心是对数据进行劫持，vue3用`Proxy`类，vue2用`Object.defineProperty()`
* `reactive(obj) `创建响应式数据
* `effect(callback)` 当`callback`中用到的数据被修改时，触发`callback`

## range
* 用来选择html文档的一段内容
* `document.createRange()`创建一个范围，这个范围是range类型的实例


## getBoundingClientRect()
* 用于获取某个元素相对于视窗的位置
* 有top, right, bottom, left等属性
