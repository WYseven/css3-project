Stage = {}
Stage.content;
Stage.language;
Stage.currentLanguage;
Stage.path_array;
Stage.transform_path;
Stage.timeScroll = null;
Stage.timeInit = null;
Stage.currentState = "scene1";
//++ Init
    Stage.loader1;
    Stage.loader2;
    Stage.init = function(){
        //FB.init({appId:'208362949363176', status:true, xfbml:true});
        //++ Responsive classes
            cuppa.addResponsiveClass("r400", 0, 400, 1);
            cuppa.addResponsiveClass("r650", 0, 650, 2);
            cuppa.addResponsiveClass("r780", 0, 780, 3);
            cuppa.addResponsiveClass("r950", 0, 950, 4);
            cuppa.addResponsiveClass("r1100", 0, 1100, 5);
        //--
        //++ init config 
            jQuery("body").height(8500);
            cuppa.moveContent("body","", false, true, 0, 0, 0.1);
            Stage.configTimeInit();
        //--
        //++ load content
            TweenMax.to(".loader", 0.4, {display:"block", alpha:1});
            Stage.loader1 = new cuppa.spriteSheetAnimation( {target:".loader .loader1", fps:30, frames:50, columns:8, play:false} )
            Stage.loader2 = new cuppa.spriteSheetAnimation( {target:".loader .loader2", fps:30, frames:28, columns:6} )
            cuppa.addEventListener("progress", Stage.progress, ".wrapper");
            cuppa.addEventListener("complete", Stage.complete, ".wrapper");
            cuppa.loader(0.5, ".wrapper", 10);
        //--
    }; jQuery(document).ready(Stage.init);
//--
//++ Progress / Complete
    Stage.progress = function(e, p, t){
        var position = Math.round( (p/t)*50 );
        Stage.loader1.gotoAndStop(position);
    }
    Stage.complete = function(e){
        cuppa.removeEventListener("complete", Stage.complete, ".wrapper");
        TweenMax.to(".loader", 0.4, {display:"none", alpha:0, onComplete:function(){ $(".loader").remove(); } });
        Stage.configTimeScroll();
        Stage.timeInit.play();
        jQuery(window).scroll(Stage.scrollStatus);
        jQuery(window).resize(Stage.onSize);
        Stage.configEvents();
        Stage.onSize();
        TweenMax.delayedCall(0.2, Stage.resetScrolls);
    }
//--
//++ Reset scrolls
    Stage.resetScrolls = function(){
        cuppa.moveContent("body","body", false, true, 0, 0, 0);
        cuppa.moveContent(".wrapper", ".wrapper", false, true, 0, 0);
        cuppa.moveContent(".instructions",".instructions", false, true, 0, 0, 0);
    }
//--
//++ Events
    Stage.configEvents = function(){
        /* keyboard */
            $(document).bind("keydown", function(e){
                if(e.keyCode == 40){
                    e.preventDefault();
                    Stage.changeState("next");
                }else if(e.keyCode == 38){
                    e.preventDefault();
                    Stage.changeState("prev");
                }
            });
        /* swipe */
            $(".wrapper").swipe({ 
                swipeUp:function(event, direction, distance, duration, fingerCount) {
                  Stage.changeState("next");
                },
                swipeDown:function(event, direction, distance, duration, fingerCount) {
                  Stage.changeState("prev");
                }, threshold:0, excludedElements:".scene2 .points .point, .scene4 .button1, .scene4 .button2"
            });
        /* mousewheel */
            $(".wrapper").bind("mousewheel",function(e){ e.preventDefault(); });
            $(".wrapper").one("mousewheel",onMouseWheel);
            function onMouseWheel(e, direction){
                if(direction >= 1){
                    Stage.changeState("prev");
                }else{
                    Stage.changeState("next");
                }
                TweenMax.delayedCall( 1.2, function(){ $(window).one("mousewheel",onMouseWheel); } );
            }
        /* scroll */
            $(window).bind("scroll", function(){
                $(window).unbind("mouseup").one('mouseup',function(ev) { 
                    var scroll = cuppa.statusScrollPorcent().y;
                    var current_time = cuppa.statusScrollPorcent().y*Stage.timeScroll.totalDuration();
                    var prev_label = Stage.timeScroll.getLabelBefore( current_time );
                        if(prev_label == null) prev_label = "scene1";
                    var next_label = Stage.timeScroll.getLabelAfter( current_time );
                        if(next_label == null) next_label = "footer";
                    var prev_label_time = Math.abs(Stage.timeScroll.getLabelTime(Stage.timeScroll.getLabelBefore( current_time )) - current_time);
                    var next_label_time = Math.abs(Stage.timeScroll.getLabelTime(Stage.timeScroll.getLabelAfter( current_time )) - current_time);

                    if(scroll == 0){
                        Stage.currentState = "scene1";
                        Stage.gotoLabel(Stage.currentState);
                    }else if(scroll == 1){
                        Stage.currentState = "footer";
                        Stage.gotoLabel(Stage.currentState);
                    }else if(prev_label_time < next_label_time){
                        Stage.gotoLabel(prev_label);
                        Stage.currentState = prev_label;
                    }else{
                        Stage.gotoLabel(next_label);
                        Stage.currentState = next_label;
                    };
                });
            });
    }
