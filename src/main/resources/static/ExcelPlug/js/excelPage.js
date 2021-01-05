var $window = $(window);

$window.resize(function() {
    resizewindow();
});
//重新计算页面尺寸
function resizewindow(){
    var wh = $(window).height();
    $("#ss").height(wh-100);
    if(spread!=undefined && spread!=null && spread.getSheetFromName("BOM模板")!=null){
        addShade();
    }
}

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
var row ;//鼠标选中区域的行号 【行索引】
var rowCount ;//鼠标选中区域的列数 【行数】
var col ;//鼠标选中区域的列号  【列索引】
var colCount ;//鼠标选中区域的列数 【列数】
//加载葡萄城excel表格插件
var spread;
var timeOnce = 0;
$(function() {

    resizewindow();
    spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"), {sheetCount: 2});

    //禁止插入列、删除列
    spread.contextMenu.menuData.forEach(function (item, index) {
        if (item && (item.text === "Insert" || item.text === "Delete") && item.workArea === "colHeader") {
            spread.contextMenu.menuData.splice(index, 1);
        }
    });
    //设置中文
    GC.Spread.Common.CultureManager.culture("zh-cn");//本地化设置语言为中文
    //初始化插件
    initSpread(spread);
    var bomContent = $("#bomContent").val();
    if(bomContent!=undefined && bomContent!=null && bomContent!="" ){
        load(spread,bomContent);
    }
    //事件绑定初始化
    if(spread.getSheetFromName("BOM模板")!=null){
        var sheetForEdit = spread.getSheetFromName("BOM模板");
        //材料加个列显示*
        var count1 = sheetForEdit.getRowCount();
        if($("#shadeFlag").val()!= undefined && $("#shadeFlag").val()!=null && $("#shadeFlag").val()!="" && $("#shadeFlag").val()==1) {
            customEvent();
            for (var i = 20; i < count1; i++) {
                sheetForEdit.setFormatter(i, 5, "**");
            }
        }else{
            for (var i = 20; i < count1; i++) {
                sheetForEdit.setFormatter(i, 5, "");
            }
        }
        //结束编辑离开事件
        sheetForEdit.bind(GC.Spread.Sheets.Events.ValueChanged, function (sender, args) {
            if(args.newValue!=null && args.newValue!="" && args.col == 1){
                updateCell(args.newValue+";",sheetForEdit,args.row+";")
            }else if(args.col == 1){
                sheetForEdit.setValue(args.row,2,null);
                sheetForEdit.setValue(args.row,3,null);
                sheetForEdit.setValue(args.row,4,null);
                sheetForEdit.setValue(args.row,5,null);
            }
        });
        //结束编辑离开事件
        sheetForEdit.bind(GC.Spread.Sheets.Events.RangeChanged, function (sender, args) {
            // console.log(args.changedCells);
            var materialsCode ="";
            var materialsRows ="";
            var changedCells = args.changedCells;
            var onecol = 0;
            for (var i = 0 ;i < changedCells.length;i++){
                if(changedCells[i].col==1 && changedCells[i].row >19 ){
                    onecol = 1;
                    materialsCode +=sheetForEdit.getValue(changedCells[i].row,changedCells[i].col)+";";
                    materialsRows +=changedCells[i].row+";";
                }
            }
            if(onecol==1){
                updateCell(materialsCode,sheetForEdit,materialsRows);
            }

        });
        timeOnce = 1;
    }

    //定时任务 绑定事件
    var intervalTask = window.setInterval(function() {
        //离开编辑模式触发的事件
        if(spread.getSheetFromName("BOM模板")!=null ){
            var sheetForEdit = spread.getSheetFromName("BOM模板");
            //材料加个列显示*
            var count1 = sheetForEdit.getRowCount();
            if($("#shadeFlag").val()!= undefined && $("#shadeFlag").val()!=null && $("#shadeFlag").val()!="" && $("#shadeFlag").val()==1) {
                customEvent();
                for (var i = 20; i < count1; i++) {
                    sheetForEdit.setFormatter(i, 5, "**");
                }
            }else{
                for (var i = 20; i < count1; i++) {
                    sheetForEdit.setFormatter(i, 5, "");
                }
            }
            //结束编辑离开事件
            sheetForEdit.bind(GC.Spread.Sheets.Events.ValueChanged, function (sender, args) {
                if(args.newValue!=null && args.newValue!="" && args.col == 1){
                    updateCell(args.newValue+";",sheetForEdit,args.row+";")
                }
            });

            //结束编辑离开事件
            sheetForEdit.bind(GC.Spread.Sheets.Events.RangeChanged, function (sender, args) {
                // console.log(args.changedCells);
                var materialsCode ="";
                var materialsRows ="";
                var changedCells = args.changedCells;
                var onecol = 0;
                for (var i = 0 ;i < changedCells.length;i++){
                    if(changedCells[i].col==1 && changedCells[i].row >19 ){
                        onecol = 1;
                        materialsCode +=sheetForEdit.getValue(changedCells[i].row,changedCells[i].col)+";";
                        materialsRows +=changedCells[i].row+";";
                    }
                }
                if(onecol==1){
                    updateCell(materialsCode,sheetForEdit,materialsRows);
                }

            });
            timeOnce = 1;
        }
        // updateMaterialPrice();
    },5000);
    if(timeOnce==1){
        clearInterval(intervalTask );//停止
    }

    //没有材料价格查看权限的人，隐藏材料单价
    if($("#shadeFlag").val()!= undefined && $("#shadeFlag").val()!=null && $("#shadeFlag").val()!="" && $("#shadeFlag").val()==1){
        //材料单价加遮罩
        if(spread.getSheetFromName("BOM模板")!=null){
            addShade();
        }
        //定时任务材料单价加遮罩
        var intervalTask2 = window.setInterval(function() {
            // 离开编辑模式触发的事件
            if(spread.getSheetFromName("BOM模板")!=null){
                addShade();
            }
        },100);
    }


    //当表单上的单元格选择发生更改时发生 取新的选择区域
    spread.bind(GC.Spread.Sheets.Events.SelectionChanged, function (e, info) {
        info.newSelections.forEach(function(values){
            row = values.row;
            rowCount = values.rowCount;
            col = values.col;
            colCount = values.colCount;
        });
    });

    //拷贝事件加遮罩
    document.addEventListener("copy",function () {
        if(row!=null && row!=undefined && row!=""){
            if (event.clipboardData || event.originalEvent) {
                if(col==-1){
                    col = 0;
                }
                if(row==-1){
                    row = 0;
                }
                var sheetValues = spread.getSheetFromName("BOM模板").getArray(row,col,rowCount,colCount,false);
                var sheetFormula = spread.getSheetFromName("BOM模板").getArray(row,col,rowCount,colCount,true);
                var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
                /*const selection = "BOM编码\t=总表!B2\n" +
                    "2100\t门扇宽";*/
                var value= "";
                var formula = "";
                var selection = "";
                // console.log("rowCount = "+rowCount);
                // console.log("colCount = "+colCount);
                for (var m = 0; m < rowCount ; m ++){
                    for (var n = 0; n < colCount ; n ++){
                        value = sheetValues[m][n];
                        formula = sheetFormula[m][n];
                        console.log(selection);
                        //没有材料价格查看权限的人，隐藏材料单价
                        if($("#shadeFlag").val()!= undefined && $("#shadeFlag").val()!=null && $("#shadeFlag").val()!="" && $("#shadeFlag").val()==1 && n==5){
                            value = "";
                        }
                        if(n == colCount-1){
                            selection += value+"\n";
                        }else{
                            if(formula==null || formula == undefined || formula=="null" || formula == ""){
                                if(value==null || value == undefined || value=="null" || value == ""){
                                    selection += "\t";
                                }else{
                                    selection += value+"\t";
                                }
                            }else{
                                selection += "="+formula+"\t";
                            }
                        }
                    }

                }

                const content = clipboardData.getData('text/plain');
                clipboardData.setData('text/plain', selection);
                event.preventDefault();
            }
        }
    });

    //生成公式编辑区域代码
    var excelIo = new GC.Spread.Excel.IO();
    document.getElementById('loadExcel').onclick = function () {
        var excelFile = document.getElementById("fileDemo").files[0];
        var password = $('#password').val();
        // here is excel IO API
        excelIo.open(excelFile, function (json) {
            var workbookObj = json;
            spread.fromJSON(workbookObj);
        }, function (e) {
            // process error
            alert(e.errorMessage);
            if (e.errorCode === 2/*noPassword*/ || e.errorCode === 3 /*invalidPassword*/) {
                document.getElementById('password').onselect = null;
            }
        }, {password: password});
    };

    var  fileDemo = $("#fileDemo");
    fileDemo.on('change', function (e) {
        //当前选择上传的文件
        var curFile4 = this.files;
        //将FileList对象变成数组
        for (var i = 0, len = curFile4.length; i < len; i++) {
            $("#fileName").text(curFile4[i].name);
        }
        $('#loadExcel').click();
    });

    //Ctrl+V 事件监听
    // $(document).keyup(function(e) {
    //     if(e.ctrlKey && e.keyCode == 86){
    //         updateMaterialPrice();
    //     }
    // });


});

