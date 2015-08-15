// Ajax method: jQuery.ajax({url:"class.php", type:"POST", data:"function=Name_Function", success:Ajax_Result});
// Load alert: cuppa.setContent({url:"js/cuppa/html/alert.php", name:"alert", preload:false, data:{title:"Title", message:"Message"}, duration:0.3, executeFunction:"cuppa_alert.resize"});
// init
    var cuppa = {debug:false};
    try{ cuppa.script_path = document.currentScript.src.replace("cuppa.js", ""); }catch(err ){};
/* merge, create a new obj with the values of objs in Array.
    If create_new_object = true, create a new Oject an Add all element to it, else join to the first object all elements
    By default create_new_object = false
*/
    cuppa.mergeObjects = function(array_objs, create_new_object){
        if(!create_new_object){
            var obj1 = array_objs.shift();
            for(var i = 0; i < array_objs.length; i++){
                var obj = array_objs[i];
                for (var attrname in obj) { obj1[attrname] =  obj[attrname]; }
            }
            return obj1;
        }else{
            var tmp_obj = {};
            for(var i = 0; i < array_objs.length; i++){
                var obj = array_objs[i];
                for (var attrname in obj) { tmp_obj[attrname] = obj[attrname]; }
            }
            return tmp_obj;
        }
    };
// require
    cuppa.require = function(filename, is_css){
        if(is_css) document.write('<link href="'+filename+'" rel="stylesheet" type="text/css" />');
        else document.write('<script src="'+filename+'" type="text/javascript" ></script>');
    };
// include
    cuppa.include = function(filename){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
            script.src = filename;
            script.type = 'text/javascript';
            head.appendChild(script);
    };
// setContent
    cuppa.setContent = function (data){
        if(data == undefined) data = {};
        if(data.load == undefined) data.load = true;
        if(data.name == undefined && data.load) data.name = "new_content";
        if(data.name == undefined && !data.load) data.name = "#new_content";
        if(data.data == undefined) data.data = {};
        if(data.duration == undefined) data.duration = 0;
        if(data.delay == undefined) data.delay = 0;
        if(data.preload == undefined) data.preload = true;
        if(data.append == undefined) data.append = true;
        if(data.ease == undefined) data.ease = Cubic.easeOut;
        if(data.display == undefined) data.display = "block";                
        if(data.executeFunction == undefined) data.executeFunction = null;  // string: function1 or function1,function2,etc
        if(data.uniqueClass == undefined) data.uniqueClass = data.name+"_"+Math.ceil(Math.random()*9999999);
        if(data.personalClass == undefined) data.personalClass = "";
        if(data.returnUniqueClass == undefined) data.returnUniqueClass = false;
        if(data.finishDelay == undefined) data.finishDelay = 0.2;
        if(data.auto_check_time == undefined) data.auto_check_time = 0; 
        data.data.uniqueClass = data.uniqueClass;
        /* Other Params:
            - beforeOf:"objectName"
            - afterOf:"objectName"
            - insideOf:"objectName"
            - prepend:"objectName"
        */
		if(data.load){
            if(data.url == undefined) return;
            var objContent = document.createElement('div');
                jQuery(objContent).attr("id", data.name);
                jQuery(objContent).addClass(data.name);
                jQuery(objContent).addClass(data.uniqueClass);
                jQuery(objContent).addClass(data.personalClass);
                jQuery(objContent).css('opacity', 0);
                jQuery(objContent).css('display', 'none');
                if(data.zIndex) jQuery(objContent).css('z-index', data.zIndex);
            var loadObject = {};
                loadObject.type = "POST";
                loadObject.url = data.url;
                loadObject.data = data.data;
                loadObject.success = function(result){
                    jQuery(objContent).append(result);
                    if(data.preload){
                        jQuery(objContent).bind("complete", function(){
                                                                        jQuery(objContent).unbind("complete");
                                                                        jQuery(objContent).css('opacity', 0);
                                                                        if(data.position) jQuery(objContent).css("position", data.position);
                                                                        jQuery(objContent).css('display', data.display);
                                                                        TweenMax.to(objContent, data.duration, {delay:data.delay, alpha:1, ease:data.ease, onComplete:Execute_function});
                                                                    });
                        cuppa.loader(data.finishDelay, objContent, data.auto_check_time);
                    }else{
                        jQuery(objContent).trigger("complete");
                        jQuery(objContent).css('opacity', 0);
                        if(data.position) jQuery(objContent).css("position", data.position);
                        TweenMax.to(objContent, data.duration, {delay:data.delay, alpha:1, ease:data.ease});
                        jQuery(objContent).css('display', data.display);
                        Execute_function();
                    }
                };
                //++ Load
                    objContent.ajax = jQuery.ajax(loadObject);
                //--
                //++ Add content to the scene
                    function tu_ShowContent(){      
                        if(data.insideOf){
        					if(data.append) jQuery(data.insideOf).append(objContent);
        					else jQuery(data.insideOf).html(objContent);
                            var content_height = jQuery(objContent).css("height");
                            jQuery(objContent).css("height", "0px");
                            jQuery(objContent).delay(data.delay).animate({height:content_height}, data.duration, data.ease);
        				}else if(data.beforeOf){
                            jQuery(objContent).insertBefore(jQuery(data.beforeOf));
                            var content_height = jQuery(objContent).css("height");
        					jQuery(objContent).css("height", "0px");
        					jQuery(objContent).delay(data.delay).animate({height:content_height}, data.duration, data.ease);
        				}else if(data.afterOf){
                            jQuery(objContent).insertAfter(jQuery(data.afterOf));
                            var content_height = jQuery(objContent).css("height");
        					jQuery(objContent).css("height", "0px");
        					jQuery(objContent).delay(data.delay).animate({height:content_height}, data.duration, data.ease);
        				}else if(data.prepend){
        				    jQuery(data.prepend).prepend(objContent);
        				}else{
                            jQuery("body").append(objContent);
        				}                    
                    }
                    tu_ShowContent();
                //--
                //++ Execute Function when all content is load
                    function Execute_function(){
                        if(!data.executeFunction) return;
                        data.executeFunction = data.executeFunction.split(",");
                        for(var i in data.executeFunction){ try{ eval( data.executeFunction[i]+"('"+data.uniqueClass+"')"); }catch(err){} }
                    }
                //--
            if(data.returnUniqueClass) return {'object':objContent, 'class':data.uniqueClass};
            else return objContent;
		}else{
            var contentToRemove = jQuery(data.name);
			try{ 
			     TweenMax.to(contentToRemove, data.duration, {delay:data.delay, opacity:0, onComplete:function(){ jQuery(contentToRemove).remove(); jQuery("body").trigger("removed"); } })
            }catch(err){ }
			return null;
		}
	};
