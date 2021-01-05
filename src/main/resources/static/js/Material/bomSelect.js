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
        ,type: 'month'
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
    let  yearS;
    let  monthS;
    let  yearE;
    let  monthE;

    let createStartTime = $('#createStartTime').val().trim();
    let createEndTime = $('#createEndTime').val().trim();
    if(createStartTime!=null && createStartTime!="" && createStartTime!=undefined){
        var createStartTime11=createStartTime.split("-");
         yearS=createStartTime11[0];

        if(createStartTime11[1].indexOf("0") != -1)
        {
            if(createStartTime11[1]=="10"){
                monthS=createStartTime11[1];
            }
else {
            var month1=createStartTime11[1].split("");
                monthS =month1[1];}

        }
        else{
            monthS=createStartTime11[1];
        }

        if(monthS!=12||monthS!="12"){
            var nextMonthFirstDay = new Date([yearS,Number(monthS) + Number(1),1].join('-')).getTime();
            var oneDay = 1000 * 24 * 60 * 60;
            var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
        }
        else{
            var monthLast =30;
        }
        if(monthS==1){
            createStartTime =[yearS-1,12,1].join('-');
        }
        else {
            createStartTime =[yearS,monthS-1,1].join('-');
        }
    }


    else{
        var now = new Date();
        monthS = now.getMonth()+1;//js获取到的是月份是 0-11 所以要加1 取前一个月，所以就不用加了
        yearS = now.getFullYear();
        if(monthS!=11||monthS!="11"){
            var nextMonthFirstDay = new Date([yearS,monthS,1].join('-')).getTime();
            var oneDay = 1000 * 24 * 60 * 60;
            var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
        }
        else{
            var monthLast =30;
        }
if(monthS==1){
    createStartTime =[yearS-1,12,1].join('-');
}else {
        createStartTime =[yearS,monthS-1,1].join('-');
}
    }

    if(createEndTime!=null && createEndTime!="" && createEndTime!=undefined){
        var createEndTime11=createEndTime.split("-");
        yearE=createEndTime11[0];

        if(createEndTime11[1].indexOf("0") != -1)
        {
            if(createEndTime11[1]=="10"){
                monthE=createEndTime11[1];
            }
            else {
                var month1=createEndTime11[1].split("");
                monthE =month1[1];}

        }
        else{
            monthE=createEndTime11[1];
        }

        if(monthE!=12||monthE!="12"){
            var nextMonthFirstDay = new Date([yearE,Number(monthE) + Number(1),1].join('-')).getTime();
            var oneDay = 1000 * 24 * 60 * 60;
            var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
        }
        else{
            var monthLast =30;
        }
        if(monthE==1){
            createEndTime = [yearE,monthE,monthLast].join('-');
        }
        else {
            createEndTime = [yearE,monthE,monthLast].join('-');
        }
    }
    else{
        var now = new Date();
        monthE = now.getMonth()+1;//js获取到的是月份是 0-11 所以要加1 取前一个月，所以就不用加了
        yearE = now.getFullYear();
        if(monthE!=11||monthE!="11"){
            var nextMonthFirstDay = new Date([yearE,monthE,1].join('-')).getTime();
            var oneDay = 1000 * 24 * 60 * 60;
            var monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
        }
        else{
            var monthLast =30;
        }
        if(monthE==1){
            createEndTime = [yearE,monthE,monthLast].join('-');
        }else {
            createEndTime = [yearE,monthE,monthLast].join('-');
        }
    }

   let chayi = yearE*12+monthE-(yearS*12+monthS)+1;


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
        fixedNumber:12,//固定前12列
        width: 1400,
        columns: ColumnsInit(yearS,monthS,chayi),
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

function ColumnsInit(year,month,count) {
    let  year1 = year;
    let month1 = month ;
    let res = [];

    // 第一行
    let titleRow =  [
        {
            field:"checkFlag",
            checkbox: true,
            colspan: 1,
            rowspan: 2,
            visible: false
        },
        {
            field:"id",
            colspan: 1,
            rowspan: 2,
            visible: false
        },
        {
            field:"rowIndex",
            title:"序号",
            width : '45px',
            valign:"middle",
            align : 'center',
            colspan: 1,
            rowspan: 2,
            formatter : function(value, row, index) {
                return index + 1;
            }
            , sort: true
            , fixed:'left'
        },
        {
            field:"updateBy",
            title:"状态",
            align:"center",
            valign:"middle",
            width : '80px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"inventoryCode",
            title:"编码",
            align:"center",
            valign:"middle",
            width : '160px',
            colspan: 1,
            rowspan: 2,
            sort: true,
            fixed: true,
        },
        {
            field:"material",
            title:"名称",
            align:"center",
            valign:"middle",
            width : '200px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"materialSpecification",
            title:"产品大类",
            align:"center",
            valign:"middle",
            width : '200px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"materialUnit",
            title:"产品类型",
            align:"center",
            valign:"middle",
            width : '120px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"organization",
            title:"系列",
            align:"center",
            valign:"middle",
            width : '120px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"updateBy",
            title:"生产基地",
            align:"center",
            valign:"middle",
            width : '80px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"updateBy",
            title:"长",
            align:"center",
            valign:"middle",
            width : '80px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"updateBy",
            title:"宽",
            align:"center",
            valign:"middle",
            width : '80px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        },
        {
            field:"updateBy",
            title:"厚",
            align:"center",
            valign:"middle",
            width : '80px',
            colspan: 1,
            rowspan: 2,
            sort: true,
            fixed: true,
        },
        {
            field:"updateBy",
            title:"颜色",
            align:"center",
            valign:"middle",
            width : '80px',
            colspan: 1,
            rowspan: 2,
            sort: true, fixed: true,
        }
    ];
    for(let i =0 ;i<count ;i++){
        titleRow.push({
            field:"",
            title:""+ year+"-"+ month+"",
            align:"center",
            width : '1200px',
            colspan: 9,
            rowsapn: 1,
            sort: true,
            fixed: true,
        });
    };
    res.push(titleRow) ;


    let  dataRows = [];
    dataRows.push();

    let fd= [];
    let dataCell = [
        {
            field:"updateBy",
            title:"直接材料",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },
        {
            field:"updateBy",
            title:"直接人工",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },{
            field:"updateBy",
            title:"制造费用",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },{
            field:"updateBy",
            title:"总成本",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },{
            field:"updateBy",
            title:"BOM差异",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },{
            field:"updateBy",
            title:"人工差异",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },{
            field:"updateBy",
            title:"制造费用差异",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },{
            field:"updateBy",
            title:"总成本差异",
            align:"center",
            valign:"middle",
            width : '120px',
            sort: true, fixed: true,
        },
        {
            field:"do",
            title:"BOM详情",
            align:"center",
            valign:"middle",
            sortable:"true",
            formatter:doShow
        }];

    for (let i = 0 ;i<count ;i++){
        fd = fd.concat(dataCell) ;
    }
    res.push(fd) ;
    return res;
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
             '">详情</a> ',
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

