// //列表新增一行数据
// function addRow(tabFlag){
//     if(tabFlag==0){
//         var count = $('#reportTable1').bootstrapTable('getData').length;
//         $('#reportTable1').bootstrapTable('insertRow',{index:count,row:{checkFlag:"",rowIndex:"",componet:"",workprocedure:"",labor:"",electiy:"",memo:"",id:maxIds1-1}});
//         maxIds1 --;
//     }else if(tabFlag==1){
//         var count = $('#reportTable2').bootstrapTable('getData').length;
//         $('#reportTable2').bootstrapTable('insertRow',{index:count,row:{bomSeries:"",bomStyle:"",bomColor:"",bomLong:"",bomWidth:"",bomThick:"",needGlassFlag:"",unit:"",memo:"",id:maxIds2-1,setOfBooks:"",productionBase:"",paint:""}});
//         maxIds2 --;
//     }else if(tabFlag==2){
//         var count = $('#reportTable3').bootstrapTable('getData').length;
//         $('#reportTable3').bootstrapTable('insertRow',{index:count,row:{bomSeries:"",bomStyle:"",bomColor:"",bomLong:"",bomWidth:"",bomThick:"",needGlassFlag:"",unit:"",memo:"",id:maxIds3-1,setOfBooks:"",productionBase:"",paint:""}});
//         maxIds3 --;
//     }
// }
// //列表删除操作
// function delRow(tabFlag){
//     var rows = $("#reportTable1").bootstrapTable('getSelections');
//     if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
//         layer.msg("请先选择要删除的记录!", {icon:5, anim:6, time: 3000});
//         return;
//     } else {
//         $(rows).each(function () {// 通过获得别选中的来进行遍历
//             if(tabFlag==0){
//                 $("#reportTable1").bootstrapTable('removeByUniqueId', this.id);
//                 if(this.id>0){
//                     delArraysMS.push(this.id);
//                 }
//             }else if(tabFlag==1){
//                 $("#reportTable2").bootstrapTable('remove', {field: 'id', values: "'"+this.id+"'"});
//                 if(this.id>0){
//                     delArraysMT.push();
//                 }
//             }else if(tabFlag==2){
//                 $("#reportTable3").bootstrapTable('remove', {field: 'id', values: "'"+this.id+"'"});
//                 if(this.id>0){
//                     delArraysXT.push();
//                 }
//             }
//         });
//     }
// }
//onput事件触发update,单元格数据重新渲染
function changeReason(fieldName, indexNumber, flag) {
    // if(fieldName=='electiy'){
    //     if(/\D/.test(value)){
    //         layer.msg("请输入数字格式");
    //         $("#"+fieldName+indexNumber).val(0);
    //     }
    // }
    var value = $("#" + fieldName + indexNumber).val();
    if (flag == 1) {
        $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    } else if (flag == 2) {
        $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    } else if (flag == 3) {
        $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    } else if (flag == 4) {
        $("#typeTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }

    if (fieldName == 'electiy') {
        var infoMS = $("#reportTable1").bootstrapTable('getData');
        calel(infoMS);
    }
    if (fieldName == 'labor') {
        var infoMS = $("#reportTable1").bootstrapTable('getData');
        callabor(infoMS);
    }
}

function retable1(formData) {
    console.log(formData);
    $('#reportTable1').bootstrapTable('destroy');
    $('#reportTable1').bootstrapTable({
        url: "../getresult",
        // data:{"id":id},
        method: 'post',
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(formData),
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        traditional: true,//防止深度序列化
        // dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: false, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,//每页的记录行数（*）
        pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped: true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: true,
        sidePagination: "client", //服务端处理分页
        queryParamsType: "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        responseHandler: function (res) {
            return res.data;
        },
        queryParams: function (params) {//上传服务器的参数
            return JSON.stringify(formData);
            // return { pageSize : 100 };
        },//请求远程数据时，可以通过修改queryParams发送其他参数。
        columns: [
            // {
            //     field:"rowIndex",
            //     title:"序号",
            //     width : '45px',
            //     align : 'center',
            //     formatter : function(value, row, index) {
            //         return index + 1;
            //     }
            // },
            {
                field: "partName", title: "部件名称", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="partName' + index + '" value="' + value + '"  class="form-control parsley-validated" onblur="changeReason(\'partName\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "length", title: "长", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="length' + index + '" value="' + value + '" class="form-control parsley-validated" onblur="changeReason(\'length\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "width", title: "宽", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="width' + index + '" value="' + value + '" class="form-control parsley-validated" onkeyup="checknum(this);" onblur="changeReason(\'width\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "high", title: "高", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="high' + index + '" value="' + value + '" class="form-control parsley-validated" onkeyup="checknum(this);" onblur="changeReason(\'high\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "numbyZhuang", title: "数量张、片", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="numbyZhuang' + index + '" value="' + value + '" class="form-control parsley-validated"  onblur="changeReason(\'numbyZhuang\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "numbyGens", title: "数量根", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="numbyGens' + index + '" value="' + value + '" class="form-control parsley-validated"  onblur="changeReason(\'numbyGens\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "numbyGe", title: "数量个", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="numbyGe' + index + '" value="' + value + '" class="form-control parsley-validated"  onblur="changeReason(\'numbyGe\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "yuliaoLen", title: "余料长", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="yuliaoLen' + index + '" value="' + value + '" class="form-control parsley-validated"  onblur="changeReason(\'yuliaoLen\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field: "yuliaoWidth", title: "余料宽", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    return '<input id="yuliaoWidth' + index + '" value="' + value + '" class="form-control parsley-validated"  onblur="changeReason(\'yuliaoWidth\',' + index + ',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            }
        ],
        formatNoMatches: function () {
            return '无符合条件的记录';
        },
        onLoadSuccess: function (data) {
            console.log(data);
        }
    });
    // //服务端分页调用方法
    // function queryParams(params) {
    //     console.log(params);
    //     return {
    //         pageSize: params.limit, // 每页显示数量
    //         offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
    //         name: params.sort,
    //         order: params.order
    //     };
    // }

}

//提交
function save() {
    var data = {
        doorhigh: $('#menshangao').val(),//门扇高度
        doornums: $('#menshannums').val(),//门扇数量
        doorweight: $('#menshankuan').val(),//门扇宽度
        plaThick: $('#bancaihou').val(),//板材厚度
        zztWeight: $('#ztkuan').val(),//中中挺宽度
        sztweight: $('#sztkuan').val(),//上中挺宽度
        bkweight: $('#biankuang').val(),//边框
        sxHigh: $('#shangxin').val(),//上芯板
        zxHigh: $('#zhongxin').val(),//中芯板
        xxHigh: $('#xiaxin').val(),//下芯板
        zdWeight: $('#zhongdang').val(),//中档宽
        zxWeight: $('#zaoxing').val(),//造型宽
        xbDepth: $('#xinjincao').val(),//芯板进槽深度
        smWeight: $('#shangmao').val(),//上帽
        xmWeight: $('#xiamao').val(),//下帽
        memo2: $('#zzthigh').val(),//中中挺长度
        xztWeight: $('#xztkuan').val(),//下中挺宽度
        glassDepth: $('#bolijincao').val(),//玻璃进槽深度
        memo3: $('#xzthigh').val(),//下中挺长
        memo1: $('#szthigh').val(),//下中挺长
        memo4: $('#memo4').val(),//小中档宽
        memo5: $('#memo5').val(),//小中挺宽
        caseires: $('#suanfaxilie').val(),
        serizesId: $('#kuanshi').val()
    };
    retable1(data);
}

function submitMsg(formData) {
    var index = layer.load(1, {shade: [0.5, '#fff']}); // 0.5透明度的白色背景
    var request = "../basicFileController/updateDataLaborByIdNew";
    $.ajax({
        type: "POST",
        url: request,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(formData),
        dataType: "json",
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        traditional: true,//防止深度序列化
        success: function (result) {
            layer.close(index);
            if (result.errorCode == '000') {
                layer.alert('修改成功', function () {
                    window.location.href = "../basicFileController/copy2";
                })
            } else {
                layer.msg("系统错误");
                // ,function(){
                //         post("../UserController/roleAssignments",{id:result.id})
                //     }
            }
        }
    });
}

$("#xilie").change(function () {
    chooseDepartmentTwo($("#xilie").val())
    //alert("111111");
    //要触发的事件
});
$("#kuanshi").change(function () {

    vari($("#kuanshi").val());
    caserizes($("#kuanshi").val());

    //chooseDepartmentTwo($("#xilie").val())
    // alert("111111");
    //要触发的事件
});

// 输入订单号进入回车事件
$("#jobNum").keydown(function (e) {
    if (e.keyCode == 13) {
        getOrderInfo($("#jobNum").val());
    }
});

// 通过工单号获取相关信息
function getOrderInfo(jobNum) {
    $.ajax({
        url: '../orderInfo/getOrderInfo',   //url地址
        type: 'GET',                 //上传方式
        dataType: 'JSON',
        async: true,    //请求是否异步，默认为异步，这也是ajax重要特性
        data: {"jobNum": jobNum},
        success: function (req) {//成功回调
            console.log(req.success)
            if (req.success == '200') {
                $('#salesOrderNum').val(req.data.salesOrderNum);//销售订单号
                $('#menshangao').val(req.data.hight);// 门扇高度
                $('#menshankuan').val(req.data.width);// 门扇宽度
                $('#colorInfo').val(req.data.colorInfo);// 颜色
                $('#menshannums').val(parseInt(req.data.numberInfo));// 门扇数量
            } else {
                $('#salesOrderNum').val("");//销售订单号
                $('#menshangao').val("");// 门扇高度
                $('#menshankuan').val("");// 门扇宽度
                $('#colorInfo').val("");// 颜色
                $('#menshannums').val("");// 门扇数量
                alert("工单号为" + jobNum + "找不到对应的数据，请确认当前输入的订单号是否正确！")
            }
        },
        error: function (req) {//失败回调
            console.log(req);
        }
    });
}

function vari(id) {
    $.ajax({
        url: "../serizescontroll/choosevari",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
        data: {"serid": id},    //参数值
        type: "GET",   //请求方式
        success: function (req) {
            //请求成功时处理
            $('#caokuan').val(req.data.caoweight);
            // $('#menshangao').val(req.data.doorhigh);//门扇高度
            // $('#menshannums').val(req.data.doornums);//门扇数量
            // $('#menshankuan').val(req.data.doorweight);//门扇宽度
            // $('#employeeName').val( req.data.variablename);
            // $('#employeecode').val( req.data.variablecode);
            $('#bancaihou').val(req.data.plaThick);//板材厚度
            // $('#varvalue').val( req.data.variablevalue);
            $('#ztkuan').val(req.data.zztWeight);//中中挺宽度
            //$('#gongyi').val( req.data.processVersion);
            $('#sztkuan').val(req.data.sztweight);//上中挺宽度
            $('#biankuang').val(req.data.bkweight);//边框
            $('#shangxin').val(req.data.sxHigh);//上芯板
            $('#zhongxin').val(req.data.zxHigh);//中芯板
            $('#xiaxin').val(req.data.xxHigh);//下芯板
            $('#zhongdang').val(req.data.zdWeight);//中档宽
            $('#zaoxing').val(req.data.zxWeight);//造型宽
            $('#xinjincao').val(req.data.xbDepth);//芯板进槽深度
            $('#shangmao').val(req.data.smWeight);//上帽
            $('#xiamao').val(req.data.xmWeight);//下帽
            $('#zzthigh').val(req.data.memo2);//中中挺长度
            $('#xztkuan').val(req.data.xztWeight);//下中挺宽度
            $('#bolijincao').val(req.data.glassDepth);//玻璃进槽深度
            $('#xzthigh').val(req.data.memo3);//下中挺长度
            $('#szthigh').val(req.data.memo1);//下中挺长度
            $('#memo4').val(req.data.memo4);//小中档宽度
            $('#memo5').val(req.data.memo5);//小中挺宽度


            //reTypeTableAdd(id);
            //retable1(id);
        },
        error: function () {
            //请求出错处理
        }
    });
}

//获取二级部门select，如果为编辑，选中的二级部门selected = true
function chooseDepartmentTwo(type) {
    // loading层
//    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../serizescontroll/chooseserizes";
    ajax = $.ajax({
        type: "GET",
        url: encodeURI(request),
        data: {"type": type},    //参数值
        dataType: "json",
        cache: false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success: function (result) {
//            layer.close(index);
            if (result.errorCode == 0) {
                layer.msg(result.resultMassage, {icon: 5, anim: 6, time: 3000});
            } else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                $("#kuanshi").html(result.data);
//   });
            }
        }
    });
}

//获取二级部门select，如果为编辑，选中的二级部门selected = true
function caserizes(serid) {
    // loading层
//    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../serizescontroll/choosecaries";
    ajax = $.ajax({
        type: "GET",
        url: encodeURI(request),
        data: {"seid": serid},//参数值
        dataType: "json",
        cache: false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success: function (result) {
//            layer.close(index);
            if (result.errorCode == 0) {
                layer.msg(result.resultMassage, {icon: 5, anim: 6, time: 3000});
            } else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                $("#suanfaxilie").html(result.data);
//                });
            }
        }
    });
}

var $window = $(window);
$window.resize(function () {
    // resizewindow();
});
//
var form, flow, element, layer;
layui.use(['form', 'flow', 'element', 'layer', 'laydate'], function () {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer, laydate = layui.laydate;
});
$(function () {
    // resizewindow();
    //页面滚动到底部时加载更多
    var nScrollHight = 0;
    var nScrollTop = 0;
    var $frame = $(".table-content");
    var nDivHight = $frame.height() + 50;
    $frame.on("scroll touchmove", function () {
        nScrollHight = $(this)[0].scrollHeight;
        nScrollTop = $(this)[0].scrollTop;
        if (Number(nScrollTop) + Number(nDivHight) >= Number(nScrollHight)) {
            $('.layui-flow-more a').click();
        }
        $(".layui-flow-more").css("position", "absolute");
        $(".layui-flow-more").css("left", ($(".table-content").width() - 30) / 2);
    });
});

// //重新计算页面尺寸
function resizewindow() {
    var i = $(window).height(),
        n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if ($("#bwType").val() == 0) {
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n - ($(".ibox-content2").innerHeight() - $(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height() - $(".search-list").height() - 90);
        $("#tableInfo").height($(".ibox-content2").height() - $(".search-list").height() - 30);
    } else {
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n - ($(".ibox-content2").innerHeight() - $(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height() - $(".search-list2").height() - 130);
        $("#tableInfo").height($(".ibox-content2").height() - $(".search-list").height() - 30);
    }
}

// //调用共通的加载列表
// function commonload(json) {
//     $("#contentlist").html('');
//     $(".loading").hide();
//     var myDate = new Date();
//     flow.load({
//         elem : '#contentlist' //流加载容器
//         ,isAuto : true //是否自动加载。
//         ,done : function(page, next) { //执行下一页的回调
//             var lis = [];
//             setTimeout(function(){
//                 json.page = page;
//                 json.time = myDate.getTime();
//                 $.get('../ProcessController/getInventorySelectList', json, function(res){
//                     var obj = JSON.parse(res);
//                     if(obj.resultCode == -1){
//                         $("#contentlist").load("../CommonController/500",function(){
//                             $("#errorMsg").text(obj.resultMsg);
//                         });
//                         return false;
//                     }
//                     layui.each(obj.date, function(index, item){
//                         var str = "";
//                         if($("#bwType").val()==0){//电脑版
//                         if(item.price==null||item.price==""||item.price==undefined){
//                              item.price="";
//                         }
//                          if(item.longer==null||item.longer==""||item.longer==undefined){
//                               item.longer="";
//                         }
//                         if(item.wide==null||item.wide==""||item.wide==undefined){
//                               item.wide="";
//                         }
//                         if(item.thick==null||item.thick==""||item.thick==undefined){
//                               item.thick="";
//                         }
//                             str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';//item.viewUrl
//                             str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventoryCode+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventorySource+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventoryName+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventorySpecifications+'</td>';
// //                            str += '<td class="vercenter text-center phoneinformation">'+item.price+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.longer+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.wide+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.thick+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.mainUnit+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.subsidiaryUnit+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">';
//                                                          str += '<a style="cursor: pointer;" onclick="edit1(\''+item.id+'\')">编辑</a><br/>';
//                                                         str += '</td>';
//                             str += '</tr>';
//                         }
//                         lis.push(str);
//                     });
//                     //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
//                     //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
//                     next(lis.join(''), page < obj.pages);
//                     $(".layui-flow-more").css("position","absolute");
//                     $(".layui-flow-more").css("left",($(".table-content").width()-30)/2);
//                     $(".loading").show();
//                     if(page >= obj.pages){
//                         if(obj.pages>1){
//                             $(".loading").html('<div style="width:100%;text-align:center;">\u6ca1\u6709\u66f4\u591a\u4e86</div>');
//                         }else if(obj.pages == 1) {
//                             $(".loading").html('<div style="width:100%;text-align:center;"></div>');
//                         }else{
//                             $(".loading").html('<div style="width:100%;text-align:center;">没有找到匹配的记录</div>');
//                         }
//
//                         $("#contentlist .layui-flow-more").html("");
//                     }else{
//                         $(".loading").html("<div style='cursor: pointer;margin-top:40px'>\u6eda\u52a8\u67e5\u770b\u66f4\u591a</div><br><div class='arrow1'></div>");
//                         $("#contentlist .layui-flow-more a").html("");
//                     }
//                     $(".total").html(obj.total);
//                 });
//             },600);
//         }
//     });
// }
// //搜索
// function onsearchtable(){
//     var json={};
//     var inventoryCode = $("#inventoryCode").val().trim();
//     if(inventoryCode!=null && inventoryCode!="" && inventoryCode!=undefined){
//         json.inventoryCode = inventoryCode;
//     }
//     var inventoryName = $("#inventoryName").val().trim();
//     if(inventoryName!=null && inventoryName!="" && inventoryName!=undefined){
//         json.inventoryName = inventoryName;
//     }
//     var inventorySource = $("#inventorySource").val().trim();
//     if(inventorySource!=null && inventorySource!="" && inventorySource!=undefined){
//         json.inventorySource = inventorySource;
//     }
//     var inventorySpecifications = $("#inventorySpecifications").val().trim();
//     if(inventorySpecifications!=null && inventorySpecifications!="" && inventorySpecifications!=undefined){
//         json.inventorySpecifications = inventorySpecifications;
//     }
//
//     commonload(json);
// }
// $('#inventoryCode').bind('keyup', function(event) {
//                　　if (event.keyCode == "13") {
//                　　　　//回车执行查询
//                　　　　onsearchtable();
//                　　}
//                });
//                 $('#inventoryName').bind('keyup', function(event) {
//                     　　if (event.keyCode == "13") {
//                     　　　　//回车执行查询
//                     　　　　onsearchtable();
//                     　　}
//                     });
// //重置
// function reset(){
//     $("#inventoryCode").val("");
//     $("#inventoryName").val("");
//     var json={
//
//     };
//     commonload(json);
// }
// var ajax;
// //用户作废
// function del(id){
//     //产品表id
//     if( id==null ||  id=="" ||  id==undefined){
//         layer.msg("记录信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
//     }
//     layer.confirm("确认作废该BOM吗？", {icon: 3, title:false},function(index1){
//         layer.close(index1);
//         var json={
//
//         };
//         commonload(json);
// //        var json = {"id":id};
// //        // loading层
// //        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
// //        var request = "../UserController/delUser";
// //        ajax = $.ajax({
// //            type : "POST",
// //            url : encodeURI(request),
// //            data : json,
// //            dataType : "json",
// //            cache : false,
// //            success : function(result) {
// //                layer.closeAll();
// //                if(result.resultCode == 0) {
// //                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
// //                }else {
// //                    layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
// //                        onsearchtable()
// //                    });
// //                }
// //            }
// //        });
//     });
// }
// //分配角色
// function roleAssignments(id){
//     post("../UserController/roleAssignments",{id:id,backflag:1,type:1});//jinrru
// }
// //分配角色
// function changetabs(flag){
//     onsearchtable();
// }
// //调用共通的加载列表
// function commonloadDao(json) {
//     $("#contentlist").html('');
//     $(".loading").hide();
//     var myDate = new Date();
//     flow.load({
//         elem : '#contentlist' //流加载容器
//         ,isAuto : true //是否自动加载。
//         ,done : function(page, next) { //执行下一页的回调
//             var lis = [];
//             setTimeout(function(){
//                 json.page = page;
//                 json.time = myDate.getTime();
//                 $.get('../ProcessController/getInventoryListDaoExcel', json, function(res){
//                     var obj = JSON.parse(res);
//                     if(obj.resultCode == -1){
//                         $("#contentlist").load("../CommonController/500",function(){
//                             $("#errorMsg").text(obj.resultMsg);
//                         });
//                         return false;
//                     }
//                      window.open("../ProcessController/testDownloader");
//                     layui.each(obj.date, function(index, item){
//                         var str = "";
//                         if($("#bwType").val()==0){//电脑版
//                         if(item.price==null||item.price==""||item.price==undefined){
//                              item.price="";
//                         }
//                          if(item.longer==null||item.longer==""||item.longer==undefined){
//                               item.longer="";
//                         }
//                         if(item.wide==null||item.wide==""||item.wide==undefined){
//                               item.wide="";
//                         }
//                         if(item.thick==null||item.thick==""||item.thick==undefined){
//                               item.thick="";
//                         }
//                             str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';//item.viewUrl
//                             str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventoryCode+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventorySource+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventoryName+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.inventorySpecifications+'</td>';
//                       //      str += '<td class="vercenter text-center phoneinformation" style="display: none">'+item.price+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.longer+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.wide+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.thick+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.mainUnit+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">'+item.subsidiaryUnit+'</td>';
//                             str += '<td class="vercenter text-center phoneinformation">';
//                              str += '<a style="cursor: pointer;" onclick="edit1(\''+item.id+'\')">编辑</a><br/>';
//                             str += '</td>';
//                             str += '</tr>';
//                         }
//                         lis.push(str);
//                     });
//                     //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
//                     //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
//                     next(lis.join(''), page < obj.pages);
//                     $(".layui-flow-more").css("position","absolute");
//                     $(".layui-flow-more").css("left",($(".table-content").width()-30)/2);
//                     $(".loading").show();
//                     if(page >= obj.pages){
//                         if(obj.pages>1){
//                             $(".loading").html('<div style="width:100%;text-align:center;">\u6ca1\u6709\u66f4\u591a\u4e86</div>');
//                         }else if(obj.pages == 1) {
//                             $(".loading").html('<div style="width:100%;text-align:center;"></div>');
//                         }else{
//                             $(".loading").html('<div style="width:100%;text-align:center;">没有找到匹配的记录</div>');
//                         }
//
//                         $("#contentlist .layui-flow-more").html("");
//                     }else{
//                         $(".loading").html("<div style='cursor: pointer;margin-top:40px'>\u6eda\u52a8\u67e5\u770b\u66f4\u591a</div><br><div class='arrow1'></div>");
//                         $("#contentlist .layui-flow-more a").html("");
//                     }
//                     $(".total").html(obj.total);
//                 });
//             },600);
//         }
//     });
// }
//
//
// //excel批量到处
// function excelImport(){
//     var json={};
//         var inventoryCode = $("#inventoryCode").val().trim();
//         if(inventoryCode!=null && inventoryCode!="" && inventoryCode!=undefined){
//             json.inventoryCode = inventoryCode;
//         }
//         var inventoryName = $("#inventoryName").val().trim();
//         if(inventoryName!=null && inventoryName!="" && inventoryName!=undefined){
//             json.inventoryName = inventoryName;
//         }
//     var inventorySource = $("#inventorySource").val().trim();
//     if(inventorySource!=null && inventorySource!="" && inventorySource!=undefined){
//         json.inventorySource = inventorySource;
//     }
//     var inventorySpecifications = $("#inventorySpecifications").val().trim();
//     if(inventorySpecifications!=null && inventorySpecifications!="" && inventorySpecifications!=undefined){
//         json.inventorySpecifications = inventorySpecifications;
//     }
//
//         commonloadDao(json);
//         onsearchtable();
// }
// //新增标准bom
// function addStandardBom(){
//     post("../ProcessController/addAndEditInventorySelect",{})
// }
// //编辑
// function edit1(id){
//     parent.layer.open({
//             type: 2,
//             title: ['存货档案', 'font-size:18px;color:#788188;'],
//             area : ['800px', '600px'],
//             closeBtn: 1,
//             content: '../ProcessController/addAndEditInventorySelect?id='+id
//         });
// }
// function tansdata(){
//     $.ajax({
//         url:"../basicFileController/transdataer",    //请求的url地址
//         dataType:"json",   //返回格式为json
//         async:true,//请求是否异步，默认为异步，这也是ajax重要特性
//         type:"POST",   //请求方式
//         success:function(req){
//             //请求成功时处理
//            alert(req.msg);
//         },
//         error:function(){
//         alert(req.msg);
//             //请求出错处理
//         }
//     });
//
// onsearchtable();
// 	}
//文件下载
function excelExport() {
    var infoMS = $("#reportTable1").bootstrapTable('getData');
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
            '数量张、片',
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
    openDownloadDialog(sheet2blob(sheet, cols), '订单成本导出结果.xlsx');
}


var tableData = [];

function addItem() {
    // 获取数据
    let myData = getSourceData()
    if (myData != null && myData != undefined) {
        transSourceData(myData)
        // 清空所有输入框、单选框中的值
        clearSourceData();
    }
}

function addItemForImport(importData) {
    for (var i = 0; i < importData.length; i++) {
        tableData.push(importData[i]);
    }
    if (tableData != null && tableData != undefined) {
        transSourceData(tableData)
        // 清空所有输入框、单选框中的值
        clearSourceData();
    }
}

// 获取表单传入的数据
function getSourceData() {
    let myTestData = {
        jobNum: $('#jobNum').val(), // 工单号
        salesOrderNum: $('#salesOrderNum').val(), // 销售订单号
        colorInfo: $('#colorInfo').val(), // 颜色
        doorhigh: $('#menshangao').val(),//门扇高度
        doornums: $('#menshannums').val(),//门扇数量
        doorweight: $('#menshankuan').val(),//门扇宽度
        caoweight: $('#caokuan').val(), //槽宽
        plaThick: $('#bancaihou').val(),//板材厚度
        zztWeight: $('#ztkuan').val(),//中中挺宽度
        sztweight: $('#sztkuan').val(),//上中挺宽度
        bkweight: $('#biankuang').val(),//边框
        sxHigh: $('#shangxin').val(),//上芯板
        zxHigh: $('#zhongxin').val(),//中芯板
        xxHigh: $('#xiaxin').val(),//下芯板
        zdWeight: $('#zhongdang').val(),//中档宽
        zxWeight: $('#zaoxing').val(),//造型宽
        xbDepth: $('#xinjincao').val(),//芯板进槽深度
        smWeight: $('#shangmao').val(),//上帽
        xmWeight: $('#xiamao').val(),//下帽
        memo2: $('#zzthigh').val(),//中中挺长度
        xztWeight: $('#xztkuan').val(),//下中挺宽度
        glassDepth: $('#bolijincao').val(),//玻璃进槽深度
        memo3: $('#xzthigh').val(),//下中挺长
        memo1: $('#szthigh').val(),//上中挺长
        memo4: $('#memo4').val(),//小中档宽
        memo5: $('#memo5').val(),//小中挺宽
        caseires: $('#suanfaxilie').val(), // 款式系列ID
        serizesId: $('#kuanshi').val(), // 算法系列ID
    };
    if (myTestData.caseires == null || myTestData.caseires == undefined || myTestData.caseires == '') {
        alert("请添加有效的数据！")
        return
    } else if (myTestData.serizesId == null || myTestData.caseires == undefined || myTestData.caseires == '') {
        alert("请添加有效的数据！")
        return
    } else if (myTestData.caoweight == null || myTestData.caoweight == undefined || myTestData.caoweight == '') {
        alert("请输入槽宽！")
        return
    } else if (myTestData.caseires == 7 && myTestData.serizesId == 29) {
        myTestData.memo3 = "500";
        tableData.push(myTestData);
        return tableData;
    } else if (myTestData.caseires == 7 && myTestData.serizesId == 30) {
        myTestData.memo3 = "500";
        tableData.push(myTestData);
        return tableData;
    } else if (myTestData.caseires == 8 && myTestData.serizesId == 33) {
        myTestData.memo3 = "500";
        tableData.push(myTestData);
        return tableData;
    } else {
        tableData.push(myTestData);
        return tableData;
    }
}

// 处理传入的数据
function transSourceData(tableData) {
    layui.use('table', function () {
        var table = layui.table;
        //展示已知数据
        table.render({
            elem: '#reportTable0'
            , title: '原始数据表'
            , cols: [[ //标题栏
                {type: 'checkbox'}
                , {field: 'jobNum', title: '工单号', width: 180}
                , {field: 'salesOrderNum', title: '销售订单号', width: 180}
                , {field: 'caseires', title: '系列', width: 80}
                , {field: 'serizesId', title: '款式', width: 80}
                , {field: 'colorInfo', title: '颜色', width: 180}
                , {field: 'doorhigh', title: '门扇高度', width: 100}
                , {field: 'doornums', title: '门扇数量', width: 100}
                , {field: 'doorweight', title: '门扇宽度', minWidth: 100}
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
                , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 80}
            ]]
            , data: tableData
            , skin: 'line' //表格风格
            , even: true
            , page: true //是否显示分页
            , limits: [5, 7, 10]
            , limit: 5 //每页默认显示的数量
        });

        table.on('tool(reportTable0)', function (obj) {
            var data = obj.data;
            if (obj.event === 'del') {
                layer.confirm('是否需要删除该行！', function (index) {
                    tableData.pop(index)
                    obj.del();
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                layer.prompt({
                    formType: 2
                    , value: data.email
                }, function (value, index) {
                    obj.update({
                        email: value
                    });
                    layer.close(index);
                });
            }
        });
    });
}

// 清空表达中所有的数据
function clearSourceData() {
    $('#menshangao').val(""),
        $('#menshannums').val(""),//门扇数量
        $('#menshankuan').val(""),//门扇宽度
        $('#bancaihou').val(""),//板材厚度
        $('#caokuan').val(""),//板材厚度
        $('#ztkuan').val(""),//中中挺宽度
        $('#sztkuan').val(""),//上中挺宽度
        $('#biankuang').val(""),//边框
        $('#shangxin').val(""),//上芯板
        $('#zhongxin').val(""),//中芯板
        $('#xiaxin').val(""),//下芯板
        $('#zhongdang').val(""),//中档宽
        $('#zaoxing').val(""),//造型宽
        $('#xinjincao').val(""),//芯板进槽深度
        $('#shangmao').val(""),//上帽
        $('#xiamao').val(""),//下帽
        $('#zzthigh').val(""),//中中挺长度
        $('#xztkuan').val(""),//下中挺宽度
        $('#bolijincao').val(""),//玻璃进槽深度
        $('#xzthigh').val(""),//下中挺长
        $('#szthigh').val(""),//下中挺长
        $('#memo4').val(""),//小中档宽
        $('#memo5').val(""),//小中挺宽
        $('#suanfaxilie').val(""),
        $('#kuanshi').val(""),
        $('#salesOrderNum').val(""),
        $('#jobNum').val(""),
        $('#colorInfo').val("")
}

// 计算后返回的数据
var myData;
// 计算前的原始数据
var tableData;

// 运算
function calculate() {
    if (tableData.length < 1) {
        alert("请在添加完数据后再运算！")
        return;
    }
    $.ajax({
        url: '../getAllResult',   //url地址
        type: 'POST',                 //上传方式
        data: form,                   // 上传formdata封装的数据
        dataType: 'JSON',
        cache: false,                  // 不缓存
        processData: false,        // jQuery不要去处理发送的数据
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(tableData),
        success: function (data) {//成功回调
            myData = data;
            layui.use('table', function (data) {
                var table = layui.table;
                // 计算结果汇总
                table.render({
                    elem: '#reportTable1'
                    , title: '运算结果数据表'
                    , cols: [[ //标题栏
                        {field: 'jobNum', title: '工单号', width: 180}
                        , {field: 'salesOrderNum', title: '销售订单号', width: 180}
                        , {field: 'colorInfo', title: '颜色', width: 180}
                        , {field: 'partName', title: '部件名称', width: 120}
                        , {field: 'caoweight', title: '槽宽', width: 80}
                        , {field: 'preSize', title: '备料尺寸', width: 200}
                        , {field: 'numbyGens', title: '数量根', width: 100}
                        , {field: 'numbyZhuang', title: '数量张(片)', width: 100}
                        , {field: 'size', title: '精截尺寸', width: 200}
                        , {field: 'numbyGe', title: '数量个', width: 80}
                        , {field: 'yuliaoLen', title: '余料长', width: 80}
                        , {field: 'yuliaoWidth', title: '余料宽', width: 80}
                    ]]
                    , data: myData.data.normal
                    , skin: 'line' //表格风格
                    , even: true
                    , page: true //是否显示分页
                    , limits: [10, 20, 30]
                    , limit: 10 //每页默认显示的数量
                });
                // 正常料汇总
                table.render({
                    elem: '#reportTable2'
                    , tabBar: true
                    , totalrow: true
                    , cols: [[ //标题栏
                        {field: 'salesOrderNum', title: '销售订单号', width: 180}
                        , {field: 'partName', title: '部件名称', width: 120}
                        , {field: 'colorInfo', title: '颜色', width: 180}
                        , {field: 'caoweight', title: '槽宽', width: 100}
                        , {field: 'preSize', title: '备料尺寸', width: 200}
                        , {field: 'numbyGens', title: '数量根', width: 100}
                        , {field: 'numbyZhuang', title: '数量张(片)', width: 180}
                        , {field: 'size', title: '精截尺寸', width: 200}
                        , {field: 'numbyGe', title: '数量个', width: 100}
                    ]]
                    , data: myData.data.result
                    , even: true
                });
                // 展示余料汇总数据
                table.render({
                    elem: '#reportTable3'
                    , tabBar: true
                    , totalrow: true
                    , cols: [[ //标题栏
                        {field: 'salesOrderNum', title: '销售订单号', width: 180}
                        , {field: 'colorInfo', title: '颜色', width: 180}
                        , {field: 'partName', title: '部件名称', width: 180}
                        , {field: 'caoweight', title: '槽宽', width: 100}
                        , {field: 'size', title: '余料尺寸', width: 200}
                        , {field: 'numbyZhuang', title: '数量张(片)', width: 180}
                    ]]
                    , data: myData.data.remove
                    , even: true
                });
            })

        },
        error: function (data) {//失败回调
            console.log(data);
        }
    });
}


function excelExport() {
    if (myData == null || myData == "" || myData == undefined || myData.length == 0) {
        alert("暂时没有要导出的数据,请添加完数据，进行计算后再进行导出！")
        return;
    }
    // 原始计算数据
    var originalList = myData.data.original;
    console.log(originalList);
    if (originalList == null || originalList == "" || originalList == undefined || originalList.length == 0) {
        // layer.msg("暂时没有要导出的数据。", {icon: 5, anim: 6, time: 3000});
        // return;
    } else {
        var aoa1 = new Array();
        aoa1.push(
            [
                '工单号',
                '销售订单号',
                '系列',
                '款式',
                '颜色',
                '门扇高度',
                '门扇数量',
                '门扇宽度',
                '槽宽',
                '板材厚度',
                '中中挺宽度',
                '上中挺宽度',
                '边框',
                '上芯板',
                '中芯板',
                '下芯板',
                '中档宽',
                '造型宽',
                '芯板进槽深度',
                '上帽',
                '下帽',
                '中中挺长度',
                '下中挺宽度',
                '玻璃进槽深度',
                '下中挺长',
                '上中挺长',
                '小中档宽',
                '小中挺宽'
            ]
        )
        if (originalList != null && originalList.length > 0) {
            for (var i = 0; i < originalList.length; i++) {
                let temp = new Array;
                temp.push(originalList[i].jobNum);
                temp.push(originalList[i].salesOrderNum);
                temp.push(originalList[i].caseires);
                temp.push(originalList[i].serizesId);
                temp.push(originalList[i].colorInfo);
                temp.push(originalList[i].doorhigh);
                temp.push(originalList[i].doornums);
                temp.push(originalList[i].doorweight);
                temp.push(originalList[i].caoweight);
                temp.push(originalList[i].plaThick);
                temp.push(originalList[i].zztWeight);
                temp.push(originalList[i].sztweight);
                temp.push(originalList[i].bkweight);
                temp.push(originalList[i].sxHigh);
                temp.push(originalList[i].zxHigh);
                temp.push(originalList[i].xxHigh);
                temp.push(originalList[i].zdWeight);
                temp.push(originalList[i].zxWeight);
                temp.push(originalList[i].xbDepth);
                temp.push(originalList[i].smWeight);
                temp.push(originalList[i].xmWeight);
                temp.push(originalList[i].memo2);
                temp.push(originalList[i].xztWeight);
                temp.push(originalList[i].glassDepth);
                temp.push(originalList[i].memo3);
                temp.push(originalList[i].memo1);
                temp.push(originalList[i].memo4);
                temp.push(originalList[i].memo5);
                aoa1.push(temp);
            }
        }
        var cols1 = [
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10}
        ]
        var sheet1 = XLSX.utils.aoa_to_sheet(aoa1);
    }

    // 计算后的数据
    var normalList = myData.data.normal;
    console.log(originalList);
    if (normalList == null || normalList == "" || normalList == undefined || normalList.length == 0) {
        // layer.msg("暂时没有要导出的数据。", {icon: 5, anim: 6, time: 3000});
        // return;
    } else {
        var aoa2 = new Array();
        aoa2.push(
            [
                '工单号',
                '销售订单号',
                '颜色',
                '部件名称',
                '槽宽',
                '备料尺寸',
                '数量根',
                '数量张(片)',
                '精截尺寸',
                '数量个',
                '余料长',
                '余料宽'
            ]
        )
        if (normalList != null && normalList.length > 0) {
            for (var i = 0; i < normalList.length; i++) {
                let temp = new Array;
                temp.push(normalList[i].jobNum);
                temp.push(normalList[i].salesOrderNum);
                temp.push(normalList[i].colorInfo);
                temp.push(normalList[i].partName);
                temp.push(normalList[i].caoweight);
                temp.push(normalList[i].preSize);
                temp.push(normalList[i].numbyGens);
                temp.push(normalList[i].numbyZhuang);
                temp.push(normalList[i].size);
                temp.push(normalList[i].numbyGe);
                temp.push(normalList[i].yuliaoLen);
                temp.push(normalList[i].yuliaoWidth);
                aoa2.push(temp);
            }
        }
        var cols2 = [
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 30},
            {wch: 30},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10}
        ]
        var sheet2 = XLSX.utils.aoa_to_sheet(aoa2);
    }
    // 正常料
    var infoMS = myData.data.result;
    console.log(infoMS);
    if (infoMS == null || infoMS == "" || infoMS == undefined || infoMS.length == 0) {
        // layer.msg("暂时没有要导出的数据。", {icon: 5, anim: 6, time: 3000});
        // return;
    } else {
        var aoa3 = new Array();
        aoa3.push(
            [
                '销售订单号',
                '颜色',
                '部件名称',
                '槽宽',
                '备料尺寸',
                '数量根',
                '数量张(片)',
                '精截尺寸',
                '数量个',
            ]);
        if (infoMS != null && infoMS.length > 0) {
            for (var i = 0; i < infoMS.length; i++) {
                let temp = new Array;
                temp.push(infoMS[i].salesOrderNum);
                temp.push(infoMS[i].colorInfo);
                temp.push(infoMS[i].partName);
                temp.push(infoMS[i].caoweight);
                temp.push(infoMS[i].preSize);
                temp.push(infoMS[i].numbyGens);
                temp.push(infoMS[i].numbyZhuang);
                temp.push(infoMS[i].size);
                temp.push(infoMS[i].numbyGe);
                aoa3.push(temp);
            }
        }
        var cols3 = [
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 30},
            {wch: 10},
            {wch: 10},
            {wch: 30},
            {wch: 10}
        ];
        var sheet3 = XLSX.utils.aoa_to_sheet(aoa3);
    }
    // openDownloadDialog(sheet2blob(sheet, cols), '正常料合并导出结果.xlsx');
    // 余料
    var infoMs2 = myData.data.remove;
    console.log(infoMs2);
    if (infoMs2 == null || infoMs2 == "" || infoMs2 == undefined || infoMs2.length == 0) {
        // layer.msg("暂时没有要导出的数据。", {icon: 5, anim: 6, time: 3000});
    } else {
        var aoa4 = new Array();
        aoa4.push(
            [
                '销售订单号',
                '颜色',
                '部件名称',
                '槽宽',
                '余料尺寸',
                '数量张(片)',
            ]);
        if (infoMs2 != null && infoMs2.length > 0) {
            for (var i = 0; i < infoMs2.length; i++) {
                let temp = new Array;
                temp.push(infoMs2[i].salesOrderNum);
                temp.push(infoMs2[i].colorInfo);
                temp.push(infoMs2[i].partName);
                temp.push(infoMS[i].caoweight);
                temp.push(infoMs2[i].size);
                temp.push(infoMs2[i].numbyZhuang);
                aoa4.push(temp);
            }
        }
        var cols4 = [
            {wch: 10},
            {wch: 10},
            {wch: 10},
            {wch: 30},
            {wch: 10}
        ];
        var sheet4 = XLSX.utils.aoa_to_sheet(aoa4);
    }
    openDownloadDialog(sheets2blob(sheet1, sheet2, sheet3, sheet4, cols1, cols2, cols3, cols4,
        "原始计算数据", "计算后数据", "正常料合并结果", "余料合并结果"), '计算结果.xlsx');
}


