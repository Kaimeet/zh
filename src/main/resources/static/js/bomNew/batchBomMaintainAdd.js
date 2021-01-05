var addOrDetail = 0 ;

var form,flow,element,layer;

layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function GetQueryStringDecode(parameter) {
    var reg = new RegExp("(^|&)" + parameter + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]) ;
    }
}


function detailInit() {
    // 获取ID
    var id = getQueryString('id');
    // 数据加载
    if (id){
        // 初始化信息
        addOrDetail = 1 ;
        let bomCode = GetQueryStringDecode("bomCode");
        let bomName = GetQueryStringDecode("bomName");
        let typeName = GetQueryStringDecode("typeName");
        let bomClassName = GetQueryStringDecode("bomClassName");
        let seriesName = GetQueryStringDecode("seriesName");
        let productionBase = GetQueryStringDecode("productionBase");
        let productionBaseName = GetQueryStringDecode("productionBaseName");
        let length = getQueryString("length");// getQueryString("baseCode");
        let width = getQueryString("width");
        let thickness = getQueryString("thickness");
        let wallThickness = getQueryString("wallThickness");
        let socketLength = getQueryString("socketLength");
        let colorName = GetQueryStringDecode("colorName");

        $("#bomcode").val(bomCode);
        $("#bomname").val(bomName);
        $("#batchTypeName").val(typeName);
        $("#batchClassName").val(bomClassName);
        $("#batchSeriesName").val(seriesName);
        $("#baseCode").val(productionBase);
        $("#baseName").val(productionBaseName);
        $("#length").val(length);
        $("#width").val(width);
        $("#thickness").val(thickness);
        $("#wallThickness").val(wallThickness);
        $("#socketLength").val(socketLength);
        $("#color").val(colorName);
    }
}

function back() {
    window.location.href = '../BomBatchController/batchBomMaintainList';
}

var ifCanNext = false;

function formatDate(date) {
    var date = new Date(Number(date));
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD;
}

//选择产品类型
function chooseQuote(bomTypeOnes,indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['杠杆BOM列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1, //BasicFileController
        content: '../basicFileController/chooseboms?flag=1&batchFlag=0', // chooseBomType
    });
}

//选择生产基地
function chooseBase2(indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['生产基地列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBase', //chooseBOMSeries
    });
}

//选中pvc 颜色
function chooseColor2(indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['颜色列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseColor', /*chooseCompany*/
    });
}

//保存数据
function saveBomData() {
    let json = {};
    json.bomCode = $("#bomcode").val();
    json.productionBase = $("#baseCode").val();
    json.productionBaseName = $("#baseName").val();
    json.length = $("#length").val();
    json.width = $("#width").val();
    json.thickness = $("#thickness").val();
    json.wallThickness = $("#wallThickness").val();
    json.socketLength = $("#socketLength").val();
    json.colorName = $("#color").val();
    json.batchClassName = $("#batchClassName").val();

    if (json.bomCode.length === 0) {
        layer.confirm("请选择Bom编码!", {
            icon: 5,
            btn: ['确定']
        });
    }
    else if (json.productionBase.length === 0 && json.batchClassName === "烤漆门（防火）") {
        layer.confirm("请选择生产基地!", {
            icon: 5,
            btn: ['确定']
        });
    }
    else if (json.length.length === 0 || json.width.length === 0 || json.thickness.length === 0) {
        layer.confirm("请输入长宽高!", {
            icon: 5,
            btn: ['确定']
        });
    }
    else if (json.colorName.length === 0) {
        layer.confirm("请选择颜色!", {
            icon: 5,
            btn: ['确定']
        });
    }
    else {
        let request = "../BomBatchController/saveBatchBom";
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
                if(result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                }else {
                    layer.alert("保存成功！", {icon: 6},function () {
                        window.location.href = '../BomBatchController/batchBomMaintainList';
                    });
                }
            }
        });
    }
}