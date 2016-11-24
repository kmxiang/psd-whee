$(document).ready(function(e) {	
	//navIconClick();
	
	resizeFunc();
	
});


//Resize
var showHomeFinish = 0;
function resizeFunc() {
	if( $('#nav-icon').css('display') == 'none' ) {
		$('#nav').css('display', 'block');	
	} else {
		$('#nav').css('display', 'none');		
	}
	
	//destroySkrollr();	
	resizeHome();
	resizeTxt();
	resizePage2();	
	resizePage3(); //Resize Page 3 txt
	resizePage4();
	resizePage5();
	resizePage6();
	resizePage7();
	resizePage8();
	resizePage9();
	resizePage10();
	resizePage11();
	resizePage12();
}

var winW, winH;

//Resize Home
var isInitHomeDiv = 0;
function resizeHome() {
	winW = $(document).width();
	winH = $(window).height();
	$('#main').width( winW );
	$('#main').height( winH ); 
	var ow = 1400;
	var oh = 934;
	var w = winW;
	var h = w * oh / ow;
	if( h < winH ) {
		h = winH;
		w = h * ow / oh;	
	}
	var l = ( winW - w ) / 2;
	var t = ( winH - h ) / 2; 
	$('.bg').css({
		'width': w,
		'height': h,
		'top': t,
		'left': l
	});
	
	if( ! isInitHomeDiv ) {
		initHomeDiv( w, h, t, l);	
		isInitHomeDiv = 1;
	}
	resizeHomeTitle();		
	
	var w = $('#round').width();
	$('#round').height( w );	
}

//Resize Home Title
function resizeHomeTitle() {
	var ow = 1900;
	var oh = 1267;
	var tw = 1216;
	var th = 157;
	var th1 = 41;
	var th2 = 54;
	var th3 = 62;
	var rate = tw / ow;
	var w = winW * rate;
	var rate1 = w / tw;
	var st = $(window).scrollTop();
	
	var h1 = Math.round(th1 * rate1);
	var h2 = Math.round(th2 * rate1);
	var h3 = Math.round(th3 * rate1);
	
	var t = Math.round($('#title-1').offset().top - st);
	
	
	$('#title-1,#title-2,#title-3').width( w );
	
	$('#title-1').height( h1 );
	$('#title-2').height( h2 );
	$('#title-3').height( h3 );
	
	$('#title-2').css( 'top',  t+h1 );
	$('#title-2 img').css( 'margin-top',  -h1 );
	
	$('#title-3').css( 'top',  t+h1+h2);
	$('#title-3 img').css( 'margin-top',  -(h1 + h2) );	
	
	
	var obj = $('.bg').eq(0);
	var w = $(obj).width();
	var h = $(obj).height();
	var ml = parseInt($(obj).css('left').replace('px', ''));
	var mt = parseInt($(obj).css('top').replace('px', ''));
	$('#stars').css({
		'width': w,
		'height': h,
		'left': ml,
		'top': mt
	});
}

function initHomeDiv(w, h, t, l) {	
	var src = $('#main .bg').find('img').eq(0).attr('src');	
	var i = 0;
	var k = 0;
	var totalT = 0;
	$('.cover-thumb').each(function(){
		if( i < 16 ) {
			var thisT = winH - 15*i + Math.random()*10;
			var h1 = 20 + Math.random() *20;
			totalT = thisT;
		} else {
			if( i == 16 ) { totalT -= 100;}
			var thisT = Math.round( totalT - (50 + Math.random()*50));
			var h1 = 29;
			
			totalT = thisT;
			$(this).css('left', Math.random() * 500 + 100);
			//console.log(totalT);
		}
		
		$(this).height(h1);
		$(this).css('top', thisT);		
		
		var w1 = Math.round( 300 + Math.random()*300);
		$(this).width(w1);
		
		$(this).html('<img src="' + src + '">');
		
		var t1 = $(this).css('top').replace('px', '');
		var l1 = $(this).css('left').replace('px', '');
		if( i < 16 ) {
			if( k == 0) {
				l = l - l1 + Math.random() * 50 - 50;
			} else {
				l = l - l1;	
			}
		}
		
		$(this).find('img').css({
			'width': w,
			'height': h,
			'margin-top': t - t1,
			'margin-left': l
		});
		
		i++;
		k++;
		if( k == 2 ) {
			k = 0;	
		}
	});
}

