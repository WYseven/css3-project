//初始化每一块的高度
function initContentH(mianContent){
	for( var i = 0; i < mianContent.length; i++ ){
		mianContent[i].style.height = view().H + "px";
	};
};

function nav_animation(){

	var oMenu = $(".menu")[0],
		navUl = $(".nav-ul")[0];	

	oMenu.style.left = "22px";
	//导航栏宽度过度动画 完成后
	addTransitionEnd(oMenu,function (ev){
		oMenu.style.webkitTransition = "0s";
		navUl.style.opacity = 1;
	});
	addTransitionEnd(navUl,function (ev){
		ft();
	});
};

function ft(){
	$(".menu")[0].style.webkitTransition = "0s";
	$(".menu")[0].style.left = "22px";
	var m_log = $(".m_log")[0];
	m_log.style.opacity = 1;
	addTransitionEnd(m_log,function (ev){
		tab();
	});

	//左侧导航

	addEvent($(".nav_menu")[0],"click", function (){
		$(".left_nav")[0].style.left = "0px";	
	});

	addEvent($(".l_close")[0],"click", function (){
		$(".left_nav")[0].style.left = "-300px";		
	})

};
//第一屏的图片翻转效果
function tab(){
	var middleImg = $("img",$(".m-ft-middle")[0]);
	for( var j = 0; j < middleImg.length; j++ ){
		middleImg[j].style.opacity = 1;
		middleImg[j].style.webkitTransform = "rotateX(0deg)";
	};
	addTransitionEnd(middleImg[2],function (){
		//两盏路灯动画
		var str_lingth = $(".str_lingth");
		str_lingth[0].style.webkitTransform = "rotate(0deg)";
		str_lingth[1].style.webkitTransform = "rotate(0deg)";	
	});
	addTransitionEnd($(".str_lingth")[1],function (){
		//Scroll Down 动画
		var str_lingth = $(".scroll")[0];
		str_lingth.style.bottom = "20px";	
		str_lingth.style.opacity = "1";
	});
}

function ft_animation(){

	var mianContent = $(".m_content");
	//初始块的高度
	initContentH(mianContent);

	var firstContent = $(".firstContent")[0];

	setTimeout(function (){
		firstContent.style.opacity = 1;		
	},300);

	addTransitionEnd(firstContent,function (ev){
		$(".menu")[0].style.opacity = 1;
		//取消掉第一块元素的过渡效果
		firstContent.style.webkitTransition = "0s";
		addTransitionEnd($(".menu")[0],function (ev){
			//当菜单栏出现后，如果小于950，那么直接进行第一屏的动画，
			//如果大于950，先进行菜单动画，然后进行第一屏的动画
			isLess950() ? ft() : nav_animation();
			
		});
	});
	window.onresize = function (){
		initContentH(mianContent);
		if( isLess950() ){
			document.body.className = "r950";
			//启动小于950的函数
		}else{
			//启动大于950的函数
			document.body.className = "l950";
		};	
	};
}

