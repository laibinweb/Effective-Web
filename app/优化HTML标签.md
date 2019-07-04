# 优化HTML标签 #
1. 如果是一段文字，那就用p标签。如果是一个标题，那就用h1~h6标签。这样可以让你的标签多样化，写样式的时候用标签选择器，就不用套很多class，并且有利于SEO
2. 如果是一个表单，那就用from。用form有很多优点
    - 自动表单提交
    - 自动监听回车键
    - 无论是原生js或者配合jquery，都可以很方便的获取到表单元素的值
3. HTML5提供了很多类型的input, 使用这些input有很多好处， 浏览器会根据不同的input做出相应的优化，例如在iphone上，使用不同的input会弹出不同的键盘。即使在非HTML5浏览器也可以用，因为对不认识的type, 浏览器会把它当作默认的text。
    - 需要注意，就是type=number的input在Chrome下面是不允许输入逗号。
4. 如果内容是一个表格，那就用table, table有自适应的优点； 如果是一个列表， 就用ol/ul标签， 扩展性会更好
5. 如果是加粗就用b/strong, 而不是手动设置font-weight, 这样做的好处是，以后要更改字体时， 只需要设置b/strong的font-family, 当然font-face也可以按照不同的font-weight设置不同的font-family, 但是用strong有强调的作用。
6. 如果是图片，那就用img标签，并且写上alt，帮助SEO以及作为图片加载不出来时显示的帮助文案；同时还可以用picture/srcset做响应式图片；如果是背景图片才用background-image.
7. 如果是输入框，那就写个input，而不是自己写个p/div标签再设置contenteditable属性，因为这样在IOS Safari上光标的定位容易出现问题，需要做特殊效果除外，如让输入框按文字内容高度自适应.
8. 如果是跳转链接，那就写个a标签，而不是自己用js监听点击事件，然后用location.href做跳转。因为用a标签可以让搜索引擎爬取整个网站的内容，并且用a标签还有个好处，就是在手机端上滑的时候不会触发touchstart。
9. 如果是按钮就应该写一个button或者
< input type="button">，而不是写一个a标签设置样式，因为使用button可以设置disabled, 然后使用CSS的:disabled, 还有:active等伪类，例如在:active的时候设置按钮的样式，产生一种被按下去的感觉.
10. 如果是分割线就使用hr标签， 而不是写一个border-bottom的样式， 使用hr容易进行检查，
11. 如果是换行文本就应该使用p标签， 而不是br， 因为p标签可以用margin设置行间距， 但是如果是长文本则应该使用div， 因为p标签里面不能有p标签， 特别是当数据是后端给的，可能会带有p标签， 所以这时容器不能使用p标签
12. div、section、article、nav、aside的区别
    - div: 作为一个普通容器
    - section: 作为一个普通的章节
    - article: 适用于独立性较强的内容，如网页文章的主体
    - nav: 适用于导航内容
    - aside: 可用作和页面主题相关的容器， 像侧边栏、评论等辅助元素        
