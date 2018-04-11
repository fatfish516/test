
define(['jquery'],function($){
	var lazyload = (function(){
		function LazyLoad($ct){
			this.$ct = $ct
			this.init()
			this.bind()
		}

		LazyLoad.prototype = {
			init:function(){
				this.count = 8
				this.curPage = 1
				this.nodeWidth = this.$ct.find('.item').outerWidth(true)
				this.cols = parseInt(this.$ct.find('.news-ct').width()/this.nodeWidth)
				this.colSumHeight = []
				for(var i=0;i<this.cols;i++){
					this.colSumHeight[i] = 0
				}
				this.getData()
			},



			bind:function(){
				var self = this
				this.$ct.find('.loadmore').on('click',function(){
					self.getData()
				})
			},

			getData:function(){
				var self = this
				$.ajax({
					url:'http://platform.sina.com.cn/slide/album_tech',
					type:'get',
					dataType:'jsonp',
					jsonp:'jsoncallback',
					data:{
						app_key:'1271687855',
						num:self.count,
						page:self.curPage
					}
				}).done(function(result){
					if(result && result.status && result.status.code==='0'){
						self.render(result.data)
						self.curPage++;
					}else{
						console.log('error');
					}
				})
			},


			render:function(data){
				var self = this
				
				$.each(data,function(index,perData){
					var $node = self.getNode(perData)
					$node.find('img').on('load',function(){
						self.$ct.find('.news-ct').append($node)
						self.waterFallPlace($node)
					})
				})
			},


			getNode:function(data){
				var html = ''
					html += '<li class="item">'
					html += '<a href="'+data.url+'"><img src="'+data.img_url+'" alt=""></a>'
					html += '<h3>'+data.short_name+'</h3>'
					html += '<p>'+data.short_intro+'</p>'
					html += '</li>'

				return $(html) 
			},


			waterFallPlace:function($node){
				var minSumHeight = Math.min.apply(null,this.colSumHeight)
				var minIndex = this.colSumHeight.indexOf(minSumHeight)

				$node.css({
					left:this.nodeWidth*minIndex,
					top:this.colSumHeight[minIndex],
					opacity:1
				})

				this.colSumHeight[minIndex] += $node.outerHeight(true)
				this.$ct.find('.news-ct').height(Math.max.apply(null,this.colSumHeight))
			}
		}

		return {
			init:function(nodes){
				nodes.each(function(index,node){
					new LazyLoad($(node))
				})
			}
		}
	})()

	return lazyload
})


/*
function LazyLoad($ct){
	this.$ct = $ct
	this.init()
	this.bind()
}

LazyLoad.prototype = {
	init:function(){
		this.count = 8
		this.curPage = 1
		this.nodeWidth = this.$ct.find('.item').outerWidth(true)
		this.cols = parseInt(this.$ct.find('.news-ct').width()/this.nodeWidth)
		this.colSumHeight = []
		for(var i=0;i<this.cols;i++){
			this.colSumHeight[i] = 0
		}
		this.getData()
	},



	bind:function(){
		var self = this
		this.$ct.find('.loadmore').on('click',function(){
			self.getData()
		})
	},

	getData:function(){
		var self = this
		$.ajax({
			url:'http://platform.sina.com.cn/slide/album_tech',
			type:'get',
			dataType:'jsonp',
			jsonp:'jsoncallback',
			data:{
				app_key:'1271687855',
				num:self.count,
				page:self.curPage
			}
		}).done(function(result){
			if(result && result.status && result.status.code==='0'){
				self.render(result.data)
				self.curPage++;
			}else{
				console.log('error');
			}
		})
	},


	render:function(data){
		var self = this
		
		$.each(data,function(index,perData){
			var $node = self.getNode(perData)
			$node.find('img').on('load',function(){
				self.$ct.find('.news-ct').append($node)
				self.waterFallPlace($node)
			})
		})
	},


	getNode:function(data){
		var html = ''
			html += '<li class="item">'
			html += '<a href="'+data.url+'"><img src="'+data.img_url+'" alt=""></a>'
			html += '<h3>'+data.short_name+'</h3>'
			html += '<p>'+data.short_intro+'</p>'
			html += '</li>'

		return $(html) 
	},


	waterFallPlace:function($node){
		var minSumHeight = Math.min.apply(null,this.colSumHeight)
		var minIndex = this.colSumHeight.indexOf(minSumHeight)

		$node.css({
			left:this.nodeWidth*minIndex,
			top:this.colSumHeight[minIndex],
			opacity:1
		})

		this.colSumHeight[minIndex] += $node.outerHeight(true)
		this.$ct.find('.news-ct').height(Math.max.apply(null,this.colSumHeight))
	}
}


var Lazyload = (function(){
	return {
		init:function(nodes){
			nodes.each(function(index,node){
				new LazyLoad($(node))
			})
		}
	}
})()

Lazyload.init($('.news-content'))
*/