### week7 学习笔记
# 类型转换
* ```==``` 类型相同时直接比较，类型不同时先转成number再比较
* ```==``` 算是js设计的失误，推荐使用```===```

# 拆箱转换 unboxing
* 对象类型转换成基本类型(toPrimitive)
* 对象的3个方法会影响toPrimitive的结果
	* ```toString(){ return "2" }```
	* ```valueOf(){ return 1 }```
	* ```[Symbol.toPrimitive](){ return 3 }```
* 数字运算优先调用```valueOf()```，字符串优先调用```toString()```

# 装箱转换 boxing
* 基本类型转换为对象类型
* 属性调用时，如果.或[]前面的是基础类型，会自动调用装箱
* 可以用```typeof```来看是包装前的值，还是包装后的对象

# 预处理
* 引擎对代码进行预处理，把var声明向前提
* 所有的变量声明(```var,let,const```)都有预处理，把变量变成局部变量；如果把```var```换成```const```，在声明前使用会抛错
* 推荐使用```class,let,const```

# 作用域
* 默认是函数作用域(```var```)
* ```let```和```const```是块作用域，即所在的{}内

# 宏任务/微任务
* 宏任务： 浏览器层面传给js引擎的任务
* 微任务： js引擎内部的任务，只有promise可以产生微任务

# 闭包
* 每个function都是一个闭包，会把定义时的environment record保存到函数本身上，变成一个属性

# Realm
* 在一个js引擎的实例里，所有的内置对象会放进Realm里。Realm代表js的运行环境，不同的Realm实例间是完全独立的，比如不同的window或iframe下对应不同的Realm
* js中，函数表达式和对象直接量都会创建对象，用.做隐式转换也会创建对象
* 引擎会根据外部条件创建Realm，Realm意味js的运行环境