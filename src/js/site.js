var params = {
	currentSlide: 0
};

var CarouselController = function (carousel, thumbnails) {
	this._carousel = carousel;
	this._thumbnails = thumbnails;
};

CarouselController.prototype = {
	constructor: CarouselController,

	disableCycles: function () {
		$(this._carousel).carousel({ interval: false });
	},

	registerEvent: function () {
		var me = this;
		$(this._thumbnails).on('click', function (event) {
			var targetSlide = $(event.currentTarget).attr('data-slide');
			$(me._carousel).carousel(+targetSlide);

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(this._carousel).on('slide.bs.carousel', function(event) {
			var nextSlide = $(event.relatedTarget).index();

			params.currentSlide = nextSlide;

			$(me._thumbnails).removeClass('active');
			$(me._thumbnails[nextSlide]).addClass('active');
		});
	}
};

var ThreeController = function (bntLoad, bntLoadWrap, btnPause, btnToggleVisible, frame3D, frameWrap) {
	this._bntLoad = bntLoad;
	this._bntLoadWrap = bntLoadWrap;
	this._btnPause = btnPause;
	this._btnToggleVisible = btnToggleVisible;
	this._frame3d = frame3D;
	this._frameWrap = frameWrap;
};

ThreeController.prototype = {
	constructor: ThreeController,

	_handlePause: function (onlyPause) {
		var me = this;

		if (!me._frame3d.contentWindow.viewCfg)
			return;

		var isAutoRotate = !onlyPause ? !me._frame3d.contentWindow.viewCfg.autorotate : false;
		me._frame3d.contentWindow.viewCfg.autorotate = isAutoRotate;

		var remCls = isAutoRotate ? 'glyphicon-play' : 'glyphicon-pause';
		var addCls = isAutoRotate ? 'glyphicon-pause' : 'glyphicon-play';

		var text = isAutoRotate ? 'Пауза' : 'Продолжить';

		var iconElement = $(me._btnPause).children().eq(0);
		$(iconElement).removeClass(remCls);
		$(iconElement).addClass(addCls);

		var textElement = $(me._btnPause).children().eq(1);
		$(textElement).html(text);
	},

	registerEvent: function () {
		var me = this;
		
		$(this._bntLoad).on('click', function (event) {
			me._frame3d.src = $(me._frame3d).attr('srcTarget');

			$(me._bntLoadWrap).addClass('hidden');
			$(me._btnPause).removeClass('invisible');
			$(me._btnToggleVisible).removeClass('invisible');

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(this._btnPause).on('click', function (event) {
			if ($(me._frameWrap).hasClass('hidden'))
				return;

			me._handlePause(false);

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(this._btnToggleVisible).on('click', function (event) {
			if (!me._frame3d.contentWindow.viewCfg)
				return;

			me._handlePause(true);

			me._frame3d.contentWindow.viewCfg.autorotate = false;

			var frameHidden = $(me._frameWrap).hasClass('hidden');

			var remCls = frameHidden ? 'glyphicon-chevron-down' : 'glyphicon-chevron-up';
			var addCls = frameHidden ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';

			var text = !frameHidden ? 'Показать' : 'Скрыть';

			$(me._frameWrap).toggleClass('hidden');

			var iconElement = $(event.currentTarget).children().eq(0);
			$(iconElement).removeClass(remCls);
			$(iconElement).addClass(addCls);

			var textElement = $(event.currentTarget).children().eq(1);
			$(textElement).html(text);

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});
	}
};

var ControllerFs = function (controlShow, controleClose, container, onshow) {
	this._controlShow = controlShow;
	this._controleClose = controleClose;
	this._container = container;
	this._onshow = onshow;
};

ControllerFs.prototype = {
	constructor: ControllerFs,

	registerControls: function () {
		var me = this;

		$(this._controlShow).on('click', function (event) {
			$(me._container).removeClass('hidden');
			
			if (me._onshow)
				me._onshow();

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(this._controleClose).on('click', function (event) {
			$(me._container).addClass('hidden');

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(document.body).keydown(function (event) {
			if (event.keyCode === 27 && !$(me._container).hasClass('hidden')) {
				$(me._container).addClass('hidden');
			}
		});
	}
};

var CarouselControllerFs = function(carousel, controlLeft, contolRight) {
	this._carousel = carousel;
	this._controlLeft = controlLeft;
	this._contolRight = contolRight;
};

CarouselControllerFs.prototype = {
	constructor: CarouselControllerFs,

	initComplete: false,

	disableCycles: function () {
		$(this._carousel).carousel({ interval: false });
	},

	setctiveIndex: function (index) {
		if (typeof index === 'undefined' || index === null)
			return;

		$(this._carousel).carousel(index);
	},

	initPhotoes: function () {
		$(this._carousel).find('img').attr('src', function () {
			return $(this).attr('srcTarget');
		});

		this.initComplete = true;
	},

	registerControls: function () {
		var me = this;

		$(this._controlLeft).on('click', function (event) {
			$(me._carousel).carousel('prev');

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(this._contolRight).on('click', function (event) {
			$(me._carousel).carousel('next');

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});
	}
};

$(function () {
	var carouselControllerFs;

	var isMobile = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
			isMobile = true;
	})(navigator.userAgent || navigator.vendor || window.opera);

	var initCarouselControler = function () {
		var carousel = $('#photoes')[0];
		var thumbnails = $('.thumbnails > li');
		if (!carousel || thumbnails.length < 1)
			return;

		var carouselController = new CarouselController(carousel, thumbnails);
		carouselController.registerEvent();

		if (isMobile)
			carouselController.disableCycles();
	};

	var initCarouselControllerFs = function () {
		var carousel = $('#photoes-fs')[0];
		var ctLeft = $('.left-fs')[0];
		var ctRight = $('.right-fs')[0];

		if (!carousel || !ctLeft || !ctRight)
			return;

		carouselControllerFs = new CarouselControllerFs(carousel, ctLeft, ctRight);
		carouselControllerFs.registerControls();

		if (isMobile)
			carouselControllerFs.disableCycles();
	};

	var initControllerFs = function () {
		var ctClose = $('.close-fs')[0];
		var ctShow = $('.zoom')[0];
		var ctCnt = $('.modal-fs')[0];

		if (!ctClose || !ctShow || !ctCnt)
			return;

		var onshow = function () {
			if (carouselControllerFs)
				carouselControllerFs.setctiveIndex(params.currentSlide);

			if (carouselControllerFs.initComplete)
				return;

			carouselControllerFs.initPhotoes();
		};

		var controllerFs = new ControllerFs(ctShow, ctClose, ctCnt, onshow);
		controllerFs.registerControls();
	};

	var getGlState = function () {
		try {
			var canvas = document.createElement('canvas');
			return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
		} catch (e) {
			return false;
		}
	};

	var initThreeController = function () {
		var bntLoad = $('#load')[0];
		var bntLoadWrap = $('#load-wrapper')[0];
		var btnPause = $('#pause')[0];
		var btnToggleVisible = $('#toggle')[0];
		var frame3D = $('#frame3d')[0];
		var frameWrap = $('#area3d > .embed-responsive')[0];

		if (!bntLoad || !btnPause || !btnToggleVisible || !frame3D || !frameWrap) {
			$('#area3d').addClass('hidden');
			return;
		}

		var threeController = new ThreeController(bntLoad, bntLoadWrap, btnPause, btnToggleVisible, frame3D, frameWrap);
		threeController.registerEvent();
	};

	var init3D = function () {
		if (!getGlState() || typeof window.uri3D === 'undefined' || window.uri3D === null)
			return;

		var area3D = $('#area3d');
		$(area3D)
			.children('.embed-responsive')
			.first()
			.prepend('<iframe id="frame3d" src="about:blank" srcTarget="' + window.uri3D + '" class="embed-responsive-item"></iframe>');

		$(area3D).removeClass('hidden');

		initThreeController();
	};

	initCarouselControler();
	init3D();
	initControllerFs();
	initCarouselControllerFs();
});