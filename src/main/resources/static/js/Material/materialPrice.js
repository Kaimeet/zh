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
                        if(item.materialUnit==null || item.materialUnit=="" || item.materialUnit==undefined){
                                item.materialUnit = "";
                            }
                        if(item.unitPrice==null || item.unitPrice=="" || item.unitPrice==undefined){
                                item.unitPrice = "";
                         }
                          if(item.purchasePrice==null || item.purchasePrice=="" || item.purchasePrice==undefined){
                             item.purchasePrice = "";
                            }
                            if(item.proRates==null || item.proRates=="" || item.proRates==undefined){
                                                    item.proRates = "";
                                                    }
                           if(item.inventoryWarehouse==null || item.inventoryWarehouse=="" || item.inventoryWarehouse==undefined){
                               item.inventoryWarehouse = "";
                           }
                            str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';//item.viewUrl
                            str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.dateTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.updateBy+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.organization+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.inventoryWarehouse+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.inventoryCode+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.material+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.materialSpecification+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.materialUnit+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.unitPrice+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.purchasePrice+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.proRates+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.reason+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">';
                            str += '<a style="cursor: pointer;" onclick="edit1(\''+item.id+'\')">编辑</a><br/>';
                            str += '<a style="cursor: pointer;" onclick="del(\''+item.id+'\',\''+ item.updateBy +'\')">删除</a>';
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


