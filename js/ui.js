//Clock
$.fn.Uiclock = function(){

	var ui = $(this);
	var indicators = $('.ui-indicators',ui);
	
	ui
	.on('add_div',function(){

		const divIndex = 12;

		for(var i = 0;i<divIndex; i++){
			const div = $('<div></div>');
			indicators.append(div);
		};

		ui.triggerHandler('div_css');
	})
	.on('div_css',function(){

		var indicatorsDiv = $('.ui-indicators div');
		var n = 0;
		var x = 0;

		$.each(indicatorsDiv,function(i,item){

			var rotate = 'rotate' + '(' + n + 'deg' + ')';
			var translateY = 'translateY(-42px)';

			$(this).css('transform',rotate + translateY);

			if(i == x){
				$(this).css('background-color','#3498db');
				x += 3;
			}
			n += 30;
		})

		ui.triggerHandler('clock_trends');
	})
	.on('clock_trends',function(){

		const sec = $('.ui-sec');
		const min = $('.ui-min');
		const hr = $('.ui-hr');

		setInterval(function(){

			let time = new Date();
			let secs = time.getSeconds() * 6;
			let mins = time.getMinutes() * 6;
			let hrs =time.getHours() * 30;

			sec.css('transform',`rotateZ(${secs}deg)`);
			min.css('transform',`rotateZ(${mins}deg)`);
			hr.css('transform',`rotateZ(${hrs+(mins/12)}deg)`);

		},1000);
	});
	ui.triggerHandler('add_div');
}

//Lamp
$.fn.Uilamp = function(){

	var ui = $(this);
	var switchOn = $('.ui-lamp-switch',ui);
	var light = $('.ui-lamp-light',ui);

	switchOn.on('click',function(){
		light.toggleClass('ui-lamp-switchOn');
		switchOn.toggleClass('ui-lamp-switchOff');
	});
}

//Sound
$.fn.Uisound = function(){

	var ui = $(this);
	var soundOuter = $('.ui-sound-outer',ui);
	var soundSwitch = $('.ui-sound-switchOn');

	soundSwitch.on('click',function(){

		soundSwitch.toggleClass('ui-sound-switchOn');

		var className = soundSwitch.attr('class');
			className = className.split(' ');

			if(className[1] === 'ui-sound-switchOn'){
				soundOuter.css({background:'linear-gradient(#14ffe9,#ffeb3b,#ff00e0)'});
			}else{
				soundOuter.css({background:'#000'});
			}
	});	
}

