//入口函数
$(function () {
    // 发送ajax请求返回的数据
    //封装成一个函数
    function userMsg() {
        $.ajax({
            url: BigNew.user_detail,
            type: 'get',
            success: function (backData) {
                // $('#inputEmail1').val(backData.data.username)
                // $('#inputEmail2').val(backData.data.nickname)
                // $('#inputEmail3').val(backData.data.email)
                // $('#inputEmail4').val(backData.data.password)
                // 用for循环遍历
                for (let key in backData.data) {
                    $('.' + key).val(backData.data[key])
                }
                $('.user_pic').attr('src', backData.data.userPic)
                parent.$('.user_info img').attr('src', backData.data.userPic)
                parent.$('.user_info span').text(backData.data.nickname)
                parent.$('.user_center_link img').attr('src', backData.data.userPic)
            }
        })
    }
    //进入页面调用一次
    userMsg()
    //图片预览
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        let file = this.files[0];
        //1.3 将文件转为src路径
        let url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.col-sm-10>img').attr('src', url);
    });
    //用户信息修改功能实现
    $('.btn-edit').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        let fd = new FormData($('#form')[0])
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                alert('修改成功');
                userMsg()
            }
        });
    });
})
