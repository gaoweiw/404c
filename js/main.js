$(function() {
	
	//计算分数
	var gradeNum = 0;
	$('.btn-bgk-big').click(function() {
		var num = Number($(this).attr('data-grade'));
		gradeNum = gradeNum + num;
		console.log(gradeNum);
	})
	//拥有性格
	/* 	5-8分红色性格
		9-12分黄色性格
		13-16分蓝色性格
		17-20分绿色性格
	 */	
	var character = ['红色性格','黄色性格','蓝色性格','绿色性格'];
	
	
	var mySwiper = new Swiper('.swiper-container', {
		// direction: 'vertical', //滑动方向

		allowTouchMove: 0, //是否可以左右滑动
		speed: 1000, //切换速度

		effect: 'cube', //切换效果

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.next',
			prevEl: '.prev',
		},
		on: {
			init: function() {
				swiperAnimateCache(this); //隐藏动画元素 
				swiperAnimate(this); //初始化完成开始动画
			},
			slideChangeTransitionEnd: function() {
				swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
				if (this.activeIndex == 9) {
					
					//根据分数显示性格
					if(gradeNum >= 5 && gradeNum <= 8 ){
						$('#gradeEnd').text(character[0]).css({'background':'red'});
					}
					if(gradeNum >= 9 && gradeNum <= 12 ){
						$('#gradeEnd').text(character[1]).css({'background':'yellow'});
					}
					if(gradeNum >= 13 && gradeNum <= 16 ){
						$('#gradeEnd').text(character[2]).css({'background':'blue'});
					}
					if(gradeNum >= 17 && gradeNum <= 20 ){
						$('#gradeEnd').text(character[3]).css({'background':'green'});
					}
				}
			},
		}
	});


	var $explain = $('#boxExplain'); //规则说明

	//显示说明
	$('#showExplain').click(function(event) {
		$explain.removeClass('bounceOut');
		$explain.addClass('animated bounceIn').css('display', 'block');
	})

	$('.btn-close').click(function() {
		$explain.removeClass('bounceIn');
		$explain.addClass('animated bounceOut');
		setTimeout(function() {
			$explain.css('display', 'none');
		}, 1000)
	});

	//点击过后改变背景
	$('.answer-box-small div').click(function() {
		var has_bgk = $(this).hasClass('btn-bgk-active');
		if (has_bgk) {
			$(this).removeClass('btn-bgk-active');
		} else {
			$(this).addClass('btn-bgk-active');
		}
	})

	$('.answer-box-big div').click(function() {
		var has_bgk = $(this).hasClass('btn-bgk-big-active');
		if (has_bgk) {
			$(this).removeClass('btn-bgk-big-active');
		} else {
			$(this).addClass('btn-bgk-big-active');
		}
	})


	// 
	// 	$('body').on('touchstart',function(){ 
	// 		audio.play();
	// 	}); 



})