//Monitor
$.fn.Uimonitor = function(){

	var ui = $(this);
	var monitorContent = $('.ui-monitor-content',ui);
	var loading = $('.ui-monitor-loading',ui);
	var textBefore = $('.ui-monitor-loadingTest-before',ui);
	var login = $('.ui-monitor-login',ui);
	var powerSavingMode = $('.ui-monitor-powerSavingMode',ui);
	var interfaceIcon2 = $('.ui-interfaceIcon',ui);
	var internetIcon2 = $('.ui-interface-icon2',ui);
	var interface = $('.ui-monitor-interface',ui);
	var uiInterface = $('.ui-interface',ui);
	var uiPage1 = $('.ui-icon2-contentMid .ui-contentMid-page1',ui);
	var uiPage2 = $('.ui-icon2-contentMid .ui-contentMid-page2',ui);
	var uiPage3 = $('.ui-icon2-contentMid .ui-contentMid-page3',ui);
	var pointer = $('.ui-interface-pointer',ui);
	var uiWebsite = $('.ui-website span',ui);
	
	var lock = false;

	var monitorSwitch = $('.ui-monitor-switchOn');

	monitorSwitch.off('click').on('click',function(){

		var className = monitorSwitch.attr('class');
			className = className.split(' ');
			monitorSwitch.toggleClass('ui-monitor-switchOn');

			if(className[1] === 'ui-monitor-switchOn'){
				ui.triggerHandler('monitor_off');
			}else{
				ui.triggerHandler('monitor_on');
			}
	});

	ui
	.on('monitor_off',function(){

		monitorContent.fadeOut(0);

	})
	.on('monitor_on',function(){

		monitorContent.fadeIn(500);

	})
	.on('loading_animate_show',function(){

		loading.fadeIn(1000);
		ui.triggerHandler('loading_animate');

	})
	.on('loading_animate',function(){
		const cycleIndex = 2;
		var num = 0 ;

		for(var i=0;i<cycleIndex; i++){

			textBefore.delay(2000)
			.animate({width:'100%'},1500)
			.animate({width:'0%'},0)
			.promise()
			.then(function(){
				num++;
				if(num == cycleIndex){
					ui.triggerHandler('loading_animate_hide');
					return false;
				}
			})
		}

	})
	.on('loading_animate_hide',function(){

		loading.animate({opacity:'hide'},2500,function(){
			lock = true;
			ui.triggerHandler('login_animate_show',lock);
		});

	})
	.one('login_form_control',function(){
			var password = $(':password',ui);
			var button = $(':button',ui);
			var passwordCorrect = $('.ui-login-passwordCorrect',ui);
			var passwordErro1 = $('.ui-login-passwordErro1',ui);
			var passwordErro2 = $('.ui-login-passwordErro2',ui);

			button.off('click').on('click',function(){
				if(password.val() === 'waslcy'){
					passwordCorrect.fadeIn(500);
					passwordCorrect.fadeOut(1000);
					ui.triggerHandler('login_animate_hide');
					return false
				}else if(password.val() === ''){
					passwordErro2.fadeIn(500);
					passwordErro2.fadeOut(3000);
					return false
				}else{
					passwordErro1.fadeIn(500);
					passwordErro1.fadeOut(3000);
					return false
				}


			})
			password.val('');
	})
	.on('login_animate_show',function(){

		if(lock){
			lock = false;
			login.show(1000);
		}
		ui.triggerHandler('login_form_control');

	})
	.on('login_animate_hide',function(){

		login.hide(1000,function(){
			lock = true;
			ui.triggerHandler('interface_interfaceIcon2_input_clear');
			ui.triggerHandler('interface_animate_show');
			ui.triggerHandler('interface_bottom_time');

		});

	})
	.on('interface_animate_show',function(){

		if(lock){
			lock = false;
			interface.fadeIn(1000,function(){

				lock = true;
				uiInterface.fadeIn(1000);
				ui.triggerHandler('interface_pointer_animate');
			});

		}
	})
	.on('interface_animate_hide',function(){

		uiInterface.hide(0);

	})
	.on('interface_pointer_animate',function(){

		if(lock){
			lock = false;
			pointer
			.delay(1500)
			.animate({top:'25%',left:'5%'},1500)
			.promise()
			.then(function(){
				lock = true;
				ui.triggerHandler('interface_icon_animate');
				return false;
			})
		}
	})
	.on('interface_pointer_animate1',function(){

		if(lock){
			lock = false;

			pointer
			.delay(1500)
			.animate({
				top:'60%',
				left:'55%'
			},1500)
			.promise()
			.then(function(){

				lock = true;

				var inputAuto = $('.ui-keyword-inputAuto');
				var searchIcon = $('.ui-keyword img');

				inputAuto.hide();
				searchIcon.css({display:'none'});

				ui.triggerHandler('interface_interfaceIcon2_input_animate');

			})
		}
	})
	.on('interface_pointer_animate2',function(){

		if(lock){
			lock = false;

			pointer
			.animate({left:'35%'},600)
			.promise()
			.then(function(){

				lock = true;
				ui.triggerHandler('interface_interfaceIcon2_pege1_hide');
			})
		}

	})
	.on('interface_pointer_animate3',function(){
		if(lock){
			lock = false;

			pointer
			.delay(2500)
			.animate({top:'76%',left:'70%'},1500)
			.promise()
			.then(function(){

				lock = true;
				ui.triggerHandler('interface_interfaceIcon2_pege2_hide');

			})
		}
	})
	.on('interface_pointer_animate4',function(){
		if(lock){
			lock = false;

			pointer
			.delay(1500)
			.animate({top:'3%',left:'95%'},1500)
			.promise()
			.then(function(){
				lock = true;
				ui.triggerHandler('interface_interfaceIcon2_hide');
				ui.triggerHandler('interface_interfaceIcon2_pege3_hide');
			})
		}

	})
	.on('interface_icon_animate',function(){

		if(lock){
			lock = false;
			internetIcon2
			.animate({opacity:'0.5'},300)
			.css({background:'#fff'})
			.promise()
			.then(function(){
				lock = true;
				internetIcon2.css({opacity:'1',background:'none'})
				ui.triggerHandler('interface_animate_hide');
				ui.triggerHandler('interface_interfaceIcon2_show');
				return false;
			})
		}

	})
	.on('interface_interfaceIcon2_show',function(){

		if(lock){
			interfaceIcon2.fadeIn(1000);
			ui.triggerHandler('interface_interfaceIcon2_pege1_show');
		}

	})
	.on('interface_interfaceIcon2_hide',function(){

		if(lock){
			interfaceIcon2.hide(0);
		}

	})
	.on('interface_interfaceIcon2_input_animate',function(){

		var input = $('.ui-keyword-input');
		var text = $('.ui-keyword-input span');
		var i = 0;

		input.show();

		var inputs = setInterval(function(){

			if(i < 5){
				text.eq(i).show();
				i++;
			}else{
				ui.triggerHandler('interface_pointer_animate2');
				clearInterval(inputs);
			}

		},300);

	})
	.on('interface_interfaceIcon2_input_clear',function(){

		var input = $('.ui-keyword-input');
		var text = $('.ui-keyword-input span');
		var inputAuto = $('.ui-keyword-inputAuto');
		var searchIcon = $('.ui-keyword img');

		for(var i = 0; i<5;i++){

			text.eq(i).hide();

		}

		input.hide();
		inputAuto.show();
		searchIcon.css({display:'block'});

	})

	.on('interface_interfaceIcon2_pege1_show',function(){

		if(lock){
			lock = false;
			uiPage1.fadeIn(1000,function(){
			lock = true;
				ui.triggerHandler('interface_pointer_animate1');
			});
		}

	})
	.on('interface_interfaceIcon2_pege1_hide',function(){

		if(lock){
			lock = false;
			uiPage1.fadeOut(500,function(){

				lock = true;
				ui.triggerHandler('interface_interfaceIcon2_pege2_show');
			});
		}
	})
	.on('interface_page2_animate',function(){

		var uiSection = $('.ui-section-content');

		if(lock){
			lock = false;
			uiSection
			.stop()
			.delay(1500)
			.animate({top:'-180px'},7000)
			.animate({top:'-110px'},2000)
			.promise()
			.then(function(){
				var uiContent = $('.ui-section-content .ui-content');
				var uiButton = $('.ui-section-content .ui-content .section-content-button');
					lock = true;

				uiContent.eq(2).css({border:'1px solid #3081C1'});
				uiButton.eq(2).css({background:'#3081C1'});

				ui.triggerHandler('interface_pointer_animate3');
			})
		}
	})
	.on('interface_page2_animate_clear',function(){

		var uiSection = $('.ui-section-content');
		var uiContent = $('.ui-section-content .ui-content');
		var uiButton = $('.ui-section-content .ui-content .section-content-button');

		uiSection.css({top:'0px'});
		uiContent.eq(2).css({border:'1px solid #999'});
		uiButton.eq(2).css({background:'#999'});

	})
	.on('interface_interfaceIcon2_pege2_show',function(){

		ui.triggerHandler('interface_page2_animate_clear');

		if(lock){
			lock = false;

			uiWebsite.text('https://www.転職サイト/求人検索.jp');
			uiPage2.fadeIn(500,function(){

				lock = true;
				ui.triggerHandler('interface_page2_animate');
			});
		}
	})
	.on('interface_interfaceIcon2_pege2_hide',function(){

		if(lock){
			lock = false;

			uiPage2.fadeOut(200,function(){

				lock = true;
				ui.triggerHandler('interface_interfaceIcon2_pege3_show');
			});
		}
	})
	.on('interface_interfaceIcon2_pege3_show',function(){

		if(lock){
			lock = false;

			uiWebsite.text('https://www.転職サイト/応募完了.jp');
			uiPage3.fadeIn(200,function(){
				lock = true;
				ui.triggerHandler('interface_pointer_animate4');
			});
		}
	})
	.on('interface_interfaceIcon2_pege3_hide',function(){

		if(lock){
			lock = false;

			uiPage3.fadeOut(0,function(){

				internetIcon2.css({background:'none'});
				interface.fadeIn(100);
				uiInterface.fadeIn(100,function(){

					var interfaceEnd = setInterval(function(){

						interface.fadeOut(1000,function(){

							clearInterval(interfaceEnd);

							ui.triggerHandler('powerSavingMode_animater_show');

						})
					},3000)
				});
			});
		}
	})
	.on('interface_bottom_time',function(){

		setInterval(function(){

			var uiTime = $('.ui-time');
			var time = new Date();
			var min = time.getMinutes();
			var hr = time.getHours();

			min = (min < 10) ? '0' + min : min;
			hr = (hr < 10) ? '0' + hr : hr;
			times = hr + ':' + min;
			uiTime.text(times);

		})
	})
	.on('powerSavingMode_animater_show',function(){

		const colors = ["#2196f3","#e91e63","#ffeb3b","#74ff1d"]

		var mainFramSwitch = $('.ui-mainfram-switch');

		powerSavingMode.fadeIn(1500,function(){

			time = setInterval(function(){

				var uiPowerSavingMode = $('.ui-powerSavingMode');
				var span = $('<span></span>');

				var size = Math.random() * 20;
				var bg = colors[Math.floor(Math.random()*colors.length)];

				uiPowerSavingMode.append(span);

				span
				.css({
					width : size + 'px',
					height : size + 'px',
					top : Math.random() * uiPowerSavingMode.height() + 'px',
					left : Math.random() * uiPowerSavingMode.width() + 'px',
					background : bg
				})			
				setTimeout(function(){
					span.remove();
				},5000)
			},100)

		mainFramSwitch.on('click',function(){

			var className = mainFramSwitch.attr('class');
				className = className.split(' ');

				console.log(mainFramSwitch);
				console.log('JQK');

				if(className[1] === 'switch-On'){
					clearInterval(time);
				}
			})
		})
	});

	ui.triggerHandler('loading_animate_show');
}

