var $window = $(window);
$window.resize(function() {
    resizewindow();
});
//选择要上传的所有文件
fileList = [];
var delFileIdImages = [];
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
//        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
//        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }

    console.log(n);

    //跳转类型绑定change事件
    $("#externalUr2").on("change",function(){
        if($("#externalUr2").val()==0){//普通的不能再普通
            $("#type1").removeClass("hidden");
            $("#type2").addClass("hidden");
            $("#type3").addClass("hidden");
            $("#externalUrlDiv").addClass("hidden");
        }else{//跳转到外部链接
            $("#type1").addClass("hidden");
            $("#type2").removeClass("hidden");
            $("#type3").removeClass("hidden");
            $("#externalUrlDiv").removeClass("hidden");
        }
    });

    if($("#externalUr2").val()==null || $("#externalUr2").val()=="" || $("#externalUr2").val()==0){
        $("#type1").removeClass("hidden");
        $("#type2").addClass("hidden");
        $("#externalUrlDiv").addClass("hidden");
        $("#type3").addClass("hidden");
    }else{
        $("#type1").addClass("hidden");
        $("#type2").removeClass("hidden");
        $("#type3").removeClass("hidden");
        $("#externalUrlDiv").removeClass("hidden");
    }



}

var valueTemp = "";
function checknum(obj) {
    if (/^\d*\.?\d{0,2}$/.test(obj.value)) {
        valueTemp = obj.value;
    } else {
        obj.value = valueTemp;
    }
}


