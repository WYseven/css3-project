cuppa.shop = {};
cuppa.shop.ajaxSession;
cuppa.shop.products = new Array();
//++ init
    cuppa.shop.init = function(){
        if(cuppa.getCookie("cuppa_shop")) cuppa.shop.products = cuppa.jsonDecode(cuppa.getCookie("cuppa_shop"));
        jQuery(cuppa.shop).trigger("added");
    }; cuppa.addEventListener("ready",  cuppa.shop.init, document, "shop");
//--
//++ add product
    cuppa.shop.autoAdd = function(form, amount){
        var info = cuppa.getFormData(form);
        if(info) cuppa.shop.add(info, amount);
    };
//--
//++ add product
    cuppa.shop.add = function(info, amount){
        info = cuppa.shortObject(info);
        if(info.amount) delete info.amount;
        if(!amount) amount = 1;
        var product = {info:info, amount:parseFloat(amount)};
        //++ Search related product
            var related_product = null;
            for(var i = 0; i < cuppa.shop.products.length; i++){
                var product_info = cuppa.shop.products[i].info;
                if( cuppa.jsonEncode(info) == cuppa.jsonEncode(cuppa.shop.products[i].info) ){
                    related_product = cuppa.shop.products[i];
                    break;
                }
            }
            if(related_product){
                var new_amount = parseFloat(related_product.amount) + parseFloat(amount);
                if( new_amount > parseFloat(info.stock) ){
                    console.log("Maximum stock exceeded");
                    return;
                }
                related_product.amount = parseFloat(related_product.amount) + parseFloat(amount);
            }else{
                if(parseFloat(amount) > info.stock){
                    console.log("Maximum stock exceeded");
                    return;
                }
                cuppa.shop.products.push(product);
            }
        //--
        cuppa.setCookie("cuppa_shop", cuppa.jsonEncode(cuppa.shop.products) );
        jQuery(cuppa.shop).trigger("added");
        cuppa.shop.updateSession();
    };
//--
//++ change amount, and return the new amount
    cuppa.shop.changeAmount = function(index, amount){
        var current_amount = cuppa.shop.products[index].amount;
        if(amount == current_amount) return current_amount;
        var amount_to_add = amount - current_amount;
        cuppa.shop.add(cuppa.shop.products[index].info, amount_to_add);
        cuppa.setCookie("cuppa_shop", cuppa.jsonEncode(cuppa.shop.products) );
        return cuppa.shop.products[index].amount;
    };
//++ update remote session
    cuppa.shop.updateSession = function(){
        if(cuppa.shop.ajaxSession) cuppa.shop.ajaxSession.abort();
        var data = {}
            data["function"] = "setSessionValue";
            data.name = "cuppa_shop";
            data.value = cuppa.getCookie("cuppa_shop");
        cuppa.shop.ajaxSession = jQuery.ajax({url:"administrator/classes/ajax/Functions.php", type:"POST", data:data});
    };
//--
//++ remove product
    cuppa.shop.remove = function(index){
        cuppa.shop.products.splice(index, 1);
        cuppa.setCookie("cuppa_shop", cuppa.jsonEncode(cuppa.shop.products) );
        jQuery(cuppa.shop).trigger("added");
        cuppa.shop.updateSession();
    };
//--
//++ end
    cuppa.shop.end = function(){
        cuppa.removeEventGroup("shop");
    }; cuppa.addRemoveListener(".shop", cuppa.shop.end);
//--