
$(function(){
	var mySwiper = new Swiper('.swiper-container', {
		// direction: 'vertical', //滑动方向

		// noSwiping: true, //是否可以左右滑动
		// noSwipingClass: 'stop-swiping', //为禁止滑动设置的class

		allowTouchMove:0,

		// hashNavigation: { //锚链接跳转
		// 	watchState: true,
		// },

		effect: 'cube', //切换效果
		// loop: true,

		// 如果需要分页器
		// 			pagination: {
		// 				el: '.swiper-pagination',
		// 			},

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.next',
			prevEl: '.prev',
		},

		// 如果需要滚动条
		// 			scrollbar: {
		// 				el: '.swiper-scrollbar',
		// 			},
		on: {
			init: function() {
				swiperAnimateCache(this); //隐藏动画元素 
				swiperAnimate(this); //初始化完成开始动画
			},
			slideChangeTransitionEnd: function() {
				swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
			}
		}
	});
	//显示说明
	$('#showExplain').click(function(event){
		 event.stopPropagation();
		$('#boxExplain').css('display','block');
	})

	$('body').click(function(){
		$('#boxExplain').css('display','none');
	})


$('body').on('touchstart',function(){ 
	alert(1);
	audio.play(); 
}); 
	

})



