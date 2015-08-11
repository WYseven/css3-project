// auto get data inside the <form> and return a object
    cuppa.getFormData = function(form, remove_clear_values){
        if(remove_clear_values == undefined) remove_clear_values = false;
        var data = {};
        var info = jQuery(form).serialize();
            info = cuppa.urlDecode(info);
            info = cuppa.urlToObject(info);
       if(remove_clear_values){
            for (var i in info) {
                if(info[i] == ""){ delete info[i]; }
           } 
       }
       return info;
    };
/* Input preText.
    Example: cuppa.preText(element, 'Name_')
             cuppa.preText(element); This example use the "alt" attr to find the preText string
*/
    cuppa.preText = function(element, string){
        if(!string){
            var elements = jQuery(element).get();
            for(var i = 0; i < elements.length; i++){
                var element = jQuery(elements[i]);
                if($(element).attr("type") == undefined || $(element).attr("type") == "text" || $(element).attr("type") == "password"){
                    if($(element).attr("alt")) jQuery(element).preTextCuppa( $(element).attr("alt") );
                 }
            }
        }else{
            jQuery(element).preTextCuppa(string);
        }
    };
/* Max maxlength */
    cuppa.maxlength = function(element, maxlength){
        jQuery(element).bind("input keyup", function(e){
            if(maxlength == undefined) maxlength = jQuery(this).attr("maxlength");
            if (!!maxlength) {
                var text =  $(this).val();
                if (text.length > maxlength) {
                     $(this).val(text.substring(0,maxlength));
                    e.preventDefault();
                }
            }
        });
    }
/* Input filter.
    Example: cuppa.inputFilter(element, '0-9')
*/
    cuppa.inputFilter = function(element, values){
        values = "["+values+"]";
        jQuery(element).filter_input_cuppa({regex:values}); 
    };
    cuppa.inputFilterRemove = function(element){
        jQuery(element).unbind("keypress paste");
    }
/* Range of values
    Example cuppa.range(element, 1, 10);
*/
    cuppa.range = function(element, min, max){
        if(min != undefined) jQuery(element).bind("change", function(){ if(jQuery(this).val() < min ) jQuery(this).val(min); });
        if(max != undefined) jQuery(element).bind("change", function(){ if(jQuery(this).val() > max ) jQuery(this).val(max); });
        jQuery(element).each(function(){
            if( jQuery(this).val() < min ){
                jQuery(this).val(min); 
                jQuery(this).trigger("change");
            }
            if( jQuery(this).val() > max ){
                jQuery(this).val(max);
                jQuery(this).trigger("change");
            }
        });
    }
//++ Select 
    cuppa.select = {};
    /* Select a item with value or label */
        cuppa.select.setValue = function(value, item, is_label) {
    	   item = jQuery(item).find("option");
    	   if(is_label){
                for (i = 0; i < item.length; i++) {
                    if (item[i].text == value) { item[i].selected = true; break; }
                }
    	   }else{
                for (i = 0; i < item.length; i++) {
                    if (item[i].value == value) { item[i].selected = true; break; }
                }
    	   }
    	};
    /* Select item with like value or like label */
        cuppa.select.setLike = function(value, item, is_label){
            item = jQuery(item).find("option");
            value = tu_GetURLFriendly(value);
            value = eval("/"+value+"/i");
            if(is_label){
                for (i = 0; i < item.length; i++) {
        			if(tu_GetURLFriendly(item[i].text).search(value) != -1) { item[i].selected = true; break; }
        		}
            }else{
                for (i = 0; i < item.length; i++) {
        			if(tu_GetURLFriendly(item[i].value).search(value) != -1) { item[i].selected = true; break; }
        		}
            }
        };