// preloadContent
    cuppa.preloadContent = function(data){
        if(data == undefined) data = {};
        if(data.load == undefined) data.load = true;
        if(data.name == undefined && data.load) data.name = "new_content";
        if(data.name == undefined && !data.load) data.name = "#new_content";
        if(data.data == undefined) data.data = {};
        if(data.duration == undefined) data.duration = 0;
        if(data.delay == undefined) data.delay = 0;
        if(data.display == undefined) data.display = "block";
        if(data.preload == undefined) data.preload = true;   
        if(data.executeFunction == undefined) data.executeFunction = null;  // string: function1 or function1,function2,etc
        if(data.uniqueClass == undefined) data.uniqueClass = data.name+"_"+Math.ceil(Math.random()*999999);
        if(data.personalClass == undefined) data.personalClass = "";
        if(data.returnUniqueClass == undefined) data.returnUniqueClass = false;
        if(data.finishDelay == undefined) data.finishDelay = 0.2;
        if(data.auto_check_time == undefined) data.auto_check_time = 0;
        data.data.uniqueClass = data.uniqueClass;
		if(data.load){
            if(data.url == undefined) return;
            var objContent = document.createElement('div');
                jQuery(objContent).attr("id", data.name);
                jQuery(objContent).attr("class", data.name);
                jQuery(objContent).addClass(data.uniqueClass);
                jQuery(objContent).addClass(data.personalClass);
                if(data.position) jQuery(objContent).css("position", data.position);
                jQuery(objContent).css("display", data.display);
            var loadObject = {}; 
                loadObject.type = "POST";
                loadObject.url = data.url;
                loadObject.data = data.data;
                loadObject.success = function(result){
                    jQuery(objContent).append(result);
                    if(data.preload) cuppa.loader(data.finishDelay, objContent, data.auto_check_time);
                    else jQuery(objContent).trigger("complete");
                };
            //++ Load
                objContent.ajax = jQuery.ajax(loadObject);
            //--
            //++ Execute Function when all content is load
                function Execute_function(){
                    if(!data.executeFunction) return;
                    data.executeFunction = data.executeFunction.split(",");
                    for(var i in data.executeFunction){ try{ eval( data.executeFunction[i]+"('"+data.uniqueClass+"')"); }catch(err){} }
                }
            //--
            //++ Validate when is add to DOM 
                function addedToDom( node ) {
                    if( !node.parentNode || node.parentNode.nodeType === 11 ){
                        TweenMax.delayedCall(0.5, addedToDom, [node] );
                    }else{
                        TweenMax.killDelayedCallsTo(addedToDom);
                        jQuery(objContent).trigger("added_to_dom");
                        Execute_function();
                    }
                }
                TweenMax.delayedCall(0.5, addedToDom, [objContent] );
            //--
            addedToDom(objContent);
            if(data.returnUniqueClass) return {'object':objContent, 'class':data.uniqueClass};
            else return objContent;
		}else{
            var contentToRemove = jQuery(data.name);
			try{ jQuery(contentToRemove).delay(data.delay).animate({opacity: 0}, data.duration, function() { jQuery(contentToRemove).remove();  jQuery("body").trigger("removed");  }) }catch(err){ }
			return null;
		}
	};