//Mainfram
$.fn.Uimainfram = function(){

	var ui = $(this);
	var switchItem = $('.ui-mainfram-switchItem',ui);
	var swtich = $('.ui-mainfram-switch',ui);
	var mainframFoucs = $('.ui-mainfram-foucs',ui);
	var lock = false;


	swtich
	.on('click',function(){
		var className = swtich.attr('class'),
			className = className.split(' ');

		if(className[1] === 'switch-Off'){
			swtich.removeClass('switch-Off').addClass('switch-On');
			ui.triggerHandler('switchItem_hide');
			ui.triggerHandler('mainframFoucs_hide');
			ui.triggerHandler('mainfram_on_off','off');

		}else{
			swtich.removeClass('switch-On').addClass('switch-Off');
			ui.triggerHandler('switchItem_show');
			ui.triggerHandler('mainframFoucs_show');
			ui.triggerHandler('mainfram_on_off','on');
		}
	});

	ui
	.on('switchItem_hide',function(){
		switchItem.css({border:'1px solid #333'});
	})
	.on('switchItem_show',function(){
		switchItem.css({border:'1px solid #00a1ff'});
	})
	.on('mainframFoucs_hide',function(){
		mainframFoucs.fadeOut(500);
	})
	.on('mainframFoucs_show',function(){
		mainframFoucs.fadeIn(1500);
	})
	.on('mainfram_on_off',function(i,item){

		var monitor  = $('.ui-monitor');
		var loading = $('.ui-monitor-loading');
		var textBefore = $('.ui-monitor-loadingTest-before');
		var login = $('.ui-monitor-login');
		var interface = $('.ui-monitor-interface');
		var interfaceIcon2 = $('.ui-interfaceIcon');
		var powerSavingMode = $('.ui-monitor-powerSavingMode');
		var uiPage1 = $('.ui-icon2-contentMid .ui-contentMid-page1');
		var uiPage2 = $('.ui-icon2-contentMid .ui-contentMid-page2');
		var uiPage3 = $('.ui-icon2-contentMid .ui-contentMid-page3');
		var pointer = $('.ui-interface-pointer');
		var monitorSwitch = $('.ui-monitor-switch');

		if(item == 'off'){
			monitor.unbind();
			loading.hide();
			textBefore.stop(true).animate({width:'0%'},0);
			login.hide();
			interface.hide();
			interfaceIcon2.hide();
			powerSavingMode.hide();
			uiPage1.hide();
			uiPage2.hide();
			uiPage3.hide();
			pointer.stop(true).animate({left:'50%',top:'50%'});
			monitorSwitch.removeClass('ui-monitor-switchOn');
		}else{
			$('.ui-monitor').Uimonitor();
			monitorSwitch.addClass('ui-monitor-switchOn');
		}

	});
}

