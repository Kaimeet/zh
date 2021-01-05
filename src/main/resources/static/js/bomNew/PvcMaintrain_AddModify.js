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
        let id = getQueryString("id");
        let name = GetQueryStringDecode("name");
        let code = GetQueryStringDecode("code");
        let unit = GetQueryStringDecode("unit");
        let spec = GetQueryStringDecode("spec");
        let colorsName = GetQueryStringDecode("colorsName");
        let colorsCode =  GetQueryStringDecode("colorsCode");
       // let type=  GetQueryStringDecode("type");

        $("#id").val(id);
       // $("#type").val(type);
        $("#name").val(name);
        $("#code").val(code);
        $("#spec").val(spec);
        $("#unit").val(unit);
        $("#colorsName").val(colorsName);
        $("#colorsCode").val(colorsCode);
        ifCanNext = true;
        // 按钮控制
        //$("#templateCode").attr("disabled","disabled");
    }

}

/**
 * 保存
 */
function Save() {
    let id = $("#id").val();
    let type = '';// $("#type").val();
    let name = $("#name").val();
    let code = $("#code").val();
    let spec =  $("#spec").val();
    let unit = $("#unit").val();
    let colorsName =  $("#colorsName").val();
    let colorsCode = $("#colorsCode").val();

    if (colorsCode){
        if (colorsCode.length>0){

        }else
        {
            alert("请输入编码");
            return;
        }
    }else
    {
        alert("请输入编码");
        return;
    }
    doSave(id ,name ,code,type,spec,unit,colorsName,colorsCode);
}

//设置模型数据
function doSave( id ,name ,code,type,spec,unit,colorsName,colorsCode){
    if (!ifCanNext){
        layer.msg("请先输入合法的颜色名称", {icon:5, anim:6, time: 3000});
        return ;
    }
    $.ajax({
        type : "POST",
        url : "../BomNewContoller/modifyPvcColorsLink",
        data : {
            "id":id ,
            "name":name,
            "code":code ,
            "type":type,
            "spec":spec ,
            "unit":unit,
            "colorsname":colorsName ,
            "colorscode":colorsCode
        },
        dataType : "json",
        cache : false,
        async : false,
        success : function(result) {
            if (result.errorCode==""){
                layer.msg(result.data, {icon:1, anim:6, time: 3000});
                back();
            }
        }
    });

}


function back() {
    window.location.href = '../BomNewContoller/pvcColorsMaintainList';
}

var ifCanNext = false;

function verification() {
    let name = $("#colorsName").val();
    $.ajax({
        type : "GET",
        url : '../BomNewContoller/verificationColorsName?colorsName='+name,
        dataType : "json",
        cache : false,
        success : function(result) {
            if (result.data){
                ifCanNext = true;
            }
            else
            {
                layer.msg("输入的颜色名称已存在,请修改", {icon:5, anim:6, time: 3000});
                ifCanNext = false;
            }
        },onerror:function (e) {
            ifCanNext = false;
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

function chooseMaterial() {
    parent.layer.open({
        type: 2,
        title: ['物料选择', 'font-size:18px;color:#788188;'],
        area : ['1000px', '800px'],
        closeBtn: 1,
        content: '../BomNewContoller/chooseMaterial', //chooseBOMSeries
        end:function(){

        }
    });

}