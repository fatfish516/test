
define(['jquery'], function($) {

    var WaterFall = (function(){
        function init(){
            waterfall($('.water-fall'))
            $(window).resize(function(){
                waterfall($('.water-fall'))
            })
        }

        function waterfall($ct){
            // console.log($ct)
            var ctWidth = $ct.width();
            // console.log(screenWidth)
            var itemWidth = $ct.find('li').width();
            var colNum = parseInt(ctWidth/itemWidth)
            // console.log(colNum)
            var colHeights = []
            for(var i=0; i<colNum; i++){
                colHeights[i] = 0;
            }
            $ct.find('li').each(function(){
                var $this = $(this)
                var minCol = Math.min.apply(null,colHeights)
                var minIdx = colHeights.indexOf(minCol)
                $this.css({
                    top:colHeights[minIdx],
                    left: minIdx*$this.outerWidth(true)
                })
                colHeights[minIdx] += $this.outerHeight(true)
            })
            var maxHeight = Math.max.apply(null,colHeights)
            // console.log(maxHeight)
            $ct.height(maxHeight);
        }

        return {
            init: init
        }
    })()

    return WaterFall;
}) 
    