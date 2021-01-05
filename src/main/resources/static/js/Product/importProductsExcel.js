var $window = $(window);
$window.resize(function() {
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
fileList4 = [];
var delFileIdOthers2 = [];
$(function() {
    console.log("a");
    /********************************要导入的Excel start********************************/
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
                layer.msg("最多允许上传1个Excel文件", {icon : 5, anim : 6, time : 3000});
                return;
            }
            //限制单次批量上传的数量
            var num2 = e.target.files.length;
            var numall2 = numold2 + num2;
            if(num2 >1 ){
                layer.msg("最多允许上传1个Excel文件", {icon : 5, anim : 6, time : 3000});
                return;
            }else if(numall2 > 1){
                layer.msg("最多允许上传1个Excel文件", {icon : 5, anim : 6, time : 3000});
                return;
            }
            //原生的文件对象，相当于$file.get(0).files;//files[0]为第一张图片的信息;
            curFile4 = this.files;

            var fileDir = $("#file4").val();    
            var suffix = fileDir.substr(fileDir.lastIndexOf("."));    
            if("" == fileDir){    
                MessageUtil.alert("选择需要导入的Excel文件！");
                return false;    
            }    
            if(".xls" != suffix && ".xlsx" != suffix ){    
                MessageUtil.alert("选择Excel格式的文件导入！");
                $('#file4').val("");
                return false;  
            }


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
//点击选中文件按钮
function openfile4(){
    $('#file4').click();
}
var ajax;
//点击保存将Excel的数据导入数据库
function importExcel(){
    var formData = new FormData();
     if(fileList4.length >1){
        layer.msg("最多允许上传1个Excel文件。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    for (var i = 0, len = fileList4.length; i < len; i++) {
        formData.append('fileNamePath2', fileList4[i]);//file
        console.log(fileList4[i].name);
    }
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    if (ajax != null) {
        ajax.abort();
    }
    var request = "../ProductController/saveProductsExcel";
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
                layer.msg(result.resultMassage, {icon : 6, anim : 6, time : 3000});
            }
        }
    });
}