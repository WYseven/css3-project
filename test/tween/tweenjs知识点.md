timeScale::Number[读写]  用来设置或读取时间轴的回放速率,比如0.5为一半速率，1为正常速度，2为2倍速度

totalDuration:Number[读写]  用来设置或读取总的持续时间（或帧数），包括循环和循环间隔的时间

clear( tweens:Array = null ):void

    说明：用来清空时间轴上的所有动画和时间轴实例，如果传入一个数组参数，则可以删除特定的动画

    参数：tweens:要删除的动画组成的数组

TweenLite.to( target:Object, duration:Number, vars:Object):TweenLite

功能：用来创建动画

参数：target:要创建动画的影片剪辑

        duration:动画持续的时间，以秒为单位（如果整个动画模式是基于帧的话则以帧为单位）

        vars：要参与动画的属性，以对象形式来写，比如{x:100,y:100,…},这些属性是动画完成的目标

TweenLite.delayedCall( delay:Number,onComplete:Function,onCompleteParams:Array = null, useFrames:Boolean = false):TweenLite

功能：用于在一定时间或一定帧数后自动执行一个函数，相当于一个延迟器吧

参数：delay:要延迟执行函数的时间（或是帧数）

        onComplete:要延迟执行的函数

        onCompleteParams：要延迟执行的函数的参数，以数组形式传入

        useFrames:指明是用时间还是帧数来记时