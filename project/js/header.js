
window.onload = function(){

	if( isLess950() ){
		document.body.className = "r950";
	};

	var mianContent = $(".m_content");
	//初始块的高度
	initContentH(mianContent);

	//ft_animation();
};

