$.ajax({
    url: 'https://photo.sina.cn/aj/v2/index?cate=military',
    dataType: 'jsonp',
    jsonp: 'callback',
    data: {
        pagesize: 10,
        page: 2
    }
}).done(function (ret) {
    assemble(ret.data)
})

//以下是封装组装元素的。
function assemble(res) {
    var _this = this;
    var uls = $('ul');
    res.forEach(function (movie) {
        var tpl = `<li>
            <a href="">
            <img src="https://k.sinaimg.cn/n/mil/transform/200/w600h400/20200321/c665-ireifzh2305871.jpg/w640slw.jpg" alt="">
            <h4>美航母第二次访越 却不停靠</h4>
            <p>不爱红装爱武装！95后网红小姐姐成为火箭军士官</p>
            </a>
        </li>`;
        var $ndoe = $(tpl);
        // console.log($(tpl))
        $ndoe.find('li img').attr('src', movie.thumb);
        $ndoe.find('li a').attr('href', movie.url);
        $ndoe.find('li h4').text(movie.stitle);
        $ndoe.find('li h4').text(movie.title);
        // _this.uls.eq(0).append($node)
        console.log($node)
    })

    console.log(_this.uls)
}