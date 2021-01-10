//入口函数
$(function () {
    //发送ajax请求 将返回的数据显示在页面
    //封装成函数
    function loadList() {

        $.ajax({
            url: BigNew.category_list,
            type: 'get',
            dataType: 'json',
            success: function (backData) {
                let res = template('tmp', backData)
                //将返回到模板引擎的数据渲染到页面
                $('tbody').html(res)
            }
        });
    }
    //进入页面调用一次
    loadList()
    //模态框添加即将显示的事件
    $('#myModal').on('show.bs.modal', function (e) {
        //找到是点击那个元素显示的模态框 ps:得到的是DOM对象
        //show 方法调用之后立即触发该事件。如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
        // 判断找到的是编辑按钮还是新增按钮
        if (e.relatedTarget.innerText == '新增分类') {
            //修改模态框中的文字
            $('#myModalLabel').text("新增类别")
            $('.btn-save').text('新增').addClass('btn-success').removeClass('btn-primary')
        } else {
            //修改模态框中的文字
            $('#myModalLabel').text("编辑类别")
            $('.btn-save').text('编辑').addClass('btn-primary').removeClass('btn-success')
            let slug = $(e.relatedTarget).parent().prev().text()
            let name = $(e.relatedTarget).parent().prev().prev().text()
            $('#recipient-name').val(name)
            $('#message-text').val(slug)
            //取e.relatedTarget.data()自定义属性中的id
            let id = $(e.relatedTarget).data().id
            $('#data-id').val(id)
        }
    })
    //模态框消失之后清空内容 此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
    $('#myModal').on('hidden.bs.modal', function (e) {
        //方法一
        // $('#recipient-name').val("")
        // $('#message-text').val("")
        //方法二 找到表单,表单的DOM对象中有一个方法reset():重置,调用这个方法会重置为默认值
        $('.modal-body form')[0].reset()
    })
    //设置模态框点击事件
    $('.btn-save').click(function () {
        //判断为新增分类还是编辑
        if ($(this).text() == '新增') {
            //获取文本框输入内容
            let name = $('#recipient-name').val().trim()
            let slug = $('#message-text').val().trim()
            //非空判断
            if (name == '' || slug == '') {
                alert('名称或者别名不能为空');
                return
            }
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                data: {
                    name, slug
                },
                success: function (backData) {
                    alert('新增成功');
                    $('#myModal').modal('hide')
                    //重新加载数据
                    loadList()
                }
            });
        } else {
            // 方法一
            // let id = $('#data-id').val()
            // let name = $('#recipient-name').val().trim()
            // let slug = $('#message-text').val().trim()
            // 方法二
            //serialize方法可以获取除了文件以外所有的form数据
            let data = $('.modal-body>form').serialize()
            //发送ajax请求
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                data: data,
                success: function (backData) {
                    alert('修改成功');
                    $('#myModal').modal('hide')
                    //重新加载数据
                    loadList()
                }
            });
        }
    })
    //文章类别删除功能实现
    //委托注册事件
    $('tbody').on('click', '.btn-delete', function () {
        if (confirm("确定删除")) {
            // 方法一
            // 发送ajax请求
            let id = $(this).data().id
            //方法二
            // let id = this.dataset.id
            console.log(id);
            $.ajax({
                url: BigNew.category_delete,
                type: 'post',
                data: {
                    id: id
                },
                success: function (backData) {
                    $(this).parents('tr')
                    alert('删除成功');
                    $('#myModal').modal('hide')
                    //重新加载数据
                    loadList()
                }
            });
        }

    })
})