//Watch
$.fn.Uiwatch = function(){

	let ui = $(this);
	let AMPM = 'AM';

	ui
	.on('watch-time',function(){

		let secs = $('.ui-watch-sec',ui);
		let mins = $('.ui-watch-min',ui);
		let hrs = $('.ui-watch-hr',ui);
		let uiAMPM = $('.ui-watch-AMPM');

		setInterval(function(){

		const clock = $('.ui-bookshelf-time');
		let time = new Date();

		let sec = time.getSeconds();
		let min = time.getMinutes();
		let hr  = time.getHours();
		
		if(hr > 12){
			hr = hr - 12;
			AMPM = 'PM';
		}


		sec = (sec < 10) ? '0' + sec : sec;
		min = (min < 10) ? '0' + min : min;
		hr = (hr < 10) ? '0' + hr : hr;

		secs.text(sec);
		mins.text(min);
		hrs.text(hr + ':');
		uiAMPM.text(AMPM);

		});

	})
	.on('watch-days',function(){

		const lang = 'ja';
		
		let uiMonth = $('.ui-watch-month');
		let uiDayNumber = $('.ui-watch-dayNumber');
		let uiDayName = $('.ui-watch-dayName');

		let date = new Date();
		let dayNumber = date.getDate();
		let month = date.getMonth() + 1;
		let dayName = date.toLocaleString(lang,{weekday:'long'});

		// console.log(date);

		
		uiMonth.text(month + '月');
		uiDayNumber.text(dayNumber + '日');
		uiDayName.text(dayName.charAt(0));

	})

	ui.triggerHandler('watch-time');
	ui.triggerHandler('watch-days');
}

