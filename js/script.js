let mainMusicEl = document.getElementById('main_music_theme'),
	soundActive = false,
	startDone = false,
	useOffSound = false;
mainMusicEl.addEventListener('loadedmetadata', function() {
	mainMusicEl.currentTime = 0;
	mainMusicEl.pause();
}, false);

let bagNum = 4,
	bagMaxNum = 10;

let itemsArr = [
        ['Клатч', 'Свиток', 'Полотенце'],
        ['Букет', 'Учебники'],
        ['Ноутбук', 'Книга', 'Ланч-бокс'],
        ['Смартфон', 'Коробка с кексами'],
        ['Флаг', 'Полотенца для массажа']
	],
	itemsCount = itemsArr.length,
    itemsCodenames = [
        ['clatch', 'scroll', 'towel'],
        ['flowers', 'schoolbooks'],
        ['notebook', 'book', 'lunchbox'],
        ['smartphone', 'muffins'],
        ['flag', 'massage']
    ],
    winCodenames = []; // массив с угаданными подарками

let gameItems = [],
	gameOrder = [],
	qNow = 0,
	rightNum = 0;

let timerStart = 60000,
	timerFinal = 0,
	timer = timerStart,
	winner = false;

let startAllow = false;

$(document).ready(function(){

    if (isTouchDevice()) {
        $('body').addClass('touch');
    } else {
        $('body').addClass('no-touch');
    }

    $(document).on('click', '.accept_popup .close', function(){
        startAllow = true;
		$('.accept_popup').fadeOut(150);
		$('body').addClass('no_accept');
		return false;
	});

	$('.page-screen__start .button--start').click(function(){
        if (!startAllow) {
            $('.accept_popup .close').addClass('pulse');
            return false;
        }
        
        $('.accept_popup').fadeOut(150);
		$('body').addClass('no_accept');

        generateGame();

        $('.start-bg').fadeOut(350);
        $('.main-bg').addClass('in-game');
        $('.start-man').addClass('hidden');

        $('.page-screen__start').fadeOut(150, function(){            
            $('.page-screen__game').removeClass('hidden');
            setTimeout(function(){
                $('.page-screen__game').addClass('visible');
                setTimeout(function(){
                    $('.answers-vars').removeClass('hidden');
                    $('.game-top').removeClass('hidden');

                    setTimeout(function(){    
                        $.magnificPopup.open({
                            modal: true,
                            fixedContentPos: true,
                            fixedBgPos: true,
                            mainClass: 'mfp-fade',
                            items: {
                                src: $('#help_popup'),
                                type: 'inline'
                            }
                        });
                    }, 250);
                }, 350);
            }, 10);
        });
	});

	$('.close-help').click(function(){
		$.magnificPopup.close();
        $('.answers-vars').removeClass('blocked');
        timer_start();

        if (!startDone && !useOffSound) {
            $('#sound').removeClass('off');
            if (!soundActive) {
                //mainMusicEl.volume = 0.5;
                mainMusicEl.play();
            }
            soundActive = true;
            startDone = true;
        }
	});

	$('#sound').click(function(){
		if (!soundActive) {
			//mainMusicEl.volume = 0.5;
			mainMusicEl.play();
			soundActive = true;

			useOffSound = false;
		} else {
			mainMusicEl.pause();
            //catchMusicEl.pause();
			//fallMusicEl.pause();
			soundActive = false;

			useOffSound = true;
		}

		$(this).toggleClass('off');
		return false;
	});

	let forceSoundOff = false;

	$(window).on('blur', function(e){
        if (document.activeElement.title != 'reCAPTCHA') {
            if (soundActive) {
                $('#sound').click();
                forceSoundOff = true;
            }
        }
	});

    $(window).on('focus', function(e){
        if (forceSoundOff && !soundActive) {
            forceSoundOff = false;
            $('#sound').click();
        }
	});

    $('.answer').click(function(){
		$('.game-area').addClass('done');
        $('.answers-vars').addClass('blocked');

		if ($(this).index() == gameItems[qNow]) {
			$('.game-area').addClass('right');
			rightNum++;
            winCodenames.push(itemsCodenames[gameOrder[qNow]][$(this).index()]);
            //console.log(winCodenames);
		} else {
			$('.game-area').addClass('wrong');
		}
		$(this).addClass('choose');

		$('.game-top #score').text(rightNum);
		
		setTimeout(function(){
			qNow++;

			$('.answers-vars').addClass('hidden');
			setTimeout(function(){
				$('.answer').removeClass('choose');
				$('.game-area').removeClass('done right wrong');
				$('.game-screen__item').removeClass('shown');
			}, 150);

			if (qNow < gameOrder.length) {

				$('.game-lenta').addClass('move');

				setTimeout(function(){
					bagNum++;
					if (bagNum > bagMaxNum) bagNum = 1;
					$('.game-lenta').append('<i class="bag' + bagNum + '"></i>');
					$('.game-lenta i').eq(0).remove();
					$('.game-lenta').removeClass('move');
					
					buildQuestion(gameOrder[qNow]);
					$('.answers-vars').removeClass('hidden');
                    setTimeout(function(){
                        $('.answers-vars').removeClass('blocked');
                    }, 300);
				}, 600);

			} else {
				endGame();
			}
		}, 1000);
	});

    $('.button--preform').click(function(){
        $('#form_popup .preform').fadeOut(150, function(){
            $('#form_popup .form').fadeIn(150);
        });
    });

    $(document).on('click', '.button--restart', function(){
		gameItems = [];
		gameOrder = [];
        winCodenames = [];
		qNow = 0;
		winner = false;
		rightNum = 0;

		$('.game-top #score').text(rightNum);
		generateGame();

		timer = timerStart;
        $('.game-top #time').text(timer/1000);

        $('.page-screen__final').addClass('hidden');
        $('.page-screen__game').removeClass('hidden');
        $('.main-bg').removeClass('end-game');
        setTimeout(function(){
            $('.page-screen__game').addClass('visible');

            $('#form_popup .form, #form_popup .thanks').hide();
            $('.preform--result, .preform--zero').hide();
            $('#form_popup .preform').show();
            $('#subscribe_form .button').removeClass('loading').removeAttr('disabled');
            $('#form_popup').removeClass('with_sc');

            $('.answers-vars').removeClass('hidden');
            setTimeout(function(){
                $('.answers-vars').removeClass('blocked');
                timer_start();
            }, 300);
            
        }, 350);
    });

    $('.text_input').each(function(){
		if ($(this).val() != '') {
			$(this).addClass('with_val');
		}
	});

	$(document).on('blur', '.text_input', function(){
		if ($(this).val() != '') {
			$(this).addClass('with_val');
		} else {
			$(this).removeClass('with_val');
		}
	});

    $('.clear-input').click(function(){
        $(this).parents('.input_hld').find('.text_input').val('').removeClass('with_val');
    });

	$('#subscribe_form').validate({
		submitHandler: function (form) {
			let action = $(form).attr('action');
			let data = $(form).serializeArray().reduce(function (obj, item) {
				obj[item.name] = item.value;
				return obj;
			}, {});
			$(form).find('.button').attr('disabled', 'disabled').addClass('loading');

			var captcha = grecaptcha.getResponse();

			let getParams = window
				.location
				.search
				.replace('?','')
				.split('&')
				.reduce(
					function(p,e){
						var a = e.split('=');
						p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
						return p;
					},
					{}
				);

			if (captcha.length) {
				// console.log('g-recaptcha-response ' + captcha);
				data['g-recaptcha-response'] = captcha;

				grecaptcha.reset();

				$.ajax({
					url: action,
					data: {data, winCodenames, getParams},
					method: 'POST',
					success: function (data) {
						console.log(data);
						$(form).find('.button').removeClass('loading').removeAttr('disabled');
						$('#form_popup .form').fadeOut(150, function(){
            	            $('#form_popup .thanks').fadeIn(150);
            	            $('#form_popup').addClass('with_sc');
            	        });
					}
				})
			}
			else {
				$(form).find('.button').removeClass('loading').removeAttr('disabled');
			}
		},
		rules: {
			email: { required: true, email: true, regex: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i },
			agree: { required: true },
			subscribe: { required: true }/*,
			'g-recaptcha-response': { required: true }*/
		},
		messages: {
			email: { required: 'Обязательное поле', email: 'Введите корректный email', regex: 'Введите корректный email' },
			agree: { required: 'Для продолжения необходимо согласие' },
			subscribe: { required: 'Для продолжения необходимо согласие' }/*,
			'g-recaptcha-response':{ required: 'Вы человек?' }*/
		}
	});

	$(document).on('click', '.sc_block a', function(){
		var href = $(this).attr('href');
		
		var popupWidth = 700,
		popupHeight = 500,
		popupLeft = (window.screen.width - popupWidth) / 2,
		popupTop = (window.screen.height - popupHeight) / 2;
		var popup = window.open(href, '', 'width='+popupWidth+',height='+popupHeight+',left='+popupLeft+',top='+popupTop+'');
		
		return false;
	});

	// валидация email
	$.validator.addMethod(
		"regex",
		function(value, element, regexp)  {
			if (regexp && regexp.constructor != RegExp) {
				regexp = new RegExp(regexp);
			}
			else if (regexp.global) regexp.lastIndex = 0;
			return this.optional(element) || regexp.test(value);
		}
	);

});