function addShade(){
    var sheetForShade = spread.getSheetFromName("BOM模板");

    //获取遮罩块的横向偏移量
    var left = 0;
    var width = 0;
    var top = 0;
    var height = 0;
    var aimColumnIndex = 5;
    //获取材料价格列
    for(var m=0;m <sheetForShade.getColumnCount() ;m++ ){
        if(sheetForShade.getValue(19,m)!=undefined && sheetForShade.getValue(19,m)!=null && sheetForShade.getValue(19,m).indexOf("材料单价")!=-1){
            aimColumnIndex = m;
        }
    }
    /*var count1 = sheetForShade.getRowCount();
    for(var i = 20 ; i < count1 ; i++){
        sheetForShade.setFormatter(i,aimColumnIndex,"**");
    }*/
    //获取显示的首行记录
    var cellRectFirst = sheetForShade.getCellRect(20,aimColumnIndex);
    if(cellRectFirst.y==undefined){
        for (var index = 21 ; index <sheetForShade.getRowCount();index++){
            cellRectFirst = sheetForShade.getCellRect(index,aimColumnIndex);
            if(cellRectFirst.y!=undefined){
                top = cellRectFirst.y;
                left = cellRectFirst.x;
                width = cellRectFirst.width;
                height = "2048px";
                break;
            }
        }
    }else{
        top = cellRectFirst.y;
        left = cellRectFirst.x;
        width = cellRectFirst.width;
        height = "2048px";
    }
    $(".shade").remove();
    //js自动创建遮罩
    var parentdiv=$("#ss");
    var childdiv=$('<div></div>');
    childdiv.addClass("shade");
    childdiv.css({ "position": "absolute", "top": top,"left":left,"width": width,"height":height});
    childdiv.appendTo(parentdiv);
}


