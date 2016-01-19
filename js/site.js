var CarouselController = function (carousel, thumbnails) {
	this._carousel = carousel;
	this._thumbnails = thumbnails;
};

CarouselController.prototype = {
	constructor: CarouselController,

	registerEvent: function () {
		var me = this;
		$(this._thumbnails).on("click", function (event) {
			var targetSlide = $(event.currentTarget).attr('data-slide');
			$(me._carousel).carousel(+targetSlide);

			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (event.stopPropagation)
				event.stopPropagation();
		});

		$(this._carousel).on("slide.bs.carousel", function (event) {
			var nextSlide = $(event.relatedTarget).index();
			$(me._thumbnails).removeClass("active");
			$(me._thumbnails[nextSlide]).addClass("active");
		})
	}
};

$(function () {
	var carousel = $("#photoes")[0];
	var thumbnails = $(".photoes-thumbnails > li");
	if (!carousel || thumbnails.length < 1)
		return;

	var carouselController = new CarouselController(carousel, thumbnails);
	carouselController.registerEvent();
});