var $window = $(window);
$window.resize(function() {
    resizeWindow();
});
$(function() {
    resizeWindow();
    $('#reportTable1').bootstrapTable({
        url:"../ProcessController/getDataDoors?type="+0+"&menuid="+$("#menuid").val()+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 100,//每页的记录行数（*）
        pageList: [100, 500, 1000, 5000],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: true,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
        uniqueId:"id",
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
                field:"quoteDetailCode",
                visible: false
            },{
                field:"quotationDetailNumber",
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
            field:"typeCode",title:"产品大类",align:"center",valign:"middle",
            formatter : function(value, row, index) {
                    var bomTypeOneMSHtml = $("#bomTypeOneMSHtml").val();
                    if(value!=null && value!=undefined  && value!=""){
                        bomTypeOneMSHtml = bomTypeOneMSHtml.replace(value+"\"",value+"\" selected ");
                    }
                    value = bomTypeOneMSHtml;
                    var reg = RegExp(/【index】/);
                    while(value.match(reg)){
                        value = value.replace("【index】",index);
                    }
                    return value;
               }
            } ,
            {
                field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",
                 formatter : function(value, row, index) {
                       return '<input id="msbomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',1)"  maxlength="50" style="background-color:#fff" />';
                 }
            },
            {
                field:"color",title:"颜色",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var str  ='<div class="input-group">'+
                        '<input id="mscolor'+index+'" disabled class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',1)" value="'+value+'" maxlength="64" style="background-color:#fff" />'+
                        '<span class="input-group-addon"  id="choose" onclick="chooseColor('+index+',1)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                        '</div>';
                    return str;
                }
            },
             {
                 field:"paint",title:"油漆",align:"center",valign:"middle",
                 formatter : function(value, row, index) {
                     return '<input id="mspaint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                 }
             },
            {
                field:"quoteLong",title:"门扇长(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="msquoteLong'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteWidth",title:"门扇宽(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="msquoteWidth'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteThick",title:"门扇厚(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="msquoteThick'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',1)" maxlength="11" style="background-color:#fff" />';
                }
            },
          {
                field:"unit",title:"单位",align:"center",valign:"middle" ,
                formatter : function(value, row, index) {
                    return '<input id="msunit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"memo",title:"生产单备注",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<textarea class="letter" style="background-color:#fff" id="msmemo'+index+'" rows="3" onblur="changeReason(\'memo\','+index+',1)" maxlength="128" style="overflow:hidden">'+value+'</textarea>'
                }
            },
              {
                field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",
                  formatter : function(value, row, index) {
                       var str ='<span id="msfilename'+index+'" >';
                       if(value!=null && value!=""){
                           var stringArr = value.split(";");
                           for (i = 0; i < stringArr.length; i++) {
                                var stringArrOne = stringArr[i].split(":");
                                str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-length" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                           }
                       }
                       str+='</span>';
                      return str
                  }
            },{
                  field:"fileId",
                  visible: false
              },
             {
                 field:"doit",title:"操作",align:"center",valign:"middle",
                 formatter : function(value, row, index) {
                     if($("#uploadFileMethod").val() ==null || $("#uploadFileMethod").val() ==""  || $("#uploadFileMethod").val() ==undefined || $("#uploadFileMethod").val() !=null && $("#uploadFileMethod").val()!="" && $("#uploadFileMethod").val() == 0 ){
                         return '<button type="button"  class="btn btn-s-xs greenbtn uploadFileMethod"  onclick="uploadFile(\''+row.id+'\','+index+',1)"">上传相关附件</button>';
                     }else{
                         return '-';
                     }
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
            name: params.sort,
            order: params.order
        };
    }
});
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
                var nowDate = new Date();
                if(  new Date(value).getTime() < nowDate.getTime()){
                    layer.msg("回复时间不能小于当前时间。", {icon:5, anim:6, time: 3000});
                    $("#replyDate").val("");
                }
            }
        });
});
//提交
function save(submitFlag){
    var data = {};
    var formData = new FormData();
    submitMsg(formData);
}
function  submitMsg(formData){
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/saveDataDoors";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : formData,
        dataType : "json",
        cache : false,
        processData : false, // 告诉jQuery不要去处理发送的数据
        contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
                post("../ProcessController/quoteDetails",{})
            }
        }
    });
}