/* loader.
    auto_check_time: set the time, if the normal preload don't trigger, auto_check_time ensures that the event is trigger"
*/  
    cuppa.loader = function(finishDelay, target, auto_check_time){
        var timer = null;
        if(!finishDelay) finishDelay = 200; else finishDelay = finishDelay*1000;
        if(auto_check_time) auto_check_time = auto_check_time*1000;
        if(!target) target = "body";
        var items = jQuery(target).find("img").get();
        //++ Add backgroun-images
            var background_images = jQuery(target).find("*");
            for(var i = 0; i < background_images.length; i++){
                if(!jQuery(background_images[i]).is("img")  ){
                    var url = jQuery(background_images[i]).css("background-image");
                        url = cuppa.replace(url, "url(", "");
                        url = cuppa.replace(url, "(", "");
                        url = cuppa.replace(url, ")", "");
                        url = cuppa.replace(url, '"', "");
                        url = cuppa.replace(url, "none", "");
                        url = cuppa.trim(url);    
                        if(url){
                            var image=document.createElement("img");
                                image.src = url;
                            items.push(image);
                        }
                }
            }
        //--  
        var totalItems = 0;
        for(var i = 0; i < items.length; i++){ if(jQuery.trim(jQuery(items[i]).attr("src"))) totalItems++; }                        
        if(!totalItems){ jQuery(target).trigger("complete"); return; };
        var itemsLoaded = 0;
        jQuery(target).trigger("init", [itemsLoaded, totalItems]);
        //++ Add event to all images
            for(var i = 0; i < items.length; i++){
                jQuery(items[i]).bind("load", LoadStatus);
                jQuery(items[i]).bind("error",LoadError);
                if( jQuery(items[i]).height() ) jQuery(items[i]).trigger("load");
            }
        //--
            function LoadStatus(event){
                itemsLoaded++;
                jQuery(target).trigger("progress", [itemsLoaded, totalItems]);
                if(itemsLoaded >= totalItems){
                    setTimeout(function(){jQuery(target).trigger("complete") }, finishDelay);
                }else if (timer) { 
                    clearTimeout(timer);
                    timer = setTimeout(function() { jQuery(target).trigger("complete"); jQuery(target).unbind("complete"); }, auto_check_time);
                }
            }
            function LoadError(event){
                try{ console.log("Error to load: " + jQuery(this).attr("src")); }catch(err){}
                itemsLoaded++;
                jQuery(target).trigger("progress", [itemsLoaded, totalItems]);
                if(itemsLoaded >= totalItems){
                    setTimeout(function(){jQuery(target).trigger("complete") }, finishDelay);
                }else if (timer) { 
                    clearTimeout(timer);
                    timer = setTimeout(function() { jQuery(target).trigger("complete"); jQuery(target).unbind("complete"); }, auto_check_time);
                }
            }
        if(auto_check_time) timer = setTimeout(function() { jQuery(target).trigger("complete"); jQuery(target).unbind("complete"); }, auto_check_time);
    };
// blockade
    cuppa.blockade = function(data){
        if(data == undefined) data = {};
        if(data.load == undefined) data.load = true;
        if(data.name == undefined && data.load) data.name = "blockade";
        if(data.name == undefined && !data.load && !data.removeAll) data.name = "#blockade";
        if(data.name == undefined && !data.load && data.removeAll) data.name = ".blockade";
        if(data.duration == undefined) data.duration = 0;
        if(data.delay == undefined) data.delay = 0;
        if(data.autoDeleteContent == undefined ) data.autoDeleteContent = "";
        if(data.opacity  == undefined) data.opacity = 0.7;
        if(data.target == undefined) data.target = "body";
        if(data.uniqueClass == undefined) data.uniqueClass = data.name+"_"+Math.ceil(Math.random()*9999999);
        if(data.personalClass == undefined) data.personalClass = "";
        if(data.ease == undefined) data.ease = "";
        /* Other Params:
            - beforeOf:"objectName"
            - afterOf:"objectName"
            - insideOf:"objectName"
            - insideOf:"objectName"
            - prepend:"objectName"
        */
		if(data.load){
			var blockade = document.createElement('div');
				blockade.id = data.name;
				jQuery(blockade).addClass('blockade');
                jQuery(blockade).addClass(data.name);
                jQuery(blockade).addClass(data.uniqueClass);
                jQuery(blockade).addClass(data.personalClass);
				jQuery(blockade).css('opacity', 0);
                if(data.zIndex) jQuery(blockade).css('z-index', data.zIndex);
                TweenMax.to(blockade, data.duration, {delay:data.delay, alpha: data.opacity, ease:data.ease})
                if(data.insideOf){
					jQuery(data.insideOf).append(blockade);
				}else if(data.beforeOf){
                    jQuery(blockade).insertBefore(jQuery(data.beforeOf));
				}else if(data.afterOf){
                    jQuery(blockade).insertAfter(jQuery(data.afterOf));
				}else if(data.prepend){
				    jQuery(data.prepend).prepend(blockade);
				}else{
                    jQuery(data.target).append(blockade);
				}
				//++ auto remove event
					if(data.autoDeleteContent){
                        jQuery(blockade).bind("click", function(){
                                                            if(!jQuery(data.autoDeleteContent).is("div")) return;
                                                            jQuery(blockade).unbind("click");
                                                            var contentToRemove = jQuery(data.autoDeleteContent);
                                                            jQuery(contentToRemove).stop();
                                                            jQuery(blockade).stop();
                                                            cuppa.setContent({load:false, name:contentToRemove, duration:data.duration});
                                                            cuppa.blockade({load:false, name:"."+data.uniqueClass, duration:data.duration});
                                                        });
					}
                //-- end auto remove event
			return blockade;
		}else{
            var blockadeToRemove = jQuery(data.name);
			try{ 
			     TweenMax.to(blockadeToRemove, data.duration, {delay:data.delay, alpha:0, ease:data.ease, onComplete:function(){ jQuery(blockadeToRemove).remove(); } }) 
            }catch(err){ }
			return null;
		}
	};
