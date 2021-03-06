var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({});

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
                $.get('../ProcessController/getProductCategoriesII', json, function(res){
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
                            str += '<td class="vercenter text-center phoneinformation"><input type="radio" name="ckitem" id="check'+item.id+'" value="'+item.id+'"></td>';
                            str += '<td class="vercenter text-center phoneinformation" id="Name' + item.id + '" value="'+item.typeName+'">'+item.typeName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation" id="Code' + item.id + '" value="'+item.typeCode+'">'+item.typeCode+'</td>';
                            str += '</tr>';
                        }
//                        else{
//                            str+='<div class="visible-xs">';
//                            str+='<div class="row" style="margin:5px 0;">';
//                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">序号</div>';
//                            str+='<div class="col-xs-8 text-left phoneinformation">'+ ( (page-1) * 15 + index + 1 ) +'</div>';
//                            str+='</div>';
//                            str+='<div class="row" style="margin:5px 0;">';
//                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">通知标题</div>';
//                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.title+'</div>';
//                            str+='</div>';
//                            str+='<div class="row" style="margin:5px 0;">';
//                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">通知摘要</div>';
//                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.summary+'</div>';
//                            str+='</div>';
//                            str+='<div class="row" style="margin:5px 0;">';
//                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">操作</div>';
//                            str+='<div class="col-xs-8 text-left phoneinformation">' ;
//                            str+='<a  style="cursor: pointer;" onclick="choosexs('+item.id+')">选择</a>' ;
//                            str+='</div>';
//                            str+='</div>';
//                            str+='</div>';
//                            str+='<div class="row visible-xs" style="margin: 20px 0; border-top: none; border-bottom: 1px solid #DDDDDD"></div>';
//                        }
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
        typeName:$("#typeName").val().trim(),
        typeCode:$("#typeCode").val().trim(),
    };
    commonload(json);
}
//重置
function reset(){
    $("#typeName").val("");
    $("#typeCode").val("");
    var json={
    };
    commonload(json);
}

//选择
function choose(){
    var productid = $("input[type='radio']:checked").val();
    // parent.$("#jumpId").val(productid);
    parent.$("#varvalue0").val($("#Name"+productid).text());
    parent.$("#varvalue0").text($("#Name"+productid).text());
    parent.$("#varvalue0").html($("#Name"+productid).text());
    parent.$("#varvalue0").value=$("#Name"+productid).text();
  //  parent.$("#bomname").text(productid);
   // parent.$("#bomname").val(productid);
  //  parent.$("#bomname").value=productid;
   // parent.$("#bomname").html(productid);
    parent.$("#varvalue").val($("#Code"+productid).text());
    parent.$("#varvalue").text($("#Code"+productid).text());
    parent.$("#varvalue").html($("#Code"+productid).text());
    parent.$("#varvalue").value=$("#Code"+productid).text();
    //当你在iframe页面关闭自身时
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}
//新增bom
function addNew(){
//    post("",{})
    parent.location.href = "../ProcessController/execlEditPage";
}