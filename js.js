

//以下是封装组装元素的。
// function assemble(res) {
//     var _this = this;
//     var uls = $('ul');
//     res.forEach(function (movie) {
//         var tpl = `<li>
//             <a href="">
//             <img src="https://k.sinaimg.cn/n/mil/transform/200/w600h400/20200321/c665-ireifzh2305871.jpg/w640slw.jpg" alt="">
//             <h4>美航母第二次访越 却不停靠</h4>
//             <p>不爱红装爱武装！95后网红小姐姐成为火箭军士官</p>
//             </a>
//         </li>`;
//         var $ndoe = $(tpl);
//         // console.log($(tpl))
//         $ndoe.find('li img').attr('src', movie.thumb);
//         $ndoe.find('li a').attr('href', movie.url);
//         $ndoe.find('li h4').text(movie.stitle);
//         $ndoe.find('li h4').text(movie.title);
//         // _this.uls.eq(0).append($node)
//     })
//
//     console.log(_this.uls)
// }






//1. 获取数据
//2. 把数据变为 Dom，通过瀑布流的方式放到页面上
//3. 当滚动到底部的时候， --》 1
var jsnone = [];
//一个li的宽度
var liwiths = $('.list li').outerWidth(true);
//获得列
var colNum = parseInt($('.list').width() / liwiths)
//遍历放置0.
for (var i = 0; i < colNum; i++) {
    jsnone[i] = 0;
}

start()
function start() {
    getData(function (newsList) {
        //console.log(newsList);
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

}












//获取数据的封装函数
function getData(callback) {
    $.ajax({
        url: 'https://photo.sina.cn/aj/v2/index?cate=military',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            pagesize: 10,
            page: 1
        }
    }).done(function (ret) {
        callback(ret.data)
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



//瀑布流的数据加载，需要传入什么数据，返回什么数据，需要传入
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
        left: minIndex * liwiths
    });
    
    //最后给那个最小项加上，目前排列的元素的高度。
    jsnone[minIndex] += $nodes.outerHeight(true);
    console.log(jsnone);
}



//懒加载的函数结构
function pubuliu($node) {
    $node.each(function () {
        var _this = $(this)
        if (_show(_this)) {
            setTimeout(function () {
                _put(_this)
            }, 1000)
        }
    })
}