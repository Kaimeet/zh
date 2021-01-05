var form,flow,element,layer;

layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});

function DataInit() {
    let name = $('#name').val();
    let code = $('#code').val();
    let cpdl = '';//$('#cpdl').val();
    let colorName = $('#colorName').val();
    let colorCode = $('#colorCode').val();
    let spec = $('#spec').val();
    let unit = $('#unit').val();


    $("#bomListContaner").bootstrapTable('destroy');
    $('#bomListContaner').bootstrapTable({
        url:"../BomNewContoller/getPvcColorsLinks?name="+name
            +"&type="+cpdl
            +"&code="+code
            +"&colorName="+colorName
            +"&colorCode="+colorCode
            +"&spec="+spec
            +"&unit="+unit,
        method: 'get',
        dataType: "json",
        dataField: 'data',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
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
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            },
            {
                field:"colorsname",
                title:"颜色名称",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"colorscode",
                title:"颜色代码",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"name",
                title:"存货名称",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"code",
                title:"存货编码",
                align:"center",
                valign:"middle",
                sortable:"true"
            },
            {
                field:"spec",
                title:"规格",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"unit",
                title:"单位",
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
    $('#name').val('');
    $('#code').val('');
    $('#colorName').val('');
    $('#colorCode').val('');
    $('#spec').val();
    $('#unit').val();

    DataInit();
}

function doShow(value,row,index) {
    let id = row.id ;
    let name = row.name ;
    let code = row.code ;
    let unit = row.unit ;
    let colorsName = row.colorsname ;
    let colorsCode = row.colorscode ;
    let spec = row.spec ;
    let type = row.type ;
    let editFun =   'editPvcColorsLink(\'' +　id + '\',\''　+ name　+'\',\''+code+'\',\'' + unit+ '\',\''
        + colorsName+'\',\''+ colorsCode +'\',\'' + 　spec+ '\',\''+　type +'\')' ;
    return [
        '<div>' ,
            '<a onclick="',
                editFun ,
             '">编辑</a> <a onclick="delBom('+row.id+')">删除</a>',
        '</div>'
    ].join('')
}

function editPvcColorsLink(id,name ,code ,unit ,colorsName ,colorsCode ,spec ,type) {
    window.location.href = '../BomNewContoller/pvcColorsLinkMaintainAddModify?id='+id
    +"&name=" + name
        +"&code=" + code
        +"&unit=" + unit
        +"&colorsName=" + colorsName
        +"&colorsCode=" + colorsCode
        +"&spec=" + spec
        +"&type=" + type;
}

function delBom(id) {
    layer.confirm("是否删除？",{
        btn: ['确定', '取消']
    }, function () {
        // 按钮1的事件
        $.ajax({
            type : "POST",
            url : '../BomNewContoller/delPvcColorsLink',
            data : {
                'ID':id
            },
            dataType : "json",
            cache : false,
            success : function(result) {
                layer.close();
                if(result.resultCode == 0) {
                }
                window.location.href = '../BomNewContoller/pvcColorsMaintainList';
            }
        });

    }, function(){
        // 按钮2的事件
    });
}

function toAdd() {
    window.location.href = '../BomNewContoller/pvcColorsLinkMaintainAddModify';
}

/**
 * 添加Bom 1
 */
function addPVC(){
    toAdd();
}

