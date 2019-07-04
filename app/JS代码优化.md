1. 避免全局耦合
    - 这是比较常见的耦合。全局耦合就是几个类、模块共用了全局变量或者全局数据结构，特别是一个变量跨了几个文件。
    ```javascript
    //定义了一个全局变量PAGE, 然后在app.js里面使用。这里的全局变量PAGE跨了2个文件，一个HTML, 一个JS。在app.js里面突然冒出来了个PAGE变量，后续维护这个代码的人很容易找不到它的定义。
    //这是最常见的场景，优点使用起来比较简单。缺点是容易和局部变量冲突，不利于维护。
    <script>
        var PAGE = 10;
    </script>
    <script src="app.js"></script>
    ```
    如果需要把数据写在页面上的话，有2种方法。
    第一种是在页面写一个form，数据写成form里面的控件数据
    ```javascript
    //使用了input和textarea, 其中，使用textarea的优点是支持特殊符号。使用时把from数据序列化
    <form id="page-data>
        <input type="hidden" name="page" value="2"/>
        <textarea name="list" style="display:none">[{name: 'laibin', age: 23}]</textarea>
    </form>
    ```
    第二种方法是利用全局数据结构，即可能会使用模块化的方法
    ```javascript
    //data.js
    module.exports = {
        page: 1,
    }

    //search.js获取list列表数据
    var data = require('data');
    ajax({page: data.page});
    ``` 
2. JS/CSS/HTML的耦合
    - 这种耦合在传统的开发模式下最常见（Jquery）,因为这3这通常具有交集，需要使用JS控制样式和操作DOM。如果使用JS控制样式，很多人都喜欢在JS里面写样式，例如
    ```javascript
    //bad
    $('.text').css({
        opacity: 0
    })

    在JS里面设置了样式，而CSS文件里面也会有样式，在改CSS的时候，如果不知道JS里面也设置了样式，那么可能会发生冲突。
    所以不推荐直接在JS里面更改样式属性，应该通过增删类来控制样式。

    //good
    $('.text').addClass('opacity')
    $('.text').removeClass('opacity')
    ``` 
    通过类来控制样式还有一个好处，当给容器动态的增删一个类时，可以借助新加的类控制它的子元素的样式。
3. JS书写优化
 - 按强类型风格写代码
 ```javascript
 定义变量的时候要指明类型，告诉JS解释器这个变量是什么数据类型。
 //bad
 var num,
     str,
     obj;

 定义变量时给一个默认值，这样不仅方便了解释器，也方便了阅读代码的人
 //good
 var num = 1,
     str = '',
     obj = null;
 ```
 ```javascript
 不要改变变量类型
 //bad
 var num = 5;
 num = '' + num;

 //good
 var num = 5;
 var str = '' + num;
 ```
 ```javascript
 函数返回值类型要确定
 //bad
 function getPrice(count) {
     if (count < 0) return;
     return count * 100;
 }

 //good
 function getPrice(count) {
     if (count < 0) return -1;
     return count * 100;
 }
 ```
 - 减少作用域查找
 ```javascript
 不要在全局作用域下直接写代码逻辑
 //bad
 <script>
    var oP = document.querySelector('p');
    oP.style.color = 'red';
 </script>

 上面的oP变量在查找时需要在全局作用域下查找，效率低且会污染Window对象，应创建一个局部作用域，局部作用域的查找是很快的   

 //good
 <script>
    !function(){
        var oP = document.querySelector('p');
        oP.style.color = 'red';
    }()
 </script>
 ```
 - 不要滥用闭包
 ```javascript
//bad 
function getResult(count) {
    count++;
    function process() {
        var factor = 2;
        return count * factor - 5;
    }
    return process();
}
    
上面的代码定义了一个process函数，在这个函数里面count变量的查找时间要高于局部变量factor

//good
function getResult(count) {
    count++;
    function process(count) {
        var factor = 2;
        return count * factor - 5;
    }
    return process();
}    
 ```
- 频繁使用某个全局变量时，可以用一个局部变量缓存
```javascript
//bad
var url = '';
if (window.location.protocal === 'https:') {
    url = "local.banggood.com" + window.location.pathname + window.location.search;
}

//good
var url = '';
var location = window.location;
if (location.protocal === 'https:') {
    url = "local.banggood.com" + location.pathname + location.search;
}
``` 
- 避免==的使用
```javascript
如果已经确定变量类型
//bad
var count = 5;
var num = count * 2;
if (num == 10) {
    //do something
}

//good
var count = 5;
var num = count * 2;
if (num === 10) {
    //do something
}

如果变量类型不确定，那就手动做类型转换, 而不是让别人去猜这里面是否有类型转换
var num = '5';
if (parseInt(num) === 1) {
    //do something
}
```
- 合并表达式
```javascript
用三目运算取代简单的if-else
//bad
function getPrice(count) {
    if (count < 0>) return -1;
    return count * 100;
}

//good
function getPrice(count) {
    return count < 0 ? -1 : count * 100;
}
```
```javascript
连等——利用赋值表达式会返回一个值来赋值，并且执行顺序是从右到左
a = b = c = 0;
需要注意的是声明变量时不能使用连等，例如
var a = b = c = 0;
这样子虽然a,b,c三个变量的值都是0，但a是局部变量，b和C是全局变量

另外一种写法
var age = 0;
if ((age = +from.age.value) >= 18) {
    console.log('你已成年')
}
```
```javascript
自增
//每增加一个人，peopleId自增1
addPeople(peopleId++)
```
```javascript
减少意义不明的变量
//bad
showPop('success',1, true);

//good
var popType = 'success',
    btnId = 1,
    reload = true;
showPop(popType, btnId, reload);    
```