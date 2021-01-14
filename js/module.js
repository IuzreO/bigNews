$(function () {
    //最新咨询板块实现
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest',
        type: 'get',
        success: function (backData) {
            let res = template('actciles', backData)
            $('.common_news').html(res)
        }
    });
    //一周热门排行板块实现
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/rank',
        type: 'get',
        success: function (backData) {
            let res = template('hotrank', backData)
            $('.hotrank_list').html(res)
        }
    })
    //最新评论板块实现
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        type: 'get',
        success: function (backData) {
            let res = template('comment_list', backData)
            $('.comment_list').html(res)
        }
    })
    //焦点关注模块实现
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/attention',
        type: 'get',
        success: function (backData) {
            let res = template('guanzhu_list', backData)
            $('.guanzhu_list').html(res)

        }
    })
    //热点图模块实现
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/hotpic',
        type: 'get',
        success: function (backData) {
            let res = template('focus_list', backData)
            $('.focus_list').html(res)
        }
    })
    //文章类型模块实现
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/category',
        type: 'get',
        success: function (backData) {
            $('.level_two').html(template('selectMenu', backData))
            $('.left_menu').html(template('left_menu', backData))
        }
    })
})