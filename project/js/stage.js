var miaov = {};

miaov.timeInit = null;
miaov.currentState = "scene1";
miaov.timeScroll = null;

miaov.init = function (){

	miaov.configTimeInit();
	miaov.timeInit.play();

	scene2.init();
	scene3.init();

	jQuery("body").height(8500);
	
	miaov.configTimeScroll();

	miaov.events();
};
$(document).ready( miaov.init );

//配置全部动画
miaov.configTimeScroll = function (){
	$(".m_content").height($(window).height());
	$(".m_content:not(':first')").css("top",$(window).height());

	var time = (miaov.timeScroll) ? miaov.timeScroll.time() : 0;

	if(miaov.timeScroll) miaov.timeScroll.clear();
    miaov.timeScroll = new TimelineMax();
        miaov.timeScroll.add("scene1");

    miaov.timeScroll.to(".main .twoContent",0.8,{top:0,ease:Cubic.easeInOut });
    miaov.timeScroll.to({ban:0},0.1, {ban:1, onReverseComplete:function(){ menu.changeMenu('state1'); } , onComplete:function(){ menu.changeMenu('state2'); } }, "-=0.2");

    	miaov.timeScroll.add("scene2");
   //miaov.timeScroll.to({ban:0},0.1, {ban:1, onReverseComplete:function(){ menu.changeMenu('state2'); } , onComplete:function(){ menu.changeMenu('state3'); } }, "-=0.2");
	miaov.timeScroll.to({space:0}, 0.21, {space:1, ease:Cubic.easeInOut, onReverseComplete:function(){ scene2.timeline.tweenTo('state1') }, onComplete:function(){ scene2.timeline.tweenTo('point1'); } });
    miaov.timeScroll.add(function(){ scene2.timeline.tweenTo('point1'); }, "-=0.1" );
    	miaov.timeScroll.add("point1");
    miaov.timeScroll.to({space:0}, 0.21, {space:1, ease:Cubic.easeInOut, onReverseComplete:function(){ scene2.timeline.tweenTo('point1') }, onComplete:function(){ scene2.timeline.tweenTo('point2'); } });
    miaov.timeScroll.add(function(){ scene2.timeline.tweenTo('point2'); }, "-=0.1" );
    	miaov.timeScroll.add("point2");
    miaov.timeScroll.to({space:0}, 0.21, {space:1, ease:Cubic.easeInOut, onReverseComplete:function(){ scene2.timeline.tweenTo('point2') }, onComplete:function(){ scene2.timeline.tweenTo('point3'); } });
    miaov.timeScroll.add(function(){ scene2.timeline.tweenTo('point3'); }, "-=0.1" );
    	miaov.timeScroll.add("point3");
    miaov.timeScroll.to(".main .threeContent",0.8,{top:0,ease:Cubic.easeInOut });
	miaov.timeScroll.add("scene3");
	miaov.timeScroll.to({ban:0},0.1, {ban:1, onReverseComplete:function(){ menu.changeMenu('state2'); } , onComplete:function(){ menu.changeMenu('state3'); } }, "-=0.2");
		miaov.timeScroll.add("scene3_1");
	miaov.timeScroll.to({space:0}, 0.1, {space:1, ease:Linear.easeNone, onReverseComplete:function(){ scene3.timeline.tweenTo('state1') }, onComplete:function(){ scene3.timeline.tweenTo('state2') } });
	miaov.timeScroll.to({space:0}, 0.1, {space:1, ease:Linear.easeNone });
		miaov.timeScroll.add("scene3_2");
    	
    miaov.timeScroll.to(".main .fourContent",0.8,{top:0,ease:Cubic.easeInOut });
    	miaov.timeScroll.add("scene4");

    miaov.timeScroll.stop();

    try{ miaov.timeScroll.seek(time); }catch(err){};


};
miaov.gotoLabel = function (label){
	var scroll = miaov.timeScroll.getLabelTime(label)/ miaov.timeScroll.totalDuration();
	var duration = Math.abs(  miaov.timeScroll.time() - miaov.timeScroll.getLabelTime(label) );
	var positionY = (jQuery("body").height()-jQuery(window).height())*scroll;

	TweenMax.to("html body", duration, { scrollTop:positionY, ease:"linear"} );
	
	miaov.currentState = label;	
};

