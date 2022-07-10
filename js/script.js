let fraudMessages = [
    ['Основной счет в&nbsp;Центробанке открыт у&nbsp;каждого человека, имеющего действующий счет в&nbsp;любом российском банке. Доступ к&nbsp;нему только у&nbsp;сотрудников банка, клиентам недоступно снятие денег с&nbsp;него. Неизвестный продал мошенникам клиентскую базу, и&nbsp;начались попытки списания денег. Вам звонили сотрудники банка в&nbsp;последние дни?'],
    ['Даже если якобы сотрудники банка вам еще не&nbsp;звонили, то, вероятно, позвонят в&nbsp;ближайшее время. Не&nbsp;беспокойтесь, деньги вы не&nbsp;потеряете. Сейчас мы просто переактивируем счет. Готовы?'],
    ['Подключаю специалиста Центробанка, оставайтесь на&nbsp;линии.','(звучит музыка)','Добрый день! Меня зовут Мария Валютина, я&nbsp;оператор Центробанка. С&nbsp;вашего счета пытались снять все деньги. Чтобы обезопасить средства, нужно срочно оформить заявку в&nbsp;финансовый отдел. Расскажите, какая сумма на&nbsp;счете?'],
    ['К сожалению, списать деньги хотят не&nbsp;с&nbsp;карты напрямую, поэтому блокировка бесполезна. Основной счет Центробанка нельзя заблокировать, иначе вы больше не&nbsp;сможете открывать банковские счета. Нужна переактивация!'],
    ['Сейчас мне нужна точная информация, сколько денег на&nbsp;ваших счетах, учитывая зарплатные, валютные, накопительные. Внимательно проверьте суммы и&nbsp;назовите точную цифру. Не&nbsp;беспокойтесь, мошенники не&nbsp;получат эту информацию: мы&nbsp;говорим по&nbsp;защищенной линии.'],
    ['Обратите внимание, я не&nbsp;прошу у&nbsp;вас данные карты и&nbsp;пароли. Я&nbsp;сотрудник Центробанка и&nbsp;знаю, что эта информация конфиденциальна, нужна только сумма, которую нужно обезопасить от&nbsp;мошенников. Какую сумму указать в&nbsp;заявке?'],
    ['Теперь придумайте кодовое слово. Оно нужно на&nbsp;случай звонка мошенников из&nbsp;банка. Кодовое слово останется только в&nbsp;защищенной базе Центробанка.'],
    ['Перевожу вас на&nbsp;капитана полиции...','(звучит музыка)','Снова здравствуйте! Это Иван Деньгин, мы уже знакомы. Итак, вам необходимо снять все деньги с&nbsp;карты в&nbsp;ближайшем банкомате. Сделать это нужно прямо сейчас, пока я&nbsp;на&nbsp;связи! После положить их на&nbsp;резервный счет, номер которого скажу чуть позже... Вы&nbsp;готовы?']
];

let fraudAuthors = [
    ['Иван Деньгин'],
    ['Иван Деньгин'],
    ['Иван Деньгин','','Неизвестный'],
    ['Мария Валютина'],
    ['Мария Валютина'],
    ['Мария Валютина'],
    ['Мария Валютина'],
    ['Мария Валютина','','Иван Деньгин']
];

let answers = [
    ['Нет, мне никто не&nbsp;звонил!','У меня были пропущенные вызовы... Вдруг это они?'],
    ['Что значит «переактивация счета»?','Я хотела&nbsp;бы узнать подробности!'],
    ['Зачем нужна переактивация счета?<br>Может, вы просто заблокируете карту?','Я не&nbsp;помню точно, сколько денег.<br>Это моя зарплатная карта.'],
    ['Это долгий процесс?','А что нужно сделать для&nbsp;переактивации?'],
    ['Я все-таки сомневаюсь...','(Называете точную сумму)'],
    ['(Называете сумму)','Я же вам уже все сказала!'],
    ['Дверь.','Потолок.'],
    ['Так, мне нужно все-таки разобраться...<br>(Вешаете трубку)','Да, я уже одеваюсь!<br>(Снимаете деньги)']
];

