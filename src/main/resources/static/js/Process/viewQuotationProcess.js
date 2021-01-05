var $window = $(window);
$window.resize(function() {
    resizeWindow();
});

var maxIds1 = 0;
var maxIds2 = 0;
var maxIds3 = 0;
$(function() {
    resizeWindow();
    /*门扇*/
    $('#reportTable1').bootstrapTable({
        url:"../ProcessController/getDataDoorsEnd?processCode="+$("#processCode").val(),
        method: 'get',
           dataType: "json",
           dataField: 'rows',
           striped: true,//设置为 true 会有隔行变色效果
           undefinedText: "空",//当数据为 undefined 时显示的字符
           pagination: true, //设置为 true 会在表格底部显示分页条。
           showToggle: "true",//是否显示 切换试图（table/card）按钮
           showColumns: "true",//是否显示 内容列下拉框
           pageNumber: 1,//初始化加载第一页，默认第一页
           pageSize: 10,//每页的记录行数（*）
           pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
           paginationPreText: '上一页',
           paginationNextText: '下一页',
           search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
           striped : true,//隔行变色
           showColumns: false,//是否显示 内容列下拉框
           showToggle: false, //是否显示详细视图和列表视图的切换按钮
           clickToSelect: true,  //是否启用点击选中行
           data_local: "zh-US",//表格汉化
           showColumns: true,
           sidePagination: "server", //服务端处理分页
           queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"id",
                visible: false
            },
            {
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            } ,
             {
                 field:"detailsTypeName",title:"产品类型",align:"center",valign:"middle"
             },
              {
                   field:"statusName",title:"流程状态",align:"center",valign:"middle"
               },
            {
                field:"typeNameMiddle",title:"产品大类",align:"center",valign:"middle"
            } ,
            {
                field:"bomStyle",title:"款式/型号",align:"center",valign:"middle"
            },
            {
                field:"color",title:"颜色",align:"center",valign:"middle",
            },
             {
                 field:"paint",title:"油漆",align:"center",valign:"middle"
             },
            {
                field:"quoteLong",title:"长(mm)",align:"center",valign:"middle"
            },
            {
                field:"quoteWidth",title:"宽(mm)",align:"center",valign:"middle"
            },
            {
                field:"quoteThick",title:"厚(mm)",align:"center",valign:"middle"
            },{
                field:"wallThickness",title:"墙体厚度(mm)",align:"center",valign:"middle"
            },{
                field:"socketLength",title:"插口长度(mm)",align:"center",valign:"middle"
            },
          {
                field:"unit",title:"单位",align:"center",valign:"middle",sortable:"true"
            },
            {
                field:"memo",title:"生产单备注",align:"center",valign:"middle"
            },
            {
                field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",
                  formatter : function(value, row, index) {
                       var str ='<span id="msfilename'+index+'" >';
                       if(value!=null && value!=""){
                           var stringArr = value.split(";");
                           for (i = 0; i < stringArr.length; i++) {
                                var stringArrOne = stringArr[i].split(":");
                                str +='<a style="cursor: pointer;"  id="\''+stringArrOne[1]+'\'" title="'+stringArrOne[0]+'" class="line-limit-length" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                           }
                       }
                       str+='</span>';
                      return str
                  }
            },{
                  field:"fileId",
                  visible: false
            },{
                field:"fileNamesAndIdsPic",title:"图纸关附件",align:"center",valign:"middle",sortable:"true",
                  formatter : function(value, row, index) {
                       var str ='<span id="fileNamesAndIdsPic'+index+'" >';
                       if(value!=null && value!=""){
                           var stringArr = value.split(";");
                           for (i = 0; i < stringArr.length; i++) {
                                var stringArrOne = stringArr[i].split(":");
                                str +='<a style="cursor: pointer;"  id="\''+stringArrOne[1]+'\'" title="'+stringArrOne[0]+'" class="line-limit-length" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                           }
                       }
                       str+='</span>';
                      return str
                  }
          },{
              field:"fileIdPic",
              visible: false
          }
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
    //服务端分页调用方法
    function queryParams(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
    }
});
//重新计算页面尺寸
function resizeWindow(){
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
    laydate.render({
            elem: '#replyDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){
                var nowDate = new Date();
                if(  new Date(value).getTime() < nowDate.getTime()){
                    layer.msg("回复时间不能小于当前时间。", {icon:5, anim:6, time: 3000});
                }
            }
        });
});
//文件下载
function downloadFile(fileId){
	var index1=layer.load(1,{
   	 shade:[0.5,'#fff']
    });
	var jsondata = {"fileId" : fileId };
	$.ajax({
		type : 'POST',
		url : '../ProcessController/downloadFile',
		data : jsondata,
		dataType : "json",
		cache : false,
		async : true,
		success : function(result) {
			layer.close(index1);
			if(result.resultCode==1){
				$("#exportExcel").get(0).href="../ProcessController/download";//Datum_Download
				downloadFileFunc("exportExcel");
			}else{
				layer.msg(result.resultMsg, {icon : 5, anim : 6, time : 6000});
			}
		}
	});
}
//下载文件
function downloadFileFunc(field) {
	var e = document.createEvent('MouseEvent');
	e.initEvent('click', false, false);
	setTimeout(document.getElementById(field).dispatchEvent(e), 2000);
}
//返回
function back(){
    post("../ProcessController/quotationProcess",{});
}