//首屏初始动画
miaov.configTimeInit = function (){
	miaov.timeInit = new TimelineMax({delay:0.5});

	miaov.timeInit.to( ".main",0.5,{opacity: 1},"-=0.2" );

	miaov.timeInit.to(".menu",0.4,{opacity: 1});

	miaov.timeInit.to(".menu",0.5,{left: 22,ease:Cubic.easeOut},"-=0.3");

	miaov.timeInit.to(".nav-ul",0.5,{opacity: 1});

	miaov.timeInit.to(".m_log",0.5,{opacity: 1});

	//miaov.timeInit.to(".m-ft-middle img", 0, {opacity: 1 });

	miaov.timeInit.staggerTo(".m-ft-middle img", 1.7, {opacity:1,rotationX:0,ease:Elastic.easeOut },0.2);
	miaov.timeInit.to(".m_l_ligth",0.7,{rotationX:0,ease:Cubic.easeOut},"-=1.7");
	miaov.timeInit.to(".m_r_ligth",0.7,{rotationX:0,ease:Cubic.easeOut},"-=1.7");
	miaov.timeInit.to("body", 0, { overflowY:"scroll" }, "-=0.5")
	miaov.timeInit.to(".scroll",0.5,{opacity: 1,bottom:20},"-=0.5");
	miaov.timeInit.stop();
};

miaov.events = function (){
	$(window).resize( miaov.resize );

	$(".main").bind("mousewheel",function (ev){ ev.preventDefault() });
	$(".main").one("mousewheel",onMouseWheel);
    $(window).scroll(miaov.scrollStatus);

    $(window).bind("scroll",function (){
		$(window).unbind("mouseup").one('mouseup',function(ev) {
			var scroll = miaov.sacle();
			var current_time = scroll * miaov.timeScroll.totalDuration();
			var prev_label = miaov.timeScroll.getLabelBefore( current_time );
			
				if(!prev_label) prev_label = "scene1";
			var next_label = miaov.timeScroll.getLabelAfter( current_time );
            	if(next_label == null) next_label = "scene4";

            	var prev_label_time = Math.abs(miaov.timeScroll.getLabelTime(miaov.timeScroll.getLabelBefore( current_time )) - current_time);
                var next_label_time = Math.abs(miaov.timeScroll.getLabelTime(miaov.timeScroll.getLabelAfter( current_time )) - current_time);
                if(scroll == 0){
                    miaov.currentState = "scene1";
                    miaov.gotoLabel(miaov.currentState);
                }else if(scroll == 1){
                    miaov.currentState = "scene4";
                    miaov.gotoLabel(miaov.currentState);
                }else if(prev_label_time < next_label_time){
                    miaov.gotoLabel(prev_label);
                    miaov.currentState = prev_label;
                }else{
                    miaov.gotoLabel(next_label);
                    miaov.currentState = next_label;
                };

		});	
    })

	function onMouseWheel(ev,direction){
		if( direction >= 1 ){
			miaov.changeState("prev");
		}else{
			miaov.changeState("next");
		};

		TweenMax.delayedCall( 1.2, function(){ $(window).one("mousewheel",onMouseWheel); } );
	}
};

miaov.changeState = function ( value ){
	if( value === "next" ){
		//向下

		var nextLabel = miaov.timeScroll.getLabelAfter(miaov.timeScroll.getLabelTime(miaov.currentState));
		if( !nextLabel ) return;
		var scroll = miaov.timeScroll.getLabelTime(nextLabel)/ miaov.timeScroll.totalDuration();
		var duration = Math.abs(  miaov.timeScroll.time() - miaov.timeScroll.getLabelTime(nextLabel) );
		var positionY = (jQuery("body").height()-jQuery(window).height())*scroll;
		console.log( duration ,positionY);
		TweenMax.to("html body", duration, { scrollTop:positionY, ease:"linear"} );
		
		miaov.currentState = nextLabel;


	}else{
		//向上
		var nextLabel = miaov.timeScroll.getLabelBefore(miaov.timeScroll.getLabelTime(miaov.currentState));
		if( !nextLabel ) return;
		var scroll = miaov.timeScroll.getLabelTime(nextLabel)/ miaov.timeScroll.totalDuration();
		var duration = Math.abs(  miaov.timeScroll.time() - miaov.timeScroll.getLabelTime(nextLabel) );
		var positionY = (jQuery("body").height()-jQuery(window).height())*scroll;

		TweenMax.to("html body", duration, { scrollTop:positionY, ease:"linear"} );
		
		miaov.currentState = nextLabel;
	}
};

miaov.scrollStatus = function (){
	//每次滚动的距离

	var times = miaov.sacle() * miaov.timeScroll.totalDuration();
	console.log(times);
	miaov.timeScroll.seek(times, false);//每一次改变时间到达的点
};

//滚动的比例

miaov.sacle = function (){
	var top = $(window).scrollTop();//滾動條滾動的
	var h = $(window).height();  //可視區域的高度
	var height = jQuery(document).height();
	var scale = top/(height - h);
	return scale;
};