//--
//++ Configure inputFields like moneyField
    cuppa.moneyField = function(field){
        var items = jQuery(field).get();        
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var maskName = "mask_"+item.id+i;
            jQuery("."+maskName).remove();
            var mask_field = jQuery(item).clone().get(0);
                mask_field.item = item;
                jQuery(mask_field).removeAttr("name").removeAttr("id").removeAttr("class");
                jQuery(mask_field).addClass(maskName);
                jQuery(mask_field).insertBefore(item);
                jQuery(mask_field).attr("type", "text");
                jQuery(mask_field).val( cuppa.numberToMoney( jQuery(item).val() ) );
            jQuery(item).attr("type", "hidden").css("visibility", "hidden");
            function updateValue(e, mask_field){
                if(e) mask_field = this;
                var valuePoint = jQuery(mask_field).val().split(".");
                var value = cuppa.moneyToNumber( jQuery(mask_field).val() );
                if(valuePoint.length > 1 && valuePoint[ valuePoint.length-1 ] == "" ){ 
                    jQuery(mask_field.item).val( value ); return;
                }else if( valuePoint.length > 1 && parseFloat(valuePoint[ valuePoint.length-1 ]) == 0 ){
                    jQuery(mask_field.item).val( value ); return;
                }
                jQuery(mask_field.item).val( value ).trigger("change");
                jQuery(mask_field).val( cuppa.numberToMoney(value) );
            }; jQuery(mask_field).bind("change", updateValue).bind("input", updateValue); updateValue(null, mask_field);            
        }
    }
//--
//++ CheckBox 
    cuppa.checkbox = {};
    // Select, Unselect CheckBoxes
    	cuppa.checkbox.selectAll = function(value, items) {
    		if(!items) items = "td .id";
            if(value) jQuery("body " + items).prop("checked", true);
            else jQuery("body " + items).prop("checked", false);
    	};
    // Get Selected Items
        cuppa.checkbox.getSelectedItems = function(items, return_only_values){
    		selectedItems = Array();
    		if(!items) items = ".id";
    		var elements = jQuery("body").find(items);
    		for(var i = 0; i < elements.length; i++){
    			if(elements[i].checked){
    			    if(return_only_values){ 
    			         selectedItems.push(jQuery(elements[i]).val());                         
                    }else{
                        selectedItems.push(elements[i]);
                    }
    			};
    		}
    		if(selectedItems.length == 0) return 0;
    		return selectedItems;
    	}
     // Toogle Checked Items
        cuppa.checkbox.selectAllToggle = function(item, items_name){
            cuppa.checkbox.selectAll(jQuery(item).prop('checked'), items_name);
        };
//--
/* Dropdown
    mouse_action: click, mouseenter
*/    
    cuppa.dropDown = function(element, button_element, mouse_action){
        if(mouse_action == undefined) mouse_action = "click";
        jQuery(element).css({display:"none"});
        
        jQuery(button_element).bind(mouse_action, openDropdown);
        function openDropdown(){
            jQuery(button_element).addClass("dropDownOpen");
            TweenMax.to(element, 0.2, {alpha:1, display:"block"});
            jQuery(window).unbind("click", closeDropDown);
            TweenMax.delayedCall(0.1, function(){
                jQuery(window).bind("click", closeDropDown);
            });
        }
        function closeDropDown(){
            jQuery(button_element).removeClass("dropDownOpen");
            jQuery(window).unbind("click", closeDropDown);
            TweenMax.killTweensOf(element);
            TweenMax.to(element, 0.2, {alpha:0, display:"block"});
        }
                
    }
