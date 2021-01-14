$(function () {
    // 发送评论列表请求
    // 封装成函数loadData
    //定义一个变量表示当前页
    let nowPage = 1
    function loadData(page) {
        //把点击的页面赋值给当前页面
        nowPage = page,
            $.ajax({
                url: BigNew.comment_list,
                type: 'get',
                data: {
                    //page写成动态
                    page: page,
                    perpage: ''
                },
                success: function (backData) {
                    //先渲染页面
                    let res = template('auditList', backData)
                    $('tbody').html(res)
                    // 再进行判断 解决没有数据显示问题
                    if (backData.data.totalCount > 0) {
                        $('#noData').hide().prev().show()
                        //实现分页之前先摧毁一次原来的配置项
                        $('#pagination').twbsPagination('destroy'),
                            //实现分页效果
                            $('#pagination').twbsPagination({
                                //页数
                                totalPages: backData.data.totalPage,
                                //可见页数上限	
                                visiblePages: 5,
                                //开始时显示的当前页面	
                                startPage: page,
                                //插件初始化后在起始页面上点击	
                                initiateStartPageClick: false,
                                first: '第一页',
                                prev: '上一页',
                                next: '下一页',
                                last: '最后一页',
                                onPageClick: function (event, page) {
                                    //调用loadData函数
                                    loadData(page)
                                }
                            })
                    } else {
                        $('#noData').show().prev().hide()
                        //方法二
                        // $('tbody tr').empty()
                    }
                }
            })
    }
    //进入页面调用一次
    loadData(1)
    //实现评论删除功能 委托事件
    $('tbody').on('click', '.btn-danger', function () {
        let id = $(this).data().id
        $.ajax({
            url: BigNew.comment_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id
            },
            success: function (backData) {
                if (confirm('确定删除')) {
                    if ($('tbody tr').length == 1 && nowPage != 1) {
                        loadData(nowPage - 1)
                        alert('删除成功');
                    } else {
                        loadData(nowPage)
                        alert('删除成功');
                    }
                }
            }
        })
    })
    //实现审核通过功能
    $('tbody').on('click', '.btn-info', function () {
        let id = $(this).data().id
        $.ajax({
            url: BigNew.comment_pass,
            type: 'post',
            dataType: 'json',
            data: {
                id
            },
            success: function (backData) {
                if (confirm('确定审核通过')) {
                    alert('通过成功')
                    loadData(nowPage)
                }
            }
        });
    })
    //实现审核拒绝功能
    $('tbody').on('click', '.btn-warning', function () {
        let id = $(this).data().id
        $.ajax({
            url: BigNew.comment_reject,
            type: 'post',
            dataType: 'json',
            data: {
                id
            },
            success: function (backData) {
                if (confirm('确定拒绝')) {
                    alert('拒绝成功')
                    loadData(nowPage)
                }
            }
        });
    })
})