//格式化Date日期时间数据
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

var ajax;
function updateCell(inventoryCode,sheetForEdit,row) {
    //停止jq中的ajax请求
    if (ajax != null) {
        ajax.abort();
    }
    console.log("单元格物料信息变更开始时间: " + timeStamp2String(new Date().getTime()));
    var json = {};
    var rowArray =new Array();
    var inventoryCodeArray =new Array();

    if(inventoryCode==null || inventoryCode=="" || inventoryCode==undefined){
	        rowArray.forEach(function(){
	            sheetForEdit.setValue(row,2,null);
	            sheetForEdit.setValue(row,3,null);
	            sheetForEdit.setValue(row,4,null);
	            sheetForEdit.setValue(row,5,null);
	        });
        return;
    }else{
        rowArray = row.split(";");
        inventoryCodeArray = inventoryCode.split(";");
    }
    //去掉所有的换行符
    inventoryCode = inventoryCode.toString();
    json.inventoryCode = inventoryCode.trim().replace("'","").replace('\n','');
    json.type = $("#type").val();
    //通过modelCode到杠杆BOM表搜索数据
    var request = "../ExcelPlugController/getInventoryForUpdate";/*saveDataDoors*/

    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success : function(result) {
            if(result.inventoryCodes!=null && result.inventoryCodes!="" &&  result.inventoryCodes!=undefined){
                var inventoryCodesArrays = result.inventoryCodes.split(";");
                var inventoryNames = result.inventoryName.split(";");
                var inventorySpecifications = result.inventorySpecifications.split(";");
                var mainUnit = result.mainUnit.split(";");
                var price = result.price.split(";");
                for (var i =0 ;i<=inventoryCodeArray.length;i++){
                    for (var j =0 ;j<inventoryCodesArrays.length;j++){
                        if(inventoryCodeArray[i]!=null && inventoryCodeArray[i]!="" && inventoryCodesArrays[j]!=null && inventoryCodesArrays[j]!="" &&  inventoryCodeArray[i]==inventoryCodesArrays[j]){
                            sheetForEdit.setValue(rowArray[i],2,inventoryNames[j]);
                            sheetForEdit.setValue(rowArray[i],3,inventorySpecifications[j]);
                            sheetForEdit.setValue(rowArray[i],4,mainUnit[j]);
                            sheetForEdit.setValue(rowArray[i],5,price[j]);
                            if($("#shadeFlag").val()!= undefined && $("#shadeFlag").val()!=null && $("#shadeFlag").val()!="" && $("#shadeFlag").val()==1 ){
                                sheetForEdit.setFormatter(rowArray[i],5,"**");
                            }
                        }
                    }
                }
            }else{
                for (var i =0 ;i<=rowArray.length;i++){
                    sheetForEdit.setValue(rowArray[i],2,null);
                    sheetForEdit.setValue(rowArray[i],3,null);
                    sheetForEdit.setValue(rowArray[i],4,null);
                    sheetForEdit.setValue(rowArray[i],5,null);
                }
            }
        }
    });
    console.log("单元格物料信息变更结束时间: " + timeStamp2String(new Date().getTime()));
}