//Home Animation
function startHome() {
	$(window).unbind('resize', resizeFunc);
	
	homeTitle();
	setTimeout(	coverRemove, 1000);
	
	
}


function addStars() {
	var obj = $('.bg').eq(0);
	var w = $(obj).width();
	var h = $(obj).height();
	var ml = parseInt($(obj).css('left').replace('px', ''));
	var mt = parseInt($(obj).css('top').replace('px', ''));
	$('#stars').css({
		'width': w,
		'height': h,
		'left': ml,
		'top': mt
	});
		
	for(var i = 0; i < 20; i++ ){
		var id = 'star-1-' + i ;
		var c = Math.round(Math.random()*3) + 1;
		var d = Math.round(Math.random()*5) + 1;
		var child = '<div id="'+id+'"></div>';
		$('#stars').append(child);
		var mw = 17.56;
		var mh = 24.63;
		var l = Math.random() * mw;
		var t = Math.random() * mh;
		$('#'+id).css({
			'left': l+'%',
			'top': t+'%'
		});	
		$('#'+id).addClass('star-'+c);	
		$('#'+id).addClass('star-animate-'+d);	
	}
	for(var i = 20; i < 50; i++ ){
		var id = 'star-1-' + i ;
		var c = Math.round(Math.random()*3) + 1;
		var d = Math.round(Math.random()*5) + 1;
		var child = '<div id="'+id+'"></div>';
		$('#stars').append(child);
		var ml = 48.625;
		var mw = 18.375;
		var mh = 39.50;
		var l = Math.floor(Math.random() * mw + ml);
		var t =Math.floor( Math.random() * mh);
		$('#'+id).css({
			'left': l+'%',
			'top': t+'%'
		});	
		$('#'+id).addClass('star-'+c);	
		$('#'+id).addClass('star-animate-'+d);
	}
	for(var i = 50; i < 90; i++ ){
		var id = 'star-1-' + i ;
		var c = Math.round(Math.random()*3) + 1;
		var d = Math.round(Math.random()*5) + 1;
		var child = '<div id="'+id+'"></div>';
		$('#stars').append(child);
		var ml = 80;
		var mw = 20;
		var mh = 39.50;
		var l = Math.floor(Math.random() * mw + ml);
		var t =Math.floor( Math.random() * mh);
		$('#'+id).css({
			'left': l+'%',
			'top': t+'%'
		});	
		$('#'+id).addClass('star-'+c);	
		$('#'+id).addClass('star-animate-'+d);
	}
}


//Remove Cover();
function coverRemove() {	
	var i = 0;
	var maxDelay = 0;
	$('.cover-thumb').each(function(){ 
		var l = Math.round( $('#main .bg').css('left').replace('px', '') );
		var delay = Math.random() * 1000;
		maxDelay = maxDelay ? delay : maxDelay;
		if( i < 16 ) {
			$(this).find('img').stop().delay(delay).animate({'margin-left': l, 'opacity': 0}, 1000, function(){
				$(this).remove();
			});
		} else {
			var l1 =  Math.round( $(this).css('left').replace('px', '') );
			var l = l - l1;
			$(this).find('img').stop().delay(delay).animate({'margin-left': l}, 1000, function(){
				$(this).remove();
			});
		}
		i++;
	});	
	setTimeout(function(){
		
		addStars(); //添加星星效果
		
		showHomeFinish = 1;		
		$(window).bind('resize', resizeFunc);		
		resizeFunc();
		initSkrollr(); //parallax
		
		var r = 10;
		if(winW <= 480 ) {
			r = 2;
		}
		$('#pagenav').stop().animate({'right': r}, 500); //显示分页导航
		
		
		
		}, 1500 +maxDelay);
		//$('#btns').fadeIn(500);
}

function homeTitle() {
	$('#main').animate({'opacity':1}, 500);
	
	var l = $('#title-1').attr('data-left');
	var fl = $('#round-number').attr('data-left');
	
	$('#round').delay(500).fadeIn(500);
	$('#round-number').stop().delay(700).animate({'left': fl}, 1000);
	
	$('#title-1').stop().delay(1000).animate({'left': l}, 1000);
	$('#title-2').stop().delay(1300).animate({'left': l}, 1000);
	$('#title-3').stop().delay(1600).animate({'left': l}, 1000);	
	$('#footer').delay(1600).fadeIn();
}