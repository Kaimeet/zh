var $window = $(window);
$window.resize(function() {
    resizewindow();
});
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }
}

var valueTemp = "";
function checknum(obj) {
    if (/^\d*\.?\d{0,2}$/.test(obj.value)) {
        valueTemp = obj.value;
    } else {
        obj.value = valueTemp;
    }
}


var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    laydate.render({
        elem: '#marketTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){
            if($("#downTime").val()!= null && $("#downTime").val()!="" && new Date(value).getTime() > new Date($("#downTime").val()).getTime()){
                layer.msg("上市时间必须小于下市时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#downTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){
            if($("#marketTime").val()!= null && $("#marketTime").val()!="" && new Date(value).getTime() < new Date($("#marketTime").val()).getTime()){
                layer.msg("上市时间必须小于下市时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
});
$(function() {
    resizewindow();
});
var ajax;
//点击保存按钮
function toStep2(){
    var formData = new FormData();
    if($("#productName").val()==null || $("#productName").val().trim()==""){
        layer.msg("请输入产品名称", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("productName", $("#productName").val());//产品名称

    if($("#seriesCode").val()==null || $("#seriesCode").val().trim()=="" ){
        layer.msg("请选择产品系列", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("seriesCode", $("#seriesCode").val());//所属系列

    // 产品体系
    if($("#productSystem").val()==null || $("#productSystem").val().trim()=="" ){
        layer.msg("请选择产品体系", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("productSystem", $("#productSystem").val());//是否热销产品

    // 是否热销产品
    if($("#type").val()==null || $("#type").val().trim()==""){
        layer.msg("请选择是否热销产品", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("type", $("#type").val());//是否热销产品

    var marketTime=$("#marketTime").val();
    var downTime=$("#downTime").val();
    // 是否热销产品
    if($("#marketTime").val()!=null && $("#marketTime").val().trim()!="" && $("#downTime").val()!=null && $("#downTime").val().trim()!=""){

        if(new Date(marketTime).getTime() > new Date(downTime).getTime()){
            layer.msg("下市时间必须大于上市时间。", {icon:5, anim:6, time: 3000});
            return;
        }
    }
    formData.append("marketTime", $("#marketTime").val());//是否热销产品
    formData.append("downTime", $("#downTime").val());//是否热销产品
    // 产品状态
    if($("#productStatus").val()==null || $("#productStatus").val().trim()=="" ){
        layer.msg("请选择产品状态", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("productStatus", $("#productStatus").val());//是否热销产品
    if(isNaN($("#showOrder").val().trim())){
        layer.msg("产品显示顺序要为整数。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("showOrder", $("#showOrder").val());//长

    /*if($("#longs").val()==null || $("#longs").val().trim()==""){
        layer.msg("请输入产品尺寸：长", {icon : 5, anim : 6, time : 3000});
        return;
    }
    if(isNaN($("#longs").val().trim())){
        layer.msg("长度需要为数字。", {icon : 5, anim : 6, time : 3000});
        return;
    }*/
    formData.append("longs", $("#longs").val());//长

    /* if($("#width").val()==null || $("#width").val().trim()==""){
        layer.msg("请输入产品尺寸：宽", {icon : 5, anim : 6, time : 3000});
        return;
    }
    if(isNaN($("#width").val().trim())){
        layer.msg("宽度需要为数字。", {icon : 5, anim : 6, time : 3000});
        return;
    }*/
    formData.append("width", $("#width").val());//宽

    /*if($("#depth").val()==null || $("#depth").val().trim()==""){
        layer.msg("请输入产品尺寸：进深", {icon : 5, anim : 6, time : 3000});
        return;
    }*/
    /*if(isNaN($("#depth").val().trim())){
        layer.msg("进深度需要为数字。", {icon : 5, anim : 6, time : 3000});
        return;
    }*/
    formData.append("depth", $("#depth").val());//进深

    formData.append("longsmax", $("#longsmax").val());//产品尺寸长极限
    formData.append("widthmax", $("#widthmax").val());//产品尺寸宽极限
    formData.append("depthmax", $("#depthmax").val());//产品尺寸进深极限
    formData.append("markupRate", $("#markupRate").val());//超标加价率

    var chooseColorCardIds = new Array();
    chooseColorCardIds = $("#chooseColorCardIds").text();
    formData.append("chooseColorCardIds", chooseColorCardIds);//色卡


    var chooseColorCardNames = new Array();
    chooseColorCardNames = $("#chooseColorCardNames").text();
    formData.append("chooseColorCardNames", chooseColorCardNames);//色卡


    var chooseColorCardUrls = new Array();
    chooseColorCardUrls = $("#chooseColorCardUrls").text();
    formData.append("chooseColorCardUrls", chooseColorCardUrls);//色卡



    //产品材质
    if($("#productMaterial").val()==null || $("#productMaterial").val().trim()==""){
        layer.msg("请选择产品材质。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("productMaterial", $("#productMaterial").val());//产品规格

    //产品风格
    if($("#productStyle").val()==null || $("#productStyle").val().trim()==""){
        layer.msg("请选择产品风格。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("productStyle", $("#productStyle").val());//产品主料

    //保质年限
    if($("#warrantyPeriod").val()==null || $("#warrantyPeriod").val().trim()==""){
        layer.msg("请输入保质年限", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("warrantyPeriod", $("#warrantyPeriod").val());//产品主料

    formData.append("buyingPoint", $("#buyingPoint").val());//产品原件
    formData.append("introduction", $("#introduction").val());//产品介绍


    formData.append("productionCycle", $("#productionCycle").val());//生产周期

    formData.append("decorativeSurface", $("#decorativeSurface").val());//装饰面

    formData.append("internalStructure", $("#internalStructure").val());//内部结构

    //产品表id
    if( $("#id").val()!=null &&  $("#id").val()!="" &&  $("#id").val()!=undefined){
        formData.append("id", $("#id").val()); //文件名
    }
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    if (ajax != null) {
        ajax.abort();
    }
    var request = "../ProductController/saveProductStep1";
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
                post("../ProductController/addAndEditProduct2",{"id":result.productId});
            }
        }
    });
}

//图片放大预览
function showPicNew(imageUrl){
    //多窗口模式，层叠置顶
    layer.open({
        type: 1 //1:自定义内容；2：页面
        ,title: '查看图片'
        ,area: ['390px', '330px']
        ,shade: 0
        ,maxmin: true
        ,content: '<img  src=\"'+imageUrl+'\" src=\"'+imageUrl+'\" style=\"width: 100%;height: 100%;\" >'
        ,btn: ['全部关闭'] //只是为了演示
        ,btn2: function(){
            layer.closeAll();
        }
        ,zIndex: layer.zIndex //重点1
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });

}

//返回
function  back() {
    post("../ProductController/productMaintenance",{})
}


//选择定义好的色卡信息
function choose(){
    var chooseColorCardIds = new Array();
    if($("#chooseColorCardIds").text()==null || $("#chooseColorCardIds").text()=="" || $("#chooseColorCardIds").text()==undefined){
        chooseColorCardIds = $("#chooseColorCardIds").val();
    }else{
        chooseColorCardIds = $("#chooseColorCardIds").text();
    }

    var bwType = $("#bwType").val();
    if(bwType == 0){
        parent.layer.open({
            type: 2,
            title: ['色卡列表', 'font-size:18px;color:#788188;'],
            area : ['800px', '600px'],
            closeBtn: 1,
            content: '../ProductController/selectColorCard?chooseColorCardIds='+chooseColorCardIds
        });
    }else{
        parent.layer.open({
            type: 2,
            title: ['色卡列表', 'font-size:18px;color:#788188;'],
            area : ['100%', '100%'],
            closeBtn: 1,
            content: '../ProductController/selectColorCard?chooseColorCardIds='+chooseColorCardIds
        });
    }
// , @RequestParam(value="chooseColorCardIds") String[] chooseColorCardIds
}