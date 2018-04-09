
function waterfull(){
	var screenWidth = $(window).width();
	// console.log(screenWidth)
	var itemWidth = $('.item').width();
	var colNum = parseInt(screenWidth/itemWidth)
	// console.log(colNum)
	var colHeights = []
	for(var i=0; i<colNum; i++){
		colHeights[i] = 0;
	}
	$('.item').each(function(){
		var $this = $(this)
		var minCol = Math.min.apply(null,colHeights)
	    var minIdx = colHeights.indexOf(minCol)
	    $this.css({
	    	top:colHeights[minIdx],
	    	left: minIdx*$this.outerWidth(true)
	    })
	    colHeights[minIdx] += $this.outerHeight(true)
	})

}
$(window).on('load',waterfull)

$(window).resize(waterfull)