/* charger
    Show Chager
*/
	cuppa.charger = function(data){
	    if(data == undefined) data = {};
        if(data.load == undefined) data.load = true;
        if(data.name == undefined && data.load) data.name = "charger_small";
        if(data.name == undefined && !data.load && !data.removeAll) data.name = "#charger_small";
        if(data.name == undefined && !data.load && data.removeAll) data.name = ".charger_small";
        if(data.duration == undefined) data.duration = 0;
        if(data.delay == undefined) data.delay = 0;
        if(data.target == undefined) data.target = "body";
        if(data.uniqueClass == undefined) data.uniqueClass = data.name+"_"+Math.ceil(Math.random()*999999);
        if(data.personalClass == undefined) data.personalClass = "";
		if(data.load){
			charger = document.createElement("div");
			charger.id = data.name;
            jQuery(charger).addClass(data.name);
			jQuery(charger).addClass(data.personalClass);
            jQuery(charger).addClass(data.uniqueClass);
			jQuery(charger).css('opacity', 0);
            jQuery(charger).css('display', "block");
			if(data.zIndex) jQuery(charger).css('z-index', data.zIndex);
            TweenMax.to(charger, data.duration, {delay:data.delay, alpha:1});
			jQuery(data.target).append(charger);
			return charger;
		}else{
			var chargerToRemove = jQuery(data.name);
			try{ 
			     TweenMax.to(chargerToRemove, data.duration, {delay:data.delay, alpha:0, onComplete:function(){ jQuery(chargerToRemove).remove(); } });
            }catch(err){}
			return null;
		}
	};
// share
    cuppa.shareObject = null;
    cuppa.share = function(data){
        cuppa.shareObject = data;
        jQuery("body").trigger("share", [cuppa.shareObject]);
    };
