/* Get new dimensions, force:width or height */
	cuppa.newDimensions = function(width, height, new_width, new_height, invert, force) {
		if(!invert) invert = false;
        width = parseFloat(width); height = parseFloat(height); new_width = parseFloat(new_width); new_height = parseFloat(new_height);
		var porcent = 1 + ((new_width - width) / width);
        if(force == "width"){
            var porcent = 1 + ((new_width - width) / width);
                new_width = width*porcent;
				new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }else if(force == "height"){
            var porcent = 1 + ((new_height - height) / height);
                new_width = width*porcent;
                new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }
        
		if(!invert){
			if(height*porcent >= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}else{
			if(height*porcent <= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}
		return {width:new_width, height:new_height, scale:porcent}
	};
 // Cover
    cuppa.cover = function(element, invert, scale, force){
        var elements = jQuery(element);
        for(var i = 0; i < elements.length; i++){
            element = elements[i];
            var parent = jQuery(element).parent();
            if(invert){
                var dimention = cuppa.newDimensions(jQuery(element).width(), jQuery(element).height(), jQuery(parent).width(), jQuery(parent).height(), true, force );
                if(scale){
                    TweenMax.to(element, 0, {scale:dimention.scale});
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 )
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 )
                }else{
                    jQuery(element).width(dimention.width).height(dimention.height);
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 )
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 )
                }
            }else{
                var dimention = cuppa.newDimensions(jQuery(element).width(), jQuery(element).height(), jQuery(parent).width(), jQuery(parent).height(), false, force );
                if(scale){
                    TweenMax.to(element, 0, {scale:dimention.scale});
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 )
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 )
                }else{
                    jQuery(element).width(dimention.width).height(dimention.height);
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 )
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 )
                }
            }   
        }
    };
 /**
  * Get the sum of all element passed
  * Example: cuppa.sumWidth(".content li")
  */
    cuppa.sumWidth = function(list, one_element){
        var items = jQuery(list);
        var value = 0;
        for(var i = 0; i < items.length; i++){ 
            value+= jQuery(items[i]).width();
            value+= parseFloat(jQuery(items[i]).css("margin-left"));
            value+= parseFloat(jQuery(items[i]).css("margin-right"));
            value+= parseFloat(jQuery(items[i]).css("padding-left"));
            value+= parseFloat(jQuery(items[i]).css("padding-right"));
            if(one_element) break;
        }
        return value;
    };
  /* Get real dimention
   *  Recomendable add all inner element inside the container without scroll "wrapper"
   */
    cuppa.dimentions = function(element, inner_dimentions){
        var value = {width:0, height:0, x:0, x2:0, y:0, y2:0};
            try{
                value.width = jQuery(element).width();
                value.width += (isNaN( parseFloat( jQuery(element).css("margin-left") ) )) ? 0 : parseFloat( jQuery(element).css("margin-left") );
                value.width += (isNaN( parseFloat( jQuery(element).css("margin-right") ) )) ? 0 : parseFloat( jQuery(element).css("margin-right") );
                value.width += (isNaN( parseFloat( jQuery(element).css("padding-left") ) )) ? 0 :  parseFloat( jQuery(element).css("padding-left") );
                value.width += (isNaN( parseFloat( jQuery(element).css("padding-right") ) )) ? 0 : parseFloat( jQuery(element).css("padding-right") );
                value.width += (isNaN( parseFloat( jQuery(element).css("border-left-width") ) )) ? 0 : parseFloat( jQuery(element).css("border-left-width") );
                value.width += (isNaN( parseFloat( jQuery(element).css("border-right-width") ) )) ? 0 : parseFloat( jQuery(element).css("border-right-width") );
                                
                value.height = jQuery(element).height();
                value.height += (isNaN( parseFloat( jQuery(element).css("margin-top") ) )) ? 0 :  parseFloat( jQuery(element).css("margin-top") );
                value.height += (isNaN( parseFloat( jQuery(element).css("margin-bottom") ) )) ? 0 :  parseFloat( jQuery(element).css("margin-bottom") );
                value.height += (isNaN( parseFloat( jQuery(element).css("padding-top") ) )) ? 0 :  parseFloat( jQuery(element).css("padding-top") );
                value.height += (isNaN( parseFloat( jQuery(element).css("padding-bottom") ) )) ? 0 :  parseFloat( jQuery(element).css("padding-bottom") );
                value.height += (isNaN( parseFloat( jQuery(element).css("border-top-width") ) )) ? 0 :  parseFloat( jQuery(element).css("border-top-width") );
                value.height += (isNaN( parseFloat( jQuery(element).css("border-bottom-width") ) )) ? 0 :  parseFloat( jQuery(element).css("border-bottom-width") );
                value.x = jQuery(element).offset().left; 
                value.y = jQuery(element).offset().top;
                value.x2 = jQuery(element).position().left; 
                value.y2 = jQuery(element).position().top;
                if(inner_dimentions){
                    var temp_element = jQuery(element).clone().css({left:0, top:0, visibility:"hidden", display:"block", height:"auto", position:"absolute"});
                        jQuery(element).after(temp_element);
                    var dimentions = cuppa.dimentions(temp_element);
                    value.scroller_width = dimentions.width;
                    value.scroller_height = dimentions.height;
                    jQuery(temp_element).remove();
                }
            }catch(err){}
        return value;
    };
 /* Auto Ajust Width
  * This calcul and ajust the width container according the inner content 
  * If you use display:inline-block usualy you should add_padding
  */
    cuppa.autoAjustWidth = function(container, inner_elements, add_padding){
        if(add_padding == undefined) add_padding = 0;
        function Calculate(){
            var inner_elements_width = cuppa.sumWidth(inner_elements, true);
            var container_width = parseFloat( jQuery(container).css("max-width") );
            if(container_width > jQuery(container).parent().width() || !container_width ) container_width = jQuery(container).parent().width();
            var count = Math.floor(container_width/inner_elements_width);
            if(count > jQuery(inner_elements).length) count = jQuery(inner_elements).length;
            jQuery(container).width(inner_elements_width*count + add_padding);
        }; jQuery(window).unbind("resize", Calculate).bind("resize", Calculate); Calculate();
    };
