function $(selector,content){
	content = content || document;
	var tag = selector.charAt(),
		arr = [],
		allClassEle = null;
	if( tag === "#" ){
		selector = selector.substring(1);
		return content.getElementById(selector);
	}else if( tag === "." ){
		selector = selector.substring(1);	
		allClassEle = content.getElementsByTagName("*");	// [div,ul,li]
		var re = new RegExp('\\b'+ selector +'\\b');
		for( var i = 0; i < allClassEle.length; i++ ){
			if( re.test( allClassEle[i].className ) ){
				arr.push(allClassEle[i]);
			}
		};

		return arr;
	}else{
		return content.getElementsByTagName(selector);
	}
};
function addTransitionEnd(obj,callBack){
	/*obj.addEventListener("webkitTransitionEnd",function (ev){
		callBack && callBack.call(obj,ev);
	});*/
	addEvent(obj,"webkitTransitionEnd",callBack)
};

function view(){
	return {
		H:document.documentElement.clientHeight,
		W:document.documentElement.clientWidth
	}
};

function addEvent(obj,action,fn){
	if( obj.attachEvent ){
		obj.attachEvent("on"+action,function (ev){
			fn.call(obj,ev);	
		});
	}else{
		obj.addEventListener(action,fn,false);
	}
};
//判断可视区是否小于950
function isLess950(){
	return view().W < 950;	
}