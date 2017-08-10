function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function R(min, max) {
    return min + (Math.random() * (max - min))
};

				// Create Clouds
            body = $('body'),
						w = window.innerWidth,
						h = window.innerHeight;

    



				// Fly
				var pageWidth = window.innerWidth,
            duration = pageWidth / 60,
            d = pageWidth * 2,
						distance = -d,
						reverseDistance = d;

        var flyingTl = new TimelineMax({
            repeat: -1,
            delay: 1
        });
        TweenMax.set('.plane-elements', { css: {'top': '4%'} });
        TweenMax.set('.plane-elements', { scale:0.125 });



        flyingTl.to('.plane-elements', duration, {
            x: distance, y: 0, z: 0,
            ease: Power0.easeNone, y: 0,            
            onComplete: planeAltitude
        })
            .to('.plane-elements', duration, {
                x: reverseDistance, y: 0, z: 0,
                ease: Power0.easeNone, y: 0,
                onComplete: planeAltitude
            });

        function planeAltitude(e) {
            $('.plane-elements .direction').toggleClass('reverse');

            var altitude = getRandomIntInclusive(5,15) + '%';
								TweenMax.set('.plane-elements', { css: {'top': '4%'} });
					
					  var value = getRandomIntInclusive(2,4),
								distanceAway = '0.' + value;
					  
								TweenMax.set('.plane-elements', { scale:0.1 });
        }


				// Propeller and Banner
				TweenMax.to('.plane-elements', 0.9, { x:2, y:1, rotation:0.5, yoyo:true, repeat:-1 });
				TweenMax.to('.propeller', 0.05, { rotationX:'60deg', yoyo:true,	repeat:-1 });
				TweenMax.to('.banner', 0.7, { y:5, width:895, height: 170, yoyo:true, repeat:-1 });
				TweenMax.to('.banner-tip', 0.65, { x:-10, y:5, height:135 , yoyo:true, repeat:-1 });