//Printer
$.fn.Uiprinter = function(){

	var ui = $(this);
	var printerSwitchId = $('ui-printer-switch',ui);
	var printerSwitch = $('.ui-printer-switch',ui);
	var lcd = $('.ui-printer-lcd',ui);
	var lcdText = $('.ui-printer-lcd span',ui);
	var printerLamp = $('.ui-printerLamp',ui);
	var lamp = $('.ui-printer-lamp',ui);
	var swtichBoolena = false;
	var boolean = true;
	var stop1;
	var stop2;
	var timer = {};

	function controClick(id,fn,wait){

		if(timer[id]){
			window.clearTimeout(timer[id]);
			delete timer;
		}
		return timer[id] = window.setTimeout(function(){
			fn();
			delete timer[id];
		},wait);
	}

	printerSwitch.off('click').on('click',function(){
		var className = printerSwitch.attr('class'),
			className = className.split(' ');

			controClick(printerSwitchId,function(){
				if(className[1] === 'ui-printer-switchOn'){
					boolean = false;
					ui.triggerHandler('printer-off');
					printerLamp.unbind();
					lamp.css({background:''});
					clearInterval(stop1);
					clearInterval(stop2);
					ui.triggerHandler('printer-lcd-off');
					ui.triggerHandler('printer-lamp-off');
				}
				else{
					boolean = true;
					ui.triggerHandler('printer-on');
					ui.triggerHandler('printer-lcd-on');
					ui.triggerHandler('printer-lamp-on');
				}
			},200)	
	});

	ui
	.on('printer-off',function(){
		printerSwitch.removeClass('ui-printer-switchOn');
	})
	.on('printer-on',function(){
		printerSwitch.addClass('ui-printer-switchOn');
	})
	.on('printer-lcd-off',function(){
		lcd.removeClass('ui-lcd-on');
		lcdText.hide();
	})
	.on('printer-lcd-on',function(){
		lcd.addClass('ui-lcd-on');
		lcdText
		.delay(1000)
		.fadeIn(2000)
		.promise()
		.then(function(){
			lamp.removeClass('ui-printer-lampOn');
			ui.triggerHandler('printer-lamp-erro');
			console.log('123');
		});
	})
	.on('printer-lamp-off',function(){
		lamp.removeClass('ui-printer-lampErro');
	})
	.on('printer-lamp-on',function(){
		lamp.addClass('ui-printer-lampOn');
	})
	.on('printer-lamp-erro',function(){

		lamp.addClass('ui-printer-lampErro');
		var erro = $('.ui-printer-lampErro');

		if(boolean){
			stop1 = setInterval(function(){
				erro.css({background:'yellow'});
				stop2 = setTimeout(function(){
					erro.css({background:'red'});
				},1000);
			},2000);
		}else{
			ui.triggerHandler('printer-lamp-off');
		}
	});

	ui.triggerHandler('printer-lamp-erro');
}

