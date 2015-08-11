// Change page, this is used by Cuppa php class
     cuppa.changePage = function(page, submit_form, limit){
		jQuery(submit_form+" #page").val(page);
        jQuery(submit_form+" #page_item_start").val(parseInt(page)*parseInt(limit));
        jQuery(submit_form).submit();
	};
/* Google tracking data={path:String, title:String}
    This method track on google Analytics
*/
    cuppa.googleTrack = function(data){
       var params = {}
            if(cuppa.managerURL.path){ params.page = cuppa.managerURL.path; }
            if(data){
                if(data.path) params.page = data.path;
                if(data.title) params.title = data.title;
            }
        try{ ga('send', 'pageview', params); }catch(err){ }
     };
    cuppa.googleTrakingHandler = function(e, data){
        cuppa.googleTrack(data);
    };
// Share
    cuppa.share = function(social, title, summary, url, image, base64Decode){
        if(!social) social = "facebook";
        if(base64Decode){ 
            title = jQuery.base64Decode(title);
            summary = jQuery.base64Decode(summary);
        }
        if(social == "facebook"){
            FB.ui({ method: 'feed', name: title, link: url, picture: image, description: summary });
        }else if(social == "twitter"){
            var url_share = "http://twitter.com/home?&status=";
                if(title) url_share += title + ", ";
                url_share += url;
            var width = 500; var height = 500;
            var left = (screen.width/2)-(width/2); var top = (screen.height/2)-(height/2);
            window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }else if(social == "pinterest"){
            var url_share = "http://pinterest.com/pin/create/button/?";
                if(url) url_share += "&url=" + url;
                if(summary) url_share += "&description=" + summary;
                if(image) url_share += "&media=" + image;
            var width = 500; var height = 500;
            var left = (screen.width/2)-(width/2); var top = (screen.height/2)-(height/2);
            window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }else if(social == "google"){
            var url_share = "https://plus.google.com/share?";
                if(url) url_share += "&url=" + url;
            var width = 600; var height = 600;
            var left = (screen.width/2)-(width/2); var top = (screen.height/2)-(height/2);
            window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }else if(social == "linkedin"){
            var url_share = "https://www.linkedin.com/shareArticle?mini=true";
                if(url) url_share += "&url=" + url;
                if(title) url_share += "&title=" + title;
                if(summary) url_share += "&summary=" + summary;
                var width = 600; var height = 500;
                window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }
    };
// Button, change background color, text color
    cuppa.button = function(element, bg_color1, bg_color2, text_color1, text_color2, border_color1, border_color2 ){
        if(!bg_color1) bg_color1 = "#0DB3C7";
        if(!bg_color2) bg_color2 = "#097682";
        TweenMax.to(element, 0, { backgroundColor:bg_color1 });
        jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.3, { backgroundColor:bg_color2, ease:Cubic.easeInOut } ) } );
        jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { backgroundColor:bg_color1, ease:Cubic.easeInOut } ) } );
        if(text_color1 && text_color2){
            TweenMax.to(element, 0, { color:text_color1 });
            jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.3, { color:text_color2, ease:Cubic.easeInOut } ) } );
            jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { color:text_color1, ease:Cubic.easeInOut } ) } );
        }
        if(border_color1 && border_color2){
            TweenMax.to(element, 0, { borderColor:border_color1 });
            jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.3, { borderColor:border_color2, ease:Cubic.easeInOut } ) } );
            jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { borderColor:border_color1, ease:Cubic.easeInOut } ) } );
        }
    };
// Button BackgroundMove, move the background image
    cuppa.buttonBackgroundMove = function(element, state1, state2){
        if(state1 == undefined) state1 = "center top"
        if(state2 == undefined) state1 = "center bottom"
        TweenMax.to(element, 0, { backgroundPosition:state1 });
        jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.2, { backgroundPosition:state2 } ) } );
        jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { backgroundPosition:state1 } ) } );
    };
