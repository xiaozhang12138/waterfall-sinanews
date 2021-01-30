

//1. 获取数据
//2. 把数据变为 Dom，通过瀑布流的方式放到页面上
//3. 当滚动到底部的时候， --》重复 1
//初始第一页
var curPage = 1;
var perPageCount = 10;
var isDataArrive = true;
var jsnone = [];

//获得列的数量
var colNum = parseInt($('.list').width() / $('.list li').outerWidth(true))
//遍历放置0.
for (var i = 0; i < colNum; i++) {
    jsnone[i] = 0;
}

start()


//当页面滚动的时候。
// $(window).scroll(function(){
//     if(!scroll) return

//     if(isVisible($('.list'))){
//         start()
//     }
// })

//拼装并且封装到执行上面
function start() {
    getData(function (newsList) {
        //console.log(newsList);
        isDataArrive = true;
        $.each(newsList, function (idx, news) {
        
            //遍历之后拼接陈DOM了。
            var $node = getNode(news)
            //拼接之后瀑布流放到页面上
            $node.find('img').on('load',function(){
            $('.list').append($node);
            //console.log($node, 'loaded...')
            waterFallPlace($node)
            })
        })

    })
    isDataArrive = false;

}



//获取数据的封装函数
function getData(callback) {
    $.ajax({
        url: 'https://photo.sina.cn/aj/v2/index?cate=military',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            pagesize: perPageCount,
            page: curPage
        }
    }).done(function (ret) {
        callback(ret.data)
        curPage++
    })
}

//这是组装DOM的组件
function getNode(item) {
    var tpl = "";
    tpl += '<li>';
    tpl += '<a href="' + item.url + '">'
    tpl += ' <img src="' + item.thumb + '" alt="">'
    tpl += '<h4>' + item.stitle + '</h4>'
    tpl += '<p>' + item.title + '</p>'
    tpl += '</a>'
    tpl += '</li>'
    return $(tpl)
}



//瀑布流的数据加载
function waterFallPlace($nodes) {

    //console.log($nodes);
    //假定第一项是最小值。
    var minValue = jsnone[0];
    var minIndex = 0;
    //遍历数组每一项，对比，得到最小值。
    for (i = 0; i < colNum; i++) {
        if (minValue > jsnone[i]) {
            minValue = jsnone[i];
            minIndex = i;
        }
    }
    
    //设置每一项的值，需要绝对定位辅助，
    $nodes.css({
        top: jsnone[minIndex],
        left: minIndex * $('.list li').outerWidth(true)
    });
    
    //最后给那个最小项加上，目前排列的元素的高度。
    jsnone[minIndex] += $nodes.outerHeight(true);
    $('.list').height(Math.max.apply(null,jsnone));

}



//懒加载的函数结构
function isVisible($el) {
    var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        top = $el.offset().top;
        if(top < winH + scrollH){
            return true;
        }else{
            return false;
        }
}