//--
//++ goToLabel
    Stage.gotoLabel = function(label){
        var scroll = Stage.timeScroll.getLabelTime(label)/ Stage.timeScroll.totalDuration();
        var duration = Math.abs(  Stage.timeScroll.time() - Stage.timeScroll.getLabelTime(label) );
            cuppa.moveContent("body","body", false, true, 0, scroll, duration, Linear.easeNone, true);
        Stage.currentState = label;
    }
//--
//++ Change state, value: next, prev
    Stage.changeState = function(value){
        if(value == "next"){
            //console.log("current: " + Stage.currentState)
            var nextLabel = Stage.timeScroll.getLabelAfter( Stage.timeScroll.getLabelTime(Stage.currentState) );
            if(!nextLabel){ return; }  
            //console.log("next: " + nextLabel)
            var scroll = Stage.timeScroll.getLabelTime(nextLabel)/ Stage.timeScroll.totalDuration();
            var duration = Math.abs(  Stage.timeScroll.time() - Stage.timeScroll.getLabelTime(nextLabel) );
            cuppa.moveContent("body","body", false, true, 0, scroll, duration, Linear.easeNone, true);
            Stage.currentState = nextLabel;
        }else if(value == "prev"){
            //console.log("current: " + Stage.currentState)
            var currentLabel = Stage.currentState;
            var nextLabel = Stage.timeScroll.getLabelBefore( Stage.timeScroll.getLabelTime(Stage.currentState) );
            if(!nextLabel){ return; }  
            //console.log("next: " + nextLabel)
            var scroll = Stage.timeScroll.getLabelTime(nextLabel)/ Stage.timeScroll.totalDuration();
            var duration = Math.abs(  Stage.timeScroll.time() - Stage.timeScroll.getLabelTime(nextLabel) );
            cuppa.moveContent("body","body", false, true, 0, scroll, duration, Linear.easeNone, true);
            Stage.currentState = nextLabel;
        }
    }
