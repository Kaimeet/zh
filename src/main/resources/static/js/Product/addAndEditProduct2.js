var $window = $(window);
$window.resize(function() {
    resizewindow();
});
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
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
//选择要上传的所有文件
fileList4 = [];
//产品详情图片
fileList3 = [];
var delFileIdImages = [];
var delFileIdImages2 = [];
var delFileIdOthers = [];
var delFileIdOthers2 = [];
//图片格式
var extArray = [".jpg", ".png", ".jpeg"];
$(function() {
    resizewindow();
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
        if(numold >= 6){
            layer.msg("最多允许上传6张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //限制单次批量上传的数量
        var num = e.target.files.length;
        var numall = numold + num;
        if(num >6 ){
            layer.msg("最多允许上传6张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }else if(numall > 6){
            layer.msg("最多允许上传6张图片", {icon : 5, anim : 6, time : 3000});
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
    /********************************图片上传 end********************************/



    /********************************长图片上传 start********************************/
        //选择文件按钮
   /* var  $file3 = $("#choose-file2");
    //回显的列表
    var  $list3 = $('.longfile-list');
    //当前选择上传的文件
    var curFile3;
    // 选择按钮change事件，实例化fileReader,调它的readAsDataURL并把原生File对象传给它，
    // 监听它的onload事件，load完读取的结果就在它的result属性里了。它是一个base64格式的，可直接赋值给一个img的src.
    $file3.on('change', function (e) {
        //上传过图片后再次上传时限值数量
        var numold = $('.longfile-list li').length;
        if(numold >= 3){
            layer.msg("最多允许上传3张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //限制单次批量上传的数量
        var num = e.target.files.length;
        var numall = numold + num;
        if(num >3 ){
            layer.msg("最多允许上传3张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }else if(numall > 3){
            layer.msg("最多允许上传3张图片", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //原生的文件对象，相当于$file.get(0).files;//files[0]为第一张图片的信息;
        curFile3 = this.files;
        //将FileList对象变成数组
        fileList3 = fileList3.concat(Array.from(curFile3));
        //console.log(fileList3);
        for (var i = 0, len = curFile3.length; i < len; i++) {
            reviewFile3(curFile3[i])
        }
        $('.longfile-list').fadeIn(2500);
    });


    //点击删除按钮事件：
    $(".longfile-list").on('click', '.file-del', function () {

        console.log($(this).attr("id"));
        delFileIdImages2.push($(this).attr("id"));

        var $parent = $(this).parent();
        console.log($parent);
        var index = $parent.index();
        fileList3.splice(index, 1);
        $parent.fadeOut(850, function () {
            $parent.remove()
        });
    });

    //点击删除按钮事件：
    $(".imgshow2").on('click', function () {
        var src=$(this).attr("src");
        showPicNew(src);
    });
    function reviewFile3(file) {
        //实例化fileReader,
        var fd3 = new FileReader();
        //获取当前选择文件的类型
        var fileType = file.type;
        //调它的readAsDataURL并把原生File对象传给它，
        fd3.readAsDataURL(file);//base64
        //监听它的onload事件，load完读取的结果就在它的result属性里了
        fd3.onload = function () {
            if (/^image\/[jpeg|png|jpg|gif]/.test(fileType)) {
                $list3.append('<li style="border:solid #e1edff 1px; margin:5px 5px;text-align: center;" class="file-item"><img src="' + this.result + '" alt="" height="300px" width="250px"><span class="file-del">删除</span></li>').children(':last').hide().fadeIn(2500);
            } else {
                $list3.append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del">删除</span></li>')
            }

        }
    }*/
    /********************************长图片上传 end********************************/


    /********************************其他资料 start********************************/
        //选择文件按钮
    var  $file2 = $("#file2");
    //回显的列表
    var  $list2 = $('.otherfile-list');
    //当前选择上传的文件
    var curFile2;
    // 选择按钮change事件，实例化fileReader,调它的readAsDataURL并把原生File对象传给它，
    // 监听它的onload事件，load完读取的结果就在它的result属性里了。它是一个base64格式的，可直接赋值给一个img的src.
    $file2.on('change', function (e) {
        //上传过图片后再次上传时限值数量
        var numold2 = $('.otherfile-list li').length;
        if(numold2 >= 6){
            layer.msg("最多允许上传6个其他资料附件", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //限制单次批量上传的数量
        var num2 = e.target.files.length;
        var numall2 = numold2 + num2;
        if(num2 >6 ){
            layer.msg("最多允许上传6个其他资料附件", {icon : 5, anim : 6, time : 3000});
            return;
        }else if(numall2 > 6){
            layer.msg("最多允许上传6个其他资料附件", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //原生的文件对象，相当于$file.get(0).files;//files[0]为第一张图片的信息;
        curFile2 = this.files;
        //将FileList对象变成数组
        fileList2 = fileList2.concat(Array.from(curFile2));
        //console.log(fileList);
        for (var i = 0, len = curFile2.length; i < len; i++) {
            reviewFile2(curFile2[i])
        }
        $('.otherfile-list').fadeIn(2500);
    });


    //点击删除按钮事件：
    $(".otherfile-list").on('click', '.file-del2', function () {

        console.log($(this).attr("id"));
        delFileIdOthers.push($(this).attr("id"));

        var $parent = $(this).parent();
        console.log($parent);
        var index = $parent.index();
        fileList2.splice(index, 1);
        $parent.fadeOut(850, function () {
            $parent.remove()
        });
    });
    function reviewFile2(file) {
        //实例化fileReader,
        var fd2 = new FileReader();
        //获取当前选择文件的类型
        var fileType2 = file.type;
        //调它的readAsDataURL并把原生File对象传给它，
        fd2.readAsDataURL(file);//base64
        //监听它的onload事件，load完读取的结果就在它的result属性里了
        fd2.onload = function () {
            $list2.append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del2">删除</span></li>')
        }
    }
    /********************************其他资料 end********************************/

    /********************************其他资料 start********************************/
        //选择文件按钮
    var  $file4 = $("#file4");
    //回显的列表
    var  $list4 = $('.otherfile-list4');
    //当前选择上传的文件
    var curFile4;
    // 选择按钮change事件，实例化fileReader,调它的readAsDataURL并把原生File对象传给它，
    // 监听它的onload事件，load完读取的结果就在它的result属性里了。它是一个base64格式的，可直接赋值给一个img的src.
    $file4.on('change', function (e) {
        //上传过图片后再次上传时限值数量
        var numold2 = $('.otherfile-list4 li').length;
        if(numold2 >= 6){
            layer.msg("最多允许上传6个其他资料附件", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //限制单次批量上传的数量
        var num2 = e.target.files.length;
        var numall2 = numold2 + num2;
        if(num2 >6 ){
            layer.msg("最多允许上传6个其他资料附件", {icon : 5, anim : 6, time : 3000});
            return;
        }else if(numall2 > 6){
            layer.msg("最多允许上传6个其他资料附件", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //原生的文件对象，相当于$file.get(0).files;//files[0]为第一张图片的信息;
        curFile4 = this.files;
        //将FileList对象变成数组
        fileList4 = fileList4.concat(Array.from(curFile4));
        //console.log(fileList);
        for (var i = 0, len = curFile4.length; i < len; i++) {
            reviewFile4(curFile4[i])
        }
        $('.otherfile-list4').fadeIn(2500);
    });


    //点击删除按钮事件：
    $(".otherfile-list4").on('click', '.file-del4', function () {
        console.log($(this).attr("id"));
        delFileIdOthers2.push($(this).attr("id"));
        var $parent = $(this).parent();
        console.log($parent);
        var index = $parent.index();
        fileList4.splice(index, 1);
        $parent.fadeOut(850, function () {
            $parent.remove()
        });
    });
    function reviewFile4(file) {
        //实例化fileReader,
        var fd2 = new FileReader();
        //获取当前选择文件的类型
        var fileType2 = file.type;
        //调它的readAsDataURL并把原生File对象传给它，
        fd2.readAsDataURL(file);//base64
        //监听它的onload事件，load完读取的结果就在它的result属性里了
        fd2.onload = function () {
            $list4.append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del4">删除</span></li>')
        }
    }
    /********************************其他资料 end********************************/


});
function openfile3(){
    $('#choose-file2').click();
}

function openfile(){
    $('#choose-file').click();
}

function openfile2(){
    $('#file2').click();
}
function openfile4(){
    $('#file4').click();
}

var ajax;
//点击保存按钮
function toStep2(releaseFalg){
    var formData = new FormData();

    formData.append("releaseFalg", releaseFalg);//保存发布标志位
    if(fileList.length >6){
        layer.msg("最多允许上传6张轮播图片", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var fileImageName = [];
    for (var i = 0, len = fileList.length; i < len; i++) {
        formData.append('fileImagePath', fileList[i]);//file
        fileImageName.push(fileList[i].name);
        console.log(fileList[i].name);
    }
    formData.append("fileImageName", fileImageName); //文件名


    // if(fileList3.length > 3){
    //     layer.msg("最多允许上传3张产品详情图片", {icon : 5, anim : 6, time : 3000});
    //     return;
    // }
//    for (var i = 0, len = fileList3.length; i < len; i++) {
//        formData.append('fileImagePath2', fileList3[i]);//file
//    }

    //设计图纸附件
    /*if(fileList2.length > 6){
        layer.msg("最多允许上传6个设计图纸附件", {icon : 5, anim : 6, time : 3000});
        return;
    }*/
    var fileName = [];
    for (var i = 0, len = fileList2.length; i < len; i++) {
        formData.append('fileNamePath', fileList2[i]);//file
        fileName.push(fileList2[i].name);
        console.log(fileList2[i].name);
    }
    formData.append("fileName", fileName); //文件名

    //结构图纸附件
    // if(fileList4.length > 6){
    //     layer.msg("最多允许上传6个结构图纸附件", {icon : 5, anim : 6, time : 3000});
    //     return;
    // }
    var fileName2 = [];
    for (var i = 0, len = fileList4.length; i < len; i++) {
        formData.append('fileNamePath2', fileList4[i]);//file
        fileName2.push(fileList4[i].name);
        console.log(fileList4[i].name);
    }
    formData.append("fileName2", fileName2); //文件名

    //修改时有用
    formData.append("delFileIdImages", delFileIdImages); //删除得轮播图ID
    formData.append("delFileIdOthers", delFileIdOthers); //删除得其他文件ID
    formData.append("delFileIdOthers2", delFileIdOthers2); //删除得其他文件ID
//    formData.append("delFileIdImages2", delFileIdImages2); //删除得其他文件ID
    // 编辑时数据库中图片得张数
    formData.append("imageFileSize", $("#imageFileSize").val());
    if($("#imageFileSize2").val()!=null && $("#imageFileSize2").val()!=""){
        // 编辑时数据库中图片得张数
        formData.append("imageFileSize2", $("#imageFileSize2").val());
    }
    // 编辑时数据库中其他资料得个数数
    formData.append("otherFileSize", $("#otherFileSize").val());
    formData.append("otherFileSize2", $("#otherFileSize2").val());
    //产品表id
    if( $("#id").val()!=null &&  $("#id").val()!="" &&  $("#id").val()!=undefined){
        formData.append("id", $("#id").val()); //文件名
    }
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    if (ajax != null) {
        ajax.abort();
    }
    var request = "../ProductController/saveProductStep2";
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
                post("../ProductController/addAndEditProduct3",{"id":result.productId});
            }
        }
    });
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

//返回
function  back() {
    post("../ProductController/addAndEditProduct",{"id":$("#id").val()})
}


