cuppa.mediaManager = {};
// Load media
    cuppa.mediaManager.load = function(url, type, name, autoplay, loop){
        if(type == undefined) type == "audio";
        if(type == "audio"){
            var media = "<audio></audio>";
                media = jQuery(media)[0];
                jQuery(media).addClass(name).attr("id", name).css("display", "none");
                if(autoplay) jQuery(media).attr("autoplay", "autoplay");
                if(loop) jQuery(media).attr("loop","loop");
                jQuery(media).attr("src", url);
                jQuery("body").append(media);
        }else{
            var media = "<video></video>";
                media = jQuery(media)[0];
                jQuery(media).addClass(name).attr("id", name);
                if(autoplay) jQuery(media).attr("autoplay", "autoplay");
                if(loop) jQuery(media).attr("loop","loop");
                jQuery(media).attr("src", url);
                return media;                
        }
    };
// Play
    cuppa.mediaManager.play = function(reference, loop){
        if(reference){
            try{
                if(loop) jQuery(reference).get(0).loop = true; else jQuery(reference).get(0).loop = false;
                jQuery(reference).get(0).play();
            }catch(err){}
        }else{
            var medias = jQuery("body").find("audio, video");
            for (var i = 0; i < medias.length; i++){
                this.play(medias[i], loop);
            }
        }
    };
// Seek
    cuppa.mediaManager.seek = function(reference, value, play, loop ){
        try{ jQuery(reference).get(0).currentTime = value; }catch(err){}
        if(play) this.play(reference, loop);
    };
// Stop
    cuppa.mediaManager.stop = function(reference){
        if(reference){
            try{
                jQuery(reference).get(0).pause();
                jQuery(reference).get(0).currentTime = 0;
            }catch(err){}
        }else{
            var medias = jQuery("body").find("audio, video");
            for (var i = 0; i < medias.length; i++){
                this.stop(medias[i]);
            }
        }
    };
// Pause
    cuppa.mediaManager.pause = function(reference){
        if(reference){
            try{
                jQuery(reference).get(0).pause();
            }catch(err){}
        }else{
            var medias = jQuery("body").find("audio, videos");
            for (var i = 0; i < medias.length; i++){
                this.pause(medias[i]);
            }
        }
    };
// Set Volume
    cuppa.mediaManager.setVolume = function(reference, value, duration, initialValue){
        if(reference){
            var media = jQuery(reference).get(0); if(!media) return;
            if(value > 1) value = 1; if(value < 0) value = 0;
            if(media.paused) this.play(reference);
            if(duration){
                if(initialValue != undefined) media.volume = initialValue;
                var params = {"value": value};      
                var options = { "duration":duration, "easing":'swing', 
                                "step":function(){ media.volume = this.value }
                                }
                jQuery({value:media.volume}).animate(params, options);
            }else{ 
                media.volume = value;
            }
        }else{
            var medias = jQuery("body").find("audio, video");
            for (var i = 0; i < medias.length; i++){
                this.setVolume(medias[i], value, duration, initialValue);
            }
        }
    };
// Change
    cuppa.mediaManager.change = function(reference, value){
        if(!value) return;
        jQuery(reference).find("source").remove();
        jQuery(reference).removeAttr("src");
        var sources = value.split(",");
        for(var i = 0; i < sources.length; i++){
            var source = '<source src="'+jQuery.trim(sources[i])+'"></source>'
            jQuery(reference).append(source);
        }
        this.play(reference);
    };
// Alpha processiong, only for videos
    cuppa.mediaManager.alphaProcess = function(reference){
        jQuery(reference).css("display", "none");
        var container = jQuery("<div></div>");
            jQuery(container).css("position","relative");
            container.addClass("video_alpha_wrapper");
        jQuery(jQuery(reference).parent()).append(container);
        jQuery(container).append(jQuery(reference));
        
        if(jQuery(reference).attr("autoplay")){
            cuppa.mediaManager.play(reference, jQuery(reference)[0].loop);
        }
        var bufferCanvas = jQuery("<canvas id='buffer' class='buffer'></canvas>");
            jQuery(bufferCanvas).css("display", "none");
        var outputCanvas = jQuery("<canvas id='output' class='output'></canvas>");
        jQuery(container).append(bufferCanvas);
        jQuery(container).append(outputCanvas);
        
        cuppa.canvasSize(bufferCanvas, jQuery(reference).width(), jQuery(reference).height());
        cuppa.canvasSize(outputCanvas, jQuery(reference).width(), jQuery(reference).height()*0.5);
        var video = jQuery(reference).get(0);
        var buffer = jQuery(bufferCanvas).get(0).getContext('2d');
        var output = jQuery(outputCanvas).get(0).getContext('2d');
        var width = jQuery(outputCanvas).width();
        var height = jQuery(outputCanvas).height();
        function processFrame() {
            buffer.drawImage(video, 0, 0);
            var image = buffer.getImageData(0, 0, width, height),
            imageData = image.data,
            alphaData = buffer.getImageData(0, height, width, height).data;
            for (var i = 3, len = imageData.length; i < len; i = i + 4) { imageData[i] = alphaData[i-1]; }
            output.putImageData(image, 0, 0, 0, 0, width, height);
        }
        cuppa.addEnterFrame(processFrame, 60,"video_alpha");
    }