/* scroll
    Example: var scroll = new cuppa.scroll(".scroll .bar", ".scroll .track", ".scroll", "y");
    Example2: To add  auto content to scroll
                scroll.setContent(target:string, area:string, x:false, y:true, only_mousewheel_activated:false )
*/
    cuppa.scroll = function(bar, track, area, axis, disableWheelPropagation, wheelDisplacement){
        this.bar = jQuery(bar); jQuery(this.bar)[0].class_reference = jQuery(this.bar)[0].scroll = this;
        this.track = jQuery(track); jQuery(this.track)[0].class_reference = jQuery(this.track)[0].scroll = this;
        this.area = jQuery(area); jQuery(this.area)[0].class_reference = jQuery(this.area)[0].scroll = this;
        this.axis = axis; if(!this.axis) this.axis = "x, y";
        this.positionScroll;
        this.positionTrack;
        this.wheelDisplacement = (wheelDisplacement) ? wheelDisplacement : 10;
        this.disableWheelPropagation = (disableWheelPropagation) ? disableWheelPropagation : false;
        this.iscroll;
        this.recorder_position = 0;
        this.auto_hide = false;
        jQuery(this.bar).draggable({ disabled: false, axis:axis, scroll:false, containment:track, stop:function(){ this.class_reference.ScrollEnd(); } }).unbind("drag").bind( "drag", function(){ this.class_reference.moveScroll() } );
        jQuery(this.bar).css("top","0px").css("left","0px");
        //++ Move content
            this.moveScroll = function(){
                this.positionTrack = jQuery(this.track).position();
                var x = (parseFloat(jQuery(this.bar).css("left") ) - this.positionTrack.left)/(parseFloat(jQuery(this.track).css("width")) - parseFloat(jQuery(this.bar).css("width")) );
                var y = (parseFloat(jQuery(this.bar).css("top") ) - this.positionTrack.top)/(parseFloat(jQuery(this.track).css("height")) - parseFloat(jQuery(this.bar).css("height")) );
                    if(x == NaN || x === Infinity ) x = 0; 
                    if(y == NaN || y == Infinity ) y = 0;
                    if(x > 0.99) x = 1;
                    if(y > 0.99) y = 1;
                 jQuery(this).trigger("change", [x, y]);
                 jQuery(this.bar).trigger("change", [x, y]);
                 jQuery(this.track).trigger("change", [x, y]);
                 if(this.area) jQuery(this.area).trigger("change", [x, y]);
                 this.recorder_position = this.getPosition();
            }
        //--
        //++ Scroll End
            this.ScrollEnd = function(){
                this.positionTrack = jQuery(this.track).position();
                var x = (parseFloat(jQuery(this.bar).css("left") ) - this.positionTrack.left)/(parseFloat(jQuery(this.track).css("width")) - parseFloat(jQuery(this.bar).css("width")) );
                var y = (parseFloat(jQuery(this.bar).css("top") ) - this.positionTrack.top)/(parseFloat(jQuery(this.track).css("height")) - parseFloat(jQuery(this.bar).css("height")) );
                    if(x == NaN || x === Infinity ) x = 0; 
                    if(y == NaN || y == Infinity ) y = 0;
                 jQuery(this).trigger("end", [x, y]);
                 jQuery(this.bar).trigger("end", [x, y]);
                 jQuery(this.track).trigger("end", [x, y]);
                 if(this.area) jQuery(this.area).trigger("end", [x, y]);
                 this.recorder_position = this.getPosition();
            }
        //--
        //++ Tracker Event
            jQuery(track).mousedown(function(event){ this.class_reference.onMouseDown(event); });
            this.onMouseDown = function(event){
                this.positionScroll = jQuery(this.area).offset();
                this.positionTrack = jQuery(this.track).position();
                var clickMouseX = event.pageX - this.positionScroll.left - this.positionTrack.left;
                var clickMouseY = event.pageY - this.positionScroll.top - this.positionTrack.top;
                if(this.axis.search("x") != -1){
                    var posX = clickMouseX + this.positionTrack.left - jQuery(this.bar).width()*0.5;
                    if(posX < 0 + this.positionTrack.left) posX = this.positionTrack.left;
                    if(posX > (this.positionTrack.left + jQuery(this.track).width() - jQuery(this.bar).width()) ) posX = (this.positionTrack.left + jQuery(this.track).width() - jQuery(this.bar).width());
                    jQuery(this.bar).css("left", posX);
                }
                if(this.axis.search("y") != -1){
                    var posY = clickMouseY + this.positionTrack.top - jQuery(this.bar).height()*0.5;
                    if(posY < 0 + this.positionTrack.top) posY = this.positionTrack.top;
                    if(posY > (this.positionTrack.top + jQuery(this.track).height() - jQuery(this.bar).height()) ) posY = (this.positionTrack.top + jQuery(this.track).height() - jQuery(this.bar).height());
                    jQuery(this.bar).css("top", posY);
                }
                this.moveScroll();
                this.ScrollEnd();
            }
        //--
        //++ Scroll resize change
            this.scrollResizeChange = function(){
                this.setPosition(this.recorder_position.y);
                jQuery(this).trigger("scroll_resize");
                jQuery(this.bar).trigger("scroll_resize");
                jQuery(this.track).trigger("scroll_resize");
                if(this.area) jQuery(this.area).trigger("scroll_resize");
            }
            this.lastHeight = jQuery(this.area).height();
            this.ChangeHeight = function(e){
                var scroll_reference = e.data[0];
                if(scroll_reference.lastHeight != jQuery(scroll_reference.area).height()){
                    scroll_reference.lastHeight = jQuery(scroll_reference.area).height();
                    scroll_reference.scrollResizeChange();
                }
            };
            jQuery(window).unbind('resize', this.ChangeHeight).bind('resize', [this], this.ChangeHeight);
        //--
        //++ setPosition
            this.setPosition = function(porcent, duration){
                if(porcent < 0) porcent = 0;
                if(porcent > 0.99) porcent = 1;
                if(duration == undefined) duration = 0;
                if(this.axis.search("y") != -1){
                    var posY = (jQuery(this.area).height() - jQuery(this.bar).height()) * porcent;
                    TweenMax.to(this.bar, duration, {top:posY, ease:Cubic.easeInOut, onCompleteParams:[this], onComplete:function(reference){ reference.getPosition(); } });
                }
                
            }
        //--
        //++ setPosition, return scroll position in percent
            this.getPosition = function(){
                var position = {}
                this.positionTrack = jQuery(this.track).position();
                var x = (parseFloat(jQuery(this.bar).css("left") ) - this.positionTrack.left)/(parseFloat(jQuery(this.track).css("width")) - parseFloat(jQuery(this.bar).css("width")) );
                var y = (parseFloat(jQuery(this.bar).css("top") ) - this.positionTrack.top)/(parseFloat(jQuery(this.track).css("height")) - parseFloat(jQuery(this.bar).css("height")) );
                    if(x == NaN || x === Infinity ) x = 0;
                    else if(x >= 1) x = 1; 
                    if(y == NaN || y == Infinity ) y = 0;
                    else if(y >= 0.99) y = 1;
                position = {x:x, y:y}
                this.recorder_position = position;
                return position;
            }
        //--
        //+++ activate autoHide, initDelay: retart to calculate the init delay
            this.autoHide = function(value, initDelay){
                if(value == undefined) value = true; this.auto_hide = value;
                if(initDelay == undefined) initDelay = 0;
                if(!this.content) return;
                if(value){
                    jQuery(window).bind("resize", [this], this.onSize); 
                    TweenMax.delayedCall(initDelay, this.onSize, [null, this] );
                }else{
                    jQuery(window).unbind("resize", this.onSize);
                }
            } 
        //--
        //++ onSize
            this.onSize = function(e, scroll){
                this.scroll = (e) ? e.data[0] : scroll;
                if(this.scroll.axis.search("y") != -1){
                    if(jQuery(this.scroll.content.target).height() > jQuery(this.scroll.content.area).height() )jQuery(this.scroll.area).css("display", "block");
                    else jQuery(this.scroll.area).css("display", "none");
                }
                if(this.scroll.axis.search("x") != -1){
                    if(jQuery(this.scroll.content.target).width() > jQuery(this.scroll.content.area).width() )jQuery(this.scroll.area).css("display", "block");
                    else jQuery(this.scroll.area).css("display", "none");
                }
            } 
        //--
        //++ Set content
            this.setContent = function(target, area, x, y, auto_hide, only_mousewheel_activated){
                var content = {}
                    content.target = target;
                    content.area = area;
                    content.y = y;
                    content.only_mousewheel_activated = only_mousewheel_activated;
                this.content = content;
                this.contentConfiguration();
                if(auto_hide) this.autoHide();
            }
        //++ Content data configuration
            this.contentConfiguration = function(){
                if(!this.content) return;
                //++ if only_mousewheel_activated is false
                    if(!this.content.only_mousewheel_activated){
                        jQuery(this).unbind("change").bind("change", function(e,x,y){this.autoMoveContent(e,x,y) } );
                        jQuery(this.content.area).css("cursor","default");
                    }
                //--
                //++ mousewheel
                    if(this.axis.search("y") != -1){
                        jQuery(this.content.target).unbind("mousewheel").bind("mousewheel", [this], function(e, direction){
                            try{ e.stopPropagation(); e.preventDefault(); }catch(err){}
                            var reference = e.data[0];
                            var position = jQuery(reference.bar).position().top - reference.wheelDisplacement*direction;
                            var positionTrack = jQuery(reference.track).position();
                            if(position > (positionTrack.top + jQuery(reference.track).height() - jQuery(reference.bar).height()) ) position = (positionTrack.top + jQuery(reference.track).height() - jQuery(reference.bar).height());
                            if(position < 0) position = 0;
                            if(!disableWheelPropagation){
                                jQuery(bar).css("top", position);
                                reference.moveScroll();
                                reference.ScrollEnd();
                            }
                            jQuery(this).trigger("wheel", [direction]);
                            jQuery(bar).trigger("wheel", [direction]);
                            jQuery(track).trigger("wheel", [direction]);
                            if(area) jQuery(area).trigger("wheel", [direction]);
                        });
                    }else{
                        jQuery(this.content.target).unbind("mousewheel").bind("mousewheel", [this], function(e, direction){
                            try{ e.stopPropagation(); e.preventDefault(); }catch(err){}
                            var reference = e.data[0];
                            var position = jQuery(reference.bar).position().left - reference.wheelDisplacement*direction;
                            var positionTrack = jQuery(reference.track).position();
                            if(position > (positionTrack.left + jQuery(reference.track).width() - jQuery(reference.bar).width()) ) position = (positionTrack.left + jQuery(reference.track).width() - jQuery(reference.bar).width());
                            if(position < 0) position = 0;
                            if(!disableWheelPropagation){
                                jQuery(bar).css("left", position);
                                reference.moveScroll();
                                reference.ScrollEnd();
                            }
                            jQuery(this).trigger("wheel", [direction]);
                            jQuery(bar).trigger("wheel", [direction]);
                            jQuery(track).trigger("wheel", [direction]);
                            if(area) jQuery(area).trigger("wheel", [direction]);
                        });
                    }         
                //--
            }
        //--
        //++ Auto move content
            this.autoMoveContent = function(e, x, y){
                cuppa.moveContent(this.content.target, this.content.area, this.content.x, this.content.y, x, y, this.content.duration, this.content.ease, true);
            };
        //--     
        return this;   
    };
