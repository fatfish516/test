define(['jquery','waterFall'],function($,WaterFall){
	var LoadBtn = (function(){

		var lock = false;
		var perPageCount = 10
		var curPage = 6
		var $node = $('.attractions-img li').last().clone()

		function init(){
			
			$('.load-more-img').on('click',function(){
				if(lock){
					return
				}
				getData(createLists)
			})
			
		}

		function getData(callback){
			lock = true;
			$.ajax({
				url: "https://platform.sina.com.cn/slide/album_tech",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {
					app_key: "1271687855",
					num: perPageCount,
					page: curPage
				}
			}).done(function(ret){
				callback(ret.data)
				// console.log(ret)
				console.log("ok2")

			}).fail(function(){
				console.log("fail")
			})
			curPage++
		}

		function createLists(dataArr){
			console.log(dataArr)
			$.each(dataArr,function(){
				var newNode = $node.clone()//如果不克隆，append的作用相当于剪切，将相当于只添加一次
				var path = this.img_url
				newNode.find('img').attr("src",path)
				newNode.find('img').on("load",function(){
					newNode.appendTo($('.attractions-img'))
					WaterFall.init()
				})	
			})
			lock = false;
		}

		return {
			init: init
		}



	})()

	return LoadBtn
})