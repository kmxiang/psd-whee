// JavaScript Document

$(document).ready(function(e) {

	pagenavActive();  //PageNav   

	

	setTimeout(preload, 1000);

	

	autoPlay();

	mouseWheel();	

});



var speed = 1;

var time = 1000 * 700; // 从顶部到页面底部总共的时间700 秒

function autoPlay() {

	$('#btns').click(function(){

		if( ! showHomeFinish ) return;

		 speed = 1;		

		/*$('#speed div').css('width', '10%');*/

		var str = $(this).text();

		if( ! $('#btns').hasClass('btns-pause') ) {

			var t = $(window).scrollTop();

			var duration = ((64000-t) / 64000 * time )/speed;

			//$('#speed').fadeIn('fast');

			$('html,body').stop().animate({'scrollTop': 64000}, duration, function(){

				$('#btns').removeClass('btns-pause');

				//$('#speed').fadeOut('fast');

			});

			$('#btns').addClass('btns-pause');

		} else {

			var t = $(window).scrollTop();

			$('html,body').stop().animate({'scrollTop': t}, 10);

			$('#btns').removeClass('btns-pause');

			//$('#speed').fadeOut('fast');

		}

	});	

	setInterval(checkState, 100);	

}



function mouseWheel() {	

	$(window).mousewheel( function(event, delta) {		

		var str = $('#btns').text();

		if( ! $('#btns').hasClass('btns-pause') ) return;

		var st = $(window).scrollTop();

		if( delta == -1 ) {

			speed+=.2;

			if(speed>8) speed = 8;

		} else {

			speed-=.2;

			if(speed < 1) {

				speed = 1;

			}

		}

		

		//$('#speed div').css('width', (speed/8 * 100) + '%');

		

		console.log(speed);

		

		var duration = ((64000-st) / 64000 * time )/speed;

		$('html,body').stop().animate({'scrollTop': 64000}, duration, function(){

			$('#btns').removeClass('btns-pause');

			//$('#speed').fadeOut('fast');

		});

		

	});	

}



/*var target = 0;

var distant = 300;

function mouseWheel() {	

	$(window).mousewheel( function(event, delta) {		

		var str = $('#btns').text();

		if( str == 'Auto Play' ) return;

		var st = $(window).scrollTop();

		if( delta == -1 ) {

			if( target == 0 ) {

				target = st + distant;

			} else {

				target += distant;

			}

			$('html,body').stop().animate({'scrollTop': target}, 500, function(){

				target = 0;

				keepAutoPlay();

			});

		} else {

			if( target == 0 ) {

				target = st - distant;

			} else {

				target -= distant;

			}

			$('html,body').stop().animate({'scrollTop': target}, 500, function(){

				target = 0;

				keepAutoPlay();

			});

			

		}

		

	});	

}*/



function keepAutoPlay() {

	var str = $('#btns').text();

	if( str == 'Stop' ) {

		var t = $(window).scrollTop();

		var time = 1000 * 700; //600 秒

		var duration = (63500-t) / 63500 * time;

		$('html,body').stop().animate({'scrollTop': 63500}, duration, function(){

			$('#btns').html( 'Auto Play<span></span>');

		});

		//$('#btns').html( 'Stop<span></span>');	

	} 

}



function resetBtns() {

	var t = $(window).scrollTop();

	$('html,body').stop().animate({'scrollTop': t}, 10);

	$('#btns').removeClass('btns-pause');

}



function checkState() {

	var h = 64000;	

	var t = (skrollr.get() && skrollr.get().getScrollTop()) || 0;

	var w = t / h * winW;

	$('#state-bar div').width(w);

	$('#btns span').width( t / h * 80);

	//console.log(t);

}



