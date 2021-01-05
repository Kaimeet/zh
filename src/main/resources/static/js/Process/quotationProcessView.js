var $window = $(window);
$window.resize(function() {
    resizewindow();
});

$(function() {

    var fileLineId = new Array();// 声明一个数组，存放要删除的门扇
    var returnCode = $("#forModelCodeMiddle").val().split(";");
    for(var i=0;i<returnCode.length;i++){
        if(returnCode[i]!=null && returnCode[i]!="" && returnCode[i]!="undefined" && returnCode[i]!=undefined){
            fileLineId.push(returnCode[i]);
        }
    }

    getResultTable("", $("#forModelCodeMiddle").val());
    //showView(fileLineId,0);

    resizewindow();
    /*************************工程报价 分可编辑与不可编辑情况**************************/
    $('#reportTable1').bootstrapTable({
            url:"../ProcessController/getDataDoorsByJson?returnCode="+$("#quoteDetailCode").val()+"&taskName='技术部领导'" ,
            method: 'post',
               dataType: "json",
               dataField: 'rows',
               striped: true,//设置为 true 会有隔行变色效果
               undefinedText: "空",//当数据为 undefined 时显示的字符
               pagination: true, //设置为 true 会在表格底部显示分页条。
               showToggle: "true",//是否显示 切换试图（table/card）按钮
               showColumns: "true",//是否显示 内容列下拉框
               pageNumber: 1,//初始化加载第一页，默认第一页
               pageSize: 40,//每页的记录行数（*）
               pageList: [40, 80, 120, 160],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
               paginationPreText: '上一页',
               paginationNextText: '下一页',
               search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
               striped : true,//隔行变色
               showColumns: false,//是否显示 内容列下拉框
               showToggle: false, //是否显示详细视图和列表视图的切换按钮
               clickToSelect: true,  //是否启用点击选中行
               data_local: "zh-US",//表格汉化
               showColumns: true,
               sidePagination: "client", //服务端处理分页
               queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
            queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
            columns: [

                {
                    field:"id",
                    visible: false
                },
                {
                    field:"flowFlag",
                    visible: false
//                     title:"flowFlag"
                },
                {
                    field:"detailsType",
                    visible: false
                },

                {
                    field:"quoteDetailCode",
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
                },{
                     field:"detailsTypeName",title:"产品类型",align:"center",valign:"middle"
                 },{
                    field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",sortable:"true"
                },/*{
                   field:"quotationDetailNumber",
                   title:"报价单编号",
                   width : '240px',
                   align : 'center'
               },*/
                {
                    field:"typeCode",title:"产品大类",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                        var str ='';
                        if(value=="MQ"){
                            str+='免漆门';
                        }else if(value=="KQ"){
                            str+='烤漆门';
                        }else if(value=="FH"){
                            str+='防火门';
                        }else if(value=="PZ"){
                            str+='拼装门';
                        }else if(value=="YM"){
                            str+='原木门';
                        }
                        return str;
                   }
                } ,

                {
                    field:"color",title:"颜色",align:"center",valign:"middle",sortable:"true"
                },
                 {
                     field:"paint",title:"油漆",align:"center",valign:"middle",sortable:"true"
                 },
                {
                    field:"quoteLong",title:"长(mm)",align:"center",valign:"middle",sortable:"true"
                },
                {
                    field:"quoteWidth",title:"宽(mm)",align:"center",valign:"middle",sortable:"true"
                },
                {
                    field:"quoteThick",title:"厚(mm)",align:"center",valign:"middle",sortable:"true"
                },
              {
                    field:"unit",title:"单位",align:"center",valign:"middle",sortable:"true"
                },
                {
                    field:"memo",title:"生产单备注",align:"center",valign:"middle",sortable:"true"
                },
                  {
                    field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                           var str ='<span id="fileNamesAndIds'+index+'" >';
                           if(value!=null && value!=""){
                               var stringArr = value.split(";");
                               for (i = 0; i < stringArr.length; i++) {
                                    var stringArrOne = stringArr[i].split(":");
                                    str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-length" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                               }
                           }
                           str+='</span>';
                          return str
                    }
                },{
                      field:"fileId",
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

/*************************技术部成本组、技术部工艺组、技术部领导 start**************************/
$('#reportTable2').bootstrapTable({
    url:"../ProcessController/getDataDoorsByJson?returnCode="+$("#quoteDetailCode").val()+"&taskName='技术部领导'" ,
    method: 'post',
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
            field:"id",
            visible: false,
             title:"id"
        },
        {
              field:"quoteDetailCode",
              visible: false
          },
        {
            field:"detailsType",
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
        },
       {
           field:"detailsTypeName",title:"产品类型",align:"center",valign:"middle"
       },/*{
            field:"craftVersion",title:"工艺版本",align:"center",valign:"middle",
            formatter : function(value, row, index) {
            var str ='';
            if(value==0){
                str+='工程版本';
            }else if(value==1){
                str+='外贸版本';
            }
            return str;
            }
        },*/
        {
            field:"typeCode", visible: false
        },{
            field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",sortable:"true"
        },/*{
              field:"quotationDetailNumber",
              title:"报价单编号",
              width : '200px',
              align : 'center'
          },*/
        {
            field:"modelName",title:"BOM名称",align:"center",valign:"middle",sortable:"true",width:"250px"
        },
         {
             field:"modelCode",
             visible: false,
             title:"模型编号"
         },
        {
            field:"companyName",title:"组织名称",align:"center",valign:"middle",sortable:"true"
        },
          {
              field:"companyCode",
              visible: false,
              title:"组织编号"
          },
        {
            field:"baseName",title:"生产基地",align:"center",valign:"middle",sortable:"true"
        },
       {
           field:"baseCode",
           visible: false
       },
       {
           field:"quoteLong",title:"长(mm)",align:"center",valign:"middle",sortable:"true"
       },
       {
           field:"quoteWidth",title:"宽(mm)",align:"center",valign:"middle",sortable:"true"
       },
       {
           field:"quoteThick",title:"厚(mm)",align:"center",valign:"middle",sortable:"true"
       },
        {
            field:"parameterString",
            visible: false
        },
        {
             field:"modelMassage",title:"操作",align:"center",valign:"middle",sortable:"true",
             formatter : function(value, row, index) {
                 var str ="-";
                 if($("#viewModelMassageMethod0").val() ==null || $("#viewModelMassageMethod0").val() ==""  || $("#viewModelMassageMethod0").val() ==undefined || $("#viewModelMassageMethod0").val() !=null && $("#viewModelMassageMethod0").val()!="" && $("#viewModelMassageMethod0").val() == 0   ){
                     str = '<button type="button" class="btn btn-s-xs greenbtn"  onclick="viewModelMassage(\''+row.quoteLong+'\',\''+row.quoteWidth+'\',\''+row.quoteThick+'\',\''+row.modelCode+'\',\''+row.quoteDetailCode+'\',\''+row.codeForModel+'\',0,'+index+')"">查看BOM明细</button>';
                 }
                 return str;
             }
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

    /*************************技术部成本组、技术部工艺组、技术部领导 end**************************/


    /*************************图纸组**************************/
    $('#reportTable3').bootstrapTable({
                    url:"../ProcessController/getDataDoorsByJson?returnCode="+$("#quoteDetailCode").val()+"&taskName='技术部领导'" ,
                    method: 'post',
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
                            field:"id",
                            visible: false
                        },
                        {
                            field:"quoteDetailCode",
                            visible: false
                        },{
                              field:"detailsType",
                              visible: false
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
                        },
                      {
                          field:"detailsTypeName",title:"产品类型",align:"center",valign:"middle"
                      },{
                            field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",sortable:"true"
                        }/*,{
                           field:"quotationDetailNumber",
                           title:"报价单编号",
                           width : '200px',
                           align : 'center'
                       }*/,
                        {
                            field:"fileNamesAndIdsPic",title:"图纸关附件",align:"center",valign:"middle",sortable:"true",
                              formatter : function(value, row, index) {
                                   var str ='<span id="fileNamesAndIdsPic'+index+'" >';
                                   if(value!=null && value!=""){
                                       var stringArr = value.split(";");
                                       for (i = 0; i < stringArr.length; i++) {
                                            var stringArrOne = stringArr[i].split(":");
                                            str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-lengthpic" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                                       }
                                   }
                                   str+='</span>';
                                  return str
                              }
                      },{
                          field:"fileIdPic",
                          visible: false
                      }
                    ] ,
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

//返回
function back() {
    post("../ProcessController/archivedProcess",{menuid:$("#menuid").val()})
}

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
//设置模型参数
function  viewModelMassage(quoteLong,quoteWidth,quoteThick,modelCode,quoteDetailCode,codeForModel,flag,indexNumber){
    showExcelData1(codeForModel);
}


function showExcelData1(codeForModel) {
    var progarm = "?flag="+0+"&codeForModels="+codeForModel+"&menuid="+$("#menuid").val();
    var url ="../ExcelPlugController/excelPage" + progarm;
    window.open(url, "_blank");
}


function ToBomTrial() {
    var code = $("#quoteDetailCode").val();
    window.location.href="../BomContoller/bomTrial?code=" + code +"&menuid="+$("#menuid").val();
}