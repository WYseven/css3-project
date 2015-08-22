title: tween
speaker: @wangyun2
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css

[slide]

# tween
## 演讲者：@wangyun

[slide  data-transition="vertical3d"]

# 实例网站：
## http://diagnosite.com/

[slide]

[subslide]

---
* 使用的技术 
	* jQuery {:&.moveIn} : http://jquery.com/
    * TimelineMax动画库 : http://greensock.com/docs/#/HTML5/GSAP/TimelineMax/
    * css3特性:http://www.w3school.com.cn/css3/index.asp

[/subslide]

[slide style="background-image:url('/img/bg1.png')"]

head头部引入 {:&.flexbox.vleft}
```javascript
<script type="text/javascript" src="./js/jquery.js"></script>
<script type="text/javascript" src="./js/TweenMax.js"></script>
```
js中创建动画对象 {:&.flexbox.vleft}
```javascript
var t = new TimelineMax();
```
开启动画 {:&.flexbox.vleft}
```javascript
t.to("#div1",1,{left:200},0.5);
```
to方法参数说明 {:&.flexbox.vleft}
```javascript
> 第一个参数，一个元素选择器 或者 对象
> 第二个参数，动画持续时间
> 第三个参数，一个对象，动画变化的属性和对应的值
> 第四个参数，动画延迟发生时间 直接写数字或者或者"-=0.5"或者"+=0.5"
```


[slide]
## 使用.class/#id/自定义属性样式
----

```javascript
alert('nodeppt');
```

[slide]

## 主页面样式
### ----是上下分界线
----

nodeppt是基于nodejs写的支持 **Markdown!** 语法的网页PPT，当前版本：1.2.5

Github：https://github.com/ksky521/nodePPT
