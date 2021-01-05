var $window = $(window);
$window.resize(function() {
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
//加载列表数据
function tablestart(){
    $('#bomtable').bootstrapTable('destroy');
    var name=$("#bomname").val();
    var type=$("#type").val();
    var series=$("#series").val();
    var bomClass=$("#bomClass").val();
    var code=$("#bomcode").val();
    $("#bomtable").bootstrapTable({
        method : 'get',
        url: "../BomNewContoller/getLeverageBoms?name="+name+"&code="+code+"&type="+type+"&series="+series+"&bomClass="+bomClass,
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
            /*{
                field:"checkFlag",
                checkbox: true
            },*/
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
                field:"bomCode",title:"BOM编码",align:"center",valign:"middle",sortable:"true",

            },
            {
                field:"bomName",title:"BOM名称",align:"center",valign:"middle",sortable:"true",

            },
            {
                field:"typeName",
                title:"产品大类",
                width : '45px',
                align : 'center'
            },
            {
                field:"bomClassName",
                title:"产品类型",
                width : '45px',
                align : 'center',
                // formatter : function(value, row, index) {
                //     if(value == "MS"  ){
                //         return "门扇";
                //     }else if(value == "MT" ){
                //         return "门套";
                //     }else if(value == "XT"   ){
                //         return "线条";
                //     }else if(value == "FT"  ){
                //         return "副套";
                //     }else if(value == "QT"   ){
                //         return "其他";
                //     }
                // }
            },
            {
                field:"seriesName",
                title:"产品系列",
                width : '45px',
                align : 'center'/*,
                formatter : function(value, row, index) {
                    if(value === "AJCS" || value === 0 ){
                        return "爱家";
                    }else if(value === "12" || value === 1 ){
                        return "雅居";
                    }else if(value === "12" || value === 1 ){
                        return "雅居";
                    }else if(value === "OPL" || value === 1 ){
                        return "雅居";
                    }else if(value === "11" || value === 1 ){
                        return "11";
                    }
                }*/
            },
            // {
            //     field:"instructions",title:"介绍",align:"center",valign:"middle",sortable:"true",
            //
            // },
            // {
            //     field:"type",title:"类型",align:"center",valign:"middle",sortable:"true",
            //
            // },
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
    var d =row.bomName;
    var sff= row.bomCode;
    let tname = row.typeName;
    let cname = row.bomClassName;
    let sname = row.seriesName;
    return [
        '<a style="cursor: pointer;" onclick="choosebomde(\''+sff+'\',\''+d+'\',\''+tname+'\',\''+cname+'\',\''+sname+'\')">选择</a>'
    ].join('');
};



//重置
function reset(){
    $("#bomname").val("");
    $("#bomcode").val("");
    $("#type").val("");
    $("#series").val("");
    $("#bomClass").val("");
    tablestart();
}

//选择报价单中的组织信息
function chooseCompany(indexNumber){
    parent.layer.open({
        type: 2,
        title: ['组织列表', 'font-size:18px;color:#788188;'],
        area : ['1200px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseCompany',
        end:function(){
            if(parent.$("#companyChooseFlag").val()==0){
                    parent.$("#companyName").val("");
                    parent.$("#companyName").text("");
                    parent.$("#companyName").html("");
                    parent.$("#companyCode").val("");
                    parent.$("#companyCode").text("");
                    parent.$("#companyCode").html("");
            }else{
                parent.$("#companyChooseFlag").val(0);
            }
            $("#companyNameS").val(parent.$("#companyName").val());
        }
    });
}
//选择报价单中的生产基地
function chooseBase(indexNumber){
    parent.layer.open({
        type: 2,
        title: ['生产基地列表', 'font-size:18px;color:#788188;'],
        area : ['1200px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBase',
        end:function(){
            if(parent.$("#baseChooseFlag").val()==0){
                parent.$("#baseName").val("");
                parent.$("#baseName").html("");
                parent.$("#baseName").text("");
                parent.$("#baseCode").val("");
                parent.$("#baseCode").html("");
                parent.$("#baseCode").text("");
            }else{
                parent.$("#baseChooseFlag").val(0);
            }

            $("#baseNameS").val(parent.$("#baseName").val());
        }
    });
}
//


function choosebomde(bomcode,bomname,c,d,e){

    // var craftVersion = $("#craftVersion").val();
    if($("#batchFlag").val() == 1 && $("#typeCode").val() == "KQ" &&
        (parent.$("#baseCode").val() == null || parent.$("#baseCode").val() == undefined || parent.$("#baseCode").val() == ""  )){//为批量编辑bom
        layer.msg("必须重新选择 生产基地 等信息。", {icon : 5, anim : 6, time : 3000});
        return;
    }else if($("#batchFlag").val() == 1 && $("#typeCode").val() != "KQ" &&
        parent.$("#baseCode").val() != null && parent.$("#baseCode").val() != undefined && parent.$("#baseCode").val() != ""  ){
        layer.msg("产品大类不为为烤漆时，不能选择生产基地信息。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    /*if($("#batchFlag").val() == 1 &&
            (parent.$("#companyCode").val() == null || parent.$("#companyCode").val() == undefined || parent.$("#companyCode").val() == "" )){//为批量编辑bom
        layer.msg("必须重新选择 组织名称 等信息。", {icon : 5, anim : 6, time : 3000});
        return;
    }*/
    console.log(bomcode);
    parent.$("#bomcode").val(bomcode);
    parent.$("#bomcode").text(bomcode);
    parent.$("#bomcode").html(bomcode);
    parent.$("#bomname").val(bomname);
    parent.$("#bomname").text(bomname);
    parent.$("#bomname").html(bomname);
    parent.$("#employeecode").val(null);
    parent.$("#employeeName").val(null);
    parent.$("#varvalid").val(null);
    parent.$("#varvalue").val(null);
    //批量BOM参数维护 自动填充
    parent.$("#batchTypeName").val(c);
    parent.$("#batchClassName").val(d);
    parent.$("#batchSeriesName").val(e);


    if($("#batchFlag").val() == 1 ){
        parent.$("#chooseFlag").val(1);
        parent.$("#chooseFlag").text(1);
        parent.$("#chooseFlag").html(1);
    }
    // parent.$("#craftVersionsValue").val(craftVersion);
    // parent.$("#craftVersionsValue").text(craftVersion);
    // parent.$("#craftVersionsValue").html(craftVersion);

    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}