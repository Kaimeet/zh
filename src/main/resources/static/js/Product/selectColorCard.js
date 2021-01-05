var $window = $(window);
$window.resize(function() {
    resizewindow();
});
var chooseColorCardIds = new Array();
 var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    chooseColorCardIds = $("#chooseColorCardIds").val();
    console.log(chooseColorCardIds);
    commonload({enableFalg:1, chooseColorCardIds : chooseColorCardIds});
    laydate.render({
        elem: '#starttime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
         ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#endtime").val()!= null && $("#endtime").val()!="" && new Date(value).getTime() > new Date($("#endtime").val()).getTime()){
                layer.msg("开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#endtime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
         ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#starttime").val()!= null && $("#starttime").val()!="" && new Date(value).getTime() < new Date($("#starttime").val()).getTime()){
                layer.msg("结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
});
$(function() {

    chooseColorCardIds = $("#chooseColorCardIds").text();
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
    json.realseFlag = 0;
    var myDate = new Date();
    flow.load({
        elem : '#contentlist' //流加载容器
        ,isAuto : true //是否自动加载。
        ,done : function(page, next) { //执行下一页的回调
            var lis = [];
            setTimeout(function(){
                json.page = page;
                json.time = myDate.getTime();
                $.get('../ProductController/getColorMaintenanceList', json, function(res){
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
                            if(item.checkedFlag==0){
                                str += '<td class="vercenter text-center phoneinformation"><input type="checkbox"  name="'+item.colorCardName+'" id="'+item.id+'" value="'+item.colorCardUrl+'"></td>';
                            }else{
                                str += '<td class="vercenter text-center phoneinformation"><input type="checkbox" name="'+item.colorCardName+'" checked id="'+item.id+'" value="'+item.colorCardUrl+'"></td>';
                            }
                            str += '<td class="vercenter text-center phoneinformation"><img src="'+item.colorCardUrl+'" class="imgshow" alt="" height="40px" width="120px" ></td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.colorCardName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.enableFalg+'</td>';
                            str += '</tr>';
                        }else{
                            str+='<div class="visible-xs">';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">序号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+ ( (page-1) * 15 + index + 1 ) +'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">选择</div>';

                            if(item.checkedFlag==0){
                                str+='<div class="col-xs-8 text-left phoneinformation"><input type="checkbox" name="'+item.colorCardName+'" id="'+item.id+'" value="'+item.colorCardUrl+'"></div>';
                            }else{
                                str+='<div class="col-xs-8 text-left phoneinformation"><input type="checkbox" name="'+item.colorCardName+'" checked  id="'+item.id+'" value="'+item.colorCardUrl+'"></div>';
                            }
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">色卡图片</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.colorCardUrl+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">色卡名称</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.colorCardName+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">是否启用</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.enableFalg+'</div>';
                            str+='</div>';
                            str+='</div>';
                            str+='</div>';
                            str+='<div class="row visible-xs" style="margin: 20px 0; border-top: none; border-bottom: 1px solid #DDDDDD"></div>';
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
    var json={
        productName:$("#productName").val(),
        productCode:$("#productCode").val(),
        className:$("#className").val(),
        type:$("#type").val(),
        enableFalg:1,
        chooseColorCardIds : $("#chooseColorCardIds").text()
    };
    commonload(json);
}
//重置
function reset(){
    $("#productName").val("");
    $("#productCode").val("");
    $("#className").val("");
    $("#type").val("");

    var json={
        enableFalg:1
        ,productId:$("#id").val()
    };
    commonload(json);
}
var urls = new Array();
var names = new Array();
var ids = new Array();
//选择
function choose(){
    var onceflag = 0;

    //回显的列表
    var  $list = parent.$('.longfile-list');
    var productid = $("input[type='checkbox']:checked").val();
    $("input[type='checkbox']").each(function () {
        if ($(this).is(":checked")) {
            urls.push($(this).val());
            ids.push($(this).attr("id"));
            names.push($(this).attr("name"));
            if(onceflag==0){
                $list.html('');
            }
            onceflag= 1;
            $list.append('<li style="border:solid #e1edff 1px; margin:5px 5px;text-align: center;" class="file-item"><img src="' + $(this).val() + '" alt="" height="54px" width="132px"><span class="file-del">"'+$(this).attr("name")+'"</span></li>').children(':last').hide().fadeIn(2500);
            console.log($(this).val());
            console.log($(this).val($(this).attr("id")));
        }
    });
    parent.$("#chooseColorCardIds").text(ids);
    parent.$("#chooseColorCardNames").text(names);
    parent.$("#chooseColorCardUrls").text(urls);
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}