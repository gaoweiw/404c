$(function() {
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
	//性格对应详情
	var characterDetails = [
		{
			text:['阳光心态，积极快乐','激情澎湃，梦想万岁','热情开朗，喜欢交友','童心未泯，富有趣味','乐于助人，不记愁苦','善于表达，调动气氛','真诚信任，感染四方','乐在变化，创新意识']
		},
		{
			text:['目标导向，永无止境','求胜欲望，战胜对方','斗天斗地，敢说敢做','坚定自信，永不言败','控制情绪，抗压力强','坦率直接，实用主义','快速决断，敢冒风险','抓大放小，高效行动']
		},
		{
			text:['思想深邃，独立思考','成熟稳重，安全放心','情感细腻，体贴入微','一诺千金，忠诚情谊','计划周详，注重规则','讲究精确，迷恋细节','考虑全面，善于分析','执着有恒，坚持到底']
		},
		{
			text:['中庸之道，稳定低调','乐知天命，与世无争','毕生无火，巧卸冲突','镇定自若，处事不惊','天性宽容，耐心柔和','笑遍天涯，冷面幽默','先人后己，与取先予','领导风格，以人为本']
		}
	]
	
	
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

				// this.activeIndex = 3;
				if (this.activeIndex == 9) {
					//根据分数显示性格
					if(gradeNum >= 5 && gradeNum <= 8 ){
						$('#gradeEnd').text(character[0]).css({'background':'red'});
						gradeMethods(characterDetails[0]);
					}
					if(gradeNum >= 9 && gradeNum <= 12 ){
						$('#gradeEnd').text(character[1]).css({'background':'yellow'});
						gradeMethods(characterDetails[1]);
					}
					if(gradeNum >= 13 && gradeNum <= 16 ){
						$('#gradeEnd').text(character[2]).css({'background':'blue'});
						gradeMethods(characterDetails[2]);
					}
					if(gradeNum >= 17 && gradeNum <= 20 ){
						$('#gradeEnd').text(character[3]).css({'background':'green'});
						gradeMethods(characterDetails[3]);
					}



				}
			},
		}
	});

	//第三题多选的处理（交叉排列组合）
	var topicThreeArray = [
		{
			type:1,
			text:'颜值'
		},
		{
			type:2,
			text:'轻薄'
		},
		{
			type:3,
			text:'游戏性能'
		},
		{
			type:4,
			text:'商务性能'
		},
		{
			type:5,
			text:'续行旅行'
		},
		{
			type:6,
			text:'储存性能'
		},
		{
			type:7,
			text:'品牌'
		},
	];
	var data = ['a','b','c','d','e','f','g'];
 
	var getGroup = function(data, index = 0, group = []) {
		var need_apply = new Array();
		need_apply.push(data[index]);
		for(var i = 0; i < group.length; i++) {
			need_apply.push(group[i] + data[index]);
		}
		group.push.apply(group, need_apply);
	 
		if(index + 1 >= data.length) return group;
		else return getGroup(data, index + 1, group);
	}
	 
	console.log(getGroup(data));



	var topicNum = [];//第三题选中个数
	$('.topic-two').click(function(){
		var type = $(this).attr('data-type');
		var has_bgk = $(this).hasClass('btn-bgk-active');
		if(has_bgk){
			topicNum.push(type);
			if(topicNum.length >= 2){//大于等于2的时候跳转下一题
				mySwiper.slideTo(4); 
			}
		}else{
			for(var i=0; i<topicNum.length; i++) {
				if (topicNum[i] == type) {
					topicNum.splice(i, 1);
				}
			}
		}
	})

	//显示性格对应的8点
	var gradeMethods = function(data){
		var arr = [];
		var item = data.text;
		for (var j= 0; j < item.length; j++) {
			arr.push(item[j])
		}
		var html = '';
		for (var i = 0; i < arr.length; i++) {
			html += '<div class="col-6" style="line-height:20px;font-size:0.6rem;">'+ arr[i] +'</div>';
		}
		$('#gradeMsg').html(html);
	}


	


	// 
	// 	$('body').on('touchstart',function(){ 
	// 		audio.play();
	// 	}); 



})