//TouchPC
$.fn.UitouchPC = function(){

	var ui = $(this);
	var touchPcSwitch = $('.ui-touchPc-switch',ui);
	var touchPcContent1 = $('.ui-touchPc-content1',ui);
	var touchPcContent2 = $('.ui-touchPc-content2',ui);
	var lampTouchPc = $('.ui-lamp-touchPc');
	var content2Box = $('.ui-content2-box',ui);
	var tips = $('.ui-box-process .item',ui);
	var Content1enableAuto = true;
	var Content2enableAuto = true;
	var current = 0 ;
	var timer = {};


	var content2BoxCp = content2Box.html();

	var touchPci = 123;

	lampTouchPc
	.off('mouseover')
	.on('mouseover',function(){
		Content2enableAuto = false;
	})
	.off('mouseout')
	.on('mouseout',function(){
		Content2enableAuto = true;
	})

	function controClick(id,fn,wait){

		if(timer[id]){
			window.clearTimeout(timer[id]);
			delete timer;
		}
		return timer[id] = window.setTimeout(function(){
			fn();
			delete timer[id];
		},wait);

	}

	touchPcSwitch.off('click').on('click',function(){

		var boxText = $('.ui-content2-box .ui-box-text',ui);
		var className = touchPcSwitch.attr('class'),
			className = className.split(' ');

			controClick(touchPcSwitch,function(){
				if(className[1] === 'touchPcSwitch-off'){
					$('.ui-touchPc-screen').UitouchPC();

					content2Box.css('left',0);
					touchPcSwitch.removeClass('touchPcSwitch-off');
					tips.removeClass('item_foucs').eq(0).addClass('item_foucs');

				}
				else{
					Content1enableAuto = false;
					Content2enableAuto = false;
					ui.unbind();
					touchPcContent1.hide();
					touchPcContent2.hide();
					lampTouchPc.hide();
					touchPcSwitch.addClass('touchPcSwitch-off');

					console.log(boxText.length);
					if(boxText.length == 8){
						content2Box.html(content2BoxCp);
					}

				}
			},300)	
		
	});

	ui
	.on('touchPcContent1-show',function(){
		touchPcContent1.fadeIn(1000);
		 Content2enableAuto && setTimeout(function(){
		 	ui.triggerHandler('touchPcContent1-hide');
		 },8000);
	})
	.on('touchPcContent1-hide',function(){
		touchPcContent1.hide(500,function(){
			ui.triggerHandler('touchPcContent2-show');
			lampTouchPc.show();
		});
	})
	.on('touchPcContent2-show',function(){
		touchPcContent2.fadeIn(1000);
		ui.triggerHandler('touchPcContent2-processing');
	})
	.on('touchPcContent2-hide',function(){
		touchPcContent2.fadeOut(0);

	})
	.on('touchPcContent2-processing',function(){

		content2Box.html(content2BoxCp + content2BoxCp);

		var boxText = $('.ui-content2-box .ui-box-text',ui);
		var boxTextWidth = Math.ceil(boxText.eq(0).width());
		var speed = -boxTextWidth;
		var boxTextLength = boxText.length;
		var content2BoxWidth = boxTextWidth * boxTextLength;


		const content2Width = content2BoxWidth;
		content2Box.width(content2BoxWidth);

		var method = {
			width:content2BoxWidth,
			speed:speed
		};

		setInterval(function(){
			Content2enableAuto && ui.triggerHandler('touchPcContent2-move',method);
		},5000)

	})
	.on('touchPcContent2-move',function(ext,method){
		if(content2Box.css('left') == -method.width / 2 + 'px'){
			content2Box.css('left',0);
		}

		content2Box.stop(true,true).animate({'left':'+=' + method.speed},500);

		ui.triggerHandler('tips-process');

	})
	.on('tips-process',function(){

		current = current + 1;
		if(current >= 4){
			current = 0;
		}

		tips.removeClass('item_foucs').eq(current).addClass('item_foucs');
	})

	ui.triggerHandler('touchPcContent1-show');
}