//初始化excel插件
function initSpread(spread) {
    var spreadNS = GC.Spread.Sheets;
    var fbx = new spreadNS.FormulaTextBox.FormulaTextBox(document.getElementById('formulaBar'));
    fbx.workbook(spread);
    spread.suspendPaint();
    var sheet1 = spread.sheets[0];
    sheet1.setColumnCount(52);
    spread.resumePaint();
};
//加载后台数据
function load(spread,bomContent) {
    spread.suspendPaint();
    spread.fromJSON(JSON.parse(bomContent));
    // spread.getSheetFromName("BOM模板").getCell(1,1).options.protectionOptions = option;
    // spread.getSheetFromName("BOM模板").options.isProtected = true;
    spread.resumePaint();
}
function save(){

    //先更新物料信息
    // updateMaterialPrice();
    //获取有几个sheet
    var formData = new FormData();
    var data = JSON.stringify(spread.toJSON());
    formData.append("excelDate",data);
    formData.append("codeForModels",$("#codeForModels").val());
    formData.append("bomStyles",$("#bomStyles").val());
    formData.append("templateCode",$("#templateCode").val());
    formData.append("templateName",$("#templateName").val());
    formData.append("bomClasss",$("#bomClasss").val());
    formData.append("type",$("#type").val());
    formData.append("baseCode",$("#baseCode").val());

    formData.append("series",$("#series").val());
    formData.append("unit",$("#unit").val());
    formData.append("memo",$("#memo").val());
    formData.append("updateDes",$("#updateDes").val());

    var materialsCodeArrays = new Array();
    //获取所有的物料编码
    var sheet2 = spread.getSheetFromName("BOM模板");
    var sheetvalues = sheet2.getArray(20,1,sheet2.getRowCount(),1,false);
    var returnflag = 0;
    var errormassgae = "";
    if(sheetvalues!=null && sheetvalues.length>0 ){
        var rowIndex = 20;
        $.each(sheetvalues, function(i){
            $.each(this, function(j){
                console.log("sheet2.getValue("+rowIndex+",5) = " + sheet2.getValue(rowIndex,5) +";"+ "this.val() = "+ this );
                if((this!="[object Window]" || this!=null)
                    && (sheet2.getValue(rowIndex,5) == null || sheet2.getValue(rowIndex,5) == "[object Window]" || sheet2.getValue(rowIndex,5) == "" || sheet2.getValue(rowIndex,5) == "0")){
                    errormassgae += "第"+(rowIndex+1)+"行数据需要没有物料价格，请维护号对应的物料价格\n";
                    returnflag = 1;
                }else if(this!="[object Window]"){
                    materialsCodeArrays.push(this);
                }
            });
            rowIndex ++;
        });
    }
    if(returnflag==1){
        layer.alert(errormassgae);
        return;
    }
    formData.append("materialsCodeArrays", materialsCodeArrays);//保存发布标志位

    var rowCounts = sheet2.getRowCount();
    formData.append("rowCounts",rowCounts);

    var sheet1 = spread.getSheetFromName("总表");
    var finalPriceArrays = new Array();
    //获取所有的物料编码
    var sheetvalues = sheet1.getArray(0,2,sheet1.getRowCount(),1,false);
    if(sheetvalues!=null && sheetvalues.length>0){
        $.each(sheetvalues, function(i){
            $.each(this, function(j){
                // if(this!="[object Window]"){
                finalPriceArrays.push(this);
                // }
            });
        });
    }
    formData.append("finalPriceArrays", finalPriceArrays);//保存发布标志位

    var finalNameArrays = new Array();
    //获取所有的物料编码

    var sheetvalues = sheet1.getArray(0,1,sheet1.getRowCount(),1,false);
    if(sheetvalues!=null && sheetvalues.length>0){
        $.each(sheetvalues, function(i){
            $.each(this, function(j){
                finalNameArrays.push(this);
            });
        });
    }
    formData.append("finalNameArrays", finalNameArrays);//保存发布标志位

    formData.append("bomLongs", $("#bomLongs").val());
    formData.append("bomWidths", $("#bomWidths").val());
    formData.append("bomThicks", $("#bomThicks").val());
    formData.append("bomColors", $("#bomColors").val());
    formData.append("socketLengths", $("#socketLengths").val());
    formData.append("wallThicknesss", $("#wallThicknesss").val());
    formData.append("units", $("#units").val());

    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ExcelPlugController/saveExcelDate";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : formData,
        dataType : "json",
        cache : false,
        processData : false, // 告诉jQuery不要去处理发送的数据
        contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                // layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                layer.alert(result.resultMassage)
            }else{
                // layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 6000});
                layer.alert(result.resultMassage)
            }
        }
    });
}