//调用共通的加载列表
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
                        if(item.materialUnit==null || item.materialUnit=="" || item.materialUnit==undefined){
                                item.materialUnit = "";
                        }
                        if(item.unitPrice==null || item.unitPrice=="" || item.unitPrice==undefined){
                        item.unitPrice = "";
                        }
                        if(item.purchasePrice==null || item.purchasePrice=="" || item.purchasePrice==undefined){
                        item.purchasePrice = "";
                        }
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
                            str += '<td class="vercenter text-center phoneinformation">'+item.unitPrice+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.purchasePrice+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.proRates+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.reason+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">';
                            str += '<a style="cursor: pointer;" onclick="edit1(\''+item.id+'\')">编辑</a><br/>';
                            str += '<a style="cursor: pointer;" onclick="del(\''+item.id+'\',\''+ item.updateBy +'\')">删除</a>';
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
    var inventoryCode = $("#inventoryCode").val().trim();
    if(inventoryCode!=null && inventoryCode!="" && inventoryCode!=undefined){
        json.inventoryCode = inventoryCode;
    }
    var materialSpecification = $("#materialSpecification").val().trim();
    if(materialSpecification!=null && materialSpecification!="" && materialSpecification!=undefined){
        json.materialSpecification = materialSpecification;
    }
    var organization = $("#organization").val().trim();
    if(organization!=null && organization!="" && organization!=undefined){
        json.organization = organization;
    }
    var updateBy = $("#updateBy").val().trim();
    if(updateBy!=null && updateBy!="" && updateBy!=undefined){
        json.updateBy = updateBy;
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
             var month = now.getMonth();//js获取到的是月份是 0-11 所以要加1 取前一个月，所以就不用加了
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
function del(id,leixing){
    //产品表id
    if( id==null ||  id=="" ||  id==undefined){
        layer.msg("记录信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
    }
    if(leixing!="手工"){
        layer.msg("禁止删除自动同步数据。", {icon : 5, anim : 6, time : 3000});
    }
    layer.confirm("确认删除这条数据吗？", {icon: 3, title:false},function(index1){
        layer.close(index1);
        var json={

        };
        commonload(json);
// loading层
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        var request = "../ProcessController/delProductCategories";
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
//excel批量到处
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
    var materialSpecification = $("#materialSpecification").val().trim();
    if(materialSpecification!=null && materialSpecification!="" && materialSpecification!=undefined){
        json.materialSpecification = materialSpecification;
    }
    var organization = $("#organization").val().trim();
    if(organization!=null && organization!="" && organization!=undefined){
        json.organization = organization;
    }
    var updateBy = $("#updateBy").val().trim();
    if(updateBy!=null && updateBy!="" && updateBy!=undefined){
        json.updateBy = updateBy;
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
//新增标准bom
function addStandardBom(){
    post("../ProcessController/addAndEditMaterialPrice",{})
}
//编辑
function edit1(id){
    post("../ProcessController/addAndEditMaterialPrice",{id:id})//草稿
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


function keydownEvent() {
         var e = window.event || arguments.callee.caller.arguments[0];
         if (e && e.keyCode == 13 ) {
             onsearchtable();
         }
     }
function checkData() {
    var formData = new FormData();
    var name = $("#upfile").val();
    formData.append("file",$("#upfile")[0].files[0]);
    formData.append("name",name);
    $.ajax({
        url : '../ProcessController/importExp',
        type : 'POST',
        async : false,
        data : formData,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend:function(){
            console.log("正在进行，请稍候");
        },
        success : function(responseStr) {
            if(responseStr=="01"){
                alert("导入成功");
            }else{
                alert("导入失败");
            }
        }
    });
}

function countces() {
    var asd="";
    $.ajax({
        url : '../ProcessController/getPriceCount',
        type : 'GET',
        async : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        success : function(rtnResult) {
            var num= rtnResult.replace(/[^0-9]/ig,"");
            asd=num;
        }
    });
    return asd;

}

//弹出一个询问框，有确定和取消按钮
function firm() {
    //利用对话框返回的值 （true 或者 false）
    var now = new Date();
    var month = now.getMonth();//js获取到的是月份是 0-11 所以要加1
    layer.confirm("本次同步"+month+"月份的价格，请确认是否结账.同步时间大概需要3-15分钟，请耐心等待，期间不要关闭和操作页面.", {
        btn: ['确定','取消'] //按钮
    }, function(index){
        if(countces()=="1"){
            layer.confirm(""+month+"月份已存在价格记录，是否清空重新生成?", {
                btn: ['确定','取消'] //按钮
            }, function(index){
                tansdata();
                layer.close(index);
            }, function(){
                layer.msg('已取消', {
                });


            });
        }
        else {
            tansdata();
            layer.close(index);
        }
    }, function(){
        layer.msg('已取消', {
        });
    });

    // if (confirm("本次同步"+month+"月份的价格，请确认是否结账.同步时间大概需要3-15分钟，请耐心等待，期间不要关闭和操作页面.")) {
    //     if(countces()=="1"){
    //          if(confirm(""+month+"月份已存在价格记录，是否清空重新生成")){
    //               tansdata();
    //           }
    //          else {
    //      alert("已取消");
    //          }
    //             }
    //     else {
    //          tansdata();
    //             }
    //
    //         }
    // else {
    //         alert("已取消");
    //         }
}

	function tansdata(){
    $.ajax({
        url:"../basicFileController/transdata",    //请求的url地址
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        type:"POST",   //请求方式
        beforeSend:function(){
            jQuery('#loading1').showLoading();
        },
        success:function(req){
            console.log(req+"wwwwwwwwwwwwwwwww");
            //请求成功时处理
           alert(req.msg);
        },
        complete: function () {
            jQuery('#loading1').hideLoading();
        },
        error:function(){
        alert(req.msg);
            //请求出错处理
        }
    });

	}

function test(){
    alert('test');
}


//新增
function checkDataTan(){
parent.layer.open({
        type: 2,
        title: ['导入数据', 'font-size:18px;color:#788188;'],
        area : ['500px', '300px'],
        closeBtn: 1,
        content: '../ProcessController/materialPriceDaoRu'
    });
}

//新增
function add(){
// parent.layer.open({
//        type: 2,
//        title: ['制造费用列表', 'font-size:18px;color:#788188;'],
//        area : ['800px', '600px'],
//        closeBtn: 1,
//        content: '../ProcessController/addManufacturingExpenses'
//    });
    post("../ProcessController/addAndEditMaterialPrice",{step:0})
}

