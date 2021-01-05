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
        ,type: 'month'
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
                $.get('../ProcessController/getMaterialPriceList', json, function(res){
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
if(item.proRates==null || item.proRates=="" || item.proRates==undefined){
if(item.unitPrice==null || item.unitPrice=="" || item.unitPrice==undefined){
item.proRates = "";
}
else{
item.proRates =item.unitPrice;
}

                            }
                            if(item.inventoryWarehouse==null || item.inventoryWarehouse=="" || item.inventoryWarehouse==undefined){
                                                           item.inventoryWarehouse = "";
                                                       }
                            str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';//item.viewUrl
                            str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.organization+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.inventoryWarehouse+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.inventoryCode+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.material+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.dateTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.materialSpecification+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.materialUnit+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.proRates+'</td>';
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
    var inventoryCode = $("#inventoryCode").val().trim();
    if(inventoryCode!=null && inventoryCode!="" && inventoryCode!=undefined){
        json.inventoryCode = inventoryCode;
    }
    var material = $("#material").val().trim();
    if(material!=null && material!="" && material!=undefined){
        json.material = material;
    }
    var createStartTime = $("#createStartTime").val().trim();
    if(createStartTime!=null && createStartTime!="" && createStartTime!=undefined){
var createStartTime11=createStartTime.split("-");
var year=createStartTime11[0];

if(createStartTime11[1].indexOf("0") != -1)
{

var month1=createStartTime11[1].split("");
var month =month1[1];

}
else{
var month=createStartTime11[1];
}



function keydownEvent() {
         var e = window.event || arguments.callee.caller.arguments[0];
         if (e && e.keyCode == 13 ) {
             onsearchtable();
         }
     }



if(month!=12||month!="12"){
var nextMonthFirstDay = new Date([year,Number(month) + Number(1),1].join('-')).getTime();
                     var oneDay = 1000 * 24 * 60 * 60;
                       var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
                       }
                       else{
                                       var monthLast =30;
                                      }
                    json.createStartTime =[year,month,1].join('-');
                     json.createEndTime = [year,month,monthLast].join('-');
    }


    else{
    var now = new Date();
             var month = now.getMonth();//js获取到的是月份是 0-11 所以要加1
               var year = now.getFullYear();
               if(month!=11||month!="11"){
               var nextMonthFirstDay = new Date([year,month + 1,1].join('-')).getTime();
                                    var oneDay = 1000 * 24 * 60 * 60;
                                      var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
               }
               else{
                var monthLast =30;
               }

                    json.createStartTime =[year,month,1].join('-');
                    json.createEndTime = [year,month,monthLast].join('-');

    }
    //  var day2 = new Date();
    //  day2.setTime(day2.getTime());
      //var createEndTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
       // json.createEndTime = createEndTime;




    commonload(json);
}
function keydownEvent() {
         var e = window.event || arguments.callee.caller.arguments[0];
         if (e && e.keyCode == 13 ) {
             onsearchtable();
         }
     }
$('#inventoryCode').bind('keyup', function(event) {
     　　if (event.keyCode == "13") {
     　　　　//回车执行查询
     　　　　onsearchtable();
     　　}
     });
 $('#material').bind('keyup', function(event) {
          　　if (event.keyCode == "13") {
          　　　　//回车执行查询
          　　　　onsearchtable();
          　　}
          });
$('#createStartTime').bind('keyup', function(event) {
                    　　if (event.keyCode == "13") {
                    　　　　//回车执行查询
                    　　　　onsearchtable();
                    　　}
                    });
//重置
function reset(){
    $("#bomCode").val("");
    $("#bomName").val("");
    $("#createStartTime").val("");
    var json={

    };
    commonload(json);
}
var ajax;
//用户作废
function del(id){
    //产品表id
    if( id==null ||  id=="" ||  id==undefined){
        layer.msg("记录信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
    }
    layer.confirm("确认作废该BOM吗？", {icon: 3, title:false},function(index1){
        layer.close(index1);
        var json={

        };
        commonload(json);
//        var json = {"id":id};
//        // loading层
//        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
//        var request = "../UserController/delUser";
//        ajax = $.ajax({
//            type : "POST",
//            url : encodeURI(request),
//            data : json,
//            dataType : "json",
//            cache : false,
//            success : function(result) {
//                layer.closeAll();
//                if(result.resultCode == 0) {
//                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
//                }else {
//                    layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
//                        onsearchtable()
//                    });
//                }
//            }
//        });
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
//新增标准bom
function addStandardBom(){
    post("../ProcessController/addAndEditMaterialPrice",{})
}
//编辑
function edit1(id){
    post("../ProcessController/addAndEditMaterialPrice",{id:id})//草稿
}

function excelImport(){
var json={};
    var inventoryCode = $("#inventoryCode").val().trim();
    if(inventoryCode!=null && inventoryCode!="" && inventoryCode!=undefined){
        json.inventoryCode = inventoryCode;
    }
    var material = $("#material").val().trim();
    if(material!=null && material!="" && material!=undefined){
        json.material = material;
    }
    var createStartTime = $("#createStartTime").val().trim();
    if(createStartTime!=null && createStartTime!="" && createStartTime!=undefined){
var createStartTime11=createStartTime.split("-");
var year=createStartTime11[0];

if(createStartTime11[1].indexOf("0") != -1)
{

var month1=createStartTime11[1].split("");
var month =month1[1];

}
else{
var month=createStartTime11[1];
}

if(month!=12||month!="12"){
var nextMonthFirstDay = new Date([year,Number(month) + Number(1),1].join('-')).getTime();
                     var oneDay = 1000 * 24 * 60 * 60;
                       var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
                       }
                       else{
                                       var monthLast =30;
                                      }
                    json.createStartTime =[year,month,1].join('-');
                     json.createEndTime = [year,month,monthLast].join('-');
    }


    else{
    var now = new Date();
             var month = now.getMonth();//js获取到的是月份是 0-11 所以要加1
               var year = now.getFullYear();
               if(month!=12||month!="12"){
               var nextMonthFirstDay = new Date([year,month + 1,1].join('-')).getTime();
                                    var oneDay = 1000 * 24 * 60 * 60;
                                      var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
               }
               else{
                var monthLast =30;
               }

                    json.createStartTime =[year,month,1].join('-');
                    json.createEndTime = [year,month,monthLast].join('-');

    }
 commonloadDao(json);
 onsearchtable();

}

function commonloadDao(json) {
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
                $.get('../ProcessController/getMaterialPriceListDaoExcel', json, function(res){
                    var obj = JSON.parse(res);
                    if(obj.resultCode == -1){
                        $("#contentlist").load("../CommonController/500",function(){
                            $("#errorMsg").text(obj.resultMsg);
                        });
                        return false;
                    }
                     window.open("../ProcessController/testDownload");
                    layui.each(obj.date, function(index, item){
                        var str = "";
                        if($("#bwType").val()==0){//电脑版
if(item.proRates==null || item.proRates=="" || item.proRates==undefined){
                                item.proRates = "";
                            }
                            if(item.inventoryWarehouse==null || item.inventoryWarehouse=="" || item.inventoryWarehouse==undefined){
                                                           item.inventoryWarehouse = "";
                                                       }
                            str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';//item.viewUrl
                            str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.organization+'</td>';
                             str += '<td class="vercenter text-center phoneinformation">'+item.inventoryWarehouse+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.inventoryCode+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.material+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.dateTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.materialSpecification+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.materialUnit+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.proRates+'</td>';
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
