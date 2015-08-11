/* Replace a bit of string in a String */
	cuppa.replace =  function(str, oldSubStr, newSubStr) {
	   try{ var str = str.split(oldSubStr).join(newSubStr) }catch(err){}
       return str;
	};
/* Method Trim() */
	cuppa.trim = function(string){
	   if(string) return string.replace(/^\s+|\s+$/g, '');
       else return "";
	};
/* Validate if a string is email, Return true of false */
	cuppa.email = function(value){
	   var emailExpression = /^[a-z 0-9][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
	   return emailExpression.test(cuppa.trim(value));
	};
/* Validate if a string is a url, Return true of false */
    cuppa.url = function(str) {
        var regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        return regexp.test(str);
    }
/* Delete more of two spaces */
	cuppa.deleteDoubleSpaces = function(value){
		var valueExpression = /\s+/gi;
		return value.replace(valueExpression, " ");
	};
/* Search a word inside of a string. Return true or false */
	cuppa.searchWord = function(word, string) {
		word = word.toLowerCase();
		string = string.toLowerCase();
		var result = string.search(word);
		if (result == -1)
			return false;
		else 
			return true;
	};
/* String like, similar to LIKE in MySQL */
    cuppa.stringLike = function(string, like){
        if(string.indexOf(like) >= 0){
            return true;
        }else{
            return false;
        }
    }    
/* Capitalize */
    cuppa.capitaliseFirstLetter = function(string){
        string = string.toLocaleLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    cuppa.capitaliseAllWords = function(str){
        str = str.toLocaleLowerCase();
        var pieces = str.split(" ");
        for ( var i = 0; i < pieces.length; i++ ){ 
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    };
/* Convert number a money format: 100,000.15 */
	cuppa.numberToMoney = function(value, decimalSeparator) {
        value = String(value);
        if (value == "0" || value == "NaN" || value == "") return "0";
        if (decimalSeparator == undefined) decimalSeparator = ".";
        var moneyFormat = "";
        if(decimalSeparator == "."){
    		var arrayData = value.split(".");
    		var floatData = ""; if (arrayData.length > 1) floatData = "." + arrayData[arrayData.length - 1];
    			arrayData = arrayData[0].split("");
    			arrayData.reverse();
    		for (var i = arrayData.length - 1; i >= 0; i--) {
    			moneyFormat += arrayData[i];
    			if (i > 0) {
    				var result = (i / 3);
    				var result = result - Math.floor(i / 3);
    				if (result == 0 && arrayData[i] != "-") {
    					moneyFormat += ",";
    				}
    			}
    		}
        }else if(decimalSeparator == ","){
            var arrayData = value.split(",");
    		var floatData = ""; if (arrayData.length > 1) floatData = "," + arrayData[arrayData.length - 1];
    			arrayData = arrayData[0].split("");
    			arrayData.reverse();
    		for (var i = arrayData.length - 1; i >= 0; i--) {
    			moneyFormat += arrayData[i];
    			if (i > 0) {
    				var result = (i / 3);
    				var result = result - Math.floor(i / 3);
    				if (result == 0 && arrayData[i] != "-") {
    					moneyFormat += ".";
    				}
    			}
    		}
        }
        moneyFormat += floatData;
		return  moneyFormat;
	};
/* Convert money format to number: 100000.15 */
    cuppa.moneyToNumber = function(value, decimalSeparator){
        value = String(value);
        if (value == "0" || value == "NaN" || value == "") return "0";
        if (decimalSeparator == undefined) decimalSeparator = ".";
        if(decimalSeparator == "."){
            value = cuppa.replace(value, ",", "")            
        }else{
            value = cuppa.replace(value, ".", "");
            value = cuppa.replace(value, ",", ".");
        }
        return parseFloat(value);
    };
/* Get value of string with URLFormat 
    Example: &var1=mi_var1&var2=mi_var2&var3=mi_var3
            cuppa.urlValue('var2')
            return mi_var2
*/
	cuppa.urlValue = function(name, string){
		if(!string) string = window.location.href;
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp ( regexS );
		var tmpURL = string;
		var results = regex.exec( tmpURL );
		if( results == null )
			return"";
		else
			return results[1];
	};
/* Convert url string to object */
    cuppa.urlToObject = function(string){
        var data = string.split("&");
        var object = {}
        for(var i = 0; i < data.length; i++){
            var item =  data[i].split("=");
            object[item[0]] = item[1];
        }
        return object;
    };
/* Get UrlFriendly
    Example: news/article-news-1
 */
    cuppa.urlFriendly = function(str,max) {
        if(!str) return;
        if (max === undefined) max = 255;
            var a_chars = new Array();
                a_chars.push(new Array("a",/[áàâãªÁÀÂÃ]/g));
                a_chars.push(new Array("e",/[éèêÉÈÊ]/g));
                a_chars.push(new Array("i",/[íìîÍÌÎ]/g));
                a_chars.push(new Array("o",/[òóôõÓÒÔÕ]/g));
                a_chars.push(new Array("u",/[úùûÚÙÛ]/g));
                a_chars.push(new Array("c",/[çÇ]/g));
                a_chars.push(new Array("n",/[Ññ]/g));
                a_chars.push(new Array("-",/[.]/g));
                a_chars.push(new Array("",/['"()\[\]/*++\¿?#:;@$º&*^·,.!¡%=+|]/g));
        for(var i=0; i < a_chars.length; i++){
            str = str.replace(a_chars[i][1], a_chars[i][0]);
        }
        return str.replace(/\s+/g,'-').replace(/\_+/g,'-').toLowerCase().replace(/\-{2,}/g,'-').replace(/(^\s*)|(\s*$)/g, '').substr(0,max);
    };
/* Get Path vars Vars 
    Exampe: news/article-news-1
            Return: Array('news','article-news-1')
*/
    cuppa.pathVars =  function(str, number_return){
        if(number_return == undefined) number_return = false;
        str = str.split("/");
        var array = new Array();
        for(var i = 0; i < str.length; i++){
            if(str[i]){
                str[i] = jQuery.trim(str[i]);
                if(number_return){
                    var number = parseInt(str[i]);
                    if(number) str[i] = number;
                }
                array.push(str[i]);
            }
        }
        return array;
    };
/* get urlEncode / urlDecode */
    cuppa.urlEncode = function(string){
        return jQuery.URLEncode(string);
    };
    cuppa.urlDecode = function(string){
        return jQuery.URLDecode(string);
    };
/* Get UTF8 Encode */    
    cuppa.utf8Encode = function(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	};
/* Get UTF8 Decode */
    cuppa.utf8Decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	};
/* Cut text */
    cuppa.cutText = function(delimiter, text, lenght, string_to_end, delimiter_forced, remove_tags){
        if(text == undefined) text = "";
        if(delimiter == undefined) delimiter = " ";
        if(lenght == undefined) lenght = 200;
        if(string_to_end == undefined) string_to_end = "";
        if(delimiter_forced == undefined) delimiter_forced = false;
        if(remove_tags == undefined) remove_tags = false;
        if(remove_tags) text = cuppa.removeTags(text);
        
        if(delimiter_forced){
            text = text.substr(0, lenght);
            if(cuppa.strrpos(text, delimiter) !== false) text = cuppa.trim(text.substr(0, cuppa.strrpos(text, delimiter)));
            text += string_to_end;
        }else if(text.length > lenght ){
            text = text.substr(0, lenght);
            if(cuppa.strrpos(text, delimiter) !== false) text = cuppa.trim(text.substr(0, cuppa.strrpos(text, delimiter)));
            text += string_to_end;                    
        }
        return text;
    };
/* Strpost*/
    cuppa.strpos = function(haystack, needle, offset) {
      var i = (haystack + '')
        .indexOf(needle, (offset || 0));
      return i === -1 ? false : i;
    };
/* Strrpost */
    cuppa.strrpos = function(haystack, needle, offset) {
      var i = -1;
      if (offset) {
        i = (haystack + '')
          .slice(offset)
          .lastIndexOf(needle);
        if (i !== -1) {
          i += offset;
        }
      } else {
        i = (haystack + '')
          .lastIndexOf(needle);
      }
      return i >= 0 ? i : false;
    };
/* Remove tags */
    cuppa.removeTags = function(input, allowed) {
      allowed = (((allowed || '') + '')
        .toLowerCase()
        .match(/<[a-z][a-z0-9]*>/g) || [])
        .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '')
        .replace(tags, function($0, $1) {
          return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    };
/* Convert the \n to <br /> */
    cuppa.nl2br = function(value){
        return value.replace(/\r?\n/g, '<br />');
    };
 /* Convert the <br /> to  \n */
    cuppa.br2nl = function(value){
        return value.replace(/<br\s*[\/]?>/gi, "\n");
    };
 /* JSON Decode*/
    cuppa.jsonDecode = function(value, base64_decode){
        if(base64_decode == undefined) base64_decode = true;
        if(base64_decode) value = jQuery.base64Decode(value);
        try{ value = jQuery.parseJSON(value); }catch(err){}
        return value;
    }
 /* JSON Encode*/
    cuppa.jsonEncode = function(value, base64_encode){
        if(base64_encode == undefined) base64_encode = true;
        try{ value = jQuery.toJSON(value); }catch(err){}
        if(base64_encode) value = jQuery.base64Encode(value);
        return value;
    };
/* Number format */    
    cuppa.numberFormat = function(number, decimals, dec_point, thousands_sep) {
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + (Math.round(n * k) / k)
            .toFixed(prec);
        };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
          s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
          if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
          }
          if ((s[1] || '')
            .length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1)
              .join('0');
          }
          return s.join(dec);
    };