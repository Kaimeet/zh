var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    laydate.render({
        elem: '#createStartTime' //创建时间
        ,type: 'month'
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
});
function DataInit() {
    var  year1;
    var  year2;
    var  year3;
    var  year4;
    var  year5;
    var  year6;
    var  month1;
    var  month2;
    var  month3;
    var  month4;
    var  month5;
    var  month6;

    let createStartTime = $('#createStartTime').val().trim();
    let createEndTime = $('#createEndTime').val();
    if(createStartTime!=null && createStartTime!="" && createStartTime!=undefined){
        var createStartTime11=createStartTime.split("-");
        var year=createStartTime11[0];
        var month;

        if(createStartTime11[1].indexOf("0") != -1)
        {
            if(createStartTime11[1]=="10"){
                month=createStartTime11[1];
            }
else {
            var month1=createStartTime11[1].split("");
             month =month1[1];}

        }
        else{
             month=createStartTime11[1];
        }

        if(month!=12||month!="12"){
            var nextMonthFirstDay = new Date([year,Number(month) + Number(1),1].join('-')).getTime();
            var oneDay = 1000 * 24 * 60 * 60;
            var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
        }
        else{
            var monthLast =30;
        }
        if(month==1){
            createStartTime =[year-1,12,1].join('-');
            createEndTime = [year,month,monthLast].join('-');
        }
        else {
            createStartTime =[year,month-1,1].join('-');
            createEndTime = [year,month,monthLast].join('-');
        }
    }


    else{
        var now = new Date();
        var month = now.getMonth()+1;//js获取到的是月份是 0-11 所以要加1 取前一个月，所以就不用加了
        var year = now.getFullYear();
        if(month!=11||month!="11"){
            var nextMonthFirstDay = new Date([year,month,1].join('-')).getTime();
            var oneDay = 1000 * 24 * 60 * 60;
            var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
        }
        else{
            var monthLast =30;
        }
if(month==1){
    createStartTime =[year-1,12,1].join('-');
    createEndTime = [year,month,monthLast].join('-');
}else {
        createStartTime =[year,month-1,1].join('-');
        createEndTime = [year,month,monthLast].join('-');
}
    }


    if(month>6){
year1=year;
month1=month-1;
        year2=year;
        month2=month-2;
        year3=year;
        month3=month-3;
        year4=year;
        month4=month-4;
        year5=year;
        month5=month-5;
        year6=year;
        month6=month-6;
    }
    else {
        if(month==1){
            year1=year-1;
            month1=12;
            year2=year-1;
            month2=11;
            year3=year-1;
            month3=10;
            year4=year-1;
            month4=9;
            year5=year-1;
            month5=8;
            year6=year-1;
            month6=7;
        }
        if(month==2){
            year1=year;
            month1=1;
            year2=year-1;
            month2=12;
            year3=year-1;
            month3=11;
            year4=year-1;
            month4=10;
            year5=year-1;
            month5=9;
            year6=year-1;
            month6=8;
        }
        if(month==3){
            year1=year;
            month1=2;
            year2=year;
            month2=1;
            year3=year-1;
            month3=12;
            year4=year-1;
            month4=11;
            year5=year-1;
            month5=10;
            year6=year-1;
            month6=9;
        }
        if(month==4){
            year1=year;
            month1=3;
            year2=year;
            month2=2;
            year3=year;
            month3=1;
            year4=year-1;
            month4=12;
            year5=year-1;
            month5=11;
            year6=year-1;
            month6=10;
        }
        if(month==5){
            year1=year;
            month1=4;
            year2=year;
            month2=3;
            year3=year;
            month3=2;
            year4=year;
            month4=1;
            year5=year-1;
            month5=12;
            year6=year-1;
            month6=11;
        }
        if(month==6){
            year1=year;
            month1=5;
            year2=year;
            month2=4;
            year3=year;
            month3=3;
            year4=year;
            month4=2;
            year5=year;
            month5=1;
            year6=year-1;
            month6=12;
        }
    }

    let inventoryCode = $('#inventoryCode').val();
    let material = $('#material').val();

    let materialSpecification = $('#materialSpecification').val();
    let organization = $('#organization').val();
    let updateBy = $('#updateBy').val();


    $("#bomListContaner").bootstrapTable('destroy');
    $('#bomListContaner').bootstrapTable({
        url:"../ProcessController/getMaterialPriceListTwo?inventoryCode="+inventoryCode
            +"&material="+material
            +"&createStartTime="+createStartTime
            +"&createEndTime="+createEndTime
            +"&materialSpecification="+materialSpecification
            +"&organization="+organization
            +"&updateBy="+updateBy,
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
        fixedColumns: true,//固定列
        fixedNumber:7,//固定前7列
        columns: [
            {
                field:"checkFlag",
                checkbox: true,
                width : '45px',
                visible: false
            },
            {
                field:"id",
                width : '45px',
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
                field:"inventoryCode",
                title:"编码",
                align:"center",
                valign:"middle",
                width : '220px',
                sort: true, fixed: true,
            },
            {
                field:"material",
                title:"名称",
                align:"center",
                valign:"middle",
                width : '400px',
                sort: true, fixed: true,
            },
            {
                field:"materialSpecification",
                title:"规格",
                align:"center",
                valign:"middle",
                width : '320px',
                sort: true, fixed: true,
            },
            {
                field:"materialUnit",
                title:"单位",
                align:"center",
                valign:"middle",
                width : '120px',
                sort: true, fixed: true,
            },
            {
                field:"organization",
                title:"组织名称",
                align:"center",
                valign:"middle",
                width : '120px',
                sort: true, fixed: true,
            },{
                field:"updateBy",
                title:"类型",
                align:"center",
                valign:"middle",
                width : '120px',
                sort: true, fixed: true,
            },
            {
                field:"onePrice",
                title:""+ year1+"-"+ month1+"",
                align:"center",
                valign:"middle",
                width : '150px',
            },
            {
                field:"twoPrice",
                title:""+ year2+"-"+ month2+"",
                align:"center",
                valign:"middle",
                width : '150px',
            },
            {
                field:"threePrice",
                title:""+ year3+"-"+ month3+"",
                align:"center",
                valign:"middle",
                width : '150px',
            },
            {
                field:"fourPrice",
                title:""+ year4+"-"+ month4+"",
                align:"center",
                valign:"middle",
                width : '150px',
            },
            {
                field:"fivePrice",
                title:""+ year5+"-"+ month5+"",
                align:"center",
                valign:"middle",
                width : '150px',
            },
            {
                field:"sixPrice",
                title:""+ year6+"-"+ month6+"",
                align:"center",
                valign:"middle",
                width : '150px',
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
    $('#inventoryCode').val('');
    $('#material').val('');
    $('#createStartTime').val('');
    $('#createEndTime').val('');
    $('#materialSpecification').val('');
    $('#organization').val('');
    $('#updateBy').val('');

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

