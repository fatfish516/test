define(['jquery'],function($){

	var GoTop = (function(){

		function _goTop(){
			this.init();
			this.bindEvent();
			this.isShow();
		}

		_goTop.prototype.init = function(){
			var $goTop = $('<div id="go-top">GoTop</div>')
			$('body').append($goTop)
			this.$goTop = $goTop
			$goTop.hide()
		}
		_goTop.prototype.bindEvent = function(){
			this.$goTop.on('click',function(){
				$('html').scrollTop(0)
			})
		}
		_goTop.prototype.isShow = function(){
			var _this = this
			$(window).on('scroll',function(){
				var scrollTop = $('html').scrollTop()
				if(scrollTop>300){
					_this.$goTop.show()
				}else{
					_this.$goTop.hide()
				}
			})
			
		}

		return {
			init: function(){
				new _goTop()
			}
		}
	})()

	return GoTop
})