//Phone
$.fn.Uiphone = function(){

	var ui = $(this);
	var phoneScreen = $('.ui-phone-screen',ui);
	var enable = null;
	var lock = false;

	var uiPostionLeft = ui.position().left;

	ui
	.on('phoneScreen_show',function(){
		phoneScreen
		.delay(9000)
		.fadeIn(1000,function(){
			ui.triggerHandler('phone_animate_time');
		});
	})
	.on('phoneScreen_hide',function(){
		phoneScreen.fadeOut(0);

		if(lock){
			setTimeout(function(){
				lock = false;
				ui.triggerHandler('phoneScreen_show');
			},1000);
		}
	})
	.on('phone_animate',function(){
		ui
		.stop(true,true)
		.animate({left: 92},100)
		.animate({left: 91},0);
	})
	.on('phone_animate_time',function(){
	 	enable = setInterval(function(){
			ui.triggerHandler('phone_animate');
		},1000);

		ui.triggerHandler('phone_animate_stop');
	})
	.on('phone_animate_stop',function(){
		setTimeout(function(){
			lock = true;
			clearTimeout(enable);
			ui.triggerHandler('phoneScreen_hide');
		},10000);
	})

	ui.triggerHandler('phoneScreen_show');
}

//Print
$.fn.Uiprint = function(){

	var ui = $(this);
	var printControl = $('.ui-print-control',ui);
	var days = $('.ui-print-mdy',ui);


	printControl
	.on('click',function(){
		days.triggerHandler('set_days');
		printControl.triggerHandler('print_enlarge');

	})
	.on('mouseleave',function(){
		printControl.triggerHandler('print_reduce');

	})
	.on('print_enlarge',function(){

		printControl
		.removeClass('ui-print-reduce')
		.addClass('ui-print-enlarge')
		
	})
	.on('print_reduce',function(){

		printControl
		.removeClass('ui-print-enlarge')
		.addClass('ui-print-reduce');
	})


	days
	.on('set_days',function(){

		let date = new Date();
		let dayNumber = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		days.text(year.toString().substr(2,2) + '年' + month + '月' + dayNumber +'日');

	})	
}

