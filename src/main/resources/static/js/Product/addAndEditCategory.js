var $window = $(window);
$window.resize(function() {
    resizewindow();
});

//选择要上传的所有文件
fileList = [];
var delFileIdImages = [];
//选择要上传的所有文件
fileList4 = [];
var delFileIdOthers = [];
var ajax;
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);

        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);

        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }
    console.log($(".ibox-content").height());

     // ibox-content2 col-xs-12
    $("#btndiv").css("top",$(".ibox-content").height()-105);

}
//图片格式
 $(function() {
    resizewindow();
     $('.file-list').fadeIn(2500);
     var classLevel = $("#classLevel").val();//分类层级
     var belongType = $("#belongType").val();
     if(classLevel > 1){//未编辑时，层级为一级，无需选择上级分类
         getClassSuper(classLevel,belongType)
     }
     if(classLevel > 2){//未编辑时，层级为一级，无需选择上级分类
         $("#choose-fileDiv1").removeClass("hidden");
         $("#choose-fileDivMsg1").removeClass("hidden");
         // $("#belongTypeDiv").removeClass("hidden");

         $("#choose-fileotherDiv1").removeClass("hidden");
         $("#choose-fileotherDivMsg").removeClass("hidden");
         $("#choose-fileotherDiv2").removeClass("hidden");

         $("#choose-fileDiv2").removeClass("hidden");
         $("#choose-fileDiv3").removeClass("hidden");
     }else{
         $("#choose-fileDivMsg1").addClass("hidden");
         $("#choose-fileDiv1").addClass("hidden");
         $("#choose-fileDiv2").addClass("hidden");
         $("#choose-fileDiv3").addClass("hidden");
         // $("#belongTypeDiv").addClass("hidden");
         $("#choose-fileotherDiv1").addClass("hidden");
         $("#choose-fileotherDivMsg").addClass("hidden");
         $("#choose-fileotherDiv2").addClass("hidden");
     }

     $("#classLevel").on("blur",function () {
         var classLevel = $("#classLevel").val();//分类层级
         var belongType = $("#belongType").val();
         if(isNaN(classLevel) || classLevel==null || classLevel=="" || classLevel.trim() ==1){
             $("#classSuperiorDiv").hide();
             $("#choose-fileDivMsg1").addClass("hidden");
             $("#choose-fileDiv1").addClass("hidden");
             $("#choose-fileDiv2").addClass("hidden");
             $("#choose-fileDiv3").addClass("hidden");
             // $("#belongTypeDiv").addClass("hidden");
             $("#choose-fileotherDiv1").addClass("hidden");
             $("#choose-fileotherDivMsg").addClass("hidden");
             $("#choose-fileotherDiv2").addClass("hidden");
             return;
         }

         if(classLevel.trim()>2){
             $("#choose-fileDivMsg1").removeClass("hidden");
             $("#choose-fileDiv1").removeClass("hidden");
             $("#choose-fileDiv2").removeClass("hidden");
             $("#choose-fileDiv3").removeClass("hidden");
             // $("#belongTypeDiv").removeClass("hidden");
             $("#choose-fileotherDiv1").removeClass("hidden");
             $("#choose-fileotherDivMsg").removeClass("hidden");
             $("#choose-fileotherDiv2").removeClass("hidden");
         }else{
             $("#choose-fileDivMsg1").addClass("hidden");
             $("#choose-fileDiv1").addClass("hidden");
             $("#choose-fileDiv2").addClass("hidden");
             $("#choose-fileDiv3").addClass("hidden");
             // $("#belongTypeDiv").addClass("hidden");
             $("#choose-fileotherDiv1").addClass("hidden");
             $("#choose-fileotherDivMsg").addClass("hidden");
             $("#choose-fileotherDiv2").addClass("hidden");
         }
         getClassSuper(classLevel,belongType);
     });

     //分类所属值变事件
     $("#belongType").on("change",function () {
         var classLevel = $("#classLevel").val();//分类层级
         var belongType = $("#belongType").val();
         if(classLevel.trim()>1){
             getClassSuper(classLevel,belongType);
         }
     });
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
         if(numold2 >= 1){
             layer.msg("最多允许上传1个ppt附件", {icon : 5, anim : 6, time : 3000});
             return;
         }
         //限制单次批量上传的数量
         var num2 = e.target.files.length;
         var numall2 = numold2 + num2;
         if(num2 >1 ){
             layer.msg("最多允许上传个ppt附件", {icon : 5, anim : 6, time : 3000});
             return;
         }else if(numall2 >1){
             layer.msg("最多允许上传1个ppt附件", {icon : 5, anim : 6, time : 3000});
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
         delFileIdOthers.push($(this).attr("id"));
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


}) ;




//获取上级父节点
function getClassSuper(classLevel,belongType){
    var json = {};
    json.classLevel = classLevel;
    json.belongType = belongType;
    json.classSuperiorMiddle = $("#classSuperiorMiddle").val();//编辑时选中的付分层的封层编号
    json.releaseFalg = $("#releaseFalg").val();//编辑时选中的付分层的封层编号

    if (ajax != null) {
        ajax.abort();
    }
    ajax = $.ajax({
        type : "POST",
        url : "../ProductController/getClassSuperior",
        data : json,
        dataType : "json",
        cache : false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success : function(result) {
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
                $("#classSuperiorSelectDiv").html(result.classSuperiorDiv);
                $("#classSuperiorDiv").show();
            }
        },
    });
}