var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate; 
});
//选择要上传的所有文件
fileList = [];
//选择要上传的所有文件
fileList2 = [];
var delFileIdImages = [];
var delFileIdOthers = [];
//图片格式
var extArray = [".jpg", ".png", ".jpeg"];
$(function() {
    resizewindow();

    $('.file-list').fadeIn(2500);
    //点击删除按钮事件：
    $(".imgshow").on('click', function () {
        var src=$(this).attr("src");
        showPicNew(src);
    });

    //选择文件按钮
    var  $file = $("#choose-file");
    //回显的列表
    var  $list = $('.file-list');
    //当前选择上传的文件
    var curFile;
    // 选择按钮change事件，实例化fileReader,调它的readAsDataURL并把原生File对象传给它，
    // 监听它的onload事件，load完读取的结果就在它的result属性里了。它是一个base64格式的，可直接赋值给一个img的src.
    $file.on('change', function (e) {
        //上传过图片后再次上传时限值数量
        var numold = $('.file-list li').length;
        if(numold >= 1){
            layer.msg("最多允许上传1张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //限制单次批量上传的数量
        var num = e.target.files.length;
        var numall = numold + num;
        if(num >1 ){
            layer.msg("最多允许上传1张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }else if(numall > 1){
            layer.msg("最多允许上传1张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //原生的文件对象，相当于$file.get(0).files;//files[0]为第一张图片的信息;
        curFile = this.files;
        //将FileList对象变成数组
        fileList = fileList.concat(Array.from(curFile));
        //console.log(fileList);
        for (var i = 0, len = curFile.length; i < len; i++) {
            reviewFile(curFile[i])
        }
        $('.file-list').fadeIn(2500);
    });


    //点击删除按钮事件：
    $(".file-list").on('click', '.file-del', function () {

        console.log($(this).attr("id"));
        delFileIdImages.push($(this).attr("id"));

        var $parent = $(this).parent();
        console.log($parent);
        var index = $parent.index();
        fileList.splice(index, 1);
        $parent.fadeOut(850, function () {
            $parent.remove()
        });
    });

    //点击删除按钮事件：
    $(".imgshow").on('click', function () {
        var src=$(this).attr("src");
        showPicNew(src);
    });
    function reviewFile(file) {
        //实例化fileReader,
        var fd = new FileReader();
        //获取当前选择文件的类型
        var fileType = file.type;
        //调它的readAsDataURL并把原生File对象传给它，
        fd.readAsDataURL(file);//base64
        //监听它的onload事件，load完读取的结果就在它的result属性里了
        fd.onload = function () {
            if (/^image\/[jpeg|png|jpg|gif]/.test(fileType)) {
                $list.append('<li style="border:solid #e1edff 1px; margin:5px 5px;text-align: center;" class="file-item"><img src="' + this.result + '" alt="" height="120px" width="120px"><span class="file-del">删除</span></li>').children(':last').hide().fadeIn(2500);
            } else {
                $list.append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del">删除</span></li>')
            }

        }
    }



});

function openfile(){
    $('#choose-file').click();
}
var ajax;
//点击保存按钮
function toStep2( flag){
    var formData = new FormData();
    formData.append("flag", flag);

    if((flag==1 || flag==2 ) && (externalUrl==null || externalUrl=="")){
        layer.msg("外部消息请输入外部链接。", {icon : 5, anim : 6, time : 3000});
        return;
    }

    var externalUrl = $("#externalUrl").val()
    //判断是否符合http://符合返回真不符合返回假
    var http = /^http:\/\/.*/i.test(externalUrl);
    //判断是否符合https://符合返回真不符合返回假
    var https = /^https:\/\/.*/i.test(externalUrl);
    //如果两个都为假，我们就为客户添加http://
    if (externalUrl！=null && externalUrl!="" && !http && !https) {
        externalUrl = 'http://' + externalUrl;
    }

    formData.append("externalUrl", externalUrl);

    if($("#title").val()==null || $("#title").val().trim()==""){
        layer.msg("请输入通知主题", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("title", $("#title").val());
    if($("#username").val()==null || $("#username").val().trim()==""){
        layer.msg("请输入创建人姓名。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("username", $("#username").val());

    if($("#showOrder").val()==null || $("#showOrder").val().trim()==""){
        layer.msg("请输入显示顺序", {icon : 5, anim : 6, time : 3000});
        return;
    }
    if(isNaN($("#showOrder").val().trim())){
        layer.msg("显示顺序需要为数字。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("showOrder", $("#showOrder").val());
    if($("#summary").val()==null || $("#summary").val().trim()==""){
        layer.msg("请输入通知摘要", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("summary", $("#summary").val());
    if($("#id").val()!=null && $("#id").val()!="" && $("#id").val()!=undefined){
        formData.append("id", $("#id").val());
    }

    if(fileList.length==0 && $('.file-list li').length==0){
        layer.msg("请上传相关的消息公告图片。", {icon : 5, anim : 6, time : 3000});
        return;
    }

    var fileImageName = [];
    for (var i = 0, len = fileList.length; i < len; i++) {
        formData.append('fileImagePath', fileList[i]);//file
        fileImageName.push(fileList[i].name);
        console.log(fileList[i].name);
    }
    //修改时有用
    formData.append("delFileIdImages", delFileIdImages); //删除得轮播图ID
    //修改时变种的图片张数
    formData.append("imageFileSize", $("#imageFileSize").val());

    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../SystemController/saveNotice";
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
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
                if(flag==0 || flag==""){
                    post("../SystemController/addAndEditNotice2",{"id":result.id});
                }else{
//                    layer.msg("消息公告保存成功。", {icon : 6, anim : 5, time : 3000},function(){
                        post("../SystemController/addAndEditNotice",{"id":result.id});
//                    });
                }

            }
        }
    });
}


//返回
function  back() {
    post("../SystemController/systemNotification",{})
}


//图片放大预览
function showPicNew(imageUrl){
    //多窗口模式，层叠置顶
    layer.open({
        type: 1 //1:自定义内容；2：页面
        ,title: '查看图片'
        ,area: ['390px', '330px']
        ,shade: 0
        ,maxmin: true
        ,content: '<img  src=\"'+imageUrl+'\" src=\"'+imageUrl+'\" style=\"width: 100%;height: 100%;\" >'
        ,btn: ['全部关闭'] //只是为了演示
        ,btn2: function(){
            layer.closeAll();
        }
        ,zIndex: layer.zIndex //重点1
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });

}