//++ Styles
    /* Input Style */
        cuppa.inputStyle = function(field){
            var fields = jQuery(field).get();
            for(var i = 0; i < fields.length; i++){
                if(jQuery(fields[i]).attr("type") == undefined || jQuery(fields[i]).attr("type") == "text" ){
                    var item = '<div class="input_cuppa">';
                            item+= '<div class="input_cuppa_wrapper">';
                                item+= '<div class="input_cuppa_left"></div>'
                                item+= '<div class="input_cuppa_right">&nbsp;</div>';
                            item+= '</div>';
                        item+= '</div>';
                    item = jQuery(item);
                    if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                    jQuery(item).width( jQuery(fields[i]).width() );
                    jQuery(item).height( jQuery(fields[i]).height() );
                    jQuery(item).find(".input_cuppa_text").html( jQuery(fields[i]).find("option:selected").text() )
                    jQuery(fields[i]).before(item);
                    jQuery(item).append(fields[i]);
                    jQuery(fields[i]).bind("change", function(e){ jQuery(this).parent().find(".input_cuppa_text").html( jQuery(this).find("option:selected").text()  ) })
                }
            }
        };
    /* Checkbox Style */
        cuppa.checkboxStyle = function(field){
            var fields = jQuery(field).get();
            for(var i = 0; i < fields.length; i++){
                if(jQuery(fields[i]).attr("type") == "checkbox" ){
                    var item = '<div class="checkbox_cuppa">';
                            item += '<input type="hidden"  />';
                        item += '</div>';
                    item = jQuery(item);
                    if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                    jQuery(fields[i]).before(item);
                    jQuery(item).find("input").attr("id", jQuery(fields[i]).attr("id") );
                    jQuery(item).find("input").attr("class", jQuery(fields[i]).attr("class") );
                    jQuery(item).find("input").attr("name", jQuery(fields[i]).attr("name") );
                    if(jQuery(fields[i]).is(":checked")){ 
                        jQuery(item).find("input").val(1);
                        jQuery(item).addClass("checkbox_cuppa_checked");
                    }
                    jQuery(fields[i]).remove();
                    jQuery(item).bind("click", function(e){
                        jQuery(this).removeClass("error");
                        if(jQuery(this).find("input").val() == "1"){
                            jQuery(this).find("input").val(0);
                            jQuery(this).removeClass("checkbox_cuppa_checked");
                        }else{
                            jQuery(this).find("input").val(1);
                            jQuery(this).addClass("checkbox_cuppa_checked");
                        }
                    });
                    
                }
            }
        };
    /* Radio Style */
        cuppa.radioStyle = function(field){
             var fields = jQuery(field).get();
            for(var i = 0; i < fields.length; i++){
                if(jQuery(fields[i]).attr("type") == "radio" ){
                    var item = '<div class="radio_cuppa">';
                        item += '</div>';
                        item = jQuery(item);
                    item = jQuery(item);
                    if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                    jQuery(item).attr("group",jQuery(fields[i]).attr("name") );
                    jQuery(item).addClass(jQuery(fields[i]).attr("name"));
                    jQuery(fields[i]).before(item).css("opacity",0);
                    if(jQuery(fields[i]).is(":checked")){ 
                        jQuery(item).addClass("radio_cuppa_checked");
                    }
                    jQuery(item).append(fields[i]);
                    jQuery(item).bind("click", function(e){
                        jQuery("*[group="+jQuery(this).attr("group")+"]").removeClass("error").removeClass("radio_cuppa_checked");
                        jQuery(this).addClass("radio_cuppa_checked");
                        jQuery(this).find("input").prop("checked","checked");
                    });
                }
            }
        };
    /* Select Style */
        cuppa.selectStyle = function(field){
            var fields = jQuery(field).get();
            for(var i = 0; i < fields.length; i++){
                var item = '<div class="select_cuppa">';
                        item+= '<div class="select_cuppa_wrapper">';
                            item+= '<div class="select_cuppa_left"></div>'
                            item+= '<div class="select_cuppa_right">&nbsp;</div>';
                        item+= '</div>';
                    item+= '<div class="select_cuppa_text">Text</div>';
                    item+= '</div>';
                item = jQuery(item);
                if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                jQuery(item).width( jQuery(fields[i]).width() );
                jQuery(item).height( jQuery(fields[i]).height() );
                jQuery(item).find(".select_cuppa_text").html( jQuery(fields[i]).find("option:selected").text() );
                jQuery(fields[i]).before(item);
                jQuery(item).append(fields[i]);
                jQuery(fields[i]).bind("change", function(e){ jQuery(this).parent().find(".select_cuppa_text").html( jQuery(this).find("option:selected").text()  ) })
                jQuery(fields[i]).css('opacity', 0);
            }
        };
//--