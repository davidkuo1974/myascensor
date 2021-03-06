//STARTING SLIDE

var startSlide = '#1-1';

w = $(document).width();
h = $(document).height();

var startX = 0;

resizeBoxes(w, h);


$(document).ready(function() {
    
    var idParam = (window.location.hash || startSlide);

    //SET DIVS COLOR, ONLY TESTING PURPOSES
    $('.slide').each(function(){
       // $(this).css('background-color', get_random_color());
    });
    //END OF COLORS

    createChoco();
    $('.choco-link').first().addClass('active');
    $('#next').click(function(e) {
        e.preventDefault();

        if (cur.next().length == 0) {
            curP = cur.parent().next()
            if (curP.length == 0) {
                curP = $('#p1');
                cur = $('#p1 .slide').first();
            }
            cur = curP.find('.slide').first();

        } else {
            cur = cur.next();
        }
        moveBox(cur);
        setActiveBox(cur);

    });

    if(idParam){
        idParam = idParam.substr(1,100);
        cur = $('#p' + idParam);
        curP = cur.parent();
        //move to startslide
        moveBox(cur);
        setActiveBox(cur);
    }

    $('#prev').click(function(e) {
        e.preventDefault();

        if (cur.prev().length == 0) {
            curP = cur.parent().prev()
            if (curP.length == 0) {
                curP = $('.project').last();
                cur = curP.find('.slide').last();
            }
            cur = curP.find('.slide').last();

        } else {
            cur = cur.prev();
        }
        moveBox(cur);
        setActiveBox(cur);

    });
    $('#nextproj').click(function(e) {
        e.preventDefault();
        curP = curP.next();
        if (curP.length == 0) {
            curP = $('.project').first();
        }
        cur = curP.find('.slide').first();
        moveBox(cur);
        setActiveBox(cur);
    });

    $('#prevproj').click(function(e) {
        e.preventDefault();
        curP = curP.prev();
        if (curP.length == 0) {
            curP = $('.project').last();
        }
        cur = curP.find('.slide').first();
        moveBox(cur);
        setActiveBox(cur);
    });

    $('.proj-jump').click(function(e) {
        e.preventDefault();
        proj = $(this).attr('href');
        curP = $('#' + proj)
        cur = curP.find('.slide').first();
        moveBox(cur);
        setActiveBox(cur);
    })

    $('.choco-link').click(function(e) {
        e.preventDefault();
        var slideN = $(this).get(0).href.split('/');
        slideN = slideN[slideN.length - 1];
        var projN = $(this).parent().attr('id').substr(5, 6);
        curP = $('#p' + projN);
        var allCur = curP.find(('.slide'));
        cur = $(allCur[parseInt(slideN) - 1]);
        moveBox(cur);
        setActiveBox(cur);
    });

    $('#link-to-3-3').click(function(e){
        e.preventDefault();
        cur = $('#p3-3');
        moveBox(cur);
        setActiveBox(cur);
    })

})
//KEY NAV
/////////////////////////////////////////////////////////////
$(document).keydown(function(e) {
    switch(e.keyCode) {
        case 37:
            //leftkey
            $("#prev").trigger("click");
            break;
        case 39:
            //rightkey
            $("#next").trigger("click");
            break;
        case 38:
            //up
            $("#prevproj").trigger("click");
            break;
        case 40:
            //down
            $("#nextproj").trigger("click");
            break;
    }

});//End doc ready



function moveBox(curElem) {
    slTop = cur.position().top;
    slLeft = cur.position().left;
    /*$('#container').css({
        'marginTop' : -1 * slTop,
        'marginLeft' : -1 * slLeft
    });*/

    var cont = document.getElementById("container");
    var transform = 'translateX(' + -1 * slLeft + 'px) translateY(' + -1 * slTop + 'px) translateZ(0)';
    cont.style.MozTransform = transform;
    cont.style.WebkitTransform = transform;
    cont.style.OTransform = transform;

    setUrlVars(curElem);
}
//HANDLE SWIPES
jQuery(document).bind('swipeleft',function(){
    if (cur.next().length == 0) {
        curP = cur.parent().next()
        if (curP.length == 0) {
            curP = $('#p1');
            cur = $('#p1 .slide').first();
        }
        cur = curP.find('.slide').first();

    } else {
        cur = cur.next();
    }
    moveBox(cur);
    setActiveBox(cur);
});

jQuery(document).bind('swiperight',function(){
    if (cur.prev().length == 0) {
        curP = cur.parent().prev()
        if (curP.length == 0) {
            curP = $('.project').last();
            cur = curP.find('.slide').last();
        }
        cur = curP.find('.slide').last();

    } else {
        cur = cur.prev();
    }
    moveBox(cur);
    setActiveBox(cur);
});

jQuery(document).bind('swipeup',function(){
    curP = curP.next();
    if (curP.length == 0) {
        curP = $('.project').first();
    }
    cur = curP.find('.slide').first();
    moveBox(cur);
    setActiveBox(cur);
});

jQuery(document).bind('swipedown',function(){
    curP = curP.prev();
    if (curP.length == 0) {
        curP = $('.project').last();
    }
    cur = curP.find('.slide').first();
    moveBox(cur);
    setActiveBox(cur);
});


//RESIZE
/////////////////////////////////////////////////////////////
$(window).resize(function() {
    w = $(window).width();
    h = $(document).height();
    resizeBoxes(w, h);
    $('#container').css('left', -1 * cur.position().left)
    resizeBoxes(w, h);
    $('#container').css('top', -1 * cur.position().top)
});
function resizeBoxes(w, h) {
    $('.slide').css({
        'width' : w,
        'height' : h
    });
    $('#window').css({
        'width' : w,
        'height' : h
    });
}

//CHOCO-NAV
/////////////////////////////////////////////////////////////
function setActiveBox(elem) {

    var id = elem.attr('id');
    var lineIndex = id.indexOf('-')

    var tProj = parseInt(id.substr(1, lineIndex - 1));
    var tSlide = parseInt(id.substr(lineIndex + 1, 100));
    //console.log(lineIndex, tProj, tSlide)
    $('.choco-link').removeClass('active');
    $($('#choco'+tProj).find('.choco-link')[tSlide - 1]).addClass('active');
    
}

function createChoco() {
    var i = 0;
    var choco = $('#choco-menu');
    $('.project').each(function() {
        var q = 0;
        i++;
        provP = $(this);
        choco.append('<div class="choco-row" id="choco' + i + '"></div>');
        provP.find('.slide').each(function() {
            q++;
            $('#choco' + i).append('<a class="choco-link" href="' + q + '"id="s' + q + '">' + '</a>');
        })
    })
}

function setUrlVars(element){
    cutId = element.attr('id').substr(1)
    window.location.hash = cutId;
}
