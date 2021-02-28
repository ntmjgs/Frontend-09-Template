## week01 学习总结
#### 井字棋思路
* 用数组表示棋盘
* 绑定click事件，更新棋盘状态
* 遍历棋盘的三横三竖两斜，判断是否胜出
* AI判断bestChoice（递归）
    * 当前下一子后即将胜出，则返回point和result
    * 否则，遍历棋盘上未下子的点，依次：
        * 下子
        * 得到下子后对方的bestChoice
        * 反推我方的bestChoice
        * 如果本次循环的result优于之前的最好结果，则替换
    * 遍历结束，得到最好的result和对应的point
* 棋盘优化：一维数组代替二维数组，优化存储
    

#### 异步写法
* callback
* Promise
* Async/Await

#### 复制对象
* JSON.parse(JSON.stringify(...))
* Object.create(...)