function generateGame() {
	let orderTemplate = [];

	for (let i = 0; i < itemsCount; i++) {
		orderTemplate.push(i);
	}

	for (let i = 0; i < itemsCount; i++) {
		let gameOrderItemNum = parseInt(randomInteger(0, orderTemplate.length - 1)),
			gameOrderItem = orderTemplate[gameOrderItemNum];

		gameOrder.push(gameOrderItem);
		orderTemplate.splice(gameOrderItemNum, 1);
	}

    //gameOrder = [0,1,2,3,4];
	//console.log(gameOrder);

	for (let i = 0; i < itemsCount; i++) {
        let variantNum = gameOrder[i],
            variantCount = itemsArr[variantNum].length;
		let itemVariant = parseInt(randomInteger(0, variantCount - 1));
		gameItems.push(itemVariant);
	}

	//console.log(gameItems);
	buildQuestion(gameOrder[qNow]);
	
}

function buildQuestion(qNum) {
	let qVars = itemsArr[qNum];
	$('.answers-vars .answer').each(function(i,el){
		$(this).text(qVars[i]);
        if (!qVars[i]) {
            $(this).hide();
        } else {
            $(this).show();
        }
	});

	$('.game-screen__item .item').removeClass().addClass('item item' + (qNum + 1) + '-' + (gameItems[qNow] + 1));
	$('.game-screen__item').addClass('shown');
}

