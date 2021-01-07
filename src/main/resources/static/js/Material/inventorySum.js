
// 将excel 传人后台，并显示合并结果到前端，并且下载该文件
function Upload(fileObj) {
    var form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象
    $.ajax({
        url: '/api/excel/readExcel',   //url地址
        type: 'POST',                 //上传方式
        data: form,                   // 上传formdata封装的数据
        dataType: 'JSON',
        cache: false,                  // 不缓存
        processData: false,        // jQuery不要去处理发送的数据
        contentType: false,         // jQuery不要去设置Content-Type请求头
        success: function (data) {//成功回调
            console.log(data);
            layui.use('table', function(){
                var table = layui.table;
                //展示已知数据
                table.render({
                    elem: '#reportSumTable1'
                    ,tabBar: true
                    ,totalrow: true
                    ,cols: [[ //标题栏
                        {field: 'partName', title: '部件名称', width: 180}
                        ,{field: 'length', title: '长', minWidth: 100}
                        ,{field: 'width', title: '宽', minWidth: 100}
                        ,{field: 'high', title: '高', width: 100}
                        ,{field: 'numbyZhuang', title: '数量张(片)', width: 180}
                        ,{field: 'numbyGens', title: '数量根', width: 100}
                        ,{field: 'numbyGe', title: '数量个', width: 100}
                        ,{field: 'yuliaoLen', title: '余料长', width: 100}
                        ,{field: 'yuliaoWidth', title: '余料宽', width: 100}
                    ]]
                    ,data: data.data
                    ,even: true
                });
            });
            // 导出excel
            var infoMS = data.data;
            console.log(infoMS);
            if (infoMS == null || infoMS == "" || infoMS == undefined || infoMS.length == 0) {
                layer.msg("暂时没有要导出的数据。", {icon: 5, anim: 6, time: 3000});
                return;
            }
            var aoa = new Array();
            aoa.push(
                [
                    '部件名称',
                    '长',
                    '宽',
                    '高',
                    '数量张(片)',
                    '数量根',
                    '数量个',
                    '余料长',
                    '余料宽'
                ]);
            if (infoMS != null && infoMS.length > 0) {
                for (var i = 0; i < infoMS.length; i++) {
                    let temp = new Array;
                    temp.push(infoMS[i].partName);
                    temp.push(infoMS[i].length);
                    temp.push(infoMS[i].width);
                    temp.push(infoMS[i].high);
                    temp.push(infoMS[i].numbyZhuang);
                    temp.push(infoMS[i].numbyGens);
                    temp.push(infoMS[i].numbyGe);
                    temp.push(infoMS[i].yuliaoLen);
                    temp.push(infoMS[i].yuliaoWidth);
                    aoa.push(temp);
                }
            }
            var cols = [
                {wch: 8},
                {wch: 11},
                {wch: 30},
                {wch: 30},
                {wch: 10},
                {wch: 10},
                {wch: 10},
                {wch: 10},
                {wch: 10},
                {wch: 10},
                {wch: 10},
                {wch: 10},
                {wch: 10},
            ];
            let sheet = XLSX.utils.aoa_to_sheet(aoa);
            openDownloadDialog(sheet2blob(sheet, cols), '订单拆解部件合并导出结果.xlsx');
        },
        error: function (data) {//失败回调
            console.log(data);
        }
    });
}

function uploadFile() {
    $("#file").click();
    $('#file').change(function (e) {
        var fileName = e.target.files[0];//js 获取文件对象
        if (fileName !== undefined) {
            var file_typename = fileName.name.substring(fileName.name.lastIndexOf('.'));
            if (file_typename === '.xlsx' || file_typename === '.xls') {
                $("#filename").css("display", "block");
                $("#filename").val(fileName.name);
                Upload(fileName);
            } else {
                console.log("请选择正确的文件类型！");
            }
        } else {
            console.log("请选择正确的");
        }
    })
}

