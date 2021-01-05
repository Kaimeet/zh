var $window = $(window);
$window.resize(function() {
    //resizeWindow();
});
var maxIds3 = 0;
function DataInit(datas,allFee) {
    // $("#allCost").text("总计： "+ allFee);

    //  人工成本 6
    //  制造成本 7
    var rgcbCellIndex = 6 ;
    var zzcbCellIndex = 7 ;
    $('#reportTable3').bootstrapTable({
        //url:"../ProcessController/getDataDoors?type="+1+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: false, //设置为 true 会在表格底部显示分页条。
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
                field:"fixedProductFees",
                title:"固定制造费用",
                align:"center",
            },
            {
                field:"eleFees",
                title:"电费",
                align:"center",
            },
            {
                field:"memo1",
                title:"电费%",
                align:"center",
            },
            {
                field:"changeProductFees",
                title:"变动用制造费用",
                align:"center",
            },

            {
                field:"produceCost",
                title:"制造费用合计",
                align:"center",
            },
            {
                field:"memo2",
                title:"制造费用合计%",
                align:"center",
            }
        ],
        onClickRow:function (row,$element) {
            console.log($element);
            // var jsonStr = JSON.stringify(row);
            var clickCellIndex =  $element.context.cellIndex;
            if (clickCellIndex === rgcbCellIndex)
            {
               // console.log($element);
                // 弹出供应商页面
            }else if(clickCellIndex === zzcbCellIndex )
            {
                //console.log($element.context.cellIndex);
                // 弹出物料选择页面
            }
        },
        // data:[
        //     {"id":1 ,"orderNO":"12456","modelID":"1","material_normalloss":"12","material_abnormalloss":"13","labor_cost":"13","manufacturing_cost":"26",
        //     "total_cost_notax":"12","total_cost_tax":"45"}
        // ],
        data:[datas]
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


function DataShow(type,detailIDs ) {
    //  人工成本 6
    //  制造成本 7
    if (type=='init'){

    }
    else if (type=='check')
    {

    }
    else
    {
        return;
    }

    var obj =  {"pargrams":
            [
                {
                    "modelCode":"001",
                    "modelType":"DOOR_LEAF",
                    "param": {
                        "height":2100,
                        "width":800,
                        "doorLeafThickness":40,
                        "pvcColor":"深柚木1846-37（16S*1.25M）",
                        "panelThickness":6,
                        "type":"条玻门",
                        "variableCodeOfType":"V001",
                        "glassType":"钢化玉砂玻璃",
                        "fillMode":"空心刨花板",
                        "needInner":true,
                        "innerMaterial":"LVL",
                        "needHingeWood":true,
                        "needShutter":true,
                        "needMiddleLayer":false,
                        "needHorizontalAluBar":false,
                        "needKaraAluBar":false,
                        "processVersion":"工程版本",
                        "productionBaseCode":"01"
                    }
                }
            ]
    };

    $.ajax({
        url : '../BomContoller/InitBomViews',
        type: "POST",
        datatype:"json",
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify(obj),
        success : function(data, stats) {
            DataInit([data.data[0].manufacturingCostDetail] , data.data[0].manufacturingCost);
            //dataAll = data.data;
        },
        error : function(data) {
            alert("请求失败");
        },
    })
}


//onput事件触发update,单元格数据重新渲染
function changeReason(fieldName,indexNumber,flag){
    var value = $("#"+fieldName+indexNumber).val();
    if(flag==1){
        $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==2){
        $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==3){
       $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }
}


//列表新增一行数据
function addRow(tabFlag) {
        var count = $('#reportTable3').bootstrapTable('getData').length;
        $('#reportTable3').bootstrapTable('insertRow', {
            index: count,
            row: {
                bomSeries: "",
                bomStyle: "",
                bomColor: "",
                bomLong: "",
                bomWidth: "",
                bomThick: "",
                needGlassFlag: "",
                unit: "",
                memo: "",
                id: maxIds3 - 1,
                setOfBooks: "",
                productionBase: "",
                paint: ""
            }
        });
        maxIds3--;
    }
    var delArraysXT = new Array();// 声明一个数组，存放要删除的线条
    //列表删除操作
    function delRow(tabFlag) {
        var rows = $("#reportTable3").bootstrapTable('getSelections');
        if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
            layer.msg("请先选择要删除的记录!", {icon: 5, anim: 6, time: 3000});
            return;
        } else {
            $(rows).each(function () {// 通过获得别选中的来进行遍历
                $("#reportTable3").bootstrapTable('remove', {field: 'id', values: "'" + this.id + "'"});
                if (this.id > 0) {
                    delArraysXT.push();
                }
            });
        }
    }