/* Touch config 
    fade = "scroll with fade"
*/
    cuppa.scrollTouch = function(target, fade, mouseEvents){
        this.touchObject = jQuery(target)[0].touchObject = this;
        this.init_scroll = 0;
        this.init_data = 0;
        this.current_data = 0;
        this.array_data = null;
        this.fade = fade;
        this.mouseEvents = (mouseEvents) ?  true : false;
        if(target == "body") jQuery(document).bind("touchmove", this.touchObject.documentPropagation);
        this.onMouseDown = function(e){
            TweenMax.killTweensOf(target);
            //++ Data
                this.touchObject.init_scroll = cuppa.statusScrollPixel(target);
                this.touchObject.init_data = (e.pageY != undefined ) ? {x:e.clientX, y:e.clientY} : {x:e.originalEvent.touches[0].clientX, y:e.originalEvent.touches[0].clientY};
                this.touchObject.array_data = [{x:0, y:0, realX:this.touchObject.init_data.x, realY:this.touchObject.init_data.y}];
                //jQuery(".debug").html("down: position scroll: " + this.touchObject.init_scroll.y + " | touch position: " + this.touchObject.init_data.y );
            //--
            //++ Events
                jQuery(target).bind("touchmove", this.touchObject.onMouseMove);
                jQuery(target).bind("touchend", this.touchObject.onMouseUp);
                jQuery(document).bind("touchmove", this.touchObject.documentPropagation);
                if(this.touchObject.mouseEvents){
                    jQuery(target).bind("mousemove", this.touchObject.onMouseMove);
                    jQuery(target).bind("mouseup", this.touchObject.onMouseUp);
                    jQuery(target).bind("mouseleave", this.touchObject.onMouseUp);
                }
            //--
        }; jQuery(target).bind("touchstart", this.onMouseDown).bind("mousedown", this.onMouseDown);
        this.onMouseMove = function(e){
            TweenMax.killTweensOf(target);
            try{ e.stopPropagation(); e.preventDefault(); }catch(err){}
            //++ Data
                this.touchObject.current_data = (e.pageY != undefined ) ? {x:e.clientX, y:e.clientY} : {x:e.originalEvent.touches[0].clientX, y:e.originalEvent.touches[0].clientY};
                var diference = {x: this.touchObject.init_data.x - this.touchObject.current_data.x, y: this.touchObject.init_data.y - this.touchObject.current_data.y }
                var gap = {}
                    gap.x = this.touchObject.current_data.x - this.touchObject.array_data[this.touchObject.array_data.length-1].realX;
                        gap.x = gap.x*-1;
                    gap.y = this.touchObject.current_data.y - this.touchObject.array_data[this.touchObject.array_data.length-1].realY;
                        gap.y = gap.y*-1;
                    gap.realY = this.touchObject.current_data.y;
                    gap.realX = this.touchObject.current_data.x;
                this.touchObject.array_data.push(gap);
                if(this.touchObject.array_data.length > 5) this.touchObject.array_data.shift();
            //--
            cuppa.moveContent(target, target, false, true, 0, this.touchObject.init_scroll.y+diference.y);
            //jQuery(".debug").html("move: diferenceY: " + gap.y );
        }
        this.onMouseUp = function(e){
            TweenMax.killTweensOf(target);
            // Events
                jQuery(target).unbind("touchmove", this.touchObject.onMouseMove);
                jQuery(target).unbind("touchend", this.touchObject.onMouseUp);
                jQuery(target).unbind("mousemove", this.touchObject.onMouseMove);
                jQuery(target).unbind("mouseup", this.touchObject.onMouseUp);
                jQuery(target).unbind("mouseleave", this.touchObject.onMouseUp);
                if(target != "body") jQuery(document).unbind("touchmove", this.touchObject.documentPropagation);
            // Fade
                if(fade){
                    this.touchObject.fade(target);
                }
        }
        this.documentPropagation = function(e){ e.preventDefault(); }
        //++ Fade
            this.fade = function(target){
                TweenMax.killTweensOf(target);
                var max_values = {x:0, y:0};
                for(i = 0; i < this.touchObject.array_data.length; i++){
                    if( Math.abs(this.touchObject.array_data[i].x) > Math.abs(max_values.x)) max_values.x = this.touchObject.array_data[i].x;
                    if( Math.abs(this.touchObject.array_data[i].y) > Math.abs(max_values.y)) max_values.y = this.touchObject.array_data[i].y;
                }
                var duration = 1.2;
                var position = cuppa.statusScrollPixel(target);
                var scroll_to = {x:0, y:position.y+max_values.y*20 };
                cuppa.moveContent(target, target, false, true, 0, scroll_to.y, duration, Cubic.easeOut);
            }
        //-
        //++ Destroy
            this.destroy = function(){
                //Remove Events
                jQuery(target).unbind("touchstart", this.onMouseDown).unbind("mousedown", this.onMouseDown);
                jQuery(target).unbind("touchmove", this.touchObject.onMouseMove);
                jQuery(target).unbind("touchend", this.touchObject.onMouseUp);
                jQuery(target).unbind("mousemove", this.touchObject.onMouseMove);
                jQuery(target).unbind("mouseup", this.touchObject.onMouseUp);
                jQuery(target).unbind("mouseleave", this.touchObject.onMouseUp);
                jQuery(document).unbind("touchmove", this.touchObject.documentPropagation);
            }
        //--
        return this;
    };