/* Button divs change, this acept a array with many divs, and change the state of all these
    element = {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } }
    inner_element = [   {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } },
                        {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } },
                        {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } }
                    ]
*/
    cuppa.buttonChangeDivsState = function(principal_element, inner_elements){
        if(principal_element.duration1 == undefined) principal_element.duration1 = 0.3;
        if(principal_element.duration2 == undefined) principal_element.duration2 = 0.2;
        if(principal_element.state1 == undefined) principal_element.state1 = {}
        if(principal_element.state2 == undefined) principal_element.state2 = {}
        if(principal_element.state1.ease == undefined) principal_element.state1.ease = Cubic.easeInOut;
        if(principal_element.state2.ease == undefined) principal_element.state2.ease = Cubic.easeInOut;
        TweenMax.to(principal_element.element, 0, principal_element.state1);
        
        if(inner_elements == undefined) inner_elements = [];
        for(i = 0; i < inner_elements.length; i++){
            var element = inner_elements[i];
            if(element.duration1 == undefined) element.duration1 = 0.3;
            if(element.duration2 == undefined) element.duration2 = 0.2;
            if(element.state1 == undefined) element.state1 = {}
            if(element.state2 == undefined) element.state2 = {}
            if(element.state1.ease == undefined) element.state1.ease = Cubic.easeInOut;
            if(element.state2.ease == undefined) element.state2.ease = Cubic.easeInOut;
            TweenMax.to(jQuery(this).find(element.element), 0, element.state1);
        }
        jQuery(principal_element.element).bind("mouseenter", function(){ 
            TweenMax.to(this, principal_element.duration1, principal_element.state2 )
            for(i = 0; i < inner_elements.length; i++){
                var element = inner_elements[i];
                TweenMax.to(jQuery(this).find(element.element), element.duration1, element.state2);
            }
        } );
        jQuery(principal_element.element).bind("mouseleave", function(){ 
            TweenMax.to(this, principal_element.duration2, principal_element.state1 ) 
            for(i = 0; i < inner_elements.length; i++){
                var element = inner_elements[i];
                TweenMax.to(jQuery(this).find(element.element), element.duration2, element.state1);
            }
        } );
    };
/*  Button 3D, effect 3d cube between 2 elements 
        Orientation: horizontal, vertical
*/
    cuppa.button3D = function(element, element_state1, element_state2, duration, orientation){
        if(!orientation) orientation = "horizontal";
        if(duration == undefined) duration = 0.2;
        if(orientation == "horizontal"){
            TweenMax.to(jQuery(element).find(element_state1), 0, {rotationY:0, transformPerspective:600, transformOrigin:"right center" } );
            TweenMax.to(jQuery(element).find(element_state2), 0, {rotationY:90, transformPerspective:600, transformOrigin:"left center" } );
            jQuery(element).bind("mouseenter", function(){
                if(jQuery(this).hasClass("selected")) return;
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationY:-90, x:-jQuery(element1).width(),  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationY:0, x:-jQuery(element2).width(), ease:Cubic.easeInOut } )
            });
            jQuery(element).bind("mouseleave", function(){
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationY:0, x:0,  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationY:90, x:0, ease:Cubic.easeInOut } )
            });
        }else{
            TweenMax.to(jQuery(element).find(element_state1), 0, {rotationX:0, transformPerspective:600, transformOrigin:"center bottom" } );
            TweenMax.to(jQuery(element).find(element_state2), 0, {rotationX:-90, transformPerspective:600, transformOrigin:"top center" } );
            
            jQuery(element).bind("mouseenter", function(){
                if(jQuery(this).hasClass("selected")) return;
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationX:90, y:-jQuery(element1).height(),  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationX:0, y:-jQuery(element2).height(), ease:Cubic.easeInOut } )
            });
            jQuery(element).bind("mouseleave", function(){
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationX:0, y:0,  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationX:-90, y:0, ease:Cubic.easeInOut } )
            });
        }
    };
// Initial text on inputText inside  
    (function($){
        $.fn.extend({
            preTextCuppa:function(value){
                if(value == undefined) return;   
                return this.each(function(){
                    if(!cuppa.trim($(this).val()) || $(this).val() == value ) $(this).addClass("preText").val(value);
                    $(this).focus(function(){
                        if(value ==$(this).val()) $(this).removeClass("preText").val("");
                    })
                    $(this).blur(function(){
                        if( cuppa.trim($(this).val()) == '') $(this).addClass("preText").val(value);
                    });
                });
            }
        });
    })(jQuery);
