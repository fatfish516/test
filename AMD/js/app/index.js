define(['jquery','com/carousel','com/gotop','com/lazyload'],function($,carousel,gotop,lazyload){
	new gotop($('body'));

	carousel.init($('#header .carousel'))

	lazyload.init($('.news-content'))
})