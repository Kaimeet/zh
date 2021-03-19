function getNumbyser() {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#test'
            , url: '../numbyser/getNumbyser'
            , toolbar: true
            , title: '数量数据表'
            , totalRow: true
            , cols: [[
                {type: 'checkbox'}
                , {field: 'id', title: 'id', width: 80}
                , {field: 'serizes', title: '系列', width: 120}
                , {field: 'style', title: '款式', width: 120}
                , {field: 'biannums', title: '边框数量', minWidth: 100}
                , {field: 'zhismnums', title: '直上帽数量', minWidth: 100}
                , {field: 'zzdnums', title: '直中档数量', minWidth: 100}
                , {field: 'xzdnums', title: '小中档数量', width: 100}
                , {field: 'wxzdnums', title: '弯小中档数量', width: 100}
                , {field: 'sztnums', title: '上中挺数量', width: 100}
                , {field: 'zztnums', title: '中中挺数量', width: 100}
                , {field: 'xztnums', title: '下中挺数量', width: 100}
                , {field: 'xmnums', title: '下帽数量', width: 100}
                , {field: 'sxbnums', title: '上芯板数量', width: 100}
                , {field: 'zxbnums', title: '中芯板数量', width: 100}
                , {field: 'xxbnums', title: '下芯板数量', width: 100}
                , {field: 'sblnums', title: '上玻璃数量', width: 100}
                , {field: 'zblnums', title: '中玻璃数量', width: 100}
                , {field: 'xblnums', title: '下玻璃数量', width: 100}
                , {field: 'msnums', title: '木榫数量数量', width: 100}
                , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150}
            ]]
            , response: {
                statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
            }
            , parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                console.log(res)
                return {
                    "code": res.success, //解析接口状态
                    "msg": res.message, //解析提示文本
                    "count": res.data.numbysers.length, //解析数据长度
                    "data": res.data.numbysers //解析数据列表
                };
            }
        });
        //监听表格复选框选择
        table.on('checkbox(test)', function (obj) {
            console.log(obj)
        });
        //监听工具条
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            } else if (obj.event === 'del') {
                layer.confirm('不会让你删除数据的！', function (index) {
                    obj.del();
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                onAddBtn(data);
            }
        });
    });
}


function onAddBtn(data) {
    var form = layui.form;
    //页面层-自定义
    layer.open({
        type: 1,
        title: "编辑",
        closeBtn: true,
        shift: 5,
        area: ['800px', '800px'],
        shadeClose: true,
        // btn: ['新增', '取消'],
        btnAlign: 'c',
        content: $("#add-main"),
        success: function (layero, index) {
            form.val('add-form', {
                "id": data.id
                , "serizes": data.serizes
                , "style": data.style
                , "biannums": data.biannums
                , "zhismnums": data.zhismnums
                , "zzdnums": data.zzdnums
                , "xzdnums": data.xzdnums
                , "wxzdnums": data.wxzdnums
                , "sztnums": data.sztnums
                , "zztnums": data.zztnums
                , "xztnums": data.xztnums
                , "xmnums": data.xmnums
                , "sxbnums": data.sxbnums
                , "zxbnums": data.zxbnums
                , "xxbnums": data.xxbnums
                , "sblnums": data.sblnums
                , "zblnums": data.zblnums
                , "xblnums": data.xblnums
                , "msnums": data.msnums
            });
        },
        yes: function () {
            layer.close(index);
        }
    });
}

// 保存表单信息
function saveNumbyser() {
    var form = layui.form;
    form.on('submit(save)', function (data) {
        $.ajax({
            url: '../numbyser/updateNumbyser',   //url地址
            type: 'POST',                 //上传方式
            data: form,                   // 上传formdata封装的数据
            dataType: 'JSON',
            cache: false,                  // 不缓存
            processData: false,        // jQuery不要去处理发送的数据
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data.field),
            success: function (data) {//成功回调
                layer.alert("修改成功！");
            },
            error: function (data) {//失败回调
                layer.alert("修改失败！")
            }
        });
    });
}
