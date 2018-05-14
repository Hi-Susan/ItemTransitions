## Item Transition Inspiration with jQuery (RWD)
![ItemTransitions](images/ItemTransitions-RWD.jpeg)
### 響應式多種輪播轉場動畫效果
因為工作需要，最近在研究各種的slideshow，意外找到[Mary Lou](https://tympanus.net/codrops/author/crnacura/)的作品 [Inspiration for item transitions](https://tympanus.net/codrops/2014/03/18/inspiration-for-item-transitions/)。她使用 CSS Animations製作出各種轉場動畫。效果真的不錯，可是在運用上卻不好套使。

搜尋了相關文件，沒想到有一位工程師Ernest Marcinko將他改寫成jQuery插件，[Item Transition Inspiration with jQuery](https://wp-dreams.com/articles/2014/03/item-transition-inspiration-with-jquery/)。

真的是幫我了一個大忙阿!!

不過問題來了，他改寫的插件，並沒有針對RWD做設定，也不會自動播放，而且我想要製作成，可以隨機呈現不同的轉場效果。

以下是我改寫的研究過程

___

### Full Width

首先，到Ernest Marcinko所做的[Item Transition Inspiration with jQuery](https://wp-dreams.com/articles/2014/03/item-transition-inspiration-with-jquery/)，下載檔案

因為只需要Full Width的部分，link 以下檔案即可

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- slides -->
<link rel="stylesheet" type="text/css" href="css/normalize.css" />
<link rel="stylesheet" type="text/css" href="css/component.css" />
<link rel="stylesheet" type="text/css" href="css/fxfullwidth.css" />

<script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
<script type="text/javascript" src="js/jquery.itemtransitions.js"></script>
```


#### HTML基本架構

```html
<section id='itemtransitions_1'>
    <div class="component component-fullwidth">
        <ul class="itemwrap">
            <li class="current">
                <img src="images/BannerDemo.jpg" alt="">
            </li>
            <li>
                <img src="images/BannerDemo2.jpg" alt="">
            </li>
            <li>
                <img src="images/BannerDemo3.jpg" alt="">
            </li>
            <li>
                <img src="images/BannerDemo4.jpg" alt="">
            </li>
            <li>
                <img src="images/BannerDemo7.jpg" alt="">
            </li>
        </ul>
        <nav class="carousel-control">
            <a class="prev" href="#"></a>
            <a class="next" href="#"></a>
        </nav>
    </div>
</section>
<select name="fxselect" class="hidden" id="animation_select">
    <option value=""></option>
</select>
```


#### component.css(改寫後內容)

```css
.component {
	margin: 0 auto;
	position: relative;
	margin-bottom: 40px;
	max-width: 100%;
}
.component-fullwidth {
	margin-bottom: 0;
	background: #333;
}
.component>ul,
.component>div {
	position: relative;
	list-style: none;
	padding: 0;
	margin: 0 auto;
	
}
.component-fullwidth>ul {
	overflow: hidden;
	padding: 21.9%; /* 配合圖片尺寸大小做調整 */
}
.component li,
.component>div>div {
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	opacity: 0;
	z-index: 99;
	overflow: hidden;
	background: #0E0E0E;
}
.component-fullwidth li {
	overflow: hidden;
	width: 100%;
}
.component .current {
	opacity: 1;
	pointer-events: auto;
	z-index: 100;
}
.component li img .component>div>div img {
	display: block;
}
.component-fullwidth li img {
	width: 100%;
}
.component nav a {
	position: absolute;
	width: 60px;
	height: 60px;
	color: #E2E2E2;
	outline: none;
	overflow: hidden;
	text-align: center;
	line-height: 200px;
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
.carousel-control{
	width: 100%;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 100;
}
.component-fullwidth nav a.prev {
	left: 3%;
}
.component-fullwidth nav a.next {
	right: 3%;
}
.component nav a::before {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	line-height: 60px;
	height: 100%;
	font-family: 'fontawesome';
	font-size: 60px;
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	opacity: 0.5;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.component nav a:hover::before {
	opacity: 1;
}
a.prev::before {
	content: "\f104";
}
a.next::before {
	content: "\f105";
}
.hidden {
    display: none;
}
```

#### JavaScript
```javascript
<script>
    $('#itemtransitions_1').itemtransitions({
        animation: 'fxSoftScale',
        selectName: 'fxselect',
    });
    $('.carousel-control').on('click', function (e) {
        var animations = ['fxSoftScale', 'fxPressAway', 'fxSideSwing', 'fxFortuneWheel', 'fxPushReveal', 'fxSnapIn', 'fxLetMeIn', 'fxStickIt', 'fxArchiveMe', 'fxVGrowth', 'fxSlideBehind', 'fxSoftPulse', 'fxEarthquake', 'fxCliffDiving'];
        var animationRand = Math.floor(Math.random() * animations.length);
        var animationResult = animations[animationRand];
        $('#animation_select > option').attr('value', animationResult);
    });
    setInterval(
        function () {
            $('nav > .next').click();
        }, 5000);
</script>
```

### 改寫過程解說

#### RWD設定
大概解釋一下他原本的原理。為了配合用CSS Animations，他是多層次絕對定位所組成。所以無法用最內層的img由內向外將元素自由撐開。

當img設定width: 100%，可以隨著螢幕做伸縮，可是外層元素卻是固定高度的狀態。

所以我將高度改成由padding: ...%; 去做支撐。

當你放好圖片(圖片請統一大小)，再微調component.css 中，我有註解的padding: …%;設定就可以了。

___

#### 隨機呈現不同的轉場效果
看過Item Transition Inspiration with jQuery，就會知道他是以選單做切換動畫效果。他會優先抓取選單的值，去改變class名稱

所以我將空白選單放入html將他隱藏，在用陣列，將想要執行的動畫名稱寫入，隨機抽取1值，將值導入到選單value，讓他執行切換的動作。

___

#### 自動輪播
自動輪播就簡單拉，運用setInterval，設定週期時間，讓他自動點擊next按鈕

[實際演示效果](https://hi-susan.github.io/ItemTransitions-RWD/)