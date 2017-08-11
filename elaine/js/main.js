function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function get_home_url() { return document.getElementById('home_url').href.replace(/\/[a-z]{2}\//,'/'); }
function get_home_lang_url() { return document.getElementById('home_url').href; }
function capitaliseFirstLetter(string){return string.charAt(0).toUpperCase() + string.slice(1);}

$(document).ready(function(){
	var home_url = get_home_url();
	var home_url_lang = get_home_lang_url();
	var url = home_url_lang+'index.php';
	
	var curr_head = 0;
	//var head_title = $('title').html().split('|');
	var head_title2 = $('title').html();
	window_height = $(window).height();
	additional_size = (window_height-450)/2;
	$('#container2 .block').last().css('height',(450+additional_size)+'px');
	
	var block_xcoords = [];
	var block_info = [];
	var new_top = (window_height*200)/700;
	$('#container2 .block').each(function(i){
		if(i!=0){
			curr_top = new_top*i;
			if(window_height > 700){ $(this).css({top:curr_top+'px'}); }
			get_block_position = $(this).position();
			block_xcoords[i] = get_block_position.left;
			block_info[i] = [];
			block_info[i]['title'] = capitaliseFirstLetter($(this).find('.title_ins').html().toLowerCase());
			block_info[i]['link'] = $(this).find('.title_link').html();
		} else {
			block_xcoords[i] = 0;
			block_info[i] = [];
			block_info[i]['title'] = 'effe';
			block_info[i]['link'] = home_url_lang;
		}
	});	
	
	var block_left = new Array();
	var block_top = new Array();
	$('#container2 .block').each(function(i){
		position = $(this).position();
		block_left[i] = position.left;
		block_top[i] = position.top;
	});
	
	var move_left_diff = block_left[0] - block_left[block_left.length-1];
	var move_top_diff = block_top[0] - block_top[block_top.length-1];
	var ratio = move_left_diff/move_top_diff;
	
	var background_left = 0;
	var background_top = 0;
	var quadra_left = 0;
	var quadra_top = 0;
	var progress = 0;
	var my=0,mx=0;
	var moving_block = 0;
	
	var block_nr;
	$('#menu ul li a').click(function(e){
		progress = 1;
		block_nr = this.parentNode.className.match(/\d+/);
		move_to_block('block_'+block_nr);
		e.preventDefault();
	});
	
	$('#container2 .block_2 .question').click(function(){
		move_to_block('block_5');
	});
	
	$('#menu ul li').hover(function(){
		$(this).stop(true,false).animate({backgroundPosition: '0 0'},300);
	},function(){
		$(this).stop(true,false).animate({backgroundPosition: '0 -10px'},300);
	});
	
	$('#home_url').click(function(e){
		e.preventDefault();
	});
	
	$(window).keydown(function(e){
		w_left = $(window).scrollLeft();
		w_top = $(window).scrollTop();
		next_block = 0;
		prev_block = block_left.length-1;
		for(var i=0;i<block_left.length;i++){ if(block_left[i]<w_left) prev_block=i; }
		for(var i=block_left.length-1;i>=0;i--){ if(block_left[i]>w_left) next_block=i; }
		
		if(e.keyCode == 37 || e.keyCode == 38){ move_to_block('block:eq('+prev_block+')');e.preventDefault(); }
		if(e.keyCode == 39 || e.keyCode == 40){	move_to_block('block:eq('+next_block+')');e.preventDefault(); }
	});
	
	function move_to_block(block_nr){
		block_nr_position = $('#container2 .'+block_nr).position();
		block_nr_left = block_nr_position.left;
		block_nr_top = block_nr_position.top;
		
		background_left = (block_nr_left/15)*-1;
		background_top = (block_nr_top/15)*-1;
		
		quadra_left = (block_nr_left/8)*-1;
		quadra_top = (block_nr_top/8)*-1;

		moving_block = 1;
		
		$('#fixed_background').stop(true,false).animate({left:background_left,top:background_top},1000,function(){progress=0;});
		$('#quadra').stop(true,false).animate({left:quadra_left,top:quadra_top},1000,function(){progress=0;mx=0;my=0;moving_block=0;});
		$("body,html").stop(true,false).animate({scrollLeft:block_nr_left,scrollTop:block_nr_top},1000);
		
		for(i=0;i<block_xcoords.length;i++){
			if(block_xcoords[i] == block_nr_left){
				curr_head = i;
				//nqs_replace_url(block_info[i]['title']+' |'+head_title[1],block_info[i]['link']);
				nqs_replace_url(head_title2,block_info[i]['link']);
			}
		}
	}
	
	function move_to_services(current_single_temp){
		if(current_single != current_single_temp){
			$('#container2 .block_2 .single:eq('+current_single+')').removeClass('single_active');
			$('#container2 .block_2 .single_desc:eq('+current_single+')').fadeOut(400,function(){$(this).css('left','-614px');});
			$('#container2 .block_2 .single .arrow:eq('+current_single+')').stop().animate({opacity:'0',right:'20px'},400);
			current_single = current_single_temp;
			$('#container2 .block_2 .single:eq('+current_single+')').addClass('single_active');
			$('#container2 .block_2 .single_desc:eq('+current_single+')').stop().css('display','block').animate({left:'0'},400);
			$('#container2 .block_2 .single .arrow:eq('+current_single+')').stop().animate({opacity:'1',right:'0'},400);
		}
		move_to_block('block_2');
	}
	
	$("body,html").bind('mousewheel',function(event,delta){
		if(progress) return false;
		window_move(event,delta);
	});
	function window_move(event,delta){
		w_left = $(window).scrollLeft();
		w_top = $(window).scrollTop();
		var dir = delta > 0 ? -1 : 1;
		
		var step = 30;

		var move_left = step*ratio*dir;
		var move_top = step*dir;
		
		var total_move_left = 0;
		var total_move_top = 0;
		if(dir == 1){
			if(w_left < block_left[block_left.length-1]){
				if(w_left+move_left > block_left[block_left.length-1]){ total_move_left = block_left[block_left.length-1]-w_left;total_move_top = block_top[block_top.length-1]-w_top; }
				else { total_move_left = move_left;total_move_top = move_top; }
			}
		} else {
			if(w_left > 0){
				if(w_left+move_left < 0){ total_move_left = w_left+move_left;total_move_top = w_top+move_top; }
				else { total_move_left = move_left;total_move_top = move_top; }
			}
		}
		
		background_left_temp = total_move_left/15;
		background_top_temp = total_move_top/15;
		background_left += background_left_temp*-1;
		background_top += background_top_temp*-1;
		
		quadra_left_temp = total_move_left/8;
		quadra_top_temp = total_move_top/8;
		quadra_left += quadra_left_temp*-1;
		quadra_top += quadra_top_temp*-1;
		
		mx=0;
		my=0;
		
		if(background_left<=0 && background_top<=0) $('#fixed_background').css({left:background_left+'px',top:background_top+'px'});
		else{background_left=0;background_top=0;}
		if(quadra_left<=0 && quadra_top<=0) $('#quadra').css({left:quadra_left+'px',top:quadra_top+'px'});
		else{quadra_left=0;quadra_top=0;}
		$('body,html').scrollLeft(w_left+move_left);
		$('body,html').scrollTop(w_top+move_top);
		
		var curr_temp_head = curr_head;
		for(i=0;i<block_xcoords.length;i++){
			if(w_left+move_left >= block_xcoords[i]) curr_temp_head = i;
		}
		if(curr_temp_head != curr_head){
			curr_head = curr_temp_head;
			//nqs_replace_url(block_info[curr_temp_head]['title']+' |'+head_title[1],block_info[curr_temp_head]['link']);
			nqs_replace_url(head_title2,block_info[curr_temp_head]['link']);
		}
		
		event.preventDefault();
	}
	
	var whps_sup = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/);
	function nqs_replace_url(new_title,new_href){ document.title = new_title;if(whps_sup) window.history.pushState({},'',new_href); }


	$('body,html').mousemove(function(e){
		if(!moving_block){
			var x=e.pageX,y=e.pageY;
			if(mx==0) mx=x;
			if(my==0) my=y;
			ml = x-mx;
			ml = Math.ceil(ml/150);
			$('#quadra').css('left',(ml+quadra_left)+'px');
			mt = y-my;
			mt = Math.ceil(mt/200);
			$('#quadra').css('top',(mt+quadra_top)+'px');
		}
	});
	
	var h = getRandomInt(140,200);
	var s = getRandomInt(15,40);
	var l = getRandomInt(80,100);
	function setColor() { $('#logo a').css('color', 'hsl('+h+','+s+'%,'+l+'%)'); }
	$(window).mousemove(function(e) {
		s = 40 - Math.min(25, parseInt((e.clientY / $(window).height()) * 25, 10));
		l = 100 - Math.min(20, parseInt((e.clientX / $(window).width()) * 20, 10));
		setColor();
	});
	
	var paper = new Raphael(document.getElementById('homepage'), 722, 500);  
	polygon1 = paper.path("M240 0 L120 70 L120 208 L240 278 L360 208 L360 70 L240 0").attr({fill:'#fff',stroke:'none',opacity:'0',cursor:'pointer'});
	polygon2 = paper.path("M481 0 L361 70 L361 208 L481 278 L601 208 L601 70 L481 0").attr({fill:'#fff',stroke:'none',opacity:'0',cursor:'pointer'});
	polygon3 = paper.path("M120 209 L0 279 L0 417 L120 487 L240 417 L240 279 L120 209").attr({fill:'#fff',stroke:'none',opacity:'0',cursor:'pointer'});
	polygon4 = paper.path("M361 209 L241 279 L241 417 L361 487 L481 417 L481 279 L361 209").attr({fill:'#fff',stroke:'none',opacity:'0',cursor:'pointer'});
	polygon5 = paper.path("M602 209 L482 279 L482 417 L602 487 L722 417 L722 279 L602 209").attr({fill:'#fff',stroke:'none',opacity:'0',cursor:'pointer'});
	
	polygon1.hover(function(){home_hover_show('why_hover_1');},function(){home_hover_hide('why_hover_1');});
	polygon2.hover(function(){home_hover_show('why_hover_2');},function(){home_hover_hide('why_hover_2');});
	polygon3.hover(function(){home_hover_show('why_hover_3');},function(){home_hover_hide('why_hover_3');});
	polygon4.hover(function(){home_hover_show('why_hover_4');},function(){home_hover_hide('why_hover_4');});
	polygon5.hover(function(){home_hover_show('why_hover_5');},function(){home_hover_hide('why_hover_5');});
	/*polygon1.click(function(){move_to_services(2);});
	polygon2.click(function(){move_to_services(1);});
	polygon3.click(function(){move_to_services(0);});
	polygon4.click(function(){move_to_services(3);});
	polygon5.click(function(){move_to_services(4);});*/
	
	function home_hover_show(name){
		$('#container .'+name+' .home_title').css('text-decoration','underline');
		$('#container .'+name+' .left_side').stop().animate({opacity:'1',width:'120px'},250);
		$('#container .'+name+' .right_side').stop().animate({opacity:'1',width:'120px'},250,function(){
			$('#container .'+name+' .text').stop().animate({opacity:'1'},250);
		});
	}
	function home_hover_hide(name){
		$('#container .'+name+' .home_title').css('text-decoration','none');
		$('#container .'+name+' .left_side').stop().animate({opacity:'0',width:'0'},250);
		$('#container .'+name+' .right_side').stop().animate({opacity:'0',width:'0'},250);
		$('#container .'+name+' .text').stop().animate({opacity:'0'},150);
	}
	
	var current_single = 0;
	$('#container2 .block_2 .single').click(function(){
		current_single_temp = $('#container2 .block_2 .single').index(this);
		if(current_single != current_single_temp){
			$('#container2 .block_2 .single:eq('+current_single+')').removeClass('single_active');
			$('#container2 .block_2 .single_desc:eq('+current_single+')').fadeOut(400,function(){$(this).css('left','-614px');});
			$('#container2 .block_2 .single .arrow:eq('+current_single+')').stop().animate({opacity:'0',right:'20px'},400);
			current_single = current_single_temp;
			$(this).addClass('single_active');
			$('#container2 .block_2 .single_desc:eq('+current_single+')').stop().css('display','block').animate({left:'0'},400);
			$('.arrow',this).stop().animate({opacity:'1',right:'0'},400);
		}
	});
	
	var current_project = 0;
	$('#container2 .block_3 .project').click(function(){
		var current_project_temp = $('#container2 .block_3 .project').index(this);
		if(current_project != current_project_temp) show_project(current_project_temp);
		clearInterval(screen_slider);
		screen_slider = setInterval(function() { if(!prScreens[current_project]) prScreens[current_project] = 0;change_screens(prScreens[current_project]+1) }, 4000);
	});
	$('#container2 .block_3 .single_project .prev').click(function(){
		var current_project_temp = current_project-1;
		show_project(current_project_temp);
		clearInterval(screen_slider);
		screen_slider = setInterval(function() { if(!prScreens[current_project]) prScreens[current_project] = 0;change_screens(prScreens[current_project]+1) }, 4000);
	});
	$('#container2 .block_3 .single_project .next').click(function(){
		var current_project_temp = current_project+1;
		show_project(current_project_temp);
		clearInterval(screen_slider);
		screen_slider = setInterval(function() { if(!prScreens[current_project]) prScreens[current_project] = 0;change_screens(prScreens[current_project]+1) }, 4000);
	});
	function show_project(current_project_temp){
		$('#container2 .block_3 .project:eq('+current_project+')').removeClass('project_active');
		$('#container2 .block_3 .single_project:eq('+current_project+')').stop().animate({opacity:'0'},400,function(){$(this).css({opacity:'1',left:'-690px'});});
		$('#container2 .block_3 .project .pr_arrow:eq('+current_project+')').stop().animate({opacity:'0',right:'20px'},400);
		current_project = current_project_temp;
		$('#container2 .block_3 .project:eq('+current_project+')').addClass('project_active');
		$('#container2 .block_3 .single_project:eq('+current_project+')').stop().animate({left:'0'},400);
		$('#container2 .block_3 .project .pr_arrow:eq('+current_project+')').stop().animate({opacity:'1',right:'0'},400);
	}
	
	var prScreens = new Array();
	var screen_progress = 0;
	function change_screens(current_screen_temp){
		var screen_size = $('#container2 .block_3 .single_project:eq('+current_project+') .screen').length;
		if(current_screen_temp == screen_size) current_screen_temp = 0;
		if(prScreens[current_project] != current_screen_temp && !screen_progress){
			screen_progress = 1;
			$('#container2 .block_3 .single_project:eq('+current_project+') .screen_select:eq('+prScreens[current_project]+')').removeClass('screen_select_active');
			$('#container2 .block_3 .single_project:eq('+current_project+') .screen_select:eq('+current_screen_temp+')').addClass('screen_select_active');
			$('#container2 .block_3 .single_project:eq('+current_project+') .screen:eq('+prScreens[current_project]+')').css({'z-index':'5'});
			$('#container2 .block_3 .single_project:eq('+current_project+') .screen:eq('+current_screen_temp+')').css('z-index','6').animate({opacity:'1'},900,function(){
				$('#container2 .block_3 .single_project:eq('+current_project+') .screen:eq('+prScreens[current_project]+')');
				$('#container2 .block_3 .single_project:eq('+current_project+') .screen:eq('+prScreens[current_project]+')').css({opacity:'0'});
				screen_progress = 0;
				prScreens[current_project] = current_screen_temp;
			});
		}
	}
	$('#container2 .block_3 .single_project .screen_select').click(function(){
		var current_screen_temp = $('#container2 .block_3 .single_project:eq('+current_project+') .screen_select').index(this);
		if(!prScreens[current_project]) prScreens[current_project] = 0;
		clearInterval(screen_slider);
		change_screens(current_screen_temp);
	});
	var screen_slider = setInterval(function() { if(!prScreens[current_project]) prScreens[current_project] = 0;change_screens(prScreens[current_project]+1) }, 4000);
	
	var project_list_top;
	var scroll_height;
	var project_list_height = 475;
	var all_list_height;
	var scroll_step = 1;
	$('#container2 .block_3 .project_list').hover(function(){
		setScrollHeight();
		$('#scroll_bg',this).stop().animate({left:'0'},200);
	}, function(){
		$('#scroll_bg',this).stop().animate({left:'-13px'},200);
	});
	function setScrollHeight(){
		all_list_height = $('#container2 .block_3 #all_projects').height();
		scroll_step = Math.floor(all_list_height/project_list_height);
		scroll_height = ((1-(((all_list_height-project_list_height)/scroll_step)/project_list_height))*project_list_height)-29;
		while(scroll_height < 0){
			scroll_step++;
			scroll_height = ((1-(((all_list_height-project_list_height)/scroll_step)/project_list_height))*project_list_height)-29;
		}
		$('#scroll_middle').css('height',scroll_height+'px');
	}
	$('#scroll').bind('drag',function(e){
		var ftop = 1333;
		if($.browser.msie) ftop = 1546;
		var src_h = e.offsetY - ftop;
		move_scroll(src_h);
	});
	function move_scroll(scroll){
		if(scroll > 0 && project_list_height-scroll_height-29-scroll > 0) move_top = scroll;
		else if(scroll <= 0) move_top = 0;
		else if(project_list_height-scroll_height-29-scroll <= 0) move_top = project_list_height-scroll_height-29;
		$('#scroll').css({top:move_top});
		var move_projects = move_top*((all_list_height-project_list_height)/(project_list_height-(scroll_height+29)));
		$('#all_projects').css({top:-move_projects});
	}
	$('#all_projects').hover(function(){
		$("body,html").unbind('mousewheel');
		$('#all_projects').bind('mousewheel',function(event,delta){
			var speed = -15;
			var dir = delta > 0 ? -1 : 1;
			var value = $('#scroll').css('top');
			value = value.match(/\d+/);
			move_scroll(parseInt(value)+(delta*speed));
		});
	}, function(){
		$("#all_projects").unbind('mousewheel');
		$("body,html").bind('mousewheel',function(event,delta){
			if(progress) return false;
			window_move(event,delta);
		});
	});
	
	$('#container2 .block_3 .link').hover(function(){
		$('.back',this).stop().css('background-position','0 100%').animate({right:'0'},400);
	},function(){
		$('.back',this).stop().css('background-position','0 0').animate({right:'-20px'},400);
	});
	
	$('#container2 .block_4 .career').hover(function(){
		$('.corner',this).stop().animate({left:'-1px'},500);
	}, function(){
		$('.corner',this).stop().animate({left:'-20px'},500);
	});
	
	$('#container2 .block_5 .div_input input, #container2 .block_5 .div_textarea textarea').focus(function(){
		$(this).parent().css('background-position','0 100%');
	});
	$('#container2 .block_5 .div_input input, #container2 .block_5 .div_textarea textarea').blur(function(){
		$(this).parent().css('background-position','0 0');
	});
	
	var def_name = $('#request_form input[name=c_name]').val();
	var def_email = $('#request_form input[name=c_email]').val();
	var def_tel = $('#request_form input[name=c_tel]').val();
	var def_text = $('#request_form textarea[name=c_text]').val();
	$('#form_send').click(function(e){
		$('#container2 .block_5 .div_warnings').removeClass('red').html('');
		$('#container2 .block_5 .loading').show();
		request_form = $('#request_form').serialize();
		$.ajax({ type: 'POST', url: url, data: "nqs_action=ajax&cmd=n1&"+request_form,
			success: function(msg){
				$('#container2 .block_5 .loading').hide();
				answ = msg.split('|');
				if(answ[0] == 0){
					$('#container2 .block_5 .div_warnings').addClass('red').html(answ[1]);
				} else {
					$('#request_form input[name=c_name]').val(def_name);
					$('#request_form input[name=c_email]').val(def_email);
					$('#request_form input[name=c_tel]').val(def_tel);
					$('#request_form textarea[name=c_text]').val(def_text);
					$('#container2 .block_5 .div_warnings').html(answ[1]);
				}
			}
		});
		e.preventDefault();
	});
	
});


(function($) {
if(!document.defaultView || !document.defaultView.getComputedStyle){
    var oldCurCSS = jQuery.curCSS;
    jQuery.curCSS = function(elem, name, force){
        if(name === 'background-position'){
            name = 'backgroundPosition';
        }
        if(name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[ name ]){
            return oldCurCSS.apply(this, arguments);
        }
        var style = elem.style;
        if ( !force && style && style[ name ] ){
            return style[ name ];
        }
        return oldCurCSS(elem, 'backgroundPositionX', force) +' '+ oldCurCSS(elem, 'backgroundPositionY', force);
    };
}

var oldAnim = $.fn.animate;
$.fn.animate = function(prop){
    if('background-position' in prop){
        prop.backgroundPosition = prop['background-position'];
        delete prop['background-position'];
    }
    if('backgroundPosition' in prop){
        prop.backgroundPosition = '('+ prop.backgroundPosition + ')';
    }
    return oldAnim.apply(this, arguments);
};

function toArray(strg){
    strg = strg.replace(/left|top/g,'0px');
    strg = strg.replace(/right|bottom/g,'100%');
    strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
    var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
    return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
}

$.fx.step.backgroundPosition = function(fx) {
    if (!fx.bgPosReady) {
        var start = $.curCSS(fx.elem,'backgroundPosition');

        if(!start){//FF2 no inline-style fallback
            start = '0px 0px';
        }

        start = toArray(start);

        fx.start = [start[0],start[2]];

        var end = toArray(fx.end);
        fx.end = [end[0],end[2]];

        fx.unit = [end[1],end[3]];
        fx.bgPosReady = true;
    }

    var nowPosX = [];
    nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
    nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
    fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
};
})(jQuery);
