var params = {
	currentSlide: 0
};

var CarouselController = function (carousel, thumbnails) {
	this._carousel = carousel;
	this._thumbnails = thumbnails;
};

CarouselController.prototype = {
	constructor: CarouselController,

	registerEvent: function () {
		var me = this;
		$(this._thumbnails).on('click', function (event) {
			var targetSlide = $(event.currentTarget).attr('data-slide');
			$(me._carousel).carousel(+targetSlide);

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(this._carousel).on('slide.bs.carousel', function (event) {
			var nextSlide = $(event.relatedTarget).index();

			params.currentSlide = nextSlide;

			$(me._thumbnails).removeClass('active');
			$(me._thumbnails[nextSlide]).addClass('active');
		})
	}
};

var ThreeController = function (bntLoad, bntLoadWrap, btnPause, btnToggleVisible, frame3d, frameWrap) {
	this._bntLoad = bntLoad;
	this._bntLoadWrap = bntLoadWrap;
	this._btnPause = btnPause;
	this._btnToggleVisible = btnToggleVisible;
	this._frame3d = frame3d;
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
			$(me._btnPause).removeClass('hidden');
			$(me._btnToggleVisible).removeClass('hidden');

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
	}
};

var CarouselControllerFs = function (carousel, controlLeft, contolRight) {
	this._carousel = carousel;
	this._controlLeft = controlLeft;
	this._contolRight = contolRight;
}

CarouselControllerFs.prototype = {
	constructor: CarouselControllerFs,

	initComplete: false,

	disableCycles: function () {
		this._carousel.carousel({ interval: false });
	},

	setctiveIndex: function (index) {
		if (+index == null)
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

	var initCarouselControler = function () {
		var carousel = $('#photoes')[0];
		var thumbnails = $('.photoes-thumbnails > li');
		if (!carousel || thumbnails.length < 1)
			return;

		var carouselController = new CarouselController(carousel, thumbnails);
		carouselController.registerEvent();
	};

	var initCarouselControllerFs = function () {
		var carousel = $('#photoes-fs')[0];
		var ctLeft = $('.left-fs')[0];
		var ctRight = $('.right-fs')[0];

		if (!carousel || !ctLeft || !ctRight)
			return;

		carouselControllerFs = new CarouselControllerFs(carousel, ctLeft, ctRight);
		carouselControllerFs.registerControls();
	};

	var initControllerFs = function () {
		var ctClose = $('.close-fs')[0];
		var ctShow = $('.item-zoom-in')[0];
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

	var getGLState = function () {
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
		var frame3d = $('#frame3d')[0];
		var frameWrap = $('.product-3d > .embed-responsive')[0];

		if (!bntLoad || !btnPause || !btnToggleVisible || !frame3d) {
			$('.product-3d').addClass('hidden');
			return;
		}

		var threeController = new ThreeController(bntLoad, bntLoadWrap, btnPause, btnToggleVisible, frame3d, frameWrap);
		threeController.registerEvent();
	};

	var init3d = function () {
		var product3d = $('.product-3d')[0];

		if (!product3d || !getGLState())
			return;

		$(product3d).removeClass('hidden');

		initThreeController();
	};

	initCarouselControler();
	init3d();
	initControllerFs();
	initCarouselControllerFs();
});