// moveContent
// Example: cuppa.moveContent(".content .list", ".content", false, true, 0, 0.5, 700, "linear", true);
	cuppa.moveContent = function(target, area, moveScrollX, moveScrollY, positionX, positionY, duration, ease, value_in_porcent, only_return_data){       
        positionX = String(positionX); positionY = String(positionY);
		if(!moveScrollX) moveScrollX = false;
		if(!moveScrollY) moveScrollY = false;
		if(!positionX) positionX = "0";
		if(!positionY) positionY = "0";
		if(duration == undefined) duration = 0;
        if(!ease) ease = "linear";
		if(!target) target = document;
        if(area == "body") area = "";
        if(!area && !value_in_porcent){ 
            area = "html, body";
            if(value_in_porcent && moveScrollX){ positionX = (jQuery(target).width()-jQuery(area).width())*positionX; }
            if(value_in_porcent && moveScrollY){ positionY = (jQuery(target).height()-jQuery(area).height())*positionY; }
        }else if(!area && value_in_porcent){ 
            area = window;
            if(value_in_porcent && moveScrollX){ positionX = (jQuery(target).width()-jQuery(area).width())*positionX; }
            if(value_in_porcent && moveScrollY){ positionY = (jQuery(target).height()-jQuery(area).height())*positionY; }
            area = "html, body";
        }else if(target == area){
            if(value_in_porcent && moveScrollX){ positionX = (jQuery(target).prop("scrollWidth")-jQuery(area).width())*positionX; }
            if(value_in_porcent && moveScrollY){ positionY = (jQuery(target).prop("scrollHeight")-jQuery(area).height())*positionY; }
        }else{
            if(value_in_porcent && moveScrollX){ positionX = (jQuery(target).width()-jQuery(area).width())*positionX; }
            if(value_in_porcent && moveScrollY){ positionY = (jQuery(target).height()-jQuery(area).height())*positionY; }
        };
        var data = {x:positionX, y:positionY }
        if(only_return_data) return data;
        
        jQuery(area).stop(positionY);
        if(moveScrollX && moveScrollY){
            TweenMax.to(area, duration, { scrollLeft:positionX, scrollTop:positionY, ease:ease, onUpdate:onProgress } );
        }else if(moveScrollX){
            TweenMax.to(area, duration, { scrollTop:positionX, ease:ease, onUpdate:onProgress } );
        }else if(moveScrollY){
            TweenMax.to(area, duration, { scrollTop:positionY, ease:ease, onUpdate:onProgress } );
        }
        
        function onProgress(){
            var percent = cuppa.statusScrollPorcent(area);
            if(moveScrollY && !percent.y) return;
            if(moveScrollX && !percent.x) return;
            jQuery(target).trigger("progress_content", [percent]);
            jQuery(area).trigger("progress_content", [percent, target]);
        }
        return data;
	};
