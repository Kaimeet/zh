var $window = $(window);
$window.resize(function() {
    resizewindow();
});
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        // $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-75);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
        // $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-75);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }
}
//图片格式
var extArray = [".jpg", ".png", ".jpeg"];
$(function() {
    resizewindow();

    var id = $("#id").val();
    //超大屏幕的功能按钮
    var toolbarButtons   = ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'];
    //大屏幕的功能按钮
    var toolbarButtonsMD = ['fullscreen', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting'];
    //小屏幕的功能按钮
    var toolbarButtonsSM = ['fullscreen', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'insertLink', 'insertImage', 'insertTable', 'undo', 'redo'];
    //手机的功能按钮
    var toolbarButtonsXS = ['bold', 'italic', 'fontFamily', 'fontSize', 'undo', 'redo'];
    //var pid = $('#pid').val();
    //编辑器初始化并赋值
    $('#edit').on('froalaEditor.initialized', function (e, editor) {
        $('#edit').froalaEditor('html.set',$("#html").val());

    })
        .froalaEditor({
            placeholderText: '请输入内容', //默认填充内容
            charCounterCount       : true,//默认 显示字数
            saveInterval           : 0,//不自动保存，默认10000，0为不自动保存
            //theme                  : "dark",//主题：dark，red，gray，royal，注意需要引入对应主题的css
            height                  : "600px",
            toolbarBottom           : false,//默认
            toolbarButtonsMD        : toolbarButtonsMD,
            toolbarButtonsSM        : toolbarButtonsSM,
            toolbarButtonsXS        : toolbarButtonsXS,
            toolbarInline           : false,//true选中设置样式,默认false
            imageUploadMethod       : 'POST',
            heightMin: 450,
            charCounterMax: 3000,  //最大字数限制，-1为不限制
            saveURL: '../ProductController/saveProductsArticle',  //自动保存的地址（body参数为html内容）  saveProductArticle
            saveParams: { id: id},  //保存内容时传的参数
            // spellcheck: false,  //是否允许浏览器对输入内容进行拼写检查
            imageUploadURL: '../ProductController/uploadArticleImg',//上传到本地服务器                  uploadArticleImg
            imageUploadParams: {id: id,releaseFalg:$("#releaseFalg").val()}, //上传图片时带的参数
            ///imageDefaultWidth: 100, //上传图片后的默认大小
            //imageResizeWithPercent: true,//不设置这个，imageDefaultWidth的单位为像素，设置后为%
            // videoUploadURL:'../ProductController/uploadArticleVideo',
            // videoUploadParams: {id: id}, //上传图片时带的参数
            enter: $.FroalaEditor.ENTER_BR, //设置回车键功能
            language: 'zh_cn',
            // toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'align','color','fontSize','insertImage','insertTable','undo', 'redo']
        });

}) ;

//点击保存按钮
function saveArticle(releaseFalg){
    console.log(releaseFalg);
    var html=$('#edit').froalaEditor('html.get', true); //返回富文本编辑里面的html代码
    if((html==null || html=="") && releaseFalg==1){
        layer.msg("请进行图文编辑后再发布。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    $.ajax({
        type: 'POST',
        url: '../ProductController/saveProductsArticle',
        dataType: 'json',
        data:{
            "body":html,
            "id":$("#id").val(), //产品表ID
            "releaseFalg":releaseFalg
        },
        success : function(result) {
            layer.close(index);
            if(result.resultCode==0){
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else{
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    post("../ProductController/addAndEditProduct3",{"id":$("#id").val()})
//                });
            }

        },
        error:function(data) {
            //console.log(data.msg);
        },
    });
}
//返回上一部
function back(){
    post("../ProductController/addAndEditProduct2",{"id":$("#id").val()})
}



//返回上一部
function backtoList(){
    post("../ProductController/productMaintenance",{})
}




