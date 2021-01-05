var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
        commonload({type:1});
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
    resizewindow();
    var bwType = $("#bwType").val();
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
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90 - $(".layui-tab-title").height());
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30 );
    }else{
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130 - $(".layui-tab-title").height());
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
                $.get('../ProductController/getCategoryMaintenanceList', json, function(res){
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
                            // str += '<td class="vercenter text-center phoneinformation"><img src="'+item.viewUrl+'" class="imgshow" alt="" height="120px" width="120px" ></td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.className+'</td>';
                            if(item.belongType==0){
                                str += '<td class="vercenter text-center phoneinformation">物料</td>';
                            }else{
                                str += '<td class="vercenter text-center phoneinformation">产品</td>';
                            }
                            str += '<td class="vercenter text-center phoneinformation">'+item.classOrder+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.classGuid+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.createer+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.createTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.updateTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">' ;
                                        if(item.releaseFalg==null || item.releaseFalg==0){
                                            str +='<a style="cursor: pointer;" onclick="releaseP('+item.id+',1)">发布</a><br/>';
                                            str +='<a style="cursor: pointer;" onclick="del('+item.id+')">作废</a>' +
                                                '<br/>' +
                                                '<a style="cursor: pointer;" onclick="editandview('+item.id+')">编辑</a>';
                                        }else{
                                            str +='<a style="cursor: pointer;" onclick="releaseP('+item.id+',0)">撤回</a><br/>';
                                            str +='<a style="cursor: pointer;" onclick="editandview('+item.id+')">编辑</a>';

                                        }
                                        if(item.type==1 && item.classLevel==3){//发布后才能设置产品是否热销
                                            str +='<br/><a style="cursor: pointer;" onclick="setHotC('+item.id+',0)">取消热销分类</a>';
                                        }else if((item.type==0 || item.type==null) && item.classLevel==3){
                                            str +='<br/><a style="cursor: pointer;" onclick="setHotC('+item.id+',1)">设置热销分类</a>';
                                        }
                            str += '</td>';
                            str += '</tr>';
                        }else{
                            str+='<div class="visible-xs">';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">序号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+ ( (page-1) * 15 + index + 1 ) +'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">分类名称</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.className+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">分类编号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.classGuid+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">分类所属</div>';
                            if(item.belongType==0){
                                str+='<div class="col-xs-8 text-left phoneinformation">物料</div>';
                            }else{
                                str+='<div class="col-xs-8 text-left phoneinformation">产品</div>';
                            }
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">次序</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.classOrder+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">创建人</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.createer+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">创建时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.createTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">更新时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.updateTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">操作</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">';
                                if(item.releaseFalg==null || item.releaseFalg==0){
                                    str +='<a style="cursor: pointer;" onclick="releaseP('+item.id+',1)">发布</a>&nbsp&nbsp&nbsp';
                                    str +='<a  style="cursor: pointer;" onclick="del('+item.id+')">作废</a>&nbsp&nbsp&nbsp' +
                                        '<a  style="cursor: pointer;" onclick="editandview('+item.id+')">编辑</a></div>';
                                }else{
                                    str +='<a style="cursor: pointer;" onclick="releaseP('+item.id+',0)">撤回</a>&nbsp&nbsp&nbsp';
                                    str += '<a  style="cursor: pointer;" onclick="editandview('+item.id+')">编辑</a></div>';
                                }
                                if(item.type==1  && item.classLevel==3){//发布后才能设置产品是否热销
                                    str +='<a style="cursor: pointer;" onclick="setHotC('+item.id+',0)">取消热销分类</a>&nbsp&nbsp&nbsp';
                                }else if((item.type==0 || item.type==null)  && item.classLevel==3){
                                    str +='<a style="cursor: pointer;" onclick="setHotC('+item.id+',1)">设置热销分类</a>&nbsp&nbsp&nbsp';
                                }

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

    var className = String($(".layui-this").attr("class"));
    console.log(className);
    var type;
    if(className.indexOf("one") != -1 ){
        type = 1;
    }else if(className.indexOf("two") != -1){
        type = 2;
    }else if(className.indexOf("three") != -1){
        type = 3;
    }
    var starttime=$("#starttime").val();
    var endtime=$("#endtime").val();
    if(new Date(starttime).getTime() > new Date(endtime).getTime()){
        layer.msg("结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    var json={
        className:$("#className").val(),
        classGuid:$("#classGuid").val(),
        starttime:starttime,
        endtime:endtime,
        type:type
    };
    commonload(json);
}

//切换tab
function changetabs(type){
    var starttime=$("#starttime").val();
    var endtime=$("#endtime").val();
    if(new Date(starttime).getTime() > new Date(endtime).getTime()){
        layer.msg("结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    var json={
        className:$("#className").val(),
        classGuid:$("#classGuid").val(),
        starttime:starttime,
        endtime:endtime,
        type:type
    };
    commonload(json);
}



//新增产品分类
function editandview(id){
    post("../ProductController/addAndEditCategory",{id:id});
}

//新增产品分类
function add(){
    post("../ProductController/addAndEditCategory",{});
}

//重置
function onresettable(){
    var className = String($(".layui-this").attr("class"));
    console.log(className);
    var type;
    if(className.indexOf("one") != -1 ){
        type = 1;
    }else if(className.indexOf("two") != -1){
        type = 2;
    }else if(className.indexOf("three") != -1){
        type = 3;
    }
    $("#className").val("");
    $("#classGuid").val("");
    $("#starttime").val("");
    $("#endtime").val("");
    var json={
        type:type
    };
    commonload(json);
}
var ajax;
//作废
function del(id){
    layer.confirm("确认作废该分类吗？", {icon: 3, title:false},function(index, layero){
        var json = {};
        json.id = id;
        console.log(id);
        // loading层
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        console.log(json);
        ajax = $.ajax({
            type : "POST",
            url : "../ProductController/delCategory",
            // traditional : true,
            data : json,
            dataType : "json",
            cache : false,
            success : function(result) {
                layer.closeAll();
                if (result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                } else {//其他情况
//                    layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                        onsearchtable();
//                    });
                }
            },
            // error : function(XMLHttpRequest, textStatus, errorThrown) {
            //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
            //         parent.location.href = "error/kickout.jsp";
            //     }
            // }
        });
    });

}
//发布撤回
function releaseP(id,flag){
    var json = {};
    json.id = id;
    json.flag = flag;
    console.log(id);
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    console.log(json);
    ajax = $.ajax({
        type : "POST",
        url : "../ProductController/releaseCategory",//delCategory
        // traditional : true,
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            layer.close(index);
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    onsearchtable();
//                });
            }
        },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
        //         parent.location.href = "error/kickout.jsp";
        //     }
        // }
    });
}

//设置首页热销产品
function setHotC(id,flag){
    var json = {};
    json.id = id;
    json.flag = flag;
    console.log(id);
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    console.log(json);
    if (ajax != null) {
        ajax.abort();
    }
    ajax = $.ajax({
        type : "POST",
        url : "../ProductController/setHotClass",//delProducts
        traditional : true,
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            layer.close(index);
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
                console.log(1);
                onsearchtable();
            }
        },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
        //         parent.location.href = "error/kickout.jsp";
        //     }
        // }
    });
}


