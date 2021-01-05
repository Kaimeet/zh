var $window = $(window);
$window.resize(function() {
    resizewindow();
});
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
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

    if($("#jumpTypeMiddle").val() == 0 || $("#jumpTypeMiddle").val() ==2){
        $("#choose").removeClass("disno");
    }else{
        $("#choose").addClass("disno");
    }

    //跳转类型绑定change事件
    $("#jumpType").on("change",function(){
        choose();
    });
    $('.file-list').fadeIn(2500);
    /********************************图片上传 start********************************/
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
                $list.append('<li style="border:solid #e1edff 1px; margin:5px 5px;text-align: center;" class="file-item"><img src="' + this.result + '" alt="" height="125px" width="250px"><span class="file-del">删除</span></li>').children(':last').hide().fadeIn(2500);
            } else {
                $list.append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del">删除</span></li>')
            }

        }
    }
    /********************************图片上传 end********************************/


});
function openfile2(){
    $('#file2').click();
}
function openfile(){
    $('#choose-file').click();
}
var ajax;
//点击保存/发布
function releaseto(releaseFalg){
    var formData = new FormData();
    // formData.append("id", $("#id").val());
    if($("#carouselTitle").val()==null || $("#carouselTitle").val().trim()==""){
        layer.msg("请输入轮播图主题", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("carouselTitle", $("#carouselTitle").val());//产品名称
    if($("#showOrder").val()==null || $("#showOrder").val().trim()==""){
        layer.msg("请选择产品系列", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("showOrder", $("#showOrder").val());//所属系列

    if($("#jumpType").val()==null || $("#jumpType").val().trim()==""){
        layer.msg("请选择轮播图跳转类型。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var jumpCode;
    if($("#jumpCode").text()!=null && $("#jumpCode").text()!="" && $("#jumpCode").text()!=undefined){
        jumpCode = $("#jumpCode").text();
    }else{
        jumpCode = $("#jumpCode").val();
    }
    console.log(jumpCode);
    if( ($("#jumpType").val() == 0 || $("#jumpType").val() == 2) &&
        (jumpCode == null || jumpCode == "" ||  jumpCode == undefined ||
            $("#choosedName").val() == null || $("#choosedName").val() == "" ||  $("#choosedName").val() == undefined ) ){

        layer.msg("跳转类型为产品或者消息公告时，请选择对应的产品或者消息公告。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("jumpType", $("#jumpType").val());//跳转类型
    formData.append("jumpCode", jumpCode);//产品或者消息通知编号
    formData.append("choosedName", $("#choosedName").val());//产品或者消息通知名称


    if(fileList.length > 1){
        layer.msg("最多允许上传1张图片", {icon : 5, anim : 6, time : 3000});
        return;
    }
    for (var i = 0, len = fileList.length; i < len; i++) {
        formData.append('fileImagePath', fileList[i]);//file
        console.log(fileList[i].name);
    }
    //产品表id
    if( $("#id").val()!=null &&  $("#id").val()!="" &&  $("#id").val()!=undefined){
        formData.append("id", $("#id").val()); //文件名
    }
    formData.append("delFileIdImages", delFileIdImages); //要删除的文件
    formData.append("releaseFalg", releaseFalg); //发布标志位
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../SystemController/saveCarousel";
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
                post("../SystemController/addAndEditCarousel",{"id":result.id});
            }
        }
    });
}
//撤回
function releaseback(releaseFalg){
    //产品表id
    if( $("#id").val()==null ||  $("#id").val()=="" ||  $("#id").val()==undefined){
        layer.msg("轮播图信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
    }
    var json = {"id":$("#id").val()};
    json.releaseFalg=releaseFalg; //发布标志位
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../SystemController/releaseBack";
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
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
               post("../SystemController/addAndEditCarousel",{id:$("#id").val()})
            }
        }
    });
}

//作废轮播图
function del(){
    layer.confirm("确认作废该首页轮播图吗？", {icon: 3, title:false},function(index, layero){
        //产品表id
        if( $("#id").val()==null ||  $("#id").val()=="" ||  $("#id").val()==undefined){
            layer.msg("轮播图信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
        }
        var json = {"id":$("#id").val()};
        // loading层
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        var request = "../SystemController/delCarousel";
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
                layer.close(index);
                if(result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                }else {
//                    layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                        post("../SystemController/carouselManagement",{})
//                    });
                }
            }
        });
    });

}
//返回
function back() {
    post("../SystemController/carouselManagement",{})
}
//图片放大预览
function showPicNew(imageUrl){
    //多窗口模式，层叠置顶
    layer.open({
        type: 1 //1:自定义内容；2：页面
        ,title: '查看图片'
        ,area: ['750px', '375px']
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
//选择
function choose(){
    var bwType = $("#bwType").val();
    if($("#jumpType").val()==0){//产品
        $("#choose").show();
        $("#choosediv").show();
        $("#jumpId").text("");
        $("#choosedName").val("");
        if(bwType == 0){
            parent.layer.open({
                type: 2,
                title: ['产品列表', 'font-size:18px;color:#788188;'],
                area : ['800px', '600px'],
                closeBtn: 1,
                content: '../ProductController/selectProducts'
            });
        }else{
            parent.layer.open({
                type: 2,
                title: ['产品列表', 'font-size:18px;color:#788188;'],
                area : ['100%', '100%'],
                closeBtn: 1,
                content: '../ProductController/selectProducts'
            });
        }
    }else if($("#jumpType").val()==2){//公告
        $("#choose").show();
        $("#choosediv").show();
        $("#jumpId").text("");
        $("#choosedName").val("");
        if(bwType == 0){
            parent.layer.open({
                type: 2,
                title: ['消息公告列表', 'font-size:18px;color:#788188;'],
                area : ['800px', '600px'],
                closeBtn: 1,
                content: '../SystemController/selectNotic'
            });
        }else{
            parent.layer.open({
                type: 2,
                title: ['消息公告列表', 'font-size:18px;color:#788188;'],
                area : ['100%', '100%'],
                closeBtn: 1,
                content: '../SystemController/selectNotic'
            });
        }
    }else{
        $("#choose").hide();
        $("#choosediv").hide();
        $("#jumpId").text("");
        $("#choosedName").val("");
    }
}