miaov.resize = function (){
	miaov.configTimeScroll();	
};


//第二个动画队列

var scene2 = {}
scene2.timeline = new TimelineMax();

scene2.config = function (){


	scene2.timeline.to(".step2_1 img", 0.4, { alpha:1, rotationX:0, ease:Cubic.easeOut}, 0.1 );
	//scene2.timeline.staggerTo(".step2_1 img", 0.4, { alpha:1, rotationX:0, ease:Cubic.easeOut}, 0.1 );
	scene2.timeline.add("state1");
	scene2.timeline.staggerTo(".step2_1 img", 0.2, { alpha:0, rotationX:90, ease:Cubic.easeIn}, 0 );
	scene2.timeline.to(".step2_2 .left", 0, { alpha:0 }, "0");
    scene2.timeline.to(".step2_2 .right img", 0, {rotationX:-90, transformPerspective:600, transformOrigin:"center center" }, "0");
    scene2.timeline.to(".step2_2 .left", 0.4, { alpha:1 });
    scene2.timeline.staggerTo(".step2_2 .right img", 0.3, { alpha:1, rotationX:0, ease:Cubic.easeInOut}, 0, "-=0.4" );
	scene2.timeline.add("point1");

	scene2.timeline.staggerTo(".step2_2 .right img", 0.2, { alpha:0, rotationX:90, ease:Cubic.easeIn}, 0 );
   	scene2.timeline.to(".step2_2 .left", 0.2, { alpha:0, ease:Cubic.easeIn }, "-=0.2");

   	scene2.timeline.to(".step2_3 .left", 0.4, { alpha:1 } );
    scene2.timeline.staggerTo(".step2_3 .right img", 0.3, { alpha:1, rotationX:0, ease:Cubic.easeInOut}, 0, "-=0.4" );
    scene2.timeline.add("point2");
    scene2.timeline.staggerTo(".step2_3 .right img", 0.2, { alpha:0, rotationX:90, ease:Cubic.easeIn}, 0 );
   	scene2.timeline.to(".step2_3 .left", 0.2, { alpha:0, ease:Cubic.easeIn }, "-=0.2");

   	scene2.timeline.to(".step2_4 .left", 0.4, { alpha:1 } );
    scene2.timeline.staggerTo(".step2_4 .right img", 0.3, { alpha:1, rotationX:0, ease:Cubic.easeInOut}, 0, "-=0.4" );
    scene2.timeline.add("point3");

	scene2.timeline.stop();
};

scene2.init = function (){
	scene2.config();	
};

var scene3 = {}
scene3.timeline = new TimelineMax();

scene3.config = function (){

	scene3.timeline.to(".threeContent .step img", 0, {rotationX:-90, alpha:0, transformPerspective:600, transformOrigin:"center center" });
	scene3.timeline.to(".step3_2 img", 0, {y:50});
	// state1
	scene3.timeline.staggerTo(".step3_2 img", 0.4, { alpha:1, rotationX:0, y:0, ease:Cubic.easeInOut}, 0.1 );
	scene3.timeline.add("state1");
	// state2
	scene3.timeline.to(".step3_1 img", 0.3, { alpha:0, rotationX:90, ease:Cubic.easeIn});
	scene3.timeline.to(".step3_2 img", 0.3, { alpha:1, rotationX:0, ease:Cubic.easeInOut});
	scene3.timeline.add("state2");
	scene3.timeline.stop();
};

scene3.init = function (){
	scene3.config();	
};



var menu = {};

menu.changeMenu = function (state){
	var item_to_remove =  $(".menu");
	var item = $(item_to_remove).clone();
	    $(item).removeClass("state1").removeClass("state2").removeClass("state3");
	    $(item).addClass(state);

	    $(".menu_wrapper").append(item);
        $(item_to_remove).addClass("remove_menu");
          var timeline = new TimelineMax({onComplete:function(){ $(".remove_menu").remove(); } });
            timeline.to(item, 0, {top:100, y:0});
            timeline.to($(item_to_remove), 0, {rotationX:0, y:0, top:22, transformPerspective:600, transformOrigin:"center bottom" } );
            timeline.to($(item), 0, {rotationX:-90, transformPerspective:600, transformOrigin:"top center" } );
            timeline.to(item_to_remove, 0.3, {alpha:1, rotationX:90, y:-jQuery(item_to_remove).height(),  ease:Cubic.easeInOut } )
            timeline.to(item, 0.3, {rotationX:0, y:-jQuery(item_to_remove).height(), ease:Cubic.easeInOut }, "-=0.3" );
            //timeline.stop();
};