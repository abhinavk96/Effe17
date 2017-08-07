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
                var pageHeight = window.innerHeight,
                duration = pageHeight/5,
                d = pageHeight
                

        var flyingTl = new TimelineMax({
            repeat: -1,
            delay: 0.5
        });
        TweenMax.set('.balloon-elements', { css: {'left': '40%'} });
        TweenMax.set('.balloon-elements', { scale:0.4 });



        flyingTl.to('.balloon-elements', duration, {
            x: 0, y: distance, z: 0,
                onComplete: balloonAltitude
        })
            .to('.balloon-elements', duration, {
                x: 0, y: reverseDistance, z: 0,
                ease: Power0.easeNone, y: 0,
                onComplete: balloonAltitude
            });

        function balloonAltitude(e) {
            $('.balloon-elements .direction').toggleClass('reverse');

            var altitude = getRandomIntInclusive(5,15) + '%';
                                TweenMax.set('.balloon-elements', { css: {'left': altitude} });
                    
                      var value = getRandomIntInclusive(2,4),
                                distanceAway = '0.' + value;
                      
                                TweenMax.set('.balloon-elements', { scale:0.4 });
        }


                // Propeller and Banner
                TweenMax.to('.balloon-elements', 0.9, { x:2, y:1, rotation:0.5, yoyo:true, repeat:-1 });
