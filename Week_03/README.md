# week03 学习总结
### 编译过程
1. 词法分析，分词
2. 语法分析，构建AST
    * LL算法 （left-left）
        从左到右扫描，从左到右规约
    * LR算法
3. 代码生成，根据AST生成可执行代码


### 产生式
* 一种知识或规则的表示方法，适合做语法分析
* BNF范式（巴科斯范式）
    * ::= 表示定义
    * | 表示或者
    * [] 表示可缺省

### generator函数
* `function*` 标识
* 调用后返回生成器对象
* 用`next()`或`for.. of`来迭代
```javascript
function* foo(){
    yield 1
    yield 2
}
const f = foo()
console.log(f.next()); // { value: 1, done: false }
console.log(f.next()); // { value: 2, done: false }
console.log(f.next()); // { value: undefined, done: true }

const f2 = foo()
for(let tmp of f2){
    console.log(tmp) //依次返回1，2
}
```


### 正则表达式
* 字符串方法
    * `search() `  
        如果匹配成功，则 `search()` 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。  
        ```javascript
        "abcAB".search(/[A-Z]/g) //返回"3"
        ``` 
    * `replace()`  
        匹配并替换  
        ```javascript
        "abcAB".replace(/[A-Z]/g,"z") //返回"abczz"
        ``` 
    * `match()`  
        返回一个字符串匹配正则表达式的结果  
        ```javascript
        "abcAB".search(/[A-Z]/g)  //返回["A","B"]
        ``` 
* 正则表达式方法
    * `exec()`  
        * 执行搜索匹配，返回数组或null
        * 在设置了 global 或 sticky 标志位的情况下（如 /foo/g or /foo/y），RegExp 对象是有状态的,会把上次成功匹配后的位置记录在 lastIndex 属性中。  
        * 使用此特性，exec()可以和正则表达式的()搭配使用，对字符串中的多次匹配结果进行捕获，并逐条遍历
        ```javascript
        var reg = /([0-9]+)|([a-z]+)/g
        var ret = null
        function* getData(){
            while(true){
                ret = reg.exec("12ab34cd"); 
                if(!ret){
                    break
                }
                yield ret[0]
            }
        }
        for (let tmp of getData()){
            console.log(tmp) //依次打印"12","ab","34","cd"
        }
        ```

    * `test()`  
        判断是否匹配  
        ```javascript
        var reg = /[a-z]?/
        reg.test("abc") //true
        ```
### LL算法生成AST的思路
* 用正则表达式解析四则运算表达式，依次把每一个数字/运算符存入token数组
* 由于乘除的优先级高于加减，优先处理乘除，把乘除运算作为最小单元
* 参考乘法的产生式，完成乘法的语法分析函数`MultiplicativeExpression()`。对token数组中的内容从左到右规约，递归调用
```
<MultiplicativeExpression> ::= 
	<Number>
	|<MultiplicativeExpression><*><Number>
	|<MultiplicativeExpression></><Number>
```
* 参考加法的产生式，完成加法的语法分析函数`AdditiveExpression()`。和乘法类似，从左到右规约，递归调用
```
<AdditiveExpression> ::=
	<MultiplicativeExpression>
	|<AdditiveExpression><+><MultiplicativeExpression>
	|<AdditiveExpression><-><MultiplicativeExpression>
```
* 程序入口为`AdditiveExpression()`，对于未完成乘法分析的token，先调用`MultiplicativeExpression()`，把它们封装为乘法节点，在此基础上进行加法，层层嵌套封装，形成AST语法树，详见代码