function timer_start() {
	let timer_int = 1000;
	
	setTimeout(function(){
		if (!winner) {
			timer = timer - timer_int;
			
			var timeSec = parseInt(timer/1000);
            if (timeSec.toString().length < 2) timeSec = '0' + timeSec;

			$('.game-top #time').text(timeSec);
			
			if (timer <= timerFinal) {
				endGame();
			} else {
				timer_start();
			}
		}
	}, timer_int);

}

function endGame() {

	winner = true;
    //console.log(winCodenames);
	
	if (rightNum > 0) {
		$('.page-screen__final .preform--result .popup_num').text(rightNum);
	    $('.page-screen__final .preform--result .word').text(wordForm(rightNum, ['подарок отгадан','подарка отгадано','подарков отгадано']));
        $('.page-screen__final .preform--result').show();
	} else {
        $('.page-screen__final .preform--zero').show();
    }

	$('.page-screen__game').removeClass('visible');
    $('.main-bg').addClass('end-game');
    setTimeout(function(){
        $('.page-screen__game').addClass('hidden');
        $('.page-screen__final').removeClass('hidden');
    }, 350);

}

function wordForm(num, word){  
	cases = [2, 0, 1, 1, 1, 2];  
	return word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];  
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function isTouchDevice(){
	/*return true;*/
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch(e) {
        return false;
    }
}