//提交
function save() {
    var data = {doorLeafList: [], doorCoverList: [], doorLineList: []};
    var infoMS = $("#reportTable1").bootstrapTable('getData');
    var infoMT = $("#reportTable2").bootstrapTable('getData');
    var infoXT = $("#reportTable3").bootstrapTable('getData');
    if (infoMS == null || infoMS == "" || infoMS == undefined ||
        infoMS == null || infoMS == "" || infoMS == undefined ||
        infoMS == null || infoMS == "" || infoMS == undefined) {
        layer.msg("门扇、门套、线条等三个明细表，至少需要有一条明细数据。", {icon: 5, anim: 6, time: 3000});
    }
    getObjects(infoMS, 1, data)
    getObjects(infoMT, 2, data)
    getObjects(infoXT, 3, data)
    console.log("date = {}", data);

    var jsonMiddel = JSON.stringify(data);
    var formData = new FormData();
    formData.append("jsonMiddel", jsonMiddel);//保存发布标志位
    formData.append("projectName", "范舜的测试报价单");//保存发布标志位
    submitMsg(formData);
}


    function getObjects(info, flag, data) {
        for (var i = 0; i < info.length; i++) {
            var timeSet = new Object();
            timeSet.id = info[i].id;
            timeSet.typeCode = info[i].bomTypeOnes;
            timeSet.modelName = info[i].modelName;
            timeSet.modelCode = info[i].modelCode;
            timeSet.companyName = info[i].companyName;
            timeSet.companyCode = info[i].companyCode;
            timeSet.baseName = info[i].baseName;
            timeSet.baseCode = info[i].baseCode;
            timeSet.bomStyle = info[i].bomStyle;
            timeSet.color = info[i].bomColor;
            timeSet.paint = info[i].paint;
            timeSet.quoteLong = info[i].bomLong;
            timeSet.quoteWidth = info[i].bomWidth;
            timeSet.quoteThick = info[i].bomThick;
            timeSet.needGlass = info[i].needGlassFlag;
            timeSet.unit = info[i].unit;
            timeSet.memo = info[i].memo;
            timeSet.needDrawFlag = info[i].needDrawFlag;
            if (flag == 1) {
                data.doorLeafList.push(timeSet);
            } else if (flag == 2) {
                data.doorLeafList.push(timeSet);
            } else if (flag == 3) {
                data.doorLeafList.push(timeSet);
            }
        }
    }

    var ajax;

    function submitMsg(formData) {
        var index = layer.load(1, {shade: [0.5, '#fff']}); // 0.5透明度的白色背景
        var request = "../ProcessController/saveDataDoors";
        ajax = $.ajax({
            type: "POST",
            url: encodeURI(request),
            data: formData,
            dataType: "json",
            cache: false,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            traditional: true,//防止深度序列化
            success: function (result) {
                layer.close(index);
                if (result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon: 5, anim: 6, time: 3000});
                } else {
//                    layer.msg(result.resultMassage, {icon: 6, anim: 5, time: 3000}, function () {
                        post("../UserController/roleAssignments", {id: result.id})
//                    });
                }
            }
        });
}