function openfile(){
    $('#choose-file').click();
}

function openfile4(){
    $('#file4').click();
}

//返回上一部
function back(){
    post("../ProductController/addAndEditProduct",{})
}

//点击保存按钮
function save(){
    var formData = new FormData();
    if($("#categoryName").val()==null || $("#categoryName").val().trim()==""){
        layer.msg("请输入分类名称", {icon : 5, anim : 6, time : 3000});
        return;
    }
    //分类名称
    formData.append("categoryName", $("#categoryName").val());



    if($("#classLevel").val()==null || $("#classLevel").val().trim()==""){
        layer.msg("请输入分类层级", {icon : 5, anim : 6, time : 3000});
        return;
    }
    //分类的层级
    formData.append("classLevel", $("#classLevel").val());

    if(($("#type").val()==null || $("#type").val().trim()=="") && $("#classLevel").val()==3){
        layer.msg("请选择是否热销分类。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    //分类的层级
    formData.append("type", $("#type").val());


    if(($("#belongType").val()==null || $("#belongType").val().trim()=="")){
        layer.msg("请选择分类所属。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    //分类的层级
    formData.append("belongType", $("#belongType").val());

    //分类的次序
    formData.append("classOrder", $("#classOrder").val());
    //分类的上级分类编号
    if($("#classSuperior").val()!=null && $("#classSuperior").val()!="" && $("#classSuperior").val()!=undefined){
        formData.append("classSuperior", $("#classSuperior").val());
        console.log($("#classSuperior").val());
    }
    console.log($("#classLevel").val());
    if($("#classLevel").val()!=null && $("#classLevel").val()!=null && $("#classLevel").val()>1 &&
        ($("#classSuperior").val()==null || $("#classSuperior").val()=="" || $("#classSuperior").val()==undefined || $("#classSuperior").val()=="-1" || $("#classSuperior").val()==-1)){
        layer.msg("层级大于1的分类，需要选择其上级分类。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    //分类表id
    if( $("#id").val()!=null &&  $("#id").val()!="" &&  $("#id").val()!=undefined){
        formData.append("id", $("#id").val());
    }

    if(fileList.length > 1){
        layer.msg("最多允许上传1张分类图片。", {icon : 5, anim : 6, time : 3000});
        return;
    }

    var fileImageName = [];
    for (var i = 0, len = fileList.length; i < len; i++) {
        formData.append('fileImagePath', fileList[i]);//file
        fileImageName.push(fileList[i].name);
        console.log(fileList[i].name);
    }


    if(fileList4.length > 1){
        layer.msg("最多允许上传1个ppt附件。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    for (var i = 0, len = fileList4.length; i < len; i++) {
        formData.append('fileNamePath', fileList4[i]);//file
        console.log(fileList4[i].name);
    }


    //修改时有用
    formData.append("delFileIdOthers", delFileIdOthers); //删除得轮播图ID
    //修改时变种的图片张数
    formData.append("otherFileSize", $("#otherFileSize").val());

    //修改时有用
    formData.append("delFileIdImages", delFileIdImages); //删除得轮播图ID
    //修改时变种的图片张数
    formData.append("imageFileSize", $("#imageFileSize").val());

    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    if (ajax != null) {
        ajax.abort();
    }

    var request = "../ProductController/saveCategory";
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
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
                post("../ProductController/addAndEditCategory",{"id":result.id})
            }
        },
    });
}
//返回
function back(){
    post("../ProductController/categoryMaintenance",{});
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