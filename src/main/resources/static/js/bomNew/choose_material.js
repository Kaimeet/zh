var $window = $(window);
$window.resize(function() {
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
//加载列表数据

//加载列表数据
function tablestart(){
    $('#materialTable').bootstrapTable('destroy');
    let name= $("#name").val();
    let code= $("#code").val();
    $("#materialTable").bootstrapTable({
        method : 'GET',
        url: "../BomNewContoller/getInventorys?name="+name+"&code="+code,
        //url:"http://localhost:80/api/User/GetList",   //请求地址
        striped : false, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize : 20,//单页记录数
        pageList : [ 5, 10, 20],//可选择单页记录数
        showRefresh : false,//刷新按钮
        responseHandler:function(res){
            return res.data;},
        queryParams : function(params) {//上传服务器的参数
            return { pageSize : 100 };
        },
        columns:[
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
                field:"inventoryName",title:"物料编码",align:"center",valign:"middle",sortable:"true",

            },
            {
                field:"inventoryCode",title:"物料名称",align:"center",valign:"middle",sortable:"true",
            },
            {
                field:"inventorySpecifications",title:"规格",align:"center",valign:"middle",sortable:"true",

            },
            {
                field:"mainUnit",title:"单位",align:"center",valign:"middle",sortable:"true",
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
    let name = row.inventoryName;
    let code = row.inventoryCode;
    let unit = row.mainUnit;
    let spec = row.inventorySpecifications;

    return [
        '<a style="cursor: pointer;" onclick="choosebomde(\''+name+'\',\''+code+'\',\''+unit+'\',\''+spec+'\')">选择</a>'
    ].join('');
};


//重置
function reset(){
    $("#name").val("");
    $("#code").val("");
    tablestart();
}

function choosebomde(name,code,unit,spec){
    console.log(code);
    parent.$("#name").val(name);
    parent.$("#code").val(code);
    parent.$("#unit").val(unit);
    parent.$("#spec").val(spec);
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}

