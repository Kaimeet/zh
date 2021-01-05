var $window = $(window);
$window.resize(function() {
    resizeWindow();
});
$(function() {
    resizeWindow();
});
//重新计算页面尺寸
function resizeWindow(){
}
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});


var ajax;
function save(){
    var str = '{'; /*};*/
     var str2 = '{'; /*};*/
    var parameterList = $("#parameterList").val();
    if(parameterList ==null || parameterList =="" || parameterList == undefined ){
        layer.msg("模型不存在参数无法提交。", {icon : 5, anim : 6, time : 3000});
    }
    var parameterArray = parameterList.split(";");
    $(parameterArray).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
       console.log(this);
       console.log($("#"+this).val());
       if(this!=null && this!="" && this!=undefined){
            var key = $("#"+this).attr("id");
            if($("#"+this).val()=="是"){
                str2 +='"'+key+'":true,';
            }else if ($("#"+this).val()=="否"){
                str2 +='"'+key+'":false,';
            }else{
                str2 +='"'+key+'":"'+$("#"+this).val()+'",';
            }
            str +='"'+key+'":"'+$("#"+this).val()+'",';
       }
    });
    console.log(str.length -1);
    str = str.substring(0,str.length -1);
    str +='}';
    str2 = str2.substring(0,str2.length -1);
    str2 +='}';
    var json = JSON.parse(str);
    json.modelCode=$("#modelCode").val();
    json.quoteDetailCode=$("#quoteDetailCode").val();
    json.codeForModel=$("#codeForModel").val();
    json.parameterList=$("#parameterList").val();
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景

    var flag =  parent.$("#flag").val();

    // flag ： 2 试算无需保存入参
    if (flag == 2){
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.$("#parameterString").val(str2);
        var height = 0 ;
        var width = 0 ;
        var doorLeafThickness = 0 ;
        if ($("#extendHeight").length >0) {
            height =  $("#extendHeight").val();
            width = $("#extendWidth").val();
            doorLeafThickness =  $("#wallThickness").val();
        }
        else
        {
            height = $("#height").val();
            width = $("#width").val();
            doorLeafThickness = $("#doorLeafThickness").val();
        }
        parent.$("#height").val(height);
        parent.$("#width").val(width);
        parent.$("#deep").val(doorLeafThickness);

        parent.layer.close(index); //再执行关闭
        return ;
    }

    var request = "../ProcessController/saveViewModelMassage"; // saveDataDoors
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
//        processData : false, // 告诉jQuery不要去处理发送的数据
//        contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                     parent.$("#parameterString").val(str2);
                     var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                     parent.layer.close(index); //再执行关闭
//                });
            }
        }
    });
}
//返回
function back(){
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}