//--
//++ config timelines
    Stage.configTimeScroll = function(){
        $(".scene").height($(window).height());
        var time = (Stage.timeScroll) ? Stage.timeScroll.time() : 0;
        cuppa.moveContent(".wrapper", ".wrapper", false, true, 0, 0);
        if(Stage.timeScroll) Stage.timeScroll.clear();
        Stage.timeScroll = new TimelineMax();1
            Stage.timeScroll.add("scene1");
        Stage.timeScroll.to(".scene1", 0, {top:0, position:"absolute", left:0, right:0, height: $(window).height() });
        Stage.timeScroll.to(".scene2, .scene3, .instructions, .scene4", 0, {position:"absolute", right:0,top:$(window).height(), left:0, height: $(window).height() } );
        Stage.timeScroll.to(".footer", 0, {top:"100%" });
        Stage.timeScroll.to(".instructions", 0, {scrollTop:0} );
        Stage.timeScroll.to(".menu_wrapper", 0, {top:0});
        //++ Add tweens
            Stage.timeScroll.to(".scene2", 0.8, {top:0, ease:Cubic.easeInOut });
            Stage.timeScroll.to({ban:0},0.1, {ban:1, onReverseComplete:function(){ menu.changeMenu('state1'); } , onComplete:function(){ menu.changeMenu('state2'); } }, "-=0.2");
                Stage.timeScroll.add("scene2");
                
            Stage.timeScroll.to({space:0}, 0.21, {space:1, ease:Cubic.easeInOut, onReverseComplete:function(){ scene2.timeline.tweenTo('state1') }, onComplete:function(){ scene2.timeline.tweenTo('point1'); } });
                Stage.timeScroll.add(function(){ scene2.timeline.tweenTo('point1'); }, "-=0.1" );
                Stage.timeScroll.add("point1");
                Stage.timeScroll.add(function(){ scene2.timeline.tweenTo('point1'); }, "+=0.1" );
            Stage.timeScroll.to({space:0}, 0.21, {space:1, ease:Cubic.easeInOut, onReverseComplete:function(){ scene2.timeline.tweenTo('point1') }, onComplete:function(){ scene2.timeline.tweenTo('point2') } });
                Stage.timeScroll.add(function(){ scene2.timeline.tweenTo('point2'); }, "-=0.1" );
                Stage.timeScroll.add("point2");
                Stage.timeScroll.add(function(){ scene2.timeline.tweenTo('point2'); }, "+=0.1" );
            Stage.timeScroll.to({space:0}, 0.21, {space:1, ease:Cubic.easeInOut, onReverseComplete:function(){ scene2.timeline.tweenTo('point2') }, onComplete:function(){ scene2.timeline.tweenTo('point3') } });
                Stage.timeScroll.add(function(){ scene2.timeline.tweenTo('point3'); }, "-=0.1" );
                Stage.timeScroll.add("point3");
                Stage.timeScroll.add(function(){ scene2.timeline.tweenTo('point3'); }, "+=0.1" );
            Stage.timeScroll.to(".scene3", 0.8, {top:0, ease:Cubic.easeInOut });
            Stage.timeScroll.to({ban:0},0.1, {ban:1, onReverseComplete:function(){ menu.changeMenu('state2'); } , onComplete:function(){ menu.changeMenu('state3'); } }, "-=0.2");
                Stage.timeScroll.add("scene3_1");
            Stage.timeScroll.to({space:0}, 0.1, {space:1, ease:Linear.easeNone, onReverseComplete:function(){ scene3.timeline.tweenTo('state1') }, onComplete:function(){ scene3.timeline.tweenTo('state2') } });
            Stage.timeScroll.to({space:0}, 0.1, {space:1, ease:Linear.easeNone });
                Stage.timeScroll.add("scene3_2");
            Stage.timeScroll.to(".instructions", 0.8, {top:0, ease:Cubic.easeInOut });
                Stage.timeScroll.add("instructions");
            Stage.timeScroll.to(".scene4", 0.8, {top:0, ease:Cubic.easeInOut });
            Stage.timeScroll.to(".instructions", 0.8, {top:-$(window).height(), ease:Cubic.easeInOut}, "=-0.8");
            Stage.timeScroll.to(".menu_wrapper", 0.4, {top:-110, ease:Cubic.easeIn}, "=-0.8");
                Stage.timeScroll.add("scene4");
            Stage.timeScroll.to(".scene4", 0.5, {top:-$(".footer").outerHeight(), ease:Linear.easeNone });
            Stage.timeScroll.to(".footer", 0.5, {top:$(window).height() - $(".footer").outerHeight(), ease:Linear.easeNone }, "-=0.5");
                Stage.timeScroll.add("footer");
        //--
        Stage.timeScroll.stop();
        try{ Stage.timeScroll.seek(time); }catch(err){}
    }
    Stage.configTimeInit = function(){
        Stage.timeInit = new TimelineMax({delay:0.5});
        Stage.timeInit.to(".wrapper",0, {opacity:0});
        Stage.timeInit.to(".menu .buttons", 0, {alpha:0, display:"none"});
        Stage.timeInit.to(".menu .line", 0, {alpha:0});
        Stage.timeInit.to(".menu", 0, {alpha:0, overflow:"hidden", left:$(window).width() });
        
        Stage.timeInit.to(".scene1 .stethoscope_left", 0, {rotation:-90,  top:"50%", transformPerspective:600, transformOrigin:"bottom right" });
        Stage.timeInit.to(".scene1 .stethoscope_right", 0, {rotation:90,  top:"50%", transformPerspective:600, transformOrigin:"bottom left" });
        Stage.timeInit.to(".scene1 .logo", 0, {alpha:0 });
        Stage.timeInit.to(".scene1 .texts img", 0, {rotationX:-90, transformPerspective:600, transformOrigin:"center center" });
        Stage.timeInit.to(".scene1 .controls", 0, {alpha:0, bottom:-40});
        
        Stage.timeInit.to(".wrapper",0.6, {opacity:1});
        Stage.timeInit.to(".menu", 0.7, { alpha:1, left:20, ease:Cubic.easeOut});
        Stage.timeInit.to(".menu", 0, { overflow:"visible" });
        Stage.timeInit.to(".menu .buttons", 0.6, { alpha:1, display:"block", ease:Cubic.easeOut});    
        
        Stage.timeInit.to(".scene1 .logo", 0.6, {alpha:1, ease:Cubic.easeOut }, "-=0.5");
        Stage.timeInit.staggerTo(".scene1 .texts img", 1.7, { rotationX:0, ease:Elastic.easeOut}, 0.2 );
        Stage.timeInit.to(".scene1 .stethoscope_left", 0.7, {rotation:0,  top:"50%", ease:Cubic.easeOut}, "-=1.7");
        Stage.timeInit.to(".scene1 .stethoscope_right", 0.7, {rotation:0,  top:"50%", ease:Cubic.easeOut}, "-=1.7");
        Stage.timeInit.to("body", 0, { overflowY:"scroll" }, "-=0.5")
        Stage.timeInit.to(".scene1 .controls", 0.6, {alpha:1, bottom:20, ease:Cubic.easeOut }, "-=0.5");
        Stage.timeInit.stop();
    }
//++ ScrollStatus
    Stage.scrollStatus = function(e){       
        var position = cuppa.statusScrollPorcent().y * Stage.timeScroll.totalDuration(); 
        Stage.timeScroll.seek(position, false);
    }
//--
//++ onSize
    Stage.onSize = function(e){
        Stage.configTimeScroll();
        if($(window).width() < 780){
            $(document).unbind("keydown");
            $(".wrapper").unbind("mousewheel");
            $(window).unbind("scroll");
            $(".wrapper").swipe("disable");
           
        }
    }
//--