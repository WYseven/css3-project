var aStep = $(".step",$(".twoContent")[0]);

for( var i = 0; i < aStep.length; i++ ){
	addStyle( aStep[i],i );
};

function addStyle( step ){
	var aImg = $("img", step);
	for( var i = 0; i < aImg.length; i++ ){
		console.log( aImg[i].width );
		aImg[i].style.maxWidth = aImg[i].width + "px";
		aImg[i].style.width = "100%";
	};
}