/*  Limit the input text to some value, Version - 1.3.0
 *  Website - http://www.thimbleopensource.com/tutorials-snippets/jquery-plugin-filter-text-input
 *  Example:    $('#text_input').filter_input_cuppa({regex:'[a-z]'}); 
 *              $('#text_input').filter_input_cuppa({regex:'[A-Z0-9]'});
 *              $('#text_input').filter_input_cuppa({regex:'[A-Z0-9@_*]'});
 */
    (function($){    
        $.fn.extend({   
            filter_input_cuppa: function(options) {  
                  var defaults = {  
                      regex:".",
                      negkey: false, // use "-" if you want to allow minus sign at the beginning of the string
                      live:false,
                      events:'keypress paste'
                  }  
                  var options =  $.extend(defaults, options);  
                  function filter_input_function(event) {
                    var input = (event.input) ? event.input : $(this);
                    if (event.ctrlKey || event.altKey) return;
                    if (event.type=='keypress') {
                      var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                      // 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete
                      if (key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46) {
                        // if charCode = key & keyCode = 0
                        // 35 = #, 36 = $, 37 = %, 39 = ', 46 = .
                        if (event.charCode == 0 && event.keyCode == key) {
                          return true;                                             
                        }
                      }
                      var string = String.fromCharCode(key);
                      // if they pressed the defined negative key
                      if (options.negkey && string == options.negkey) {
                        // if there is already one at the beginning, remove it
                        if (input.val().substr(0, 1) == string) {
                          input.val(input.val().substring(1, input.val().length)).change();
                        } else {
                          // it isn't there so add it to the beginning of the string
                          input.val(string + input.val()).change();
                        }
                        return false;
                      }
                      var regex = new RegExp(options.regex);
                    } else if (event.type=='paste') {
                      input.data('value_before_paste', event.target.value);
                      setTimeout(function(){
                        filter_input_function({type:'after_paste', input:input});
                      }, 1);
                      return true;
                    } else if (event.type=='after_paste') {
                      var string = input.val();
                      var regex = new RegExp('^('+options.regex+')+$');
                    } else {
                      return false;
                    }
        
                    if (regex.test(string)) {
                      return true;
                    } else if (typeof(options.feedback) == 'function') {
                      options.feedback.call(this, string);
                    }
                    if (event.type=='after_paste') input.val(input.data('value_before_paste'));
                    return false;
                  }
                  var jquery_version = $.fn.jquery.split('.');
                  if (options.live) {
                    if (parseInt(jquery_version[0]) >= 1 && parseInt(jquery_version[1]) >= 7) {
                      $(this).on(options.events, filter_input_function); 
                    } else {
                      $(this).live(options.events, filter_input_function); 
                    }
                  } else {
                    return this.each(function() {  
                      var input = $(this);
                      if (parseInt(jquery_version[0]) >= 1 && parseInt(jquery_version[1]) >= 7) {
                        input.off(options.events).on(options.events, filter_input_function);
                      } else {
                        input.unbind(options.events).bind(options.events, filter_input_function);
                      }
                    });  
                  }
            }  
        });  
    })(jQuery);

