
define(['jquery'],function($){
	var Carousel = (function(){

		function init(){
			carousel()
		}

		function carousel(){
			var panelWidht = $('#panel').width;
			$('.img-ct li').each(function(){
				$(this).width(panelWidht)
			})

			var $bulletChildren = $('.bullet li')

			var $imgCt = $('.img-ct');
			var curIdx = 1;
			var imgCount = $('.img-ct').children().length
			var imgWidth = $('.first-img').width()
			var imgCtLength = (imgCount+2)*imgWidth
			var isAnimate = false
			var clock
			var timeoutID


			$('.img-ct').width(imgCtLength)
			// console.log(imgCount)
			// console.log(imgCtLength)


			$('.first-img').clone().appendTo($imgCt)
			$('.last-img').clone().prependTo($imgCt)



			$('.pre').on('click',function(){
				play(curIdx-1);
			})
			$('.next').on('click',function(){
				play(curIdx+1);
			})
			$bulletChildren.on('click',function(){
				$(this).index()
				console.log($(this).index()+1)
				play($(this).index()+1)
			})






			function play(index){
				// console.log("ok"+index)
				if(isAnimate){
					return
				}
				isAnimate = true

				$('.img-ct').animate({
					left: -index*imgWidth
				},function(){
					curIdx = index;
					if(index == 0){
						$('.img-ct').css({
							left: -(imgCount)*imgWidth
						})
						curIdx = imgCount
					}
					if(index == imgCount+1){
						$('.img-ct').css({
							left: -imgWidth
						})
						curIdx = 1
					}
					bulletShow(curIdx)
					isAnimate = false
				})

				
			}

			function bulletShow(index){
				// console.log(index)
				$bulletChildren.removeClass('active')
				$bulletChildren.eq(index-1).addClass('active')

			}

			$('#panel').on('mouseleave',function(){
				$('#panel .btn').css({
					opacity:0
				})
				$('.bullet').css({
					opacity:0
				})
				clearInterval(clock)
				clearTimeout(timeoutID)
				timeoutID = setTimeout(autoPlay)

			})

			$('#panel').on('mouseenter',function(){
				$('#panel .btn').css({
					opacity:0.8
				})
				$('.bullet').css({
					opacity:0.8
				})
				clearInterval(clock)

			})

			// $(window).load(function(){
			// 	console.log('kaka')
				
				
			// })


			$(window).on('load',function () {
			  	console.log('ok')
			  	autoPlay()
				
			});

			function autoPlay(){
				clearInterval(clock)
			    clock = setInterval(function(){
					play(curIdx+1);
				},2000)
			}

		}

		return {
			init: init
		}
	})()

	return Carousel
})







// var $bulletChildren = $('.bullet li')

// var $imgCt = $('.img-ct');
// var curIdx = 1;
// var imgCount = $('.img-ct').children().length
// var imgWidth = $('.first-img').width()
// var imgCtLength = (imgCount+2)*imgWidth
// var isAnimate = false
// var clock
// var timeoutID


// $('.img-ct').width(imgCtLength)
// // console.log(imgCount)
// // console.log(imgCtLength)


// $('.first-img').clone().appendTo($imgCt)
// $('.last-img').clone().prependTo($imgCt)



// $('.pre').on('click',function(){
// 	play(curIdx-1);
// })
// $('.next').on('click',function(){
// 	play(curIdx+1);
// })
// $bulletChildren.on('click',function(){
// 	$(this).index()
// 	console.log($(this).index()+1)
// 	play($(this).index()+1)
// })






// function play(index){
// 	// console.log("ok"+index)
// 	if(isAnimate){
// 		return
// 	}
// 	isAnimate = true

// 	$('.img-ct').animate({
// 		left: -index*imgWidth
// 	},function(){
// 		curIdx = index;
// 		if(index == 0){
// 			$('.img-ct').css({
// 				left: -(imgCount)*imgWidth
// 			})
// 			curIdx = imgCount
// 		}
// 		if(index == imgCount+1){
// 			$('.img-ct').css({
// 				left: -imgWidth
// 			})
// 			curIdx = 1
// 		}
// 		bulletShow(curIdx)
// 		isAnimate = false
// 	})

	
// }

// function bulletShow(index){
// 	// console.log(index)
// 	$bulletChildren.removeClass('active')
// 	$bulletChildren.eq(index-1).addClass('active')

// }

// $('#panel').on('mouseleave',function(){
// 	$('.btn').css({
// 		opacity:0
// 	})
// 	$('.bullet').css({
// 		opacity:0
// 	})
// 	clearInterval(clock)
// 	clearTimeout(timeoutID)
// 	timeoutID = setTimeout(autoPlay)

// })

// $('#panel').on('mouseenter',function(){
// 	$('.btn').css({
// 		opacity:0.8
// 	})
// 	$('.bullet').css({
// 		opacity:0.8
// 	})
// 	clearInterval(clock)

// })

// // $(window).load(function(){
// // 	console.log('kaka')
	
	
// // })


// $(window).on('load',function () {
//   	console.log('ok')
//   	autoPlay()
	
// });

// function autoPlay(){
// 	clearInterval(clock)
//     clock = setInterval(function(){
// 		play(curIdx+1);
// 	},2000)
// }
