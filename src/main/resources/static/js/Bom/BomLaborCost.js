var $window = $(window);
$window.resize(function() {
    resizeWindow();
});
var maxIds3 = 0;
var gxWidth = "750px";
var allCost = 0;
var partIDs = [] ;

// 储存 insert update  detail
var modifyL = [] ;
var inserL=[];
var delL =[];
var ifCanChange = false ;

var addLaborValue = 0 ;

var dataSource = null;

function setAddLaborValue(val) {
    addLaborValue = val;
}
function getAddLaborValue() {
    return  addLaborValue;
}

var ifModify = false;
function getIfModify() {
    return ifModify;
}

function setCanChange(flag) {
    ifCanChange = flag;
    if (ifCanChange){
       // document.getElementById("cc").style.display="";//显示
    }
    else
    {
        // console.log("$(\".btnDiv\").hide();")
        // console.log($(".btnDiv").length);
        // $(".btnDiv").hide();
        //$(".btnDiv").addClass("hidden") ;
        //document.getElementById("cc").style.display="none";//隐藏
    }
}

var laborChangeData = {};
function getChangeBackData() {
    return laborChangeData;
}

function getAllCost() {
    return allCost;
}

function DataInit(datas ,allFee ,ifFirstLoad) {
    dataSource = datas;
    if(ifFirstLoad === undefined)
    {
        ifFirstLoad = true;
    }
    allCost = allFee;
    //  人工成本 6
    //  制造成本 7
    $("#allCost").text("总计： " + allFee);

    if (ifFirstLoad){
        var count = 0;
        for (var item in datas.laborCostDetailsMap) {
            //console.log(item+":"+ datas.laborCostDetailsMap[item]+"\n") ;
            var contanerID = "table" + count;
            partIDs.push(contanerID);
            // 添加表格
            addCell(item, contanerID ,ifFirstLoad);
            //data
            var data1 = datas.laborCostDetailsMap[item];
            //console.data(data1);
            // 数据加载
            var dd = [];
            dd.push(data1);
            var arr = {datas: dd};
            showTable(contanerID, arr.datas[0]);
            count++;
        }
        if (!ifCanChange){
            $(".btnDiv").hide();
        }
    }
    else {

    }
}

function addCell(title , contanerID ,ifFirstLoad) {
    if (ifFirstLoad){

    }else
    {
        return ;
    }
        var functionStAdd = "addRow('" + contanerID  +"')" ;
        var functionStDel = "delRow('" + contanerID  +"')" ;
        //  style="display: none"
        $("#contaner").append(
            [
                '<div style="margin-top: 20px">',
                    '<p> <span style="font-weight: 700;font-size: 15px;">'+title+'</span></p>',
                        '<div style="margin-bottom: 0px" class="btnDiv">' ,
                            '<button class="btn btn-default"  type="button" name="toggle" aria-label="Toggle" title="新增" onclick="'+functionStAdd +'">',
                                '<i class="fa fa-plus"></i>' ,
                            '</button>' ,
                            '<button class="btn btn-default"  type="button" name="toggle" aria-label="Toggle" title="删除" onclick="'+functionStDel+'">',
                                '<i class="fa fa-minus"></i>' ,
                            '</button>' ,
                        '</div>' ,
                        '<table id="'+contanerID+'" class="col-lg-12 col-md-12 col-xs-12 col-sm-12 "></table>' ,
                '<div>'
            ].join('')
        );
    }

