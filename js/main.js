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
	var character = ['红色性格', '黄色性格', '蓝色性格', '绿色性格'];
	//性格对应详情
	var characterDetails = [{
			text: ['阳光心态，积极快乐', '激情澎湃，梦想万岁', '热情开朗，喜欢交友', '童心未泯，富有趣味', '乐于助人，不记愁苦', '善于表达，调动气氛', '真诚信任，感染四方', '乐在变化，创新意识']
		},
		{
			text: ['目标导向，永无止境', '求胜欲望，战胜对方', '斗天斗地，敢说敢做', '坚定自信，永不言败', '控制情绪，抗压力强', '坦率直接，实用主义', '快速决断，敢冒风险', '抓大放小，高效行动']
		},
		{
			text: ['思想深邃，独立思考', '成熟稳重，安全放心', '情感细腻，体贴入微', '一诺千金，忠诚情谊', '计划周详，注重规则', '讲究精确，迷恋细节', '考虑全面，善于分析', '执着有恒，坚持到底']
		},
		{
			text: ['中庸之道，稳定低调', '乐知天命，与世无争', '毕生无火，巧卸冲突', '镇定自若，处事不惊', '天性宽容，耐心柔和', '笑遍天涯，冷面幽默', '先人后己，与取先予', '领导风格，以人为本']
		}
	]

	//第二题判断男孩还是女孩
	$('.gender').click(function() {
		var type = $(this).attr('data-gender');
		if (type == 1) {
			$('#genderShow').text('男孩');
		} else {
			$('#genderShow').text('女孩');
		}
	});

	var topicNum = []; //第三题选中个数
	$('.topic-two').click(function() {
		var type = $(this).attr('data-type');
		var has_bgk = $(this).hasClass('btn-bgk-active');
		if (has_bgk) {
			topicNum.push(type);
			if (topicNum.length == 2) { //等于2的时候判断结果页该展示的机型
				$.ajax({
					url: './json/data.json',
					type: 'get',
					datatype: 'json',
					success: function(data) {
						var check, checkreverse;
						check = topicNum[0] + topicNum[1]; //选中值
						checkreverse = topicNum[1] + topicNum[0];

						for (var key in data.computer) {
							if (key == check) {
								console.log(data.computer[key]);
							} else if (key == checkreverse) {
								console.log(data.computer[key]);
							}
						}
					}
				})
			}
			if (topicNum.length >= 2) { //大于等于2的时候跳转下一题
				mySwiper.slideTo(4);
			}
		} else {
			for (var i = 0; i < topicNum.length; i++) {
				if (topicNum[i] == type) {
					topicNum.splice(i, 1);
				}
			}
		}
	})

	//结果页
	$('#goBack,#goBack2').on('touchend', function() {
		mySwiper.slideTo(9);
	});

	//第三题多选的处理（交叉排列组合）

	//显示对应的标签
	var labelMethods = function(data) {
		var label = [{
			type: 'a',
			text: '注重外表'
		}, {
			type: 'b',
			text: '喜欢旅行'
		}, {
			type: 'c',
			text: '爱玩'
		}, {
			type: 'd',
			text: '理智'
		}, {
			type: 'e',
			text: '喜欢旅行'
		}, {
			type: 'f',
			text: '怀旧'
		}, {
			type: 'g',
			text: '生活品质有需求'
		}];

		var label_1 = data[0];
		var label_2 = data[1];
		for (var key in label) {
			if (label[key].type == label_1) {
				$('#label1').text(label[key].text)
			}
			if (label[key].type == label_2) {
				$('#label2').text(label[key].text)
			}
		}
	}


	//显示性格对应的8点
	var gradeMethods = function(data) {
		var arr = [];
		var item = data.text;
		for (var j = 0; j < item.length; j++) {
			arr.push(item[j])
		}
		var html = '';
		for (var i = 0; i < item.length; i++) { 
			html += '<div class="col-6" style="line-height:1.5rem;font-size:0.8rem;">' + arr[i] + '</div>';
		}
		$('#gradeMsg').html(html);
	}



	var mySwiper = new Swiper('.swiper-container', {
		// direction: 'vertical', //滑动方向
		// initialSlide: 9,
		allowTouchMove: 0, //是否可以左右滑动
		speed: 100, //切换速度

		effect: 'fade', //切换效果

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.next',
			prevEl: '.prev',
		},
		on: {
			init: function() {
				swiperAnimateCache(this); //隐藏动画元素 
				swiperAnimateCache(this); //初始化完成开始动画
			},
			slideChangeTransitionEnd: function() {
				swiperAnimate(this); //每个slide切换结束时也运行当前slide动画


				if (this.activeIndex == 9) {
					//根据分数显示性格
					if (gradeNum >= 5 && gradeNum <= 8) {
						$('#gradeEnd').text(character[0]).css({
							'background': 'red'
						});
						gradeMethods(characterDetails[0]);
					}
					if (gradeNum >= 9 && gradeNum <= 12) {
						$('#gradeEnd').text(character[1]).css({
							'background': 'yellow'
						});
						gradeMethods(characterDetails[1]);
					}
					if (gradeNum >= 13 && gradeNum <= 16) {
						$('#gradeEnd').text(character[2]).css({
							'background': 'blue'
						});
						gradeMethods(characterDetails[2]);
					}
					if (gradeNum >= 17 && gradeNum <= 20) {
						$('#gradeEnd').text(character[3]).css({
							'background': 'green'
						});
						gradeMethods(characterDetails[3]);
					}

					//显示标签
					labelMethods(topicNum);
				}
			},
		}
	});
	
	//音乐
	
	var audio = document.getElementById('audio');
	audio.play();
	$(document).one("touchstart",
		function() {
			audio.play()
		})
		
	$('.ceshiqiehuan').on('touchend', function () {
		audio.pause();
		var luyinpath = './audio/music2.mp3';
		$('#audio').attr('src', luyinpath);
		audio.play();
	})


	//抽奖
	//-------------------------------------------------------------------------------------------------------
	var turnplate={
		startAngle:0,			//开始角度
		randomRate:[],              	//控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
		bRotate:false			//false:停止;ture:旋转
	};
	var sum;
	turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%'];
	//设置turnplate.randomRate的数组长度就是大转盘格子的个数
	var rotateTimeOut = function (){
		$('.awardGift').rotate({
			angle:0,
			animateTo:2160,
			duration:8000,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	//旋转
	var rotateFn = function (item, txt){
		var angles = item * (360 / turnplate.randomRate.length) - (360 / (turnplate.randomRate.length*2));
		if(angles<270){
			angles = 270 - angles; 
		}else{
			angles = 360 - angles + 270;
		}
		$('.awardGift').stopRotate();
		$('.awardGift').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:8000,
			callback:function (){ 
				
				//旋转完成调用的函数
				// alert(txt.giftCode);
				$('#showPrize').text(txt.giftCode);
				$('.show-prize').css('display','block');
				//开启旋转
				turnplate.bRotate = !turnplate.bRotate;
			}
		});
	};
	//点击开始
	$('.start').click(function (){
		
		if(turnplate.bRotate)return;
		turnplate.bRotate = !turnplate.bRotate;

		

		$.get('json/award.json',function(data){
			console.log(data);
			turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%'];
			//从后台请求获取数据设置对应的数组为100%
			
			turnplate.randomRate[data.giftCode] = "100%";
			//获取随机数(奖品个数范围内)
			var item = rnd(turnplate.randomRate);
			rotateFn(item,data);//data为你要带的参数
		});
		
	});
	//注意如果转盘对不准的情况下。可以调节awardGift下的img的旋转角度进去调节transform: rotate(22deg);。
	$('.end-pack').on('touchstart',function(){
		var attr = $(this).attr('data-id');
		console.log(attr);
		$('#' + attr).removeClass('hide').siblings().addClass('hide');
		if(attr == 'boxCharacter'){//性格详情更换背景
			$('#lastPage').removeClass('page-bgk').addClass('topic-12-bgk');
		}else{
			$('#lastPage').removeClass('topic-12-bgk').addClass('page-bgk');
		}
	})

	
	//-------------------------------------------------------------------------------------------------------
});
function rnd(rate){
	var random = Math.floor(Math.random() * 100);
	var myRandom = [];
	var randomList = [];
	var randomParent = [];
	for(var i = 0; i < 100; i++){
		myRandom.push(parseInt([i]) + 1);
	}
	for(var i = 0; i < rate.length; i++){
		var temp = [];
		var start = 0;
		var end = 0;
		randomList.push(parseInt(rate[i].split('%')[0]));
		for(var j = 0; j < randomList.length; j++){
			start += randomList[j-1] || 0
			end += randomList[j]
		}
		temp = myRandom.slice(start, end);
		randomParent.push(temp)
	}
	for(var i = 0; i < randomParent.length; i++){
		if($.inArray(random, randomParent[i]) > 0){
			return(i+1)
		}
	}
}