function preload() {

	initPreloadScreen();

	var the_images = [];

	$('#main img').each(function(index, element) {

        var src = $(this).attr('src');

		the_images.push( src );

    });

	$('#p1 img').each(function(index, element) {

        var src = $(this).attr('src');

		the_images.push( src );

    });

	var preloadNum = 0;

	var len = the_images.length;

	$.imgpreload(the_images,

	{

			each: function()

			{

				preloadNum++;

				var pe = Math.round( (preloadNum / len ) * 100);

				$('#preload-txt').html( pe +'%');

			},

			all: function()

			{

				$('#preload-img div').each(function(index, element) {

					if( index == 3 ) {

						$(this).stop().animate({'margin-left':0}, 200, function(){

							$('#preload').fadeOut(1000, 

							function(){

								startHome();

							});

						});

					} else {						

						$(this).stop().animate({'margin-left':0}, 200);

					}

				});

			}

	});	

}



var i = 1;

var k = 0;

function initPreloadScreen() {

	$('#preload-img div').each(function(index, element) {

		var t = Math.random() * 10;

		if( t >= 5) {

			i = -1;	

		} else {

			i = 1;	

		}

		var l = Math.random() * 50 + 50;

		l *= -i;

		if(index==3) {

    		$(this).stop().animate({'margin-left': l}, 200, function(){

				$(this).stop().animate({'margin-left': 0}, 200, function(){

					setTimeout(initPreloadScreen, 1600);

				});

			}); 

		} else {

    		$(this).stop().animate({'margin-left': l}, 100, function(){

				$(this).stop().animate({'margin-left': 0}, 100, function(){					

				});

			}); 			

		}

    });

		

}



//Init Skrollr

var s;

function initSkrollr() {

	s = skrollr.init({

		edgeStrategy: 'set',

		easing: {

			WTF: Math.random,

			inverted: function(p) {

				return 1-p;

			}

		}

	});

}



function destroySkrollr() {

	if(s) s.destroy();		

}

//Reset Skrollr

function resetSkrollr() {	

	if(s) s.destroy();	

	initSkrollr();

}



//ResizeTxt

function resizeTxt() {

	$('.txt').each(function(index, element) {

		var oh = 1217;

        var h1 = $(this).attr('data-height');		

		var  h = (winH / oh ) * h1;		

		$(this).height(h);		

    });	

	

	//Append a tmp txt in body and calculate the height of the text;

	var txt = $('#page-1-txt .txt-inner').html();

	var w = Math.floor($('#page-1-txt').attr('data-w').replace('%', ''));

	w = Math.round( w * winW / 100 ) ;

	$('#tmp-txt').html(txt);

	$('#tmp-txt').width(w);

	var h = $('#tmp-txt').height();

	$('#tmp-txt').html('');

	

	//console.log(w+'|' + h);

	

	var h1 = $('#page-1-txt').height();

	$('#page-1-txt .txt-inner').attr('data-1500', 'top:' + h1 +'px;');

	$('#page-1-txt .txt-inner').attr('data-7000',  'top:' + (-h) +'px');

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page-1-txt .txt-inner'));

		}

	}

}



function pagenavActive() {
  
	setInterval(function(e){
		//e.preventDefault();
		//console.log(skrollr);
		
		var st = $(window).scrollTop()  || (skrollr.get() && skrollr.get().getScrollTop()) || 0;
		

		//console.log('st:' + st);

		//console.log( $('#page-2').css('top') );

		

		var len = $('#pagenav li').length;

		for(var i = 0; i < len; i++ ) {

			var obj = $('#pagenav li');

            var t = parseInt($(obj).eq(i).attr('data-t'));

			if( (st - t) > 0 ) {

				$(obj).removeClass('active');

				$(obj).eq(i).addClass('active');

			}

    }

	}, 100);
	


	$('#pagenav li').click(function(e){

		e.preventDefault();

		resetBtns();

		

		var index = $('#pagenav li').index(this);

		var st = $(window).scrollTop() || skrollr.get().getScrollTop();

		var t = parseInt($(this).attr('data-t'));

		if( index != 0 ) {

			t += 300;	

		}

		//console.log(t);

		var duration = Math.abs(st - t);

		if( duration > 3000 ) {

			duration = 3000;	

		}

		if($("html").hasClass('skrollr-desktop')){
			$('html,body').stop().animate({'scrollTop': t}, duration, 'easeOutExpo');
		}else{
			skrollr.get().setScrollTop(t);
		}

		//$('#speed').fadeOut('fast');

		

	});

}









