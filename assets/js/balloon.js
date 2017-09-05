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
                d = pageHeight*2;
                distance=-d;
                

        var flyingTl = new TimelineMax({
            repeat: -1,
            delay: 0.5
        });
        TweenMax.set('.balloon-elements', { css: {'left': '15%'} });
        TweenMax.set('.balloon-elements', { scale:0.4 });



        flyingTl.to('.balloon-elements', duration, {
            x: 0, y: distance, z: 0,
                onComplete: balloonAltitude
        });
            

        function balloonAltitude(e) {
            $('.balloon-elements .direction').toggleClass('reverse');

            var altitude = getRandomIntInclusive(5,15) + '%';
                                TweenMax.set('.balloon-elements', { css: {'bottom': 0} });
                    
                      var value = getRandomIntInclusive(2,4),
                                distanceAway = '0.' + value;
                      
                                TweenMax.set('.balloon-elements', { scale:0.4 });
        }


               