require.config({
	baseUrl: './js/com',
	paths: {
		'jquery': '../lib/jquery-3.2.1.min'
	}
});

requirejs(['../web/index'])










// require(['jquery-3.2.1.min'],function($){
//  console.log($('body'))
// })









// console.log(1233)

// waterfull($('.attractions-img'))


// function waterfull($ct){
// 	console.log($ct)
// 	var ctWidth = $ct.width();
// 	// console.log(screenWidth)
// 	var itemWidth = $ct.find('li').width();
// 	var colNum = parseInt(ctWidth/itemWidth)
// 	// console.log(colNum)
// 	var colHeights = []
// 	for(var i=0; i<colNum; i++){
// 		colHeights[i] = 0;
// 	}
// 	$ct.find('li').each(function(){
// 		var $this = $(this)
// 		var minCol = Math.min.apply(null,colHeights)
// 	    var minIdx = colHeights.indexOf(minCol)
// 	    $this.css({
// 	    	top:colHeights[minIdx],
// 	    	left: minIdx*$this.outerWidth(true)
// 	    })
// 	    colHeights[minIdx] += $this.outerHeight(true)
// 	})
// }