/* Upload file
    Require jquery_file_upload
    <link href="js/jquery_file_upload/css/jquery_file_upload.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery_file_upload/vendor/jquery.ui.widget.js"></script>
    <script src="js/jquery_file_upload/jquery.iframe-transport.js"></script>
    <script src="js/jquery_file_upload/jquery.fileupload.js"></script>
*/
    cuppa.configUploadFile = function(name, folder, php_path, unique_name, show_info){
        if(show_info == undefined) show_info = true;
        jQuery(function () {
            if(!php_path) php_path = 'js/jquery_file_upload/server/php/';
            if(!folder) folder = "media/upload_files";
            var items = jQuery(name).get();
            for(var i = 0; i < items.length; i++){
                var item = items[i];
                //++ Create File Type
                    var uniqueName = "file_"+new Date().getTime();
                    var file = jQuery(".assets .button_upload").clone()
                    var info = jQuery(".assets .info_upload").clone();
                    jQuery(item).after(file);
                //--
                //++ Config
                    var params = {}
                        params.jqXHR;
                        params.item_reference = item;
                        params.file_reference = file;
                        params.file_input = jQuery(file).find(".file_type").get(0);
                        params.info_reference = info;
                        params.url = php_path;
                        params.formData = {path:folder, unique_name:unique_name};
                        params.dataType = 'json';
                        params.dropZone = file;
                        params.add = function (e, data) {
                            var options = jQuery(this).data().blueimpFileupload.options;
                                options.jqXHR = data.submit()
                        },
                        params.send = function(e,  data){
                            var name = data.files[0].name;
                            var options = jQuery(this).data().blueimpFileupload.options;
                                options.file_name = name;
                            jQuery(options.item_reference).val("")
                            jQuery(options.info_reference).find(".name").html(name);
                            jQuery(options.info_reference).find(".bar").width(0);
                            jQuery(options.info_reference).find(".progress").css("display", "block");
                            jQuery(options.info_reference).find(".message").css("display","none");
                            jQuery(options.info_reference).removeClass("info_upload_error");
                            if(show_info) jQuery(options.file_reference).after(options.info_reference);
                            jQuery(options.info_reference).find(".close").bind("click", options, function(e, data){
                                 var options = e.data;
                                jQuery(options.info_reference).remove();
                                options.jqXHR.abort();
                            } );
                            jQuery(options.item_reference).trigger("send", options);
                            jQuery(options.item_reference).trigger("init", options);
                        }
                        params.progressall = function(e, data){
                            var options = jQuery(this).data().blueimpFileupload.options;
                            var progress = Math.round((data.loaded / data.total)*100);
                            jQuery(options.info_reference).find(".bar").width(progress+"%");
                            jQuery(options.item_reference).trigger("progress", [{options:options, progress:progress}]);
                        }
                        params.done = function(e,data){
                            var options = jQuery(this).data().blueimpFileupload.options;
                            if(data.result.files[0].error){
                                jQuery(options.info_reference).find(".progress").css("display", "none");
                                jQuery(options.info_reference).find(".message").css("display","block").html(data.result.files[0].error);
                                jQuery(options.info_reference).addClass("info_upload_error");
                            }else{
                                jQuery(options.info_reference).remove();
                                var url = folder+"/"+data.result.files[0].name;
                                jQuery(options.item_reference).val(url);
                                jQuery(options.item_reference).trigger("change", options);
                                jQuery(options.item_reference).trigger("complete", options);
                            }
                        }
                        params.fail = function(e,data){
                            var options = jQuery(this).data().blueimpFileupload.options;
                            jQuery(options.info_reference).find(".progress").css("display", "none");
                            jQuery(options.info_reference).find(".message").css("display","block").html("Server error, show console message");
                            jQuery(options.info_reference).addClass("info_upload_error");
                            try{ console.log(data.messages); }catch(err){}
                        }
                    jQuery(jQuery(file).find(".file_type")).fileupload(params);
                //--
            }
        });
    };
