var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({});
     laydate.render({
        elem: '#createTime'
        ,range: true
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
                $.get('../UserController/getUserManageList', json, function(res){
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
                            str += '<td class="vercenter text-center phoneinformation">'+item.employeeNo+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.name+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.sex+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.departmentOne+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.departmentTwo+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.rolaName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.phone+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.email+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">';
                            str += '<a style="cursor: pointer;" onclick="edit('+item.id+')">编辑</a><br/>' +
//                                '<a style="cursor: pointer;" onclick="del('+item.id+')">作废</a><br/>' +
                                '<a style="cursor: pointer;" onclick="roleAssignments('+item.id+')">角色分配</a>' ;
                            str += '</td>';
                            str += '</tr>';
                        }else{
                            str+='<div class="visible-xs">';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">序号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+ ( (page-1) * 15 + index + 1 ) +'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">用户名称</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.rolaName+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">手机号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.phone+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">邮箱</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.email+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">创建时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.createTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">操作</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">' ;
                            str+='<a  style="cursor: pointer;" onclick="edit('+item.id+')">编辑</a>' ;
                            str+='&nbsp&nbsp&nbsp';
//                            str+='<a  style="cursor: pointer;" onclick="del('+item.id+')">作废</a>' ;
                            str+='&nbsp&nbsp&nbsp';
                            str+='<a  style="cursor: pointer;" onclick="roleAssignments('+item.id+')">角色分配</a>' ;
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


//新增
function add(){
    post("../UserController/addAndEditUser",{})
}
//编辑
function edit(id){
    console.log(id);
    post("../UserController/addAndEditUser",{id:id})
}

//搜索
function onsearchtable(){
    var json={

    };
    if($("#name").val()!=null && $("#name").val()!="" && $("#name").val()!=undefined){
        json.name = $("#name").val();
    }
    if($("#phone").val()!=null && $("#phone").val()!="" && $("#phone").val()!=undefined){
        json.phone = $("#phone").val();
    }
    if($("#email").val()!=null && $("#email").val()!="" && $("#email").val()!=undefined){
        json.email = $("#email").val();
    }
    if($("#sex").val()!=null && $("#sex").val()!="" && $("#sex").val()!=undefined){
        json.sex = $("#sex").val();
    }
    if($("#employeeName").val()!=null && $("#employeeName").val()!="" && $("#employeeName").val()!=undefined){
        json.employeeName = $("#employeeName").val();
    }

    if($("#createTime").val()!=null && $("#createTime").val()!="" && $("#createTime").val()!=undefined){
        json.starttime = $("#createTime").val().trim().split(" - ")[0];
        json.endtime = $("#createTime").val().trim().split(" - ")[1];
    }
    commonload(json);
}

//重置
function reset(){
    $("#name").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#sex").val("");
    $("#starttime").val("");
    $("#endtime").val("");
    $("#employeeName").val("");

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
    layer.confirm("确认作废该账号吗？", {icon: 3, title:false},function(index1){
        layer.close(index1);
        var json = {"id":id};
        // loading层
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        var request = "../UserController/delUser";
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
//分配角色
function roleAssignments(id){
    post("../UserController/roleAssignments",{id:id,backflag:1,type:1});//jinrru
}