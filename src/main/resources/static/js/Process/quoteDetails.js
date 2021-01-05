var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var flagall = 0;
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({processCode:$("#processCode").val()});
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
    laydate.render({
            elem: '#replyStartDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){

                if($("#replyEndDate").val()!= null && $("#replyEndDate").val()!="" && new Date(value).getTime() > new Date($("#replyEndDate").val()).getTime()){
                    layer.msg("回复开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});
                }
            }
        });
        laydate.render({
            elem: '#replyEndDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){

                if($("#replyStartDate").val()!= null && $("#replyStartDate").val()!="" && new Date(value).getTime() < new Date($("#replyStartDate").val()).getTime()){
                    layer.msg("回复结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
                }
            }
        });
});
$(function() {

    document.onkeydown = function (e) { // 回车提交表单
        // 兼容FF和IE和Opera
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13){
            onsearchtable();
        }
    }

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
    /*var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;
    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-114);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-54);
    }else{
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-154);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-54);
    }*/
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;
    $(".ibox-content").height(n);
    $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
    //表格主体的高度
    $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
    $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
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
                $.get('../ProcessController/quoteDetailsList', json, function(res){
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
                           /* str += '<td class="vercenter text-center phoneinformation">';
                                str += '<input type="checkbox" ';
                                if(item.doFlag==0 || item.doFlag==2 ){
                                    str += ' disabled ';
                                }
                                str += 'name="ckitem" id="check'+item.processCode+'" value="'+item.processCode+'|'+item.quoteDetailCode+'|'+item.status+'">';
                            str += '</td>';*/
                            if(item.urgentState==0){
                                str += '<td class="vercenter text-center phoneinformation">'+item.projectName+'</td>';/*项目名称*/
                            }else{
                                str += '<td class="vercenter text-center phoneinformation red">'+item.projectName+'</td>';/*项目名称*/
                            }


                            str += '<td class="vercenter text-center phoneinformation">';
                                str += '<a style="cursor: pointer;" onclick="viewApproveOne(\''+item.processCode+'\',\''+item.quoteDetailCode+'\',0)">'+item.quotationDetailNumber+'</a>';
                            str += '</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.replyDate+'</td>';/*回复日期*/
                            str += '<td class="vercenter text-center phoneinformation">';
                                str += '<a style="cursor: pointer;" onclick="lookApproveHis(\''+item.quoteDetailCode+'\',0,\''+item.status+'\')">'+item.status+'</a>';
                            str += '</td>';
                            // str += '<td class="vercenter text-center phoneinformation">'+item.bomStyle+'</td>';
                            // str += '<td class="vercenter text-center phoneinformation">'+item.color+'</td>';
                            // str += '<td class="vercenter text-center phoneinformation">'+item.paint+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.claimantName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">';
                            if(item.doFlag==0){
                                if($("#claimMethod1").val() ==null || $("#claimMethod1").val() ==""  || $("#claimMethod1").val() ==undefined || $("#claimMethod1").val() !=null && $("#claimMethod1").val()!="" && $("#claimMethod1").val() == 0   ){
                                    str += '<a style="cursor: pointer;" class="claimMethod1" onclick="claim(\''+item.quoteDetailCode+'\',1)">认领</a>';
                                }
                            }else if(item.doFlag==1 || item.getFlag==1){
                                if(item.doFlag==1){
                                    if($("#claimMethod0").val() ==null || $("#claimMethod0").val() ==""  || $("#claimMethod0").val() ==undefined || $("#claimMethod0").val() !=null && $("#claimMethod0").val()!="" && $("#claimMethod0").val() == 0   ){
                                        str += '<a style="cursor: pointer;"  class="claimMethod0" onclick="claim(\''+item.quoteDetailCode+'\',0)">取消认领</a><br/>';
                                    }
                                }
                                if($("#viewApproveOneMethod").val() ==null || $("#viewApproveOneMethod").val() ==""  || $("#viewApproveOneMethod").val() ==undefined || $("#viewApproveOneMethod").val() !=null && $("#viewApproveOneMethod").val()!="" && $("#viewApproveOneMethod").val() == 0   ){
                                    str += '<a style="cursor: pointer;"  class="viewApproveOneMethod" onclick="viewApproveOne(\''+item.processCode+'\',\''+item.quoteDetailCode+'\',1)">审核</a>';
                                }

                            }
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
                    $("#needDeal").html(obj.total);
                    $(".total").html(obj.total);
                });
            },600);
        }
    });
}
//搜索
function onsearchtable(){
    var json={
    };
    if($("#bomStyle").val()!=null && $("#bomStyle").val()!="" && $("#bomStyle").val()!=undefined && $("#bomStyle").val()!="undefined"){
        json.bomStyle=$("#bomStyle").val();
    }
    if($("#projectName").val()!=null && $("#projectName").val()!="" && $("#projectName").val()!=undefined && $("#projectName").val()!="undefined"){
        json.projectName=$("#projectName").val();
    }
    if($("#quotationDetailNumber").val()!=null && $("#quotationDetailNumber").val()!="" && $("#quotationDetailNumber").val()!=undefined && $("#quotationDetailNumber").val()!="undefined"){
        json.quotationDetailNumber=$("#quotationDetailNumber").val();
    }
    commonload(json);
}
//重置
function reset(){
    $("#bomStyle").val("");
    $("#projectName").val("");
    $("#quotationDetailNumber").val("");
    var json={
    };
    commonload(json);
}
//查看流程的状态
function viewphis(){
    parent.layer.open({
        type: 2,
        title: ['状态详情', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/viewProcessHistory'
    });
}
//查看申请单明细单条
function viewApproveOne(processCode,quoteDetailCode,flag){//flag:0：查看；1：审核
    var listCode =processCode+"|"+quoteDetailCode+";";
    post("../ProcessController/quotationProcessReview",{listCode:listCode,count:0,flag:flag,menuid:$("#menuid").val()}) //count:0:单条审核；1：批量审核
}
//查看申请单明细批量
function viewApproveList(){
    var listCode ="";
    var listCodeOne ="";
    var count = 0;
    var status  = "";
    var returnFlag = 0;
    $("input:checkbox[name='ckitem']:checked").each(function(i){
       listCode+=$(this).val()+";";
       listCodeOne = $(this).val();
       var statusMiddle = listCodeOne.split("|")[2];
       if(status==""){
            status = statusMiddle;
       }else if(status!=statusMiddle){
            returnFlag = 1;
       }
       count ++;
    });
    if(returnFlag==1){
        layer.msg("批量审核的数据存在流程状态不一致的记录，请确认。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    if(count>1){//选中超过一条数据
        post("../ProcessController/quotationProcessReview",{listCode:listCode,count:1,flag:1,"menuid":$("#menuid").val()})//0:单挑审核，可驳回；1：多条审核只能批量审核通过，没有驳回操作
    }else{
        post("../ProcessController/quotationProcessReview",{listCode:listCode,count:0,flag:1,"menuid":$("#menuid").val()})//0:单挑审核，可驳回；1：多条审核只能批量审核通过，没有驳回操作
    }
}
//列表tab
function changetabs(flag){

}
var ajax;
//认领流程
function claim(quoteDetailCode,cancelFlag){
    //产品表id
    if( quoteDetailCode==null ||  quoteDetailCode=="" ||  quoteDetailCode==undefined){
        layer.msg("要认领的流程信息丢失，请刷新页面后在试。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var massageTip = "";
    if(cancelFlag==0){//取消认领
        massageTip = "确认取消认领该条流程吗?";
    }else{//认领
        massageTip = "确认认领该条流程吗?";
    }
    layer.confirm(massageTip, {icon: 3, title:false},function(index1){
        layer.close(index1);
        var json = {"quoteDetailCode":quoteDetailCode,"cancelFlag":cancelFlag};
        // loading层
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        var request = "../ProcessController/claimProcess";
        ajax = $.ajax({
            type : "POST",
            url : encodeURI(request),
            data : json,
            dataType : "json",
            cache : false,
            success : function(result) {
                layer.closeAll();
                if(result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                }else {
//                    layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                        onsearchtable()
//                    });
                }
            }
        });
    });
}
//查看流程审核历史
function lookApproveHis(quoteDetailCode,taskName){
    parent.layer.open({
        type: 2,
        title: ['userService', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1, //BasicFileController
        content: '../ProcessController/viewProcessHistory?quoteDetailCode='+quoteDetailCode+"&taskName="+taskName
    });

}