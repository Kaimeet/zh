function getVariables() {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#test'
            , url: '../variables/getVariables'
            , toolbar: true
            , title: '用户数据表'
            , totalRow: true
            , cols: [[
                {type: 'checkbox'}
                , {field: 'id', title: 'id', width: 80}
                , {field: 'serizes', title: '系列', width: 120}
                , {field: 'style', title: '款式', width: 120}
                , {field: 'caoweight', title: '槽宽', minWidth: 100}
                , {field: 'plaThick', title: '板材厚度', minWidth: 100}
                , {field: 'zztWeight', title: '中中挺宽度', minWidth: 100}
                , {field: 'sztweight', title: '上中挺宽度', width: 100}
                , {field: 'bkweight', title: '边框', width: 80}
                , {field: 'sxHigh', title: '上芯板', width: 80}
                , {field: 'zxHigh', title: '中芯板', width: 80}
                , {field: 'xxHigh', title: '下芯板', width: 80}
                , {field: 'zdWeight', title: '中档宽', width: 80}
                , {field: 'zxWeight', title: '造型宽', width: 80}
                , {field: 'xbDepth', title: '芯板进槽深度', width: 120}
                , {field: 'smWeight', title: '上帽', width: 80}
                , {field: 'xmWeight', title: '下帽', width: 80}
                , {field: 'memo2', title: '中中挺长度', width: 100}
                , {field: 'xztWeight', title: '下中挺宽度', width: 100}
                , {field: 'glassDepth', title: '玻璃进槽深度', width: 120}
                , {field: 'memo3', title: '下中挺长', width: 100}
                , {field: 'memo1', title: '上中挺长', width: 100}
                , {field: 'memo4', title: '小中档宽', width: 100}
                , {field: 'memo5', title: '小中挺宽', width: 100}
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
                    "count": res.data.variables.length, //解析数据长度
                    "data": res.data.variables //解析数据列表
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
                , "caoweight": data.caoweight
                , "plaThick": data.plaThick
                , "zztWeight": data.zztWeight
                , "sztweight": data.sztweight
                , "bkweight": data.bkweight
                , "sxHigh": data.sxHigh
                , "zxHigh": data.zxHigh
                , "xxHigh": data.xxHigh
                , "zdWeight": data.zdWeight
                , "zxWeight": data.zxWeight
                , "xbDepth": data.xbDepth
                , "smWeight": data.smWeight
                , "xmWeight": data.xmWeight
                , "memo2": data.memo2
                , "xztWeight": data.xztWeight
                , "glassDepth": data.glassDepth
                , "memo3": data.memo3
                , "memo1": data.memo1
                , "memo4": data.memo4
                , "memo5": data.memo5
            });
        },
        yes: function () {
            layer.close(index);
        }
    });
}

// 保存表单信息
function saveVariables() {
    var form = layui.form;
    form.on('submit(save)', function (data) {
        $.ajax({
            url: '../variables/updateVariables',   //url地址
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