//更新全局材料价格
function updateMaterialPrice(){
    var sheet1 = spread.getSheetFromName("BOM模板");
    var materialCodeArrays = new Array();
    var materialPriceArrays = new Array();

    //获取所有的物料编码
    var formData = new FormData();

    var sheetvalues = sheet1.getArray(0,1,sheet1.getRowCount(),1,false);
    if(sheetvalues!=null && sheetvalues.length>0){
        $.each(sheetvalues, function(i){
            $.each(this, function(j){
                materialCodeArrays.push(this);
            });
        });
    }
    formData.append("materialCodeArrays", materialCodeArrays);//保存发布标志位

    var sheetvalues2 = sheet1.getArray(0,5,sheet1.getRowCount(),1,false);
    if(sheetvalues2!=null && sheetvalues2.length>0){
        $.each(sheetvalues2, function(i){
            $.each(this, function(j){
                materialPriceArrays.push(this);
            });
        });
    }
    formData.append("materialPriceArrays", materialPriceArrays);//保存发布标志位
    formData.append("type", $("#type").val());

    var request = "../ExcelPlugController/updateMaterialPrice";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : formData,
        dataType : "json",
        cache : false,
        processData : false, // 告诉jQuery不要去处理发送的数据
        contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {

            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else{
                if(result.returnData==undefined){
                    layer.msg("未查询到物料信息。", {icon : 5, anim : 6, time : 3000});
                    return;
                }
                var tArray = new Array();
                var arry = result.returnData.split(",");

                for(var i=0;i<arry.length;i++){
                    tArray[i]=new Array();
                    tArray[i][0] = arry[i]
                }
                sheet1.suspendPaint();
                sheet1.setArray(20,5, tArray);
                sheet1.resumePaint();
            }
        }
    });
}

