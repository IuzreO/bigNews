$(function () {
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
    //文章类型模块实现
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/category',
        type: 'get',
        success: function (backData) {
            //下拉框
            $('.level_two').html(template('selectMenu', backData))
            //菜单栏   
            $('.left_menu').html(template('left_menu', backData))
        }
    })
})