/* EventManager, Estructure 
    cuppa.eventGroups =	[groupName, Array]	[object, type, listener]
                							[object, type, listener]
                        [groupName2, Array]	[object, type, listener]
                                            [object, type, listener]
*/
    cuppa.eventGroups = [];
    // Add Event listener
        cuppa.addEventListener = function(type, listener, object, groupName) {
            cuppa.removeEventListener(type, listener, object, groupName); // prevent duplicate events
            if(!groupName) groupName = "default";
            var indexGroup = cuppa.searchEventGroup(groupName);
            if (indexGroup == -1){ 
                cuppa.eventGroups.push([groupName, new Array() ]);
            }
            if(type == "ready"){
                jQuery(object).ready(listener);
            }else{
                jQuery(object).bind(type, listener);
            }
            indexGroup = cuppa.searchEventGroup(groupName);
            cuppa.eventGroups[indexGroup][1].push([object, type, listener]);
            if (cuppa.debug){
                try{
                    console.log("addEventListener - Array Length: " + cuppa.eventGroups.length );
                    console.log(cuppa.eventGroups);
                }catch(err){}
            }
        };
    // Remove event by Group
        cuppa.removeEventGroup = function(groupName){
            if(!groupName) groupName = "default";
            var indexGroup = cuppa.searchEventGroup(groupName);
            if (indexGroup == -1) return;
            while (cuppa.eventGroups[indexGroup][1].length > 0) {
                jQuery(cuppa.eventGroups[indexGroup][1][0][0]).unbind(cuppa.eventGroups[indexGroup][1][0][1], cuppa.eventGroups[indexGroup][1][0][2]);
				cuppa.eventGroups[indexGroup][1][0][0] = null;
				cuppa.eventGroups[indexGroup][1][0][1] = null;
				cuppa.eventGroups[indexGroup][1][0][2] = null;
				cuppa.eventGroups[indexGroup][1][0] = null;
				cuppa.eventGroups[indexGroup][1].shift();
			}
            cuppa.eventGroups.splice(indexGroup, 1);
            if (cuppa.debug){
                try{
                    console.log("removeEventGroup - Array Length: " + cuppa.eventGroups.length );
                    console.log(cuppa.eventGroups);
                }catch(err){}
            }
        };
    // Remove a single event
        cuppa.removeEventListener = function(type, listener, object, groupName){
            if(!groupName) groupName = "default";
            var indexGroup = cuppa.searchEventGroup(groupName);
            if (indexGroup == -1) return;
            for(var i = 0; i < cuppa.eventGroups[indexGroup][1].length; i++) {
				if(cuppa.eventGroups[indexGroup][1][i][0] == object && cuppa.eventGroups[indexGroup][1][i][1] == type && cuppa.eventGroups[indexGroup][1][i][2].toString() == listener.toString()){
					jQuery(cuppa.eventGroups[indexGroup][1][i][0]).unbind(cuppa.eventGroups[indexGroup][1][i][1], cuppa.eventGroups[indexGroup][1][i][2]);
					cuppa.eventGroups[indexGroup][1][i][0] = null;
					cuppa.eventGroups[indexGroup][1][i][1] = null;
					cuppa.eventGroups[indexGroup][1][i][2] = null;
					cuppa.eventGroups[indexGroup][1][i] = null;
					cuppa.eventGroups[indexGroup][1].splice(i, 1);
					break;
				}
			}
            if(!cuppa.eventGroups[indexGroup][1].length) cuppa.eventGroups.splice(indexGroup, 1);
            if(cuppa.debug){
                try{
                    console.log("removeEventListener - Array Length: " + cuppa.eventGroups.length);
                    console.log(cuppa.eventGroups);
                }catch(err){}
            }
        };
    // Search group
		cuppa.searchEventGroup = function(value) {
			var index = -1;
			for (var i = 0; i < cuppa.eventGroups.length; i++) {
				if (cuppa.eventGroups[i][0] == value) { index = i; break; }
			}
			return index;
		};
//--