//后台校验 计算器模拟
/*function compileGcExcel(){
        //获取所有的物料编码
        var formData = new FormData();
        var codeForModel = $("#codeForModel").val();
        var bomLong = $("#bomLong").val();
        var bomWidth = $("#bomWidth").val();
        var bomThick = $("#bomThick").val();
        var oldpvc = $("#oldpvc").val();
        var newpvc = $("#newpvc").val();

        // formData.append("bomThick",bomThick);
        // formData.append("oldpvc",oldpvc);
        // formData.append("newpvc",newpvc);

        var data = JSON.stringify(spread.toJSON());

        //获取明细表的总行数
        var rowCounts = spread.getSheetFromName("BOM模板").getRowCount();
        //获取明细表的总列数
        var columnCounts = spread.getSheetFromName("BOM模板").getColumnCount();

        // formData.append("rowCounts",rowCounts);
        // formData.append("columnCounts",columnCounts);
        formData.append("data",data);
        // formData.append("codeForModel",codeForModel);
        // formData.append("bomLong",bomLong);
        // formData.append("bomWidth",bomWidth);
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        var request = "../ExcelPlugController/compileGcExcel";
        ajax = $.ajax({
            type : "POST",
            url : encodeURI(request),
            data : formData,
            dataType : "json",
            cache : false,
            processData : false, // 告诉jQuery不要去处理发送的数据
            contentType : false, // 告诉jQuery不要去设置Content-Type请求头
            traditional:true,//防止深度序列化
            success : function(result) {
                layer.close(index);
                // if(result.resultCode == 0) {
                //     layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                // }else{
                //     alert("有效材料成本="+result.bomLong+";\t正常工艺损耗="+result.bomWidth+";\t计价单价="+result.unitPrice);
                // }
            }
        });
}*/
//对照编辑  新开一个插件页面
function  controlEdit(){
    var url ="../ExcelPlugController/excelPage?disFlag="+0+"&flag="+0+"&companyName="+$("#companyName").val()+"&menuid="+$("#menuid").val();
    window.open(url, "_blank");
}

