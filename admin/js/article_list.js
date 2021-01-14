//入口函数
$(function () {
    //发送文章类别请求
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        success: function (backData) {
            //渲染到页面
            let res = template('tempType', backData)
            $('#selCategory').html(res)
        }
    });
    //定义一个变量表示当前页面
    let nowPage = 1
    // 发送文章列表请求
    // 封装成函数loadData
    function loadData(page, callback) {
        //把点击的页面赋值给当前页面
        nowPage = page,
            $.ajax({
                url: BigNew.article_query,
                type: 'get',
                data: {
                    type: $('#selCategory').val(),
                    state: $('#selStatus').val(),
                    //page写成动态
                    page: page,
                    perpage: '5'
                },
                success: function (backData) {
                    //先渲染页面
                    let res = template('tempList', backData)
                    $('tbody').html(res)
                    // 再进行判断 解决没有数据显示问题 1
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
                        //方法二
                        // $('tbody tr').empty()
                        $('#noData').show().prev().hide()
                    }
                    //判断callback是否为函数
                    if (callback instanceof Function) {
                        //是则带一个参数backData
                        callback(backData)
                    }
                }
            })
    }
    //进入页面调用一次
    loadData(1)
    //筛选功能实现,设置筛选按钮点击事件
    $('.btn-filter').click(function (e) {
        //阻止默认跳转
        e.preventDefault()
        //调用loadData函数
        loadData(1)
    })
    //委托删除事件
    $('tbody').on('click', '.delete', function () {
        let id = $(this).data().id
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            data: {
                id
            },
            success: function (backData) {
                if (confirm('确定删除')) {
                    if ($('tbody tr').length == 1) {
                        //方法二if ($('tbody tr').length == 1 && nowPage!=1) 
                        loadData(nowPage, function (backData) {
                            //调用回调函数,判断条数是否为0,为0则调用nowPage,不用0则nowPage-1
                            backData.data.totalCount == 0 ? loadData(nowPage) : loadData(nowPage - 1)
                        })
                    } else {
                        loadData(nowPage)
                        alert('删除成功');
                    }
                }
            }
        });
    })
    $('#release_btn').click(function (e) {
        parent.$('.level02 li').eq(1).addClass('active').siblings().removeClass('active')
    })
})