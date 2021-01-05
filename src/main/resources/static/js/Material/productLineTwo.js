var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({type:1});
    laydate.render({
        elem: '#createStartTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#createEndTime").val()!= null && $("#createEndTime").val()!="" && new Date(value).getTime() > new Date($("#createEndTime").val()).getTime()){
                layer.msg("创建开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#createEndTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#createStartTime").val()!= null && $("#createStartTime").val()!="" && new Date(value).getTime() < new Date($("#createStartTime").val()).getTime()){
                layer.msg("创建结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
});
$(function() {
    resizewindow();
    //页面滚动到底部时加载更多
    var nScrollHight = 0;
    var nScrollTop = 0;
    var $frame = $(".table-content");
    var nDivHight = $frame.height() + 50;
    $frame.on("scroll touchmove", function() {
        nScrollHight = $(this)[0].scrollHeight;
        nScrollTop = $(this)[0].scrollTop;
        if (Number(nScrollTop) + Number(nDivHight) >= Number(nScrollHight)) {
            $('.layui-flow-more a').click();
        }
        $(".layui-flow-more").css("position","absolute");
        $(".layui-flow-more").css("left",($(".table-content").width()-30)/2);
    });
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
//调用共通的加载列表
function commonload(json) {
    $("#contentlist").html('');
    $(".loading").hide();
    var myDate = new Date();
    flow.load({
        elem : '#contentlist' //流加载容器
        ,isAuto : true //是否自动加载。
        ,done : function(page, next) { //执行下一页的回调
            var lis = [];
            setTimeout(function(){
                json.page = page;
                json.time = myDate.getTime();
                $.get('../ProcessController/getProductLineTwo', json, function(res){
                    var obj = JSON.parse(res);
                    if(obj.resultCode == -1){
                        $("#contentlist").load("../CommonController/500",function(){
                            $("#errorMsg").text(obj.resultMsg);
                        });
                        return false;
                    }
                    layui.each(obj.date, function(index, item){
                        var str = "";
                        if($("#bwType").val()==0){//电脑版

                            str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';//item.viewUrl
                            str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.typeName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.typeNameTwo+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.productName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.productCode+'</td>';

                            str += '<td class="vercenter text-center phoneinformation">';

                                str += '<a style="cursor: pointer;" onclick="edit1(\''+item.id+'\')">编辑</a><br/>';
                                str += '<a style="cursor: pointer;" onclick="del(\''+item.id+'\')">删除</a>';


                            str += '</td>';
                            str += '</tr>';
                        }
                        lis.push(str);
                    });
                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                    next(lis.join(''), page < obj.pages);
                    $(".layui-flow-more").css("position","absolute");
                    $(".layui-flow-more").css("left",($(".table-content").width()-30)/2);
                    $(".loading").show();
                    if(page >= obj.pages){
                        if(obj.pages>1){
                            $(".loading").html('<div style="width:100%;text-align:center;">\u6ca1\u6709\u66f4\u591a\u4e86</div>');
                        }else if(obj.pages == 1) {
                            $(".loading").html('<div style="width:100%;text-align:center;"></div>');
                        }else{
                            $(".loading").html('<div style="width:100%;text-align:center;">没有找到匹配的记录</div>');
                        }

                        $("#contentlist .layui-flow-more").html("");
                    }else{
                        $(".loading").html("<div style='cursor: pointer;margin-top:40px'>\u6eda\u52a8\u67e5\u770b\u66f4\u591a</div><br><div class='arrow1'></div>");
                        $("#contentlist .layui-flow-more a").html("");
                    }
                    $(".total").html(obj.total);
                });
            },600);
        }
    });
}
//搜索
function onsearchtable(){
    var json={};
    if($("#typeName").val()==undefined||$("#typeName").val()==null){
        $("#typeName").val("");
    }
    if($("#typeNameTwo").val()==undefined||$("#typeNameTwo").val()==null){
        $("#typeNameTwo").val("");
    }
    if($("#productName").val()==undefined||$("#productName").val()==null){
        $("#productName").val("");
    }
    if($("#productCode").val()==undefined||$("#productCode").val()==null){
        $("#productCode").val("");
    }
    var typeName = $("#typeName").val() == undefined ? '' : $("#typeName").val().trim();
    if(typeName!=null && typeName!="" && typeName!=undefined){
        json.typeName = typeName;
    }
   // var typeNameTwo = $("#typeNameTwo").val().trim();
    var typeNameTwo = $("#typeNameTwo").val() == undefined ? '' : $("#typeNameTwo").val().trim();
    if(typeNameTwo!=null && typeNameTwo!="" && typeNameTwo!=undefined){
        json.typeNameTwo = typeNameTwo;
    }
   // var productName = $("#productName").val().trim();
    var productName = $("#productName").val() == undefined ? '' : $("#productName").val().trim();
    if(productName!=null && productName!="" && productName!=undefined){
        json.productName = productName;
    }
 //   var productCode = $("#productCode").val().trim();
    var productCode = $("#productCode").val() == undefined ? '' : $("#productCode").val().trim();
    if(productCode!=null && productCode!="" && productCode!=undefined){
        json.productCode = productCode;
    }
    commonload(json);
}
//重置
function reset(){
    $("#typeName").val("");
    $("#typeNameTwo").val("");
    $("#productName").val("");
     $("#productCode").val("");
    var json={

    };
    commonload(json);
}

//大类值变更事件
function bomTypeOnesChange(){
    $("#typeCode").val($("#bomTypeOnes").val());
}

//获取一级分类对应的大类信息
function chooseBomType(){
    var typeCode = $("#typeCode").val();
    if(typeCode==null || typeCode=="" || typeCode == undefined){
        layer.msg("请先设置BOM的所属大类。", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['二级分类列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBomType?typeCode='+typeCode
    });
}

//选中BOM模板
function choose(){
    parent.layer.open({
        type: 2,
        title: ['BOM模板选择', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/setBOMForProcess'
    });
}

//选择bom所属的系列
function chooseBomSeries(){
    var typeCodeTwo = $("#typeCodeTwo").val();
    if(typeCodeTwo==null || typeCodeTwo=="" || typeCodeTwo == undefined){
        layer.msg("请先选择BOM的所属二级分类。", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['BOM系列列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBOMSeries?typeCodeTwo='+typeCodeTwo
    });
}
var ajax;
//用户作废
//用户作废
function del(id){
    //产品表id
    if( id==null ||  id=="" ||  id==undefined){
        layer.msg("记录信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
    }
    layer.confirm("确认删除吗？", {icon: 3, title:false},function(index1){
        layer.close(index1);
        var json={

        };
        json.id = id;

// loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/delProductLineTwo";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});

            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){

                    onsearchtable();
//                });
            }
        }
    });
    });
}
//分配角色
function roleAssignments(id){
    post("../UserController/roleAssignments",{id:id,backflag:1,type:1});//jinrru
}
//分配角色
function changetabs(flag){
    onsearchtable();
}

function choose(){
    post("../ProcessController/saveProductLineTwo",{});
}

$('#typeName').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
　　　　//回车执行查询
　　　　onsearchtable();
　　}
});
$('#typeNameTwo').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
　　　　//回车执行查询
　　　　onsearchtable();
　　}
});
$('#productName').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
　　　　//回车执行查询
　　　　onsearchtable();
　　}
});
$('#productCode').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
　　　　//回车执行查询
　　　　onsearchtable();
　　}
});





//新增
function add(){
// parent.layer.open({
//        type: 2,
//        title: ['制造费用列表', 'font-size:18px;color:#788188;'],
//        area : ['800px', '600px'],
//        closeBtn: 1,
//        content: '../ProcessController/addManufacturingExpenses'
//    });
 post("../ProcessController/addProductLineTwo",{step:0})
}
//编辑
function edit1(id){
//parent.layer.open({
//        type: 2,
//        title: ['制造费用列表', 'font-size:18px;color:#788188;'],
//        area : ['800px', '600px'],
//        closeBtn: 1,
//        content: '../ProcessController/addManufacturingExpenses?id='+id
//    });
 post("../ProcessController/addProductLineTwo",{id:id})
}