// 导入
// function uploadFile() {
//     $("#file").click();
//     console.log("进入的导入窗口！")
//     $('#file').change(function (e) {
//         console.log("点击了导入！")
//         var fileName = e.target.files[0];//js 获取文件对象
//         if (fileName !== undefined) {
//             var file_typename = fileName.name.substring(fileName.name.lastIndexOf('.'));
//             if (file_typename === '.xlsx' || file_typename === '.xls') {
//                 $("#filename").css("display", "block");
//                 $("#filename").val(fileName.name);
//                 Upload(fileName);
//             } else {
//                 alert("请选择正确的文件类型！");
//             }
//         } else {
//             alert("上传失败！");
//         }
//     })
// }

// // 将excel 传人后台，并显示合并结果到前端，并且下载该文件
// function Upload(fileObj) {
//     var form = new FormData(); // FormData 对象
//     form.append("file", fileObj); // 文件对象
//     $.ajax({
//         url: '/api/excel/readExcel',   //url地址
//         type: 'POST',                 //上传方式
//         data: form,                   // 上传formdata封装的数据
//         dataType: 'JSON',
//         cache: false,                  // 不缓存
//         processData: false,        // jQuery不要去处理发送的数据
//         contentType: false,         // jQuery不要去设置Content-Type请求头
//         success: function (data) {//成功回调
//             console.log(data);
//             addItemForImport(data.data.original);
//         },
//         error: function (data) {//失败回调
//             console.log(data);
//         }
//     });
// }

