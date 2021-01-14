//入口函数
$(function () {
    //文件预览
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        let file = this.files[0];
        //1.3 将文件转为src路径
        let url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    })
    //加载文章分类渲染到页面
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            let res = template('actcileList', backData)
            $('.category').html(res)

        }
    })
    // 给jeDate设置默认时间
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isinitVal: true,
        zIndex: 2999999
    })
    //富文本编辑器功能实现
    let editor = new wangEditor('.wangeditor')
    editor.create()
    //获取文章ID
    let id = location.href.split('=')[1]
    //获取文章内容
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: {
            id
        },
        success: function (backData) {
            $('#inputTitle').val(backData.data.title)
            $('.article_cover').attr('src', backData.data.cover)
            $('.category').val(backData.data.categoryId)
            $('#testico').val(backData.data.date)
            // $('#hiddenId').val(backData.data.id)
            //获取富文本的内容
            editor.txt.html(backData.data.content)
        }
    })
    //将编辑事件封装成函数
    function send(state) {
        //创建FormData对象：参数是表单dom对象
        let fd = new FormData($('#form')[0])
        //将富文本和状态添加到fd中
        fd.append('content', editor.txt.html())
        fd.append('state', state)
        fd.append('id', id)
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    let msg = state == '已发布' ? '编辑成功' : '存为草稿成功'
                    alert(msg)
                    location.href = './article_list.html'
                    //跳转之后显示高亮
                    parent.$('.level02 li').eq(0).addClass('active').siblings().removeClass('active')
                } else {
                    alert('编辑失败');
                }
            }
        })
    }
    //点击编辑调用函数
    $('.btn-edit').click(function (e) {
        e.preventDefault()
        send('已发布')
    })
    $('.btn-draft').click(function (e) {
        e.preventDefault()
        send('草稿')
    })
})