//入口函数
$(function () {
    //1.登录按钮点击事件
    $('.input_sub').click(function (e) {
        //2.阻止默认跳转
        e.preventDefault()
        //3.获取输入框中的账号密码
        let username = $('.input_txt').val().trim()
        let password = $('.input_pass').val().trim()
        //4.非空判断
        if (username == '' || password == '') {
            alert('账号密码不能为空');
        } else {
            // 发送ajax请求
            $.ajax({
                url: 'http://localhost:8080/api/v1/admin/user/login',
                type: 'post',
                data: {
                    username,
                    password
                },
                success: function (backData) {
                    alert(backData.msg);
                    if (backData.code == 200) {
                        location.href = './index.html'
                    }
                }
            });
        }
    })
})