//获取杠杆BOM
function getLeveragedBOM(){
    parent.layer.open({
        type: 2,
        title: ['杠杆BOM列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1, //BasicFileController
        content: '../basicFileController/chooseboms?batchFlag='+0, // chooseBomType
        end:function(){
            var json = {};
            var code = $("#bomcode").val();
            json.code = code;
            //通过modelCode到杠杆BOM表搜索数据
            var request = "../ExcelPlugController/getLeverageBomByCode";/*saveDataDoors*/
            ajax = $.ajax({
                type : "POST",
                url : encodeURI(request),
                data : json,
                dataType : "json",
                cache : false,
                // processData : false, // 告诉jQuery不要去处理发送的数据
                // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
                // traditional:true,//防止深度序列化
                success : function(result) {
                    load(spread,result.bomContent);
                }
            });

        }
    });
}

function openfile4(){
    $('#fileDemo').click();
}


/*//Ctrl+C 事件监听 判断 row rowCount col colCount 是否有值有值的话将数据处理保存到session
    $(document).keydown(function(e) {
        console.log(e.ctrlKey+";"+e.keyCode);
        if(e.ctrlKey && e.keyCode == 67){
            console.log("Document catch Ctrl+C");
            setCopyTextToSesion(row,col,rowCount,colCount);
        }
    });
    //Ctrl+V 事件监听
    $(document).keyup(function(e) {
        if(e.ctrlKey && e.keyCode == 86){
            console.log("Document catch Ctrl+V");
        }
    });
     document.addEventListener('copy', function(e) {
        var content1 = window.getSelection();
        var content = window.getSelection().toString();
        console.log(content);
        if (!content) { // for chrome
            clipboardData = e.originalEvent.content;
        }
    });
    document.addEventListener('copy', function(e) {
        e.preventDefault();//这句很重要，决定setData是否成功
        var textArr = window.getSelection().toString().split("\t");
        var pasteText = '';
        textArr.forEach(function(e){
            pasteText += e;
        });
        e.clipboardData.setData('text', pasteText);
    });
    */

/* document.addEventListener("paste", function () {
        if (event.clipboardData || event.originalEvent) {
            var clipboardData = (event.clipboardData || window.clipboardData);
            var val = clipboardData.getData('text');
            console.log(val);
            event.preventDefault();
        }
    });*/

/*$(document.body).bind({
    copy: function(e) {//copy事件
        let cpTxt = "复制的数据";
        let clipboardData = window.clipboardData; //for IE
        if (!clipboardData) { // for chrome
            clipboardData = e.originalEvent.clipboardData;
        }
        let result = clipboardData.getData("text")+":"+cpTxt;
        //e.clipboardData.getData('text');//可以获取用户选中复制的数据
        clipboardData.setData('Text', result);
        $('p').text(result);
        return false;//否则设不生效
}*/
function customEvent(){
    var sheetForEdit = spread.getSheetFromName("BOM模板");
    var commandManager = spread.commandManager();
    commandManager.register("mytab", function () {
        spread.suspendEvent();
        var startRow = sheetForEdit.getActiveRowIndex();
        var startCol = sheetForEdit.getActiveColumnIndex();
        if(startCol === 4){
            sheetForEdit.setActiveCell(startRow, startCol + 1);
        }
        spread.resumeEvent();
    });
    commandManager.setShortcutKey('mytab', GC.Spread.Commands.Key.tab, false, false, false, false);

    commandManager.register("myleft", function () {
        spread.suspendEvent();
        var startRow = sheetForEdit.getActiveRowIndex();
        var startCol = sheetForEdit.getActiveColumnIndex();
        if(startCol === 6){
            sheetForEdit.setActiveCell(startRow, startCol -1);
        }
        spread.resumeEvent();
    });
    commandManager.setShortcutKey('myleft', GC.Spread.Commands.Key.left, false, false, false, false);

    commandManager.register("myright", function () {
        spread.suspendEvent();
        var startRow = sheetForEdit.getActiveRowIndex();
        var startCol = sheetForEdit.getActiveColumnIndex();
        if(startCol === 4){
            sheetForEdit.setActiveCell(startRow, startCol + 1);
        }
        spread.resumeEvent();
    });
    commandManager.setShortcutKey('myright', GC.Spread.Commands.Key.right, false, false, false, false);
}