/**
 * Browser properties:
    -fullName (Opera, Google Chrome, Mozilla Firefox...)
    -name (opera, chrome, firefox...)
    -code (op, ch, ff...)
    -fullVersion (5.0.3.12...)
    -version (5)
    -mobile (true, false)
    -platform (windows 7, Linux, Machintosh...)
    @author Rbrt
    @version 2.1.5
    @returns Browser object
    Example: var browser_data = new cuppa.browser();
                 browser_data.name;
 */
    cuppa.browser = function(){	
        // ---- public properties -----
        this.fullName = 'unknown'; // getName(false);
        this.name = 'unknown'; // getName(true);
        this.code = 'unknown'; // getCodeName(this.name);
        this.fullVersion = 'unknown'; // getVersion(this.name);
        this.version = 'unknown'; // getBasicVersion(this.fullVersion);
        this.mobile = false; // isMobile(navigator.userAgent);
        this.width = screen.width;
        this.height = screen.height;
        this.platform =  'unknown'; //getPlatform(navigator.userAgent);
        
        // ------- init -------    
        this.init = function() { //operative system, is an auxiliary var, for special-cases
            //the first var is the string that will be found in userAgent. the Second var is the common name
            // IMPORTANT NOTE: define new navigators BEFORE firefox, chrome and safari
            var navs = [
                { name:'Opera Mobi', fullName:'Opera Mobile', pre:'Version/' },
                { name:'Opera Mini', fullName:'Opera Mini', pre:'Version/' },
                { name:'Opera', fullName:'Opera', pre:'Version/' },
                { name:'MSIE', fullName:'Microsoft Internet Explorer', pre:'MSIE ' },  
                { name:'BlackBerry', fullName:'BlackBerry Navigator', pre:'/' }, 
                { name:'BrowserNG', fullName:'Nokia Navigator', pre:'BrowserNG/' }, 
                { name:'Midori', fullName:'Midori', pre:'Midori/' }, 
                { name:'Kazehakase', fullName:'Kazehakase', pre:'Kazehakase/' }, 
                { name:'Chromium', fullName:'Chromium', pre:'Chromium/' }, 
                { name:'Flock', fullName:'Flock', pre:'Flock/' }, 
                { name:'Galeon', fullName:'Galeon', pre:'Galeon/' }, 
                { name:'RockMelt', fullName:'RockMelt', pre:'RockMelt/' }, 
                { name:'Fennec', fullName:'Fennec', pre:'Fennec/' }, 
                { name:'Konqueror', fullName:'Konqueror', pre:'Konqueror/' }, 
                { name:'Arora', fullName:'Arora', pre:'Arora/' }, 
                { name:'Swiftfox', fullName:'Swiftfox', pre:'Firefox/' }, 
                { name:'Maxthon', fullName:'Maxthon', pre:'Maxthon/' },
                // { name:'', fullName:'', pre:'' } //add new broswers
                // { name:'', fullName:'', pre:'' }
                { name:'Firefox',fullName:'Mozilla Firefox', pre:'Firefox/' },
                { name:'Chrome', fullName:'Google Chrome', pre:'Chrome/' },
                { name:'Safari', fullName:'Apple Safari', pre:'Version/' }
            ];
        
            var agent = navigator.userAgent, pre;
            //set names
            for (i in navs) {
            	if (agent.indexOf(navs[i].name)>-1) {
            	    pre = navs[i].pre;
            	    this.name = navs[i].name.toLowerCase(); //the code name is always lowercase
            	    this.fullName = navs[i].fullName; 
                    if (this.name=='msie') this.name = 'iexplorer';
                    if (this.name=='opera mobi') this.name = 'opera';
                    if (this.name=='opera mini') this.name = 'opera';
                    break; //when found it, stops reading
                }
            }//for
            
          //set version
            if ((idx=agent.indexOf(pre))>-1) {
                this.fullVersion = '';
                this.version = '';
                var nDots = 0;
                var len = agent.length;
                var indexVersion = idx + pre.length;
                for (j=indexVersion; j<len; j++) {
                    var n = agent.charCodeAt(j); 
                    if ((n>=48 && n<=57) || n==46) { //looking for numbers and dots
                        if (n==46) nDots++;
                        if (nDots<2) this.version += agent.charAt(j);
                        this.fullVersion += agent.charAt(j);
                    }else j=len; //finish sub-cycle
                }//for
                this.version = parseInt(this.version);
            }
            
            // set Mobile
            var mobiles = ['mobi', 'mobile', 'mini', 'iphone', 'ipod', 'ipad', 'android', 'blackberry'];
            for (var i in mobiles) {
                if (agent.toLowerCase().indexOf(mobiles[i])>-1) this.mobile = true;
            }
            if (this.width<700 || this.height<600) this.mobile = true;
            
            // set Platform        
            var plat = navigator.platform;
            if (plat=='Win32' || plat=='Win64') this.platform = 'Windows';
            if (agent.indexOf('NT 5.1') !=-1) this.platform = 'Windows XP';        
            if (agent.indexOf('NT 6') !=-1)  this.platform = 'Windows Vista';
            if (agent.indexOf('NT 6.1') !=-1) this.platform = 'Windows 7';
            if (agent.indexOf('Mac') !=-1) this.platform = 'Macintosh';
            if (agent.indexOf('Linux') !=-1) this.platform = 'Linux';
            if (agent.indexOf('iPhone') !=-1) this.platform = 'iOS iPhone';
            if (agent.indexOf('iPod') !=-1) this.platform = 'iOS iPod';
            if (agent.indexOf('iPad') !=-1) this.platform = 'iOS iPad';
            if (agent.indexOf('Android') !=-1) this.platform = 'Android';
            
            if (this.name!='unknown') {
                this.code = this.name+'';
                if (this.name=='opera') this.code = 'op';
                if (this.name=='firefox') this.code = 'ff';
                if (this.name=='chrome') this.code = 'ch';
                if (this.name=='safari') this.code = 'sf';
                if (this.name=='iexplorer') this.code = 'ie';
                if (this.name=='maxthon') this.code = 'mx';
            }
            
            //manual filter, when is so hard to define the navigator type
            if (this.name=='safari' && (this.platform=='Linux' || this.platform=='Android')) {
                this.name = 'unknown';
                this.fullName = 'unknown';
                this.code = 'unknown';
            }
            
            if (this.name=='unknown') {
                if (agent.toLowerCase().indexOf('webkit')) this.fullName = 'unknown webkit navigator';
            }
            
        };//function
        this.init();
    };