// Get the bounding rotate element data
    cuppa.boundingBox = function (element, addPixels, angle) {
        if(angle == undefined) angle = cuppa.getRotationDegrees(element);
        if(addPixels == undefined) addPixels = 0;
        //++ Fix angles
            if(angle >= 360) angle = angle - Math.floor(angle/360)*360;
            if(angle >= 180 && angle < 360) angle = angle - 180;
            if(angle <= -360) angle = angle + Math.floor(angle*-1/360)*360;
            if(angle <= -180) angle = angle + 180;
            if(angle < 0) angle = 180+angle;
        //--
        angle = (angle/180)*Math.PI;
        var width = jQuery(element).width() + addPixels;
        var height = jQuery(element).height() + addPixels;
        angle = ((angle > Math.PI * 0.5 && angle < Math.PI * 1) || (angle > Math.PI * 1.5 && angle < Math.PI * 2))? Math.PI - angle : angle;
        var dimention = {}
            dimention.width = Math.sin(angle) * height + Math.cos(angle) * width;
            dimention.height = Math.sin(angle) * width + Math.cos(angle) * height; 
            dimention.x = -(dimention.width - jQuery(element).width())*0.5;
            dimention.y = -(dimention.height - jQuery(element).height())*0.5;
        return dimention;
    };
// Get the bounding skew element data
    cuppa.boundingSkewBox = function (element, skewX, skewY, addPixels) {
        if(skewX == undefined) skewX = 0;
        if(skewY == undefined) skewY = 0;
        if(addPixels == undefined) addPixels = 0;
        var width = jQuery(element).width();
        var height = jQuery(element).height();
        var longX = cuppa.getOpositeDimention(height, skewX);
        var longY = cuppa.getOpositeDimention(width, skewY);
        var dimention = {}
            dimention.width = Math.abs(longX)+width;
            dimention.height = Math.abs(longY)+height;
            dimention.x = (jQuery(element).width() - dimention.width)*0.5;
            dimention.y = (jQuery(element).height() - dimention.height)*0.5;
        return dimention;
    };
// Get rotation degrees
    cuppa.getRotationDegrees = function(obj){
        var matrix = jQuery(obj).css("-webkit-transform") ||
        jQuery(obj).css("-moz-transform")    ||
        jQuery(obj).css("-ms-transform")     ||
        jQuery(obj).css("-o-transform")      ||
        jQuery(obj).css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle +=360 : angle;
    };
// Get the oposite dimention of a triangle rectangle 
    cuppa.getOpositeDimention = function(longitude, angle){
        angle = (angle/180)*Math.PI;
        var A = angle;
        var b = longitude;
        var C = 90;
        var B = 180-C-Math.abs(A);
        var c = b/Math.cos(A);
        var a =b*Math.tan(A); 
        return a;
    };
/* Get Ages from date (1985/03/01) ) */
    cuppa.getAge = function(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
        return age;
    };