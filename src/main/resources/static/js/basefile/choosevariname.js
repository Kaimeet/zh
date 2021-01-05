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
    // var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;
    //
    // $(".ibox-content").height(n);
    // $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
    // //表格主体的高度
    // $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
    // $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);

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
                $.get('../ProcessController/getUserList', json, function(res){ //getBomStyleList
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
                            str += '<td class="vercenter text-center phoneinformation">'+item.employeeName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.departmentOne+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.departmentTwo+'</td>';

                            str += '<td class="vercenter text-center phoneinformation">';
                            str += '<a style="cursor: pointer;" onclick="choose(\''+item.employeeName+'\','+item.userId+',\''+item.departmentOne+'\',\''+item.departmentTwo+'\')">选择</a>';
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
    var json={
        userName:$("#userName").val(),
        departmentNameOne:$("#departmentNameOne").val(),
        departmentNameTwo:$("#departmentNameTwo").val()
    };
    commonload(json);
}
//重置
function reset(){
    $("#userName").val("");
    $("#departmentNameOne").val("");
    $("#departmentNameTwo").val("");
    var json={
    };
    commonload(json);
}
//选择
function choose(employeeName,userId,departmentOne,departmentTwo){
    var columnIndex = parent.$("#chooseIndex").val();
    parent.$("#employeeName"+columnIndex).val(employeeName);
    parent.$("#userId").val(userId);
    parent.$("#departmentName").val(departmentOne+"/"+departmentTwo);
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}
function choosevarnamede(varicode,variname,c,d){
    var columnIndex = parent.$("#chooseIndex").val();
    console.log(varicode);
    parent.$("#employeecode"+columnIndex).val(varicode);
    parent.$("#employeeName"+columnIndex).val(variname);
    parent.$("#varvalid"+columnIndex).val(null);
    parent.$("#varvalue"+columnIndex).val(null);

    parent.$("#varicode").val(varicode);
    parent.$("#varicode").text(varicode);
    parent.$("#varicode").html(varicode);

    parent.$("#variname").val(variname);
    parent.$("#variname").text(variname);
    parent.$("#variname").html(variname);
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}
function tablestart(){
    $('#varinametable').bootstrapTable('destroy');
    var name=$("#variname").val();
    var code=$("#varicode").val();
    var bomcode=$("#bomcode").val();
    $("#varinametable").bootstrapTable({
        method : 'get',
        url: "../basicFileController/getvarinamefiles?name="+name+"&code="+code+"&modelcode="+bomcode,
        //url:"http://localhost:80/api/User/GetList",   //请求地址
        striped : false, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
         pageSize : 10,//单页记录数
        pageList : [ 5, 10, 20],//可选择单页记录数
        showRefresh : false,//刷新按钮
        responseHandler:function(res){
            return res.data;},
        queryParams : function(params) {//上传服务器的参数
            return { pageSize : 100 };
        },
        columns:[
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"id",
                visible: false
            },
            {
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            },
            {
                field:"variablecode",title:"变量编码",align:"center",valign:"middle",sortable:"true",

            },
            {
                field:"variablename",title:"变量名称",align:"center",valign:"middle",sortable:"true",

            },

            {
                field:"vainstuaction",title:"使用说明",align:"center",valign:"middle",sortable:"true",

            },
            {
                title : '操作',
                field : 'doo',
                sortable : true,
                formatter:detailCell
            }

        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        },
        onPostBody:function(data){
        }
    })
}


/// detail
function detailCell(value, row, index) {
    var contanerID =  "container" + row.id;
    var d =row.variablename;
     var sff= row.variablecode;
    return [
        '<div class="btn-group">',
        '<a  onclick="choosevarnamede(\''+sff+'\',\''+d+'\',\''+d+'\',\''+sff+'\')"  title="选择" data-toggle="tooltip">选择</a>',
        '</div>'
    ].join('');
};