/*=================================================================

  page 2

  =================================================================*/

function resizePage2() {

	var ow = 1400;

	var oh = 1860;

	

	//winW / h = ow / oh

	var w = winW;

	var h =  winW * oh / ow; 

	if( h < (winH + 800)) {

		h = winH + 800;

		w = h * ow / oh;	

	}

	

	$('.page2-bg').css({

		'width': w,

		'left': -(w-winW ) / 2

	});

	

	var t = - Math.round( h-winH);

	$('#page-2').attr('data-12000', 'top:' + t +'px;');

	

	//Page 2 txt 2 

	var ot = 0.5763;

	var tt = Math.round(h * ot)+ 20;

	$('#page-2-txt-2').css('top', tt+'px');

	//console.log(tt);	

	

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page-2'));

		}

	}

}



/*=================================================================

  page 3

  =================================================================*/

function resizePage3() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.7494;

	var wRate = ( $('#page3-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	var t = t + it;

	$('#page3-txt').css('top', t + 'px');

	

	

	var txt = $('#page3-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page3-txt').attr('data-13500', 'top:' + winH + 'px');

	$('#page3-txt').attr('data-17500', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page3-txt'));

		}

	}

}



function getTxtHeight( txt, w) {

	$('#tmp-txt').html(txt);

	$('#tmp-txt').width(w);

	var h = $('#tmp-txt').height();

	$('#tmp-txt').html('');

	

	return h;	

}



/*=================================================================

  page 4

  =================================================================*/

function resizePage4() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.7494;

	var wRate = ( $('#page4-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	var t = t + it;

	$('#page4-txt').css('top', t + 'px');

	

	

	var txt = $('#page4-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page4-txt').attr('data-18500', 'top:' + winH + 'px');

	$('#page4-txt').attr('data-22500', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page4-txt'));

		}

	}

}

/*=================================================================

  page 5

  =================================================================*/

function resizePage5() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.7494;

	var wRate = ( $('#page5-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	var t = t + it;

	$('#page5-txt').css('top', t + 'px');

	

	

	var txt = $('#page5-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page5-txt').attr('data-23000', 'top:' + winH + 'px');

	$('#page5-txt').attr('data-27500', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page5-txt'));

		}

	}

}



/*=================================================================

  page 6

  =================================================================*/

function resizePage6() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.7494;

	var wRate = ( $('#page6-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	var t = t + it;

	$('#page6-txt').css('top', t + 'px');

	

	

	var txt = $('#page6-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page6-txt').attr('data-28000', 'top:' + winH + 'px');

	$('#page6-txt').attr('data-32500', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page6-txt'));

		}

	}

}

/*=================================================================

  page 7

  =================================================================*/

function resizePage7() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.7494;

	var wRate = ( $('#page7-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	var t = t + it;

	$('#page7-txt').css('top', t + 'px');

	

	

	var txt = $('#page7-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page7-txt').attr('data-33000', 'top:' + winH + 'px');

	$('#page7-txt').attr('data-38000', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page7-txt'));

		}

	}

}



/*=================================================================

  page 8

  =================================================================*/

function resizePage8() {

	var ow = 1400;

	var oh = 2073;

	

	

	//winW / h = ow / oh

	var w = winW;

	var h =  winW * oh / ow; 

	if( h < (winH + 200)) {

		h = winH + 200;

		w = h * ow / oh;	

	}

	

	var l = -(w-winW ) / 2;

	$('.page8-bg').css({

		'width': w,

		'left': -(w-winW ) / 2

	});

	

	//var t = - Math.round( h-winH);

	//$('#page-8').attr('data-43500', 'top:' + t +'px;');

	

	resizeBall(w, h, l);

	

	//winW / ow = h / oh;	

	//var h =  winW * oh / ow;

	

	var t1 = 220;//getCSSRate( $('#page8-txt-1').css('top') );

	var t2 = 690;//getCSSRate( $('#page8-txt-2').css('top') );

	var t3 = 1310;//getCSSRate( $('#page8-txt-3').css('top') );

	var t4 = 1420;//getCSSRate( $('#page8-txt-3').css('top') );

	

	

	// t/ h = t3 / oh

	var rate = h / oh;

	t1 = t1 * rate;

	t2 = t2 * rate;

	t3 = t3 * rate;

	t4 = t4 * rate;

	t1 = Math.round( t1 );

	t2 = Math.round( t2 );

	t3 = Math.round( t3 );

	t4 = Math.round( t4 );

	

	$('#page8-txt-1').css('top', t1 );

	$('#page8-txt-2').css('top', t2 );

	$('#page8-txt-3').css('top', t3 );

	$('#page8-txt-4').css('top', t4 );

	

	$('#page-8').attr('data-43500', 'top:' + (- (h - winH ) + 40) + 'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page-8'));

		}

	}

}



