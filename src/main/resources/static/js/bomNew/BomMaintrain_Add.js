/**
 * 0 ：add
 * 1 : edit
 * @type {number}
 */
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
        let name = GetQueryStringDecode("bomName");
        let code = GetQueryStringDecode("code");
        let bomClass = GetQueryStringDecode("bomClass");
        let unit = GetQueryStringDecode("unit");
        let updateDes = GetQueryStringDecode("updateDes");
        let series = getQueryString("series");
        let memo = GetQueryStringDecode("memo");
        let baseCode = null ;// getQueryString("baseCode");
        let type = getQueryString("type");
        let version = GetQueryStringDecode("version");

        $("#type").val(type);
        $("#templateCode").val(code);
        $("#templateName").val(name);
        $("#bomClasss").val(bomClass);
        $("#version").val(formatDate(version));
        if (unit){
            $("#unit").val(unit);
        }
        if (updateDes){
            $("#updateDes").val(updateDes);
        }
        $("#series").val(series);
        if (memo){
            $("#memo").val(memo);
        }
        $("#baseCode").val(baseCode);

        ifCanNext = true;
        // 按钮控制
        $("#templateCode").attr("disabled","disabled");

    }

}

function excelDataMaintrain() {
    let type =  $("#type").val();
    let templateCode = $("#templateCode").val();
    let templateName = $("#templateName").val();
    let bomClass =  $("#bomClasss").val();
    let version =  $("#version").val();
    let unit = $("#unit").val();
    let updateDes =  $("#updateDes").val();
    let series = $("#series").val();
    let memo =  $("#memo").val();
    let baseCode =  $("#baseCode").val();

    if (templateCode){
        if (templateCode.length>0){

        }else
        {
            alert("请输入Bom编码");
            return;
        }
    }else
    {
        alert("请输入Bom编码");
        return;
    }
    modelExcelView(type ,templateCode,templateName,bomClass,version,unit,updateDes,series,memo,baseCode ,1);
}

//设置模型数据
function modelExcelView(type,templateCode,templateName,bomClass,version, unit, updateDes,series,memo ,baseCode ,flag){
    if (!ifCanNext){
        layer.msg("请先输入合法的Bom编码", {icon:5, anim:6, time: 3000});
        return ;
    }
    var menuid =  $("#menuid").val() ;
    var progarm = "?type="+type+"&flag="+flag+"&templateCode="+templateCode+"&templateName="+templateName+"&bomClasss="+bomClass
        +"&version="+version
        +"&unit="+unit
        +"&updateDes="+updateDes
        +"&series="+series
        +"&memo="+memo
        +"&baseCode="+baseCode
        +"&companyName=门业"
        +"&menuid="+$("#menuid").val();
    var url ="../ExcelPlugController/excelPage" + progarm;
    window.open(url, "_blank");
}

//选择报价单中的生产基地
function chooseBase(){
    parent.layer.open({
        type: 2,
        title: ['BOM系列列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBase', //chooseBOMSeries
        end:function(){
            // var baseCode = $("#baseCode").val();
            // var baseName = $("#baseName").val();
            // console.log(baseCode);
            // console.log(baseCode);
            // $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "baseCode", value: baseCode});
        }
    });
}

function back() {
    window.location.href = '../BomNewContoller/bomMainList?menuid='+$("#menuid").val();
}

var ifCanNext = false;

function verification() {
    let code = $("#templateCode").val();
    console.log(code);
    $.ajax({
        type : "GET",
        url : '../BomNewContoller/verificationBomCode?code='+code,
        dataType : "json",
        cache : false,
        success : function(result) {
            if (result.data){
                ifCanNext = true;
            }
            else
            {
                layer.msg("输入的Bom编码已存在,请修改", {icon:5, anim:6, time: 3000});
                ifCanNext = false;
            }
        }
    });
}

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

/**
 * 修改可以系列
 */
function changeCanSelectSerise() {

    // 已选大类
    let choosedType = $('#type').val();
    // 已选分类
    let choosedClass = $('#bomClasss').val();

    if (choosedType!='' && choosedClass !='')
    {

    }
    else {
        return ;
    }

    let seriseAllStr = $('#seriers').val();
    let seriseJson = eval("("+seriseAllStr+")");

    // 筛选可选
    let shouldShow = seriseJson.filter(item => item.typeCode === choosedType &&  item.typeCodeTwo === choosedClass) ;

    // 重构系列下拉框
    resetSelectOfSerise(shouldShow);

    // 清空当前选择项
}


function resetSelectOfSerise(options) {
    removeAll();
    addOptions(options);
}

function removeAll() {
    let obj=document.getElementById('series');
    obj.options.length=0;
}

function addOptions(options) {
    let obj=document.getElementById('series');
    let optionsList = [];
    for (let value of options) {
        obj.options.add(new Option(value.productName,value.productCode)); //这个兼容IE与firefox
    }
}