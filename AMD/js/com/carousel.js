
define(['jquery'],function($){
	var carousel = (function(){
		function Carousel($target){
			this.$target = $target
			this.init()
			this.bind()
		}

		Carousel.prototype = {
			init:function(){
				this.$imgCt = this.$target.find('.img-ct')
				this.$items = this.$target.find('.img-ct .item')
				this.$bgs = this.$target.find('.img-ct .item .bg')
				this.$prev = this.$target.find('.prev')
				this.$next = this.$target.find('.next')
				this.$bullets = this.$target.find('.bullets>li')

				this.len = this.$items.length
				this.w = $(window).width()
				//this.h = $(window).height()
				this.$bgs.css({
					width:this.w
					//height:this.h
				})
				this.$items.css({
					width:this.w
					//height:this.h
				})
				this.curPage = 0
				this.isAnimate = false
				this.setBackground(this.curPage)
				

				this.$imgCt.append(this.$items.eq(0).clone())
				this.$imgCt.prepend(this.$items.eq(this.len-1).clone())
				this.$imgCt.width(this.w * (this.len+2))
				this.$imgCt.css('left',-this.w)

				var self = this
				setInterval(function(){
					self.playNext(1)
				},3000)
			},


			bind:function(){
				var self = this
				this.$prev.on('click',function(){
					self.playPrev(1)
				})
				this.$next.on('click',function(){
					self.playNext(1)
				})
				this.$bullets.on('click',function(){
					var index = $(this).index()
					if(index>self.curPage){
						self.playNext(index-self.curPage)
					}else if(index<self.curPage){
						self.playPrev(self.curPage-index)
					}
				})
			},


			setBackground:function(n){
				this.$curBg = this.$bgs.eq(n)
				//console.log(this.$curBg)
				//console.log(this.$curBg.attr('data-imgSrc'))
				if(this.$curBg.data('load')){
					return
				}else{
					this.$curBg.css({
						backgroundImage:'url('+this.$curBg.attr('data-imgSrc')+')'
					})
					//console.log(1)
				}
				this.$curBg.data('load',true)
			},


			playPrev:function(n){
				var self = this
				this.$imgCt.animate({
					left:'+='+n*this.w
				},function(){
					self.curPage -= n
					if(self.curPage<0){
						self.curPage = self.len-1
						self.$imgCt.css('left',-self.len*self.w)
						self.setBackground(self.curPage)
					}
					self.setBackground(self.curPage)
					self.setBullets()
				})
			},


			playNext:function(n){
				var self = this
				if(this.isAnimate){
					return
				}
				this.isAnimate = true
				this.$imgCt.animate({
					left:'-='+n*this.w
				},function(){
					self.curPage += n
					if(self.curPage === self.len){
						self.curPage = 0
						self.$imgCt.css('left',-self.w)
						self.setBackground(self.curPage)
					}
					self.setBackground(self.curPage)
					self.setBullets()
					self.isAnimate = false
				})
			},


			setBullets:function(){
				this.$bullets.removeClass('active').eq(this.curPage).addClass('active')
			}
		}

		return {
			init:function(nodes){
				nodes.each(function(index,node){
					new Carousel($(node))
				})
			}
		}
	})()

	return carousel
})


/*
function Carousel($target){
	this.$target = $target
	this.init()
	this.bind()
}

Carousel.prototype = {
	init:function(){
		this.$imgCt = this.$target.find('.img-ct')
		this.$items = this.$target.find('.img-ct .item')
		this.$bgs = this.$target.find('.img-ct .item .bg')
		this.$prev = this.$target.find('.prev')
		this.$next = this.$target.find('.next')
		this.$bullets = this.$target.find('.bullets>li')

		this.len = this.$items.length
		this.w = $(window).width()
		//this.h = $(window).height()
		this.$bgs.css({
			width:this.w
			//height:this.h
		})
		this.$items.css({
			width:this.w
			//height:this.h
		})
		this.curPage = 0
		this.isAnimate = false
		this.setBackground(this.curPage)
		

		this.$imgCt.append(this.$items.eq(0).clone())
		this.$imgCt.prepend(this.$items.eq(this.len-1).clone())
		this.$imgCt.width(this.w * (this.len+2))
		this.$imgCt.css('left',-this.w)

		var self = this
		setInterval(function(){
			self.playNext(1)
		},3000)
	},


	bind:function(){
		var self = this
		this.$prev.on('click',function(){
			self.playPrev(1)
		})
		this.$next.on('click',function(){
			self.playNext(1)
		})
		this.$bullets.on('click',function(){
			var index = $(this).index()
			if(index>self.curPage){
				self.playNext(index-self.curPage)
			}else if(index<self.curPage){
				self.playPrev(self.curPage-index)
			}
		})
	},


	setBackground:function(n){
		this.$curBg = this.$bgs.eq(n)
		//console.log(this.$curBg)
		//console.log(this.$curBg.attr('data-imgSrc'))
		if(this.$curBg.data('load')){
			return
		}else{
			this.$curBg.css({
				backgroundImage:'url('+this.$curBg.attr('data-imgSrc')+')'
			})
			//console.log(1)
		}
		this.$curBg.data('load',true)
	},


	playPrev:function(n){
		var self = this
		this.$imgCt.animate({
			left:'+='+n*this.w
		},function(){
			self.curPage -= n
			if(self.curPage<0){
				self.curPage = self.len-1
				self.$imgCt.css('left',-self.len*self.w)
				self.setBackground(self.curPage)
			}
			self.setBackground(self.curPage)
			self.setBullets()
		})
	},


	playNext:function(n){
		var self = this
		if(this.isAnimate){
			return
		}
		this.isAnimate = true
		this.$imgCt.animate({
			left:'-='+n*this.w
		},function(){
			self.curPage += n
			if(self.curPage === self.len){
				self.curPage = 0
				self.$imgCt.css('left',-self.w)
				self.setBackground(self.curPage)
			}
			self.setBackground(self.curPage)
			self.setBullets()
			self.isAnimate = false
		})
	},


	setBullets:function(){
		this.$bullets.removeClass('active').eq(this.curPage).addClass('active')
	}

}

var carousel = (function(){
	return {
		init:function(nodes){
			nodes.each(function(index,node){
				new Carousel($(node))
			})
		}
	}
})()

carousel.init($('#header .carousel'))

*/