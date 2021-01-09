// require('jQuery')
//入口函数
$(function () {
    // 1.发送ajax请求
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        //2.获取服务器返回的token添加到headers
        // 已封装到jq文件中
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (backData) {
            //3.将获取的后台数据渲染到页面上
            $('.user_info>img').attr('src', backData.data.userPic)
            $('.user_info>span').text('欢迎 ' + backData.data.nickname)
            $('.user_center_link>img').attr('src', backData.data.userPic)
        },
        // 已封装到jq文件中
        // xhr:请求信息, status:状态 error:报错原因
        // error: function (xhr, status, error) {
        //     if (error == 'Forbidden') {
        //         alert('请登录');
        //         location.href = './login.html'
        //     }
        // }
    })
    $('.logout').click(function () {
        if (confirm('确定退出')) {
            //4.退出登录删除token
            Authorization: localStorage.removeItem('token')
            location.href = './login.html'
        }

    })
    //一级导航导航栏切换实现高亮
    $('.level01').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        // 二级导航实现效果
        if (this == $('.level01')[1]) {
            $('.level02').slideToggle()
            $('.icon-arrowdownl').toggleClass('rotate0')
        }
    })
    //二级导航点击实现高亮
    $('.level02 li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    //点击顶部个人中心,侧边栏个人中心高亮
    $('.user_center_link a').click(function () {
        $('.level01').last().addClass('active').siblings().removeClass('active')
    })
})
