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
})