//Calendar
$.fn.Uicalendar = function(){

	var ui = $(this);
	var date = new Date();
	var calendarDate = $('.ui-calendar-date',ui);
	var weekAndDays = $('.ui-weekAndDays',ui);
	var week = $('.ui-calendar-week');

	var firstWeekDay = new Date(2021,2,1);

	var res = firstWeekDay.getDay();



	ui
	.on('set_calendarValue',function(){

		var dates = {};

		dates.month = date.getMonth();
		dates.year = date.getFullYear();
		dates.dayNumber = date.getDate();


		ui.triggerHandler('set_calendarStyle');
		ui.triggerHandler('set_calendarSolid_week_date',dates);

		calendarDate.triggerHandler('set_calendar_month',dates);
		calendarDate.triggerHandler('set_calendar_year',dates);

	})
	.on('set_calendarStyle',function(){

		var calendarBorder3 = $('.ui-calendar-border3',ui);
		var border3Raidus = $('.ui-calendar-border3Radius',ui);

		var Border3Width = Math.ceil(calendarBorder3.width());
		var border3Radius = Math.ceil(border3Raidus.width());
		var radiusNumber = Math.ceil(Border3Width / border3Radius);

		for(var i = 0; i < radiusNumber; i++){
			var radiusDiv  = $('<div class="ui-calendar-border3Radius"></div>');
			calendarBorder3.append(radiusDiv);
		}

	})
	.on('set_calendarSolid_week_date',function(evt,dates){

		var grid = $('<div></div>');

		grid.css({width:16.5,height:13.5});

		var gridWidth = grid.width();
		var gridHeight = grid.height();
		var weekAndDaysWidth = Math.ceil(weekAndDays.width());
		var weekAndDaysHeight = Math.ceil(weekAndDays.height());
		var gridWidthNumber =  Math.floor(weekAndDaysWidth / gridWidth);
		var gridHeightNumber =  Math.floor(weekAndDaysHeight / gridHeight);
		var gridNumber = gridWidthNumber * gridHeightNumber;


		function addDiv(){
			var weeks = ['日','月','火','水','木','金','土'];

			for(i=0; i < 49; i++){
				if(i < 7){
					var grids = $('<div class="ui-calendar-week"><span>'+weeks[i]+'</span></div>');
					weekAndDays.append(grids);

				}else{
					var grids = $('<div class="ui-calendar-days"><span></span></div>');
					weekAndDays.append(grids);
				}
			}

			setDate();
		}

		function setDate(){

			var days = $('.ui-calendar-days span',ui);
			var firstWeekDay = new Date(dates.year,dates.month,1).getDay();
			var totalDay = new Date(dates.year,dates.month+1,0).getDate();



			for(var i = 1 ; i <=totalDay ;i++){
				if(i != 1){
					days.eq(firstWeekDay).text(i);
				}else{
					days.eq(firstWeekDay).text(i);
				}
				firstWeekDay++;
			}
		}


		addDiv();	

	})


	calendarDate
	.on('set_calendar_month',function(evt,dates){

		var month = $('.ui-calendar-month');
		month.text(dates.month + 1);

	})
	.on('set_calendar_year',function(evt,dates){

		var year = $('.ui-calendar-year');
		year.text(dates.year);
	})



	ui.triggerHandler('set_calendarValue');
}

$.fn.Uirain = function(){

	var ui = $(this);

	ui
	.on('rain_value',function(){

		var increment = 0;
	    var drops = "";
	 	var backDrops = "";

	 	$('.ui-rain',ui).empty();

	 	var rain_way = {increment:0,drops:"",backDrops:""};
	 	ui.triggerHandler('rain_animation',rain_way);


	})
	.on('rain_animation',function(evt,rain_way){


		  while (rain_way.increment < 100) {

		    var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
		    var randoFiver = (Math.floor(Math.random() * (3 - 2 + 1) + 2));
		    var randoRainFront = (Math.floor(Math.random() * (35 - 1 + 1) + 2));
		    var randoRainBack = (Math.floor(Math.random() * (60 - 1 + 1) + 2));

		    rain_way.increment += randoFiver;

		    rain_way.drops += '<div class="drop" style="left: ' + rain_way.increment + '%; bottom: ' + randoRainFront + '%; animation-delay: 0.' + 
		    randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + 
		    randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';

		    rain_way.backDrops += '<div class="drop" style="right: ' + rain_way.increment + '%; bottom: ' + randoRainBack + '%; animation-delay: 0.' + 
		    randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + 
		    randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';

		  }

		  $('.ui-rain.front-row').append(rain_way.drops);
		  $('.ui-rain.back-row').append(rain_way.backDrops);

	})
		
    ui.triggerHandler('rain_value');
}

//页面脚本逻辑
$(function(){

	//Clock
	$('.ui-clock').Uiclock();

	//Lamp
	$('.ui-lamp').Uilamp();

	//Sound
	$('.ui-sound').Uisound();

	//Monitor
	$('.ui-monitor').Uimonitor();

	//Mainfram
	$('.ui-mainfram').Uimainfram();

	//Watch
	$('.ui-bookshelf-watch').Uiwatch();

	//Printer
	$('.ui-printer').Uiprinter();

	//TouchPc
	$('.ui-touchPc-screen').UitouchPC();

	//Phone
	$('.ui-phone').Uiphone();

	//Print
	$('.ui-print').Uiprint();

	//Calendar
	$('.ui-calendar').Uicalendar();

	//rain
	$('.ui-rain').Uirain();

});