function showTable(contanerID,qwe) {
        $("#"+ contanerID).bootstrapTable('destroy');
        $("#"+ contanerID).bootstrapTable({
            //url:"../ProcessController/getDataDoors?type="+1+"&processCode="+$("#processCode").val(),
            method: 'get',
            dataType: "json",
            dataField: 'id',
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
            uniqueId:"id",
            sidePagination: "client", //服务端处理分页
            queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
            queryParams: queryParams3,//请求远程数据时，可以通过修改queryParams发送其他参数。
            columns: [
                {
                    field:"checkFlag",
                    checkbox: true,
                    visible: true
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
                    field:"workProcedure",
                    title:"工序",
                    width : gxWidth,
                    align:"center",
                    valign:"middle",
                    sortable:"true",
                    formatter : function(value, row, index) {
                        var id = row.id ;
                        return editInputInit(contanerID,"workProcedure" ,index , value ,id);
                        // return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'partName\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                    }
                },
                {
                    field:"laborCost",
                    title:"人工费用",
                    align:"center",
                    valign:"middle",
                    sortable:"true",
                    formatter : function(value, row, index) {
                        var id = row.id ;
                        return editInputInit(contanerID,"laborCost" ,index , value ,id);
                        // return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'partName\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                    }
                }
            ],
            onClickRow:function (row,$element) {
            },

            data:qwe
        });
}
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


function editInputInit(contanerID ,fileName ,index ,value ,id ) {
    if (ifCanChange){
        return '<input value="'+value+'" class="form-control parsley-validated" onblur="valueChange(\'' + fileName +  '\',\''+ contanerID +'\',' + index + ',\''+ value +'\','+ id + ',this)"  maxlength="11" style="background-color:#fff" />';
    }
    else
    {
        return '<input value="'+value+'" readonly class="form-control parsley-validated" onblur="valueChange(\'' + fileName + '\',\''+ contanerID +'\',' + index + ',\''+ value +'\','+ id + ',this)"  maxlength="11" style="background-color:#fff" />';
    }
}

/**
 *
 * @param fieldName
 * @param contanerID
 * @param indexNumber
 * @param oldValue
 * @param id
 * @param o
 */
function valueChange(fieldName,contanerID,indexNumber,oldValue,id,o) {
    var value = $(o).val()  //$("#"+fieldName+indexNumber).val();
    if (value == oldValue){
        return ;
    }
    else
    {
    }
    $("#"+contanerID).bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    if (fieldName == "laborCost"){
        recalculateAllcost();
    }
    if (id > 0)
    {
        modifyL.push(id);
    }
    else
    {
        // 新增 不计入修改
        //layer.msg(detailID + parseInt(detailID));
    }
}

function recalculateAllcost(){
    var s = 0.00;
    for (q = 0 ; q < partIDs.length ;q++)
    {
        var rows = $("#"+partIDs[q]).bootstrapTable('getData')
        for (i = 0 ; i < rows.length; i++) {
            s = accAdd(s ,rows[i].laborCost);
        }
    }
    console.log(addLaborValue);
    // 加额外人工
    s = accAdd(s ,addLaborValue);
    s = fomatFloat(s ,2);
    allCost = s ;
    $("#allCost").text("总计： "+ allCost);
    return s;
}


/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

// num为传入的值，n为保留的小数位
function fomatFloat(num,n){
    var f = parseFloat(num);
    if(isNaN(f)){
        return false;
    }
    f = Math.round(num*Math.pow(10, n))/Math.pow(10, n); // n 幂
    var s = f.toString();
    var rs = s.indexOf('.');
    //判定如果是整数，增加小数点再补0
    if(rs < 0){
        rs = s.length;
        s += '.';
    }
    while(s.length <= rs + n){
        s += '0';
    }
    return s;
}

//重新计算页面尺寸
function resizeWindow(){

}

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    laydate.render({
            elem: '#replyDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){
                var nowDate = new Date();
                if(  new Date(value).getTime() < nowDate.getTime()){
                    layer.msg("回复时间不能小于当前时间。", {icon:5, anim:6, time: 3000});
                }
            }
        });
});

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
function addRow(tableID) {
        var id = "#"+tableID;
        var allData  = $(id).bootstrapTable('getData')
        maxIds3--;
        var componetName = allData[0].componet;
        var count = allData.length;;
        $(id).bootstrapTable('insertRow', {
            index: count,
            row: {
                id:maxIds3,
                componet:componetName,
                workProcedure: "",
                laborCost: 0.00,
            }
        });
        inserL.push(maxIds3);
}


//列表删除操作
function delRow(tableID) {
    var id = "#"+tableID;
    var rows = $(id).bootstrapTable('getSelections');
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        layer.msg("请先选择要删除的记录!", {icon: 5, anim: 6, time: 3000});
        return;
    } else {
        $(rows).each(function () {// 通过获得别选中的来进行遍历
            $(id).bootstrapTable('remove', {field: 'id', values: "'" + this.id + "'"});
            if (this.id > 0) {
                delL.push(this.id);
            }
        });
        // 重新计算总额
        recalculateAllcost();
    }

}

/**
 * 保存数据
 * @constructor
 */
function SaveChange(codeForModel) {
    // 判断是否有变更
    if (inserL.length >0 || delL.length>0||modifyL.length>0){
        //提醒是否确定保存
        layer.confirm('确定保存吗?', {icon: 3, title:'提示'}, function(index){
            // 调用接口保存数据
            save(codeForModel);
            layer.close(index);
        });
    }else
    {
        layer.msg("没有变更", {icon: 2, anim: 6, time: 3000});
    }
}

//提交
function save(codeForModel) {
    var index = layer.load(1, {shade: [0.5, '#fff']}); // 0.5透明度的白色背景
    // 获取新增
    var add = getDataByDetailIDs(inserL);
    var modify = getDataByDetailIDs(modifyL);
    console.log(add) ;
    console.log(modify) ;
    var program = {
        addDatas : add,
        changeDatas : modify,
        delIDs : delL ,
        allCost : allCost ,
        codeForModel : codeForModel
    };

    var request = "../BomNewContoller/UpdateBomLaborCost";
    //var request = "../BomContoller/UpdateBomLaborCost";
    ajax = $.ajax({
        type: "POST",
        url: request,
        data:JSON.stringify(program),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        traditional: true,//防止深度序列化
        async:false,
        success: function (result) {
            layer.close(index);
            if (result.success == "true") {
                //更新成功  重新 加载
                laborChangeData = result.data ;
                //
                allCost = laborChangeData.laborCostResult.allLaborCost;
                //
                layer.msg(result.msg, {icon: 1, anim: 6, time: 3000});
                // 清空变更 集合
                modifyL = [] ;
                inserL= [];
                delL= [];
                //重新加载;
                DataInit(laborChangeData.laborCostResult ,allCost ,false);
                ifModify = true;
            }
            else {
                layer.msg("修改错误 "+ result.msg, {icon: 2, anim: 6, time: 3000});
            }
        }
    });
}

/**
 * 获取传入ID 数据
 * @param IDs
 * @returns {[]}
 */
function getDataByDetailIDs(IDs) {
    var res = [];
    IDs = uniq(IDs);
    for (i=0 ;i<IDs.length ;i++ )
    {
        for (q=0;q<partIDs.length;q++){
            var addDataCell = $("#"+partIDs[q]).bootstrapTable('getRowByUniqueId',IDs[i])
            if (addDataCell == null){
                continue;
            }
            else {
                res.push(addDataCell);
                break;
            }
        }
    }
    return res;
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


// 最简单数组去重法
/*
* 新建一新数组，遍历传入数组，值不在新数组就push进该新数组中
* IE8以下不支持数组的indexOf方法
* */
function uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}