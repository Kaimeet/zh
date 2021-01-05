var $window = $(window);
$window.resize(function() {
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;

});
//文件信息
fileList4 = [];
//要删除的文件信息
var delFileIdOthers2 = [];
$(function() {
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
        var fileType = file.type;
        //调它的readAsDataURL并把原生File对象传给它，
        fd2.readAsDataURL(file);//base64
        //监听它的onload事件，load完读取的结果就在它的result属性里了
        fd2.onload = function () {
            $list4.append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del4">删除</span></li>')
        }
    }
    /********************************其他资料 end********************************/


});
function openfile4(){
    $('#file4').click();
}
var ajax;
//点击保存按钮
function importExcel(){
    var formData = new FormData();
    for (var i = 0, len = fileList4.length; i < len; i++) {
        formData.append('fileNamePath', fileList4[i]);//file
    }
    console.log(1);
    //修改时有用
    formData.append("delFileIdOthers", delFileIdOthers2); //删除得其他文件ID
    // 编辑时数据库中其他资料得个数数
    formData.append("fileSize", $("#fileSize").val());
    //0:报价节点文件；1：图纸组附件
    formData.append("type", $("#type").val());
    // loading层
    var index1 = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    if (ajax != null) {
        ajax.abort();
    }
    var request = "../ProcessController/saveQuotationAttachment";
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
            layer.close(index1);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
                console.log(result.fileNamesAndIds);
                var fileNamesAndIds = result.fileNamesAndIds;
                var fileIds = result.fileIds;
                var existFile =  $(".otherfile-list4 li");
                //取出a标签中的附件表id信息
                $(existFile).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
                     //文件名称 //文件所在文件
                     if($(this).find(".file-del4").attr("id")!=null && $(this).find(".file-del4").attr("id")!="" && $(this).find(".file-del4").attr("id")!=undefined){
                         fileNamesAndIds+=$(this).find(".file-name").text()+":"+$(this).find(".file-del4").attr("id")+";";
                         fileIds+=$(this).find(".file-del4").attr("id")+";";
                     }
                });
                parent.$("#fileNamesAndIds").val(fileNamesAndIds);
                parent.$("#fileNamesAndIds").text(fileNamesAndIds);
                parent.$("#fileNamesAndIds").html(fileNamesAndIds);

                parent.$("#fileIds").val(fileIds);
                parent.$("#fileIds").text(fileIds);
                parent.$("#fileIds").html(fileIds);

                console.log(fileNamesAndIds);
                //当你在iframe页面关闭自身时
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                parent.layer.close(index); //再执行关闭
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