layui.use('upload', function () {
    var $ = layui.jquery
        , upload = layui.upload;
    //选完文件后不自动上传
    upload.render({
        elem: '#file'
        , url: '/api/excel/readExcel' //改成您自己的上传接口
        , accept: 'file' //普通文件
        , auto: false
        , multiple: true
        , bindAction: '#fileUpdate'
        , done: function (res) {
            if (res.success == "200") {
                addItemForImport(res.data.original);
                if (res.data.notCorrect.length > 0) {
                    var msg = [];
                    for (var i = 0; i < res.data.notCorrect.length; i++) {
                        msg.push(res.data.notCorrect[i].jobNum);
                    }
                    alert("上传成功工单数:" + res.data.original.length + ",上传失败工单数:" + res.data.notCorrect.length + ",以下工单号上传失败：" + msg);
                } else {
                    layer.msg("上传成功!");
                }


            } else {
                layer.msg("上传失败！");
            }
            console.log(res)
        }
    });

    //多文件列表示例
    var demoListView = $('#demoList')
        , uploadListIns = upload.render({
        elem: '#testList'
        , url: '/api/excel/readExcel' //改成您自己的上传接口
        , accept: 'file'
        , multiple: true
        , auto: false
        , bindAction: '#testListAction'
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var file_typename = file.name.substring(file.name.lastIndexOf('.'));
                if (file_typename === '.xlsx' || file_typename === '.xls') {
                    var tr = $(['<tr id="upload-' + index + '">'
                        , '<td>' + file.name + '</td>'
                        , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                        , '<td>等待上传</td>'
                        , '<td>'
                        , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                        , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                        , '</td>'
                        , '</tr>'].join(''));

                    //单个重传
                    tr.find('.demo-reload').on('click', function () {
                        obj.upload(index, file);
                    });

                    //删除
                    tr.find('.demo-delete').on('click', function () {
                        delete files[index]; //删除对应的文件
                        tr.remove();
                        uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    });
                    demoListView.append(tr);
                } else {
                    alert("请上传excel类型的文件！")
                }
            });
        }
        , done: function (res, index, upload) {
            if (res.success == "200") {//上传成功
                addItemForImport(res.data.original);
                if (res.data.notCorrect.length > 0) {
                    var msg = [];
                    for (var i = 0; i < res.data.notCorrect.length; i++) {
                        msg.push(res.data.notCorrect[i].jobNum);
                    }
                    alert("上传成功工单数:" + res.data.original.length + ",上传失败工单数:" + res.data.notCorrect.length + ",以下工单号上传失败：" + msg);
                } else {
                    layer.msg("上传成功!");
                }
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html(''); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            console.log(res)
            this.error(index, upload);
        }
        , error: function (index, upload) {
            var tr = demoListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });

});

