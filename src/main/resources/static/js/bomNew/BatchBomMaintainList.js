var form,flow,element,layer;

layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});

function DataInit() {
    let modelName = $('#modelName').val();
    let modelCode = $('#modelCode').val();
    let cpdl = $('#cpdl').val();
    let cplx = $('#cplx').val();
    let xl = $('#xl').val();
    let status = $('#status').val();

    $("#bomListContaner").bootstrapTable('destroy');
    $('#bomListContaner').bootstrapTable({
        url:"../BomBatchController/getBomBatchParam?name="+modelName
            +"&type="+cpdl
            +"&code="+modelCode
            +"&bomClass="+cplx
            +"&series="+xl,
        method: 'get',
        dataType: "json",
        dataField: 'data',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "/",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "false",//是否显示 切换试图（table/card）按钮
        showColumns: "false",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,//每页的记录行数（*）
        pageList: [ 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: false,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: false,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams3,//请求远程数据时，可以通过修改queryParams发送其他参数。
        columns: [
            {
                field:"checkFlag",
                checkbox: true,
                visible: false
            },
            {
                field:"id",
                visible: false
            },
            {
                field:"productionBase",
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
                field:"bomCode",
                title:"BOM编码",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"bomName",
                title:"BOM名称",
                align:"center",
                valign:"middle",
                sortable:"true"
            },

            {
                field:"typeName",
                title:"产品大类",
                align:"center",
                valign:"middle",
                sortable:"true"
            },
            {
                field:"bomClassName",
                title:"产品类型",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"seriesName",
                title:"系列",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"productionBaseName",
                title:"生产基地",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"length",
                title:"长(mm)",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"width",
                title:"宽(mm)",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"thickness",
                title:"厚(mm)",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"wallThickness",
                title:"墙体厚度(mm)",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"socketLength",
                title:"插口长度(mm)",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"colorName",
                title:"颜色",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"do",
                title:"操作",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter:doShow
            }
        ],
        onClickRow:function (row,$element) {
        },
    });

    //服务端分页调用方法
    function queryParams3(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
    }
}

function reset() {
    $('#modelName').val('');
    $('#modelCode').val('');
    $('#cpdl').val('');
    $('#cplx').val('');
    $('#xl').val('');
    $('#status').val('0');
    DataInit();
}

function doShow(value,row,index) {
    let id = row.id;
    let bomCode = row.bomCode;
    let bomName = row.bomName;
    let typeName = row.typeName;
    let bomClassName = row.bomClassName;
    let seriesName = row.seriesName;
    let productionBase = row.productionBase;
    let productionBaseName = row.productionBaseName;
    let length = row.length;
    let width = row.width;
    let thickness = row.thickness
    let wallThickness = row.wallThickness;
    let socketLength = row.socketLength;
    let colorName = row.colorName;
    let btnShow = '';
    if (row.activeFlag === 1){
        btnShow = "生效";
    }
    if (row.activeFlag === 0){
        btnShow = "失效";
    }
    let editFun =   'editBom(\'' +　id + '\',\''　+ bomCode　+'\',\''+bomName+'\',\'' + typeName+ '\',\''
        + bomClassName+'\',\''+ seriesName +'\',\'' + 　productionBase+ '\',\''+　productionBaseName +'\',\''
        +　length+'\',\'' +　width + '\',\'' +　thickness + '\',\'' +　wallThickness + '\',\''
        + socketLength　+ '\',\'' + colorName+'\')' ;

    return [
        '<div>' ,
        '<a onclick="',
        editFun ,
        '">编辑</a> <a onclick="delBom('+row.id+',\''+btnShow+'\')">'+btnShow+'</a>',
        '</div>'
    ].join('')
}

function editBom(id, bomCode, bomName, typeName, bomClassName, seriesName, productionBase, productionBaseName, length,
                 width, thickness, wallThickness, socketLength, colorName) {
    window.location.href = '../BomBatchController/batchBomMaintainAdd?id='+id
        +"&bomCode=" + bomCode
        +"&bomName=" + bomName
        +"&typeName=" + typeName
        +"&bomClassName=" + bomClassName
        +"&seriesName=" + seriesName
        +"&productionBase=" + productionBase
        +"&productionBaseName=" + productionBaseName
        +"&length=" + length
        +"&width=" + width
        +"&thickness=" + thickness
        +"&wallThickness=" + wallThickness
        +"&socketLength=" + socketLength
        +"&colorName=" + colorName;
}

function delBom(id ,btnShow) {
    layer.confirm("是否使该条记录"+btnShow+"？",{
        btn: ['确定', '取消']
    }, function () {
        // 按钮1的事件
        $.ajax({
            type : "POST",
            url : '../BomBatchController/activeBom',
            data : {
                'bomId':id
            },
            dataType : "json",
            cache : false,
            success : function(result) {
                layer.close();
                if(result.resultCode == 0) {
                }
                window.location.href = '../BomBatchController/batchBomMaintainList';
            }
        });

    }, function(){
        // 按钮2的事件
    });
}

function toAdd() {
    window.location.href = '../BomBatchController/batchBomMaintainAdd';
}

/**
 * 新增
 */
function addBom(){
    toAdd();
}