function resizeBall(vw, vh, vl) {

	var ow = 1400;

	var oh = 2073;

	var ml = 394;

	var mt = 743;

	var w = 591;

	

	var winW = $(document).width();

	var rate = vw / ow;

	var t = mt * rate;

	$('#ball').css({

		'top': mt * rate,

		'left': ml * rate + vl,

		'width': w * rate

	});

	

	//console.log(rate);

	

}



function getCSSRate( str ) {

	var rate =str.replace('%', '').replace('px', '');

	return rate/100;	

}





/*=================================================================

  page 9

  =================================================================*/

function resizePage9() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.7494;

	var wRate = ( $('#page9-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	var t = t + it;

	$('#page9-txt').css('top', t + 'px');

	

	

	var txt = $('#page9-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page9-txt').attr('data-45000', 'top:' + winH + 'px');

	$('#page9-txt').attr('data-49000', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page9-txt'));

		}

	}

}



/*=================================================================

  page 10

  =================================================================*/

function resizePage10() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.7494;

	var wRate = ( $('#page10-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	var t = t + it;

	$('#page10-txt').css('top', t + 'px');

	

	

	var txt = $('#page10-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page10-txt').attr('data-49500', 'top:' + winH + 'px');

	$('#page10-txt').attr('data-53000', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page10-txt'));

		}

	}

}



/*=================================================================

  page 11

  =================================================================*/

function resizePage11() {

	var ow = 1400;

	var oh = 1742;

	

	//winW / ow = h / oh;	

	//var h =  winW * oh / ow;

	

	var t1 = 500;//getCSSRate( $('#page8-txt-1').css('top') );

	

	var w = winW;

	var h =  winW * oh / ow; 

	if( h < (winH + 500)) {

		h = winH + 500;

		w = h * ow / oh;	

	}

	

	var l = -(w-winW ) / 2;

	$('.page11-bg').css({

		'width': w,

		'left': -(w-winW ) / 2

	});

	

	// t/ h = t3 / oh

	var rate = h / oh;

	t1 = t1 * rate;

	t1 = Math.round( t1 );

	

	$('#page11-txt').css('top', t1 );

	

	$('#page-11').attr('data-58000', 'top:' + (- (h - winH ) + 40) + 'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page-11'));

		}

	}

}





/*=================================================================

  page 12

  =================================================================*/

function resizePage12() {

	var ow = 1400;

	var oh = 934;

	var tRate = 0.5;

	var wRate = ( $('#page12-txt').css('width').replace('%', '').replace('px', '') );

	var w = Math.round( winW * wRate / 100);

	var t = tRate * winH;

	//var it = Math.round( $('.bg').eq(0).css('top').replace('px', '') );

	//var t = t + it;

	$('#page12-txt').css('top', t + 'px');

	

	

	var txt = $('#page12-txt').html();

	var  h = getTxtHeight( txt, w );

	

	$('#page12-txt').attr('data-59500', 'top:' + t + 'px; opacity:0;');

	$('#page12-txt').attr('data-60000', 'top:' + t + 'px; opacity:1;');

	$('#page12-txt').attr('data-64000', 'top:' + -h+'px');

	

	if( showHomeFinish ) {

		if( s ) {

			s.refresh($('#page12-txt'));

		}

	}

}