let mainMusicEl = document.getElementById('main_music_theme'),
	soundActive = false,
	startDone = false,
	useOffSound = false;
mainMusicEl.addEventListener('loadedmetadata', function() {
	mainMusicEl.currentTime = 0;
	mainMusicEl.pause();
}, false);

let imagesForLoad = ['game1.jpg', 'game2.jpg', 'game3.jpg', 'game4.jpg', 'game5.jpg', 'game6.jpg', 'game7.jpg', 'game8.jpg'],
    imagesCount = imagesForLoad.length;

for (let i = 0; i < imagesCount; i++) {
    let img_copy = new Image();
    img_copy.src = 'img/' + imagesForLoad[i];
}

let startAllow = false;

$(document).ready(function(){

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

        if (!startDone && !useOffSound) {
            $('#sound').removeClass('off');
            if (!soundActive) {
                //mainMusicEl.volume = 0.5;
                mainMusicEl.play();
            }
            soundActive = true;
            startDone = true;
        }

        $('body').addClass('slide-animation--in');
        setTimeout(function(){
            $('.page-screen__start').addClass('hidden');
            $('.page-screen__pregame').removeClass('hidden');
            $('.game-bg').eq(0).removeClass('hidden');
            $('.page-holder').addClass('white');

            $('body').removeClass('slide-animation--in').addClass('slide-animation--out');
            $('#sound').addClass('blue');
            setTimeout(function(){
                $('.page-screen__pregame').addClass('anim');
            }, 10);
            setTimeout(function(){
                $('body').removeClass('slide-animation--out');
                $('.game-phone').addClass('buzz');
            }, 1050);
        }, 1050);
	});

    $('#sound').click(function(){
		if (!soundActive) {
			mainMusicEl.play();
			soundActive = true;

			useOffSound = false;
		} else {
			mainMusicEl.pause();
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
        //document.activeElement.classList.contains('outer_link')
	});

    $(window).on('focus', function(e){
        if (forceSoundOff && !soundActive) {
            forceSoundOff = false;
            $('#sound').click();
        }
	});

    $('.page-screen__pregame .button').click(function(){
        $('.game-phone').removeClass('buzz');

        if (!$(this).hasClass('second')) {
            $(this).text('Продолжить').addClass('second');
            $('.game-phone').addClass('continue');
            timer_start();
            $('.page-screen__pregame .game-text__mess.hidden').removeClass('hidden');
            let scrollTo = ($('#mobile_detect').is(':hidden')) ? 10000 : $('.page-screen__pregame .game-text__mess').eq(1).position().top;
            $('.page-screen__pregame .game-text__scroll').scrollTop(scrollTo);
            changeBg('pre2');
        } else {
            $(this).attr('disabled','');
            $('body').addClass('slide-animation--in');
            setTimeout(function(){
                $('.page-screen__pregame').addClass('hidden');
                $('.page-screen__game').removeClass('hidden');
                $('.page-screen__game .game-text__scroll').scrollTop(0);

                $('body').removeClass('slide-animation--in').addClass('slide-animation--out');
                changeBg('game1');
                setTimeout(function(){
                    $('body').removeClass('slide-animation--out');
                }, 1050);
            }, 1050);
        }
    });

    let step = 0,
        finalStep = answers.length;

    $('.page-screen__game .game-text__buttons .button').click(function(){
        $('.page-screen__game .game-text__messages').append('<div class="game-text__mess me">' + $(this).html() + '</div>');

        if (step < finalStep) {
            changeBg('game' + (step + 2));
            changeImage('slide' + (step + 2));

            if (fraudMessages[step].length > 1) {
                fraudMessages[step].forEach(function(item, i, arr) {
                    let messClass = '',
                        messPrev = '',
                        fraudName = fraudAuthors[step][i];
                    if (fraudName != '') {
                        messClass = 'fraud';
                        messPrev = '<b>' + fraudName + '</b>';
                    }
                    $('.page-screen__game .game-text__messages').append('<div class="game-text__mess ' + messClass + '">' + messPrev + fraudMessages[step][i] + '</div>');
                });
            } else {
                let fraudName = fraudAuthors[step];
                $('.page-screen__game .game-text__messages').append('<div class="game-text__mess fraud"><b>' + fraudName + '</b>' + fraudMessages[step] + '</div>');
            }
            
            $('.page-screen__game .game-text__buttons .button').eq(0).html(answers[step][0]);
            $('.page-screen__game .game-text__buttons .button').eq(1).html(answers[step][1]);
            step++;
            let scrollTo = ($('#mobile_detect').is(':hidden')) ? 10000 : $('.page-screen__game .game-text__mess.me').last().position().top;
            $('.page-screen__game .game-text__scroll').scrollTop(scrollTo);
        } else {
            let finalVar = $(this).index();
            //console.log(finalVar);
            if (finalVar == 1) {
                $('#result_good').removeAttr('style');
            } else {
                $('#result_bad').removeAttr('style');
            }

            $('.page-screen__game .game-text__buttons').hide();
            $('.page-screen__game .game-text__scroll').scrollTop(10000);

            setTimeout(function(){
                $('body').addClass('slide-animation--in');
                setTimeout(function(){
                    $('.page-screen__game').addClass('hidden');
                    $('.page-screen__final').removeClass('hidden');
                    $('.page-holder').addClass('final-state');

                    $('body').removeClass('slide-animation--in').addClass('slide-animation--out');
                    $('#sound').removeClass('blue');
                    setTimeout(function(){
                        $('body').removeClass('slide-animation--out');
                    }, 1050);
                }, 1050);
            }, 1500);
        }        
    });

    $('.result-popup .button').click(function(){
        $(this).parents('.result-popup').fadeOut(150, function(){
            $('#form').fadeIn(150);
            $('html, body').scrollTop(0);
        });
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
            // ссылка на обработчик
            var action = $(form).attr('action');

            // формируем данные с формы
            let data = {};
            $(form).find ('input, textearea, select').each(function() {
                data[this.name] = $(this).val();
            });

            // получаем utm-term из get параметров
            var params = window
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

            data['utm_term'] = params['utm_term'];

            $(form).find('.button').attr('disabled', 'disabled').addClass('loading');

            // проверка на робота
            var captcha = grecaptcha.getResponse();

            if (captcha.length) {
                data['g-recaptcha-response'] = captcha;

                grecaptcha.reset();

                $.ajax({
                    url: action,
                    data: data,
                    method: 'POST',
                    success: function(data){
                        console.log(data);
                        $('#form').fadeOut(150, function(){
                            $('#thanks').fadeIn(150);
                            $('html, body').scrollTop(0);
                        });
                    }
                })
            }
            else {
                $(form).find('.button').removeClass('loading').removeAttr('disabled');
            }

		},
		rules: {
			email: { required: true, email: true },
			agree: { required: true },
			subscribe: { required: true }/*,
			'g-recaptcha-response': { required: true }*/
		},
		messages: {
			email: { required: 'Обязательное поле', email: 'Введите корректный email' },
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

});

let timerStart = 0,
	timerFinal = 300000,
	timer = timerStart;

function changeBg(bg) {
    let bgNow = $('.game-bg:not(.hidden)'),
        bgNext = $('.game-bg.hidden');

        bgNow.addClass('hidden');
        bgNext.attr('data-bg', bg).removeClass('hidden');
}

function changeImage(img) {
    let imgNow = $('.game-image__slide:not(.hidden)'),
        imgNext = $('.game-image__slide.hidden');

        imgNow.addClass('hidden');
        imgNext.attr('data-slide', img).removeClass('hidden');
}

function timer_start() {
    let timer_int = 1000;
    
    setTimeout(function(){
        timer = timer + timer_int;
        
        let timeSec = (timer%60000)/1000,
            timeMin = (timer - timeSec*1000)/60000;

        if (timeMin.toString().length < 2) timeMin = '0' + timeMin;
        if (timeSec.toString().length < 2) timeSec = '0' + timeSec;

        $('.game-phone__time .min').text(timeMin);
        $('.game-phone__time .sec').text(timeSec);
        
        if (timer < timerFinal && $('.game-phone').is(':visible')) {
            timer_start();
        }
    }, timer_int);
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
