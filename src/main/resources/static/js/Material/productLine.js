var $window = $(window);
$window.resize(function() {
    resizeWindow();
});
var maxIds = 0;

$(function() {
    resizeWindow();
    $('#reportTable1').bootstrapTable({
        url:"../ProcessController/getproductLine",
        method: 'get',
        cache: false,
        striped: true,
        pagination: true,
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize: 20,
        pageNumber:1,
        pageList: [5, 10, 15, 20, 100, 200],
        search: true,
        showColumns: true,
        showToggle: true,
        clickToSelect: true,
        locale: 'zh-CN',
        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"id",
                visible: false
            },
            {
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            },
            {
                field:"bomSeries",title:"生产基地",align:"center",valign:"middle",sortable:"true",width : '10%',
                formatter : function(value, row, index) {
                            var str ='<div class="input-group">'+
                                          '<input id="bomSeries'+index+'" class="form-control parsley-validated" type="password" maxlength="11" style="background-color:#fff" />'+
                                          '<span class="input-group-addon"  id="choose" onclick="chooseBomSeries()"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                                      '</div>';

                            return str;
                }
            },
            {
             field:"bomType",title:"账套",align:"center",valign:"middle",sortable:"true",width : '10%',
             formatter : function(value, row, index) {

                  /*var str ='<select  id="bomType'+index+'" class="form-control parsley-validated" name="d">'+
                             '<option value="">---请选择---</option>'+
                             '<option value="0"';
                             if(value=="0"){
                                 str += 'checked';
                             }
                             str +='>免漆</option>'+
                             '<option value="1"';
                             if(value=="1"){
                                 str += 'checked';
                             }
                             str +=' >烤漆</option>';
                         '</select>';*/
                          var str ='<div class="input-group">'+
                                   '<input id="bomType'+index+'" class="form-control parsley-validated" type="password" maxlength="11" style="background-color:#fff" />'+
                                   '<span class="input-group-addon"  id="choose" onclick="chooseBomType()"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                               '</div>';
                         return str;
                  }
            },
            {
                field:"unit",title:"产品系列代码",align:"center",valign:"middle",sortable:"true",width : '40px',
                formatter : function(value, row, index) {
                    return '<input id="unit'+index+'" value="'+value+'" class="form-control parsley-validated"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"memo",title:"产品系列",align:"center",valign:"middle",sortable:"true",width : '200px',
                formatter : function(value, row, index) {
                    return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated"  maxlength="11" style="background-color:#fff" />';
                }
            }
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
    //服务端分页调用方法
    function queryParams(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            roleName: $("#roleName").val(),
            name: params.sort,
            order: params.order
        };
    }
});
//列表新增一行数据
function addRow(){
    var count = $('#reportTable1').bootstrapTable('getData').length;
    $('#reportTable1').bootstrapTable('insertRow',{index:count,row:{bomSeries:"",bomStyle:"",bomColor:"",bomLong:"",bomWidth:"",bomThick:"",needGlassFlag:"",unit:"",memo:"",id:maxIds-1}});
    maxIds --;
//    $("#reportTable1").bootstrapTable('refresh');
}
//列表删除操作
function delRow(){
    var count = $('#reportTable1').bootstrapTable('getData').length;
    var delArrays = new Array();// 声明一个数组
    var rows = $("#reportTable1").bootstrapTable('getSelections');
    console.log(rows);
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        layer.msg("请先选择要删除的记录!", {icon:5, anim:6, time: 3000});
        return;
    } else {
        $(rows).each(function () {// 通过获得别选中的来进行遍历
            $("#reportTable1").bootstrapTable('remove', {field: 'id', values: "'"+this.id+"'"});
        });
     }
}

//重新计算页面尺寸
function resizeWindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }
}

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    laydate.render({
            elem: '#replyDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){
//                if($("#createEndTime").val()!= null && $("#createEndTime").val()!="" && new Date(value).getTime() > new Date($("#createEndTime").val()).getTime()){
//                    layer.msg("创建开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});
//                }
            }
        });

});
//返回
function back() {
    post("../ProcessController/productLine",{})
}
//下一步
function nextstep(){
    post("../ProcessController/productLine",{});//jinrru
}
//选择生产基地
function chooseBomSeries(){
    parent.layer.open({
        type: 2,
        title: ['生产基地清单', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseProductionSeries' //setBOMForProcess
    });
}
//选择账套
function chooseBomType(){
    parent.layer.open({
        type: 2,
        title: ['BOM类型列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseSetType' //setBOMForProcess
    });
}
//选择产品款式
function chooseBomStyle(){
    parent.layer.open({
        type: 2,
        title: ['BOM产品款式列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBomStyle' //setBOMForProcess
    });
}