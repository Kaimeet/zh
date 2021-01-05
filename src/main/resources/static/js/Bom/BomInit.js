// var $window = $(window);
// $window.resize(function() {
//     resizeWindow();
// });
// var maxIds3 = 0;
//
// $(document).ready(function() {
//     //获取角色
//     //getUserRoleIDs();
//
//     //获取角色
//     getLC();
// });
//
// /**
//  * 所有入参
//  * @type {{}}
//  */
// var dataInput = {};
//
// //所有结果
// var allData = [] ;
//
// var roleIDs = [];
//
// var detailCanChange = false;
//
// // 流程节点名称
// let taskNameMiddle = null ;
//
// var cxProgress = '技术部成本组';
// var gyProgress = '技术部工艺组';
// var ldProgress = '技术部领导';
//
//
// /**
//  * 总表 根据 不同流程节点 展示不同列
//  * @returns {Array}
//  */
// function getColumns() {
//     var colums = [];
//     if (taskNameMiddle){
//     }
//     else
//     {
//         taskNameMiddle = ldProgress;
//     }
//
//     let jiedianList = [];
//     jiedianList.push(cxProgress);
//     jiedianList.push(gyProgress);
//     jiedianList.push(ldProgress);
//
//     if (jiedianList.includes(taskNameMiddle)){
//     }
//     else
//     {
//         taskNameMiddle = ldProgress;
//     }
//
//     // 成本组
//     if (taskNameMiddle === cxProgress){
//         colums = [
//             /*{
//                 field:"checkFlag",
//                 checkbox: true
//             },*/
//             {
//                 field:"id",
//                 visible: false
//             },
//             {
//                 field:"rowIndex",
//                 title:"序号",
//                 width : '45px',
//                 align : 'center',
//                 formatter : function(value, row, index) {
//                     return index + 1;
//                 }
//             },
//             {
//                 field:"quotationDetailNumber",
//                 title:"单据明细编号",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//                 visible: false
//             },
//             {
//                 field:"bomStyle",
//                 title:"款式/型号",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//             },
//
//             {
//                 field:"effectiveMaterialCost",
//                 title:"有效材料成本",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//             },
//             {
//                 field:"normalProcessLoss",
//                 title:"正常损耗成本",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//             },
//             {
//                 field:"abnormalMaterialLoss",
//                 title:"异常材料损耗",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true"
//             },
//             {
//                 field:"cc",
//                 title:"操作",
//                 align:"center",
//                 valign:"middle",
//                 formatter:operateFormatter
//             }
//         ] ;
//     }
//     // 工艺改进组
//     if (taskNameMiddle === gyProgress){
//         colums=  [
//           /*  {
//                 field:"checkFlag",
//                 checkbox: true
//             },*/
//             {
//                 field:"id",
//                 visible: false
//             },
//             {
//                 field:"rowIndex",
//                 title:"序号",
//                 width : '45px',
//                 align : 'center',
//                 formatter : function(value, row, index) {
//                     return index + 1;
//                 }
//             },
//             {
//                 field:"quotationDetailNumber",
//                 title:"单据明细编号",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//                 visible: false
//             },
//             /*{
//                 field:"bomStyle",
//                 title:"款式/型号",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//             },*/
//             {
//                 field:"bomStyle",
//                 title:"款式/型号",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//             },
//
//             {
//                 field:"effectiveMaterialCost",
//                 title:"有效材料成本",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//             },
//             {
//                 field:"normalProcessLoss",
//                 title:"正常损耗成本",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true",
//             },
//             {
//                 field:"abnormalMaterialLoss",
//                 title:"异常材料损耗",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true"
//             },
//             {
//                 field:"unitPrice",
//                 title:"人工成本",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true"
//             },
//             {
//                 field:"socialSecurityBenefits",
//                 title:"社保福利费",
//                 align:"center",
//                 valign:"middle",
//                 sortable:"true"
//             },
//             {
//                 field:"cc",
//                 title:"操作",
//                 align:"center",
//                 valign:"middle",
//                 formatter:operateFormatter
//             }
//         ];
//     }
//     // 技术部领导审核
//     if (taskNameMiddle === ldProgress){
//         colums =  [
//        /*{
//            field:"checkFlag",
//            checkbox: true
//        },*/
//        {
//            field:"id",
//            visible: false
//        },
//        {
//            field:"rowIndex",
//            title:"序号",
//            width : '45px',
//            align : 'center',
//            formatter : function(value, row, index) {
//                return index + 1;
//            }
//        },
//        {
//            field:"quotationDetailNumber",
//            title:"单据明细编号",
//            align:"center",
//            valign:"middle",
//            sortable:"true",
//            visible: false
//        },
//        /*{
//            field:"bomStyle",
//            title:"款式/型号",
//            align:"center",
//            valign:"middle",
//            sortable:"true",
//        },*/
//        {
//            field:"bomStyle",
//            title:"款式/型号",
//            align:"center",
//            valign:"middle",
//            sortable:"true",
//        },
//
//        {
//            field:"effectiveMaterialCost",
//            title:"有效材料成本",
//            align:"center",
//            valign:"middle",
//            sortable:"true",
//        },
//        {
//            field:"normalProcessLoss",
//            title:"正常损耗成本",
//            align:"center",
//            valign:"middle",
//            sortable:"true",
//        },
//        {
//            field:"abnormalMaterialLoss",
//            title:"异常材料损耗",
//            align:"center",
//            valign:"middle",
//            sortable:"true"
//        },
//        {
//            field:"unitPrice",
//            title:"人工成本",
//            align:"center",
//            valign:"middle",
//            sortable:"true"
//        },
//        {
//            field:"socialSecurityBenefits",
//            title:"社保福利费",
//            align:"center",
//            valign:"middle",
//            sortable:"true"
//        },
//        {
//            field:"normalElectricityBill",
//            title:"正常电费",
//            align:"center",
//            valign:"middle",
//            sortable:"true"
//        },
//        {
//            field:"totalVariableCosts",
//            title:"可变成本",
//            align:"center",
//            valign:"middle",
//            sortable:"true"
//        },
//        {
//            field:"totalCostWithoutTax",
//            title:"制造成本",
//            align:"center",
//            valign:"middle",
//            sortable:"true",
//            visible: false
//        },
//        {
//            field:"totalCost",
//            title:"总成本",
//            align:"center",
//            valign:"middle",
//            sortable:"true"
//        },
//        {
//            field:"cc",
//            title:"操作",
//            align:"center",
//            valign:"middle",
//            formatter:operateFormatter
//        }
//    ];
//     }
//     return colums;
// }
//
// function operateFormatter(value, row, index) {
//     var bomDetail = false;
//     var laborData = false;
//     var zzDetail = false;
//
//     // 成本组
//     if (taskNameMiddle === cxProgress){
//         bomDetail = true;
//     }
//     // 工艺改进组
//     if (taskNameMiddle === gyProgress){
//         bomDetail = true;
//         laborData = true;
//     }
//     // 技术部领导审核
//     if (taskNameMiddle === ldProgress){
//         bomDetail = true;
//         laborData = true;
//         zzDetail = true;
//     }
//
//     var resultHtml = new Array();
//     var contanerID =  "container" + row.id;
//     var rgmx = "showBomDetail(1,'"+row.codeForModel+"','"+ row.mainID +"')";
//     //var qd = "showBomDetail(2,'"+row.detailID+"','"+ row.mainID +"')";
//
//     var qd = "showExcelData('"+row.codeForModel+"',0)";
//
//     var zzcb = "showBomDetail(3,'"+row.codeForModel+"','"+ row.mainID +"')";
//     var toExcel = "showBomDetail(4,'"+row.codeForModel+"','"+ row.mainID +"')";
//     var toPTCExcel = "showBomDetail(5,'"+row.codeForModel+"','"+ row.mainID +"')";
//     resultHtml.push('<div class="btn-group">');
//
//     if(($("#showBomDetailMethod2").val() ==null || $("#showBomDetailMethod2").val() ==""  || $("#showBomDetailMethod2").val() ==undefined ||
//         $("#showBomDetailMethod2").val() !=null && $("#showBomDetailMethod2").val()!="" && $("#showBomDetailMethod2").val() == 0) && bomDetail  ){
//
//         resultHtml.push('<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ qd +' " >Bom清单明细</button>');
//     }
//
//     if(($("#showBomDetailMethod1").val() ==null || $("#showBomDetailMethod1").val() ==""  || $("#showBomDetailMethod1").val() ==undefined ||
//         $("#showBomDetailMethod1").val() !=null && $("#showBomDetailMethod1").val()!="" && $("#showBomDetailMethod1").val() == 0 ) && laborData  ){
//         resultHtml.push('<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ rgmx +' " >人工成本明细</button>');
//     }
//
//     if(($("#showBomDetailMethod3").val() ==null || $("#showBomDetailMethod3").val() ==""  || $("#showBomDetailMethod3").val() ==undefined ||
//         $("#showBomDetailMethod3").val() !=null && $("#showBomDetailMethod3").val()!="" && $("#showBomDetailMethod3").val() == 0 ) && zzDetail){
//         resultHtml.push('<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ zzcb +' " >制造成本明细</button>');
//         // resultHtml.push('<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ toExcel +' " >Bom清单明细（Excel插件）</button>');
//         // resultHtml.push('<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ toPTCExcel +' " >Bom清单明细（Excel插件葡萄城）</button>');
//     }
//
//     resultHtml.push('</div>');
//     return resultHtml.join('');
// };
//
// /**
//  * 数据初始化
//  * @param type
//  * @param flag 0:归档查看结果；1：审核查看结
//  * @param detailIDs
//  * @constructor
//  */
// function DataInit(datas) {
//     var rgcbCellIndex = 6 ;
//     var zzcbCellIndex = 7 ;
//     $('#reportTable4').bootstrapTable('destroy');
//     $('#reportTable4').bootstrapTable({
//         //url:"../BomContoller/InitBomViews",
//         method: 'post',
//         contentType : "application/json",  //"x-www-form-urlencoded", //
//         dataType: "json",
//         dataField: 'data',
//         striped: true,//设置为 true 会有隔行变色效果
//         undefinedText: "空",//当数据为 undefined 时显示的字符
//         pagination: true, //设置为 true 会在表格底部显示分页条。
//         showToggle: "true",//是否显示 切换试图（table/card）按钮
//         showColumns: "true",//是否显示 内容列下拉框
//         pageNumber: 1,//初始化加载第一页，默认第一页
//         pageSize: 10,//每页的记录行数（*）
//         pageList: [ 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
//         paginationPreText: '上一页',
//         paginationNextText: '下一页',
//         search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
//         striped : true,//隔行变色
//         showColumns: false,//是否显示 内容列下拉框
//         showToggle: false, //是否显示详细视图和列表视图的切换按钮
//         clickToSelect: true,  //是否启用点击选中行
//         data_local: "zh-US",//表格汉化
//         showColumns: true,
//         sidePagination: "client", //服务端处理分页
//         queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
//         queryParams: queryParams3,//请求远程数据时，可以通过修改queryParams发送其他参数。
//         columns: getColumns(),
//         onClickRow:function (row,$element) {
//             // console.log($element);
//             // var jsonStr = JSON.stringify(row);
//             var clickCellIndex =  $element.context.cellIndex;
//             if (clickCellIndex === rgcbCellIndex)
//             {
//             }else if(clickCellIndex === zzcbCellIndex )
//             {
//             }
//         },
//         onLoadSuccess: function () {
//             //为技术部图纸组、技术部成本组、技术部工艺组、技术部领导不能上传文件
//             if(allFlag != null && allFlag != "" && allFlag != undefined){
//                 if(allFlag==0){//0:归档查看结果；1：审核查看结果
//                     $("#reportTable4").bootstrapTable('hideColumn', 'detailID');//隐藏上述taskName列
//                 }else{
//                     $("#reportTable4").bootstrapTable('showColumn', 'detailID');//隐藏上述taskName列
//                 }
//              }
//         },
//         data:datas,
//         responseHandler:function(res){
//             // return [res.data];
//         },
//         onPostBody:function(data){
//             console.log("change !!!");
//         }
//     });
//
//     //服务端分页调用方法
//     function queryParams3(para) {
//         var data =
//            {"pargrams":
//                 [
//                 {
//                     "modelCode":"001",
//                     "modelType":"DOOR_LEAF",
//                     "param": {
//                         "height":2100,
//                         "width":800,
//                         "doorLeafThickness":40,
//                         "pvcColor":"深柚木1846-37（16S*1.25M）",
//                         "panelThickness":6,
//                         "type":"条玻门",
//                         "variableCodeOfType":"V001",
//                         "glassType":"钢化玉砂玻璃",
//                         "fillMode":"空心刨花板",
//                         "needInner":true,
//                         "innerMaterial":"LVL",
//                         "needHingeWood":true,
//                         "needShutter":true,
//                         "needMiddleLayer":false,
//                         "needHorizontalAluBar":false,
//                         "needKaraAluBar":false,
//                         "processVersion":"工程版本",
//                         "productionBaseCode":'01'
//                     }
//                 }
//                 ]
//        };
//         var datas= JSON.stringify(data)
//         return datas;
//     }
// };
//
// /**
//  * 流程节点 判断是否可修改
//  */
// function getLC() {
//     taskNameMiddle =  $("#taskName").val();
//
//     if (taskNameMiddle){
//         if (taskNameMiddle == gyProgress){
//             detailCanChange = true ;
//         }
//         else
//         {
//             detailCanChange = false;
//         }
//     }
//     else {
//         taskNameMiddle = ldProgress ;
//     }
//
//
//
// }
//
// function getUserRoleIDs(detailIDs) {
//     $.ajax({
//         url : '../BomContoller/getUserRoleIDs',
//         type: "GET",
//         datatype:"json",
//         contentType: "application/json;charset=utf-8",
//         success : function(data, stats) {
//             //dataInput = obj ;
//             if (data.success == 'true'){
//                 roleIDs = data.data;
//                 var a = roleIDs.indexOf(1); // 2
//                 if (a===-1){
//                     detailCanChange = false;
//                 }
//                 else {
//                     //可修改
//                     detailCanChange = true;
//                 }
//             }
//             else {
//                 roleIDs = [];
//             }
//         },
//         error : function(data) {
//             alert("请求失败");
//         },
//     })
// }
//
// /**
//  * 生成报价 保存并展示
//  * @param obj
//  * @param type
//  * @constructor
//  */
// function DataShow(obj , type) {
//     //  人工成本 6
//     //  制造成本 7
//     if (type=='init'){
//     }
//     else if (type=='check')
//     {
//     }
//     else
//     {
//         return;
//     }
//
//     $.ajax({
//         url : '../BomContoller/InitBomViews',
//         type: "POST",
//         datatype:"json",
//         contentType: "application/json;charset=utf-8",
//         data:JSON.stringify(obj),
//         success : function(data, stats) {
//             if (data.data!=null){
//                 DataInit(data.data);
//                 dataInput = obj ;
//                 allData = data.data ;
//                 return true;
//             }
//             else {
//                 layer.msg("生成失败，请稍后再试。 " + data.msg , {icon: 5, anim: 6, time: 3000});
//                 return  false;
//             }
//         },
//         error : function(data) {
//             layer.msg("请求失败。", {icon: 5, anim: 6, time: 3000});
//             return false;
//         },
//     })
// }
//
// /**
//  * 展示已存在报价 并 展示
//  * @param flag 0:归档查看结果；1：审核查看结果
//  * @param detailIDs
//  */
// var allFlag;
// function showView(detailIDs,flag) {
//     allFlag = flag;
//     $.ajax({
//         url : '../BomContoller/GetHistoryBomViews',
//         type: "post",
//         datatype:"json",
//         contentType: "application/json;charset=utf-8",
//         data:JSON.stringify(detailIDs),
//         success : function(data, stats) {
//             //dataInput = obj ;
//             if (data.success == 'true'){
//                 allData = data.data ;
//                 DataInit(data.data);
//             }
//             else {
//                 allData = null ;
//             }
//         },
//         error : function(data) {
//             alert("请求失败");
//         },
//     })
// }
//
// function SaveProgramsInit() {
//     var programs = {
//         boms:[]
//     };
//     //获取所有 明细ID
//     for (var i = 0; i < dataInput.pargrams.length; i++) {
//         var val= allData.find(function (ele,index) {
//                return ele.detailID == dataInput.pargrams[i].detailID;
//             });
//         var cell = {
//           initBomViewCell : dataInput.pargrams[i],
//           bomViewOutput : val
//         }
//         programs.boms.push(cell);
//     }
//     return programs;
// }
//
// //$("#quoteDetailCode").val()
//
//
// /*************************技术部成本组、技术部工艺组、技术部领导 start**************************/
//
//
//
// /*************************技术部成本组、技术部工艺组、技术部领导 end**************************/
//
// /**
//  * 保存BOM
//  * @param obj
//  * @constructor
//  */
// function SaveBoms() {
//     var p = SaveProgramsInit();
//     $.ajax({
//         url : '../BomContoller/SaveBomViews',
//         type: "POST",
//         datatype:"json",
//         contentType: "application/json;charset=utf-8",
//         data:JSON.stringify(p),
//         success : function(data, stats) {
//           console.log()
//         },
//         error : function(data) {
//             alert("请求失败");
//         },
//     })
// }
//
// //重新计算页面尺寸
// function resizeWindow(){
//     var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;
//     if($("#bwType").val()==0){
//         $(".ibox-content").height(n);
//         $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
//         $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
//         //表格主体的高度
//         $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
//         $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
//     }else{
//         $(".ibox-content").height(n);
//         $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
//         $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
//         $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
//         $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
//     }
// }
// var form,flow,element,layer;
// layui.use(['form','flow','element','layer','laydate'], function() {
//     form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
//     laydate.render({
//             elem: '#replyDate' //创建时间
//             ,type: 'date'
//             // ,range: true //或 range: '~' 来自定义分割字符
//             ,format: 'yyyy-MM-dd' //可任意组合
//             // ,isInitValue: false //是否允许填充初始值，默认为 true
//             ,done: function(value, date, endDate){
//                 var nowDate = new Date();
//                 if(  new Date(value).getTime() < nowDate.getTime()){
//                     layer.msg("回复时间不能小于当前时间。", {icon:5, anim:6, time: 3000});
//                 }
//             }
//         });
// });
//
//
// //列表新增一行数据
// function addRow(tabFlag) {
//         var count = $('#reportTable4').bootstrapTable('getData').length;
//         $('#reportTable4').bootstrapTable('insertRow', {
//             index: count,
//             row: {
//                 bomSeries: "",
//                 bomStyle: "",
//                 bomColor: "",
//                 bomLong: "",
//                 bomWidth: "",
//                 bomThick: "",
//                 needGlassFlag: "",
//                 unit: "",
//                 memo: "",
//                 id: maxIds3 - 1,
//                 setOfBooks: "",
//                 productionBase: "",
//                 paint: ""
//             }
//         });
//         maxIds3--;
//     }
// var delArraysXT = new Array();// 声明一个数组，存放要删除的线条
//
// //列表删除操作
// function delRow(tabFlag) {
//         var rows = $("#reportTable4").bootstrapTable('getSelections');
//         if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
//             layer.msg("请先选择要删除的记录!", {icon: 5, anim: 6, time: 3000});
//             return;
//         } else {
//             $(rows).each(function () {// 通过获得别选中的来进行遍历
//                 $("#reportTable4").bootstrapTable('remove', {field: 'id', values: "'" + this.id + "'"});
//                 if (this.id > 0) {
//                     delArraysXT.push();
//                 }
//             });
//         }
// }
//
// /**
//  * 明细弹窗
//  * @param type
//  * @param orderDetail
//  * @param mainID
//  */
// function showBomDetail(type,codeForModelC,mainID) {
//     allData = $("#reportTable4").bootstrapTable('getData');
//     var dataList = allData.filter(function(item,index,array){
//         return item.codeForModel == codeForModelC ;
//     });
//
//     var tart = '';
//     var btnList = ['返回'] ;
//     if (type==1){
//         tart= '../BomContoller/bomLaborCost?menuid='+$("#menuid").val();
//         if (detailCanChange){
//             btnList = ['保存', '返回'];
//         }
//     }else if (type==2){
//         tart= '../BomContoller/bomInitDetail?menuid='+$("#menuid").val();
//         if (detailCanChange){
//             btnList = ['保存', '返回'];
//         }
//     }else if (type==3){
//         tart= '../BomContoller/bomManufacturingCost?menuid='+$("#menuid").val();
//     }
//     parent.layer.open({
//         type: 2,
//         title: false,
//         area: ['100%', '100%'],
//         btn: btnList,
//         success: function(layero, index){
//             var iframeWin  = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：
//             //iframeWin.DataShowDetail("init","1234");
//             var dataValue = null;
//             var allCost = 0 ;
//             // 人工
//             if (type == 1){
//                 //DataInit(data.data[0].laborCostResult ,data.data[0].laborCost);
//                 dataValue = dataList[0].laborCostResult ;
//                 allCost = dataList[0].laborCostResult.allLaborCost ;
//                 var addLaBor = dataList[0].additionalLaborCost ;
//                 iframeWin.setAddLaborValue(0);
//                 iframeWin.setCanChange(detailCanChange);
//             }
//             // 明细
//             else if (type==2){
//
//             }
//             // 制造成本
//             else if(type==3)
//             {
//                 dataValue = dataList[0].manufacturingCostDetail;
//                 allCost = dataList[0].totalCostWithoutTax;
//             }
//             var showData = JSON.parse(JSON.stringify(dataValue));
//             iframeWin.DataInit(showData ,allCost);
//         },
//         yes: function(index, layero){
//             //按钮【按钮一】的回调
//             //注意：parent 是 JS 自带的全局对象，可用于操作父页面
//             if (type ==2 && detailCanChange){
//                 var iframeWin = window[layero.find('iframe')[0]['name']];
//                 // 调接口更新
//                 iframeWin.SaveChange(orderDetail,mainID);
//                 //var currentRowData = iframeWin.getChangeBackData()
//             }
//             else if(type==1 && detailCanChange){
//                 var iframeWin = window[layero.find('iframe')[0]['name']];
//                 // 调接口更新
//                 iframeWin.SaveChange(codeForModelC);
//             }
//             else
//             {
//                 parent.layer.close(index);
//             }
//         }
//         ,btn2: function(index, layero){
//             // 按钮【按钮二】的回调
//             // return false 开启该代码可禁止点击该按钮关闭
//
//             var iframeWin = window[layero.find('iframe')[0]['name']];
//             // 判断是否发生修改
//             if (iframeWin.getIfModify()){
//
//             }else
//             {
//                 console.log("nochange");
//                 parent.layer.close(index);
//                 return ;
//             }
//
//             if (type == 1){
//                 // 人工明细数据
//                 var datas = iframeWin.getChangeBackData();
//
//                 dataList[0].laborCostResult = datas.laborCostResult;
//
//                 dataList[0].abnormalMaterialLoss = datas.bomCostStatistics.abnormalMaterialLoss ;
//                 dataList[0].effectiveMaterialCost = datas.bomCostStatistics.effectiveMaterialCost ;
//                 dataList[0].fixedCosts = datas.bomCostStatistics.fixedCosts ;
//                 dataList[0].normalElectricityBill = datas.bomCostStatistics.normalElectricityBill ;
//                 dataList[0].normalProcessLoss = datas.bomCostStatistics.normalProcessLoss ;
//                 dataList[0].otherVariableExpenses = datas.bomCostStatistics.otherVariableExpenses ;
//                 dataList[0].socialSecurityBenefits = datas.bomCostStatistics.socialSecurityBenefits ;
//                 dataList[0].totalCostWithoutTax = datas.bomCostStatistics.totalCostWithoutTax ;
//                 dataList[0].totalVariableCosts = datas.bomCostStatistics.totalVariableCosts ;
//                 dataList[0].unitPrice = datas.bomCostStatistics.unitPrice ;
//
//
//                 //dataList[0].totalCostExcludeTax_val = dataList[0].totalCostExcludeTax_val + ex;
//                 console.log(datas);
//             }
//
//             if (type ==2){
//
//             }
//
//             DataInit(allData);
//             parent.layer.close(index);
//         },
//         closeBtn: 0,
//         content: tart, // chooseBomType
//         end: function () {
//
//         }
//     });
// }
//
// /**
//  * 明细弹窗
//  * @param type
//  * @param orderDetail
//  * @param mainID
//  */
// function showBomDetail_Back(type,orderDetail,mainID) {
//
//
//     var dataList = allData.filter(function(item,index,array){
//         return item.detailID == orderDetail ;
//     });
//     var tart = '';
//     var btnList = ['返回'] ;
//     if (type==1){
//         tart= '../BomContoller/bomLaborCost?menuid='+$("#menuid").val();
//         if (detailCanChange){
//             btnList = ['保存', '返回'];
//         }
//     }else if (type==2){
//         tart= '../BomContoller/bomInitDetail?menuid='+$("#menuid").val();
//         if (detailCanChange){
//             btnList = ['保存', '返回'];
//         }
//     }else if (type==3){
//             tart= '../BomContoller/bomManufacturingCost?menuid='+$("#menuid").val();
//      }
//     else if (type==4){
//         tart= '../ProcessController/execlEditPageForBomDetail?orderID='+ orderDetail;
//         parent.layer.open({
//             type: 2,
//             title: false,
//             area: ['100%', '100%'],
//             btn: ['返回'],
//             success: function(layero, index){
//             },
//             yes: function(index, layero){
//                 parent.layer.close(index);
//             },
//             btn2: function(index, layero){},
//             closeBtn: 0,
//             content: tart, // chooseBomType
//             end: function () {
//             }
//         });
//         return ;
//     }
//     else if (type==5){
//         tart= '../ProcessController/execlEditPageForBomDetailForSpread?orderID='+ orderDetail;
//         parent.layer.open({
//             type: 2,
//             title: false,
//             area: ['100%', '100%'],
//             btn: ['返回'],
//             success: function(layero, index){
//             },
//             yes: function(index, layero){
//                 parent.layer.close(index);
//             },
//             btn2: function(index, layero){},
//             closeBtn: 0,
//             content: tart, // chooseBomType
//             end: function () {
//             }
//         });
//         return ;
//     }
//
//     parent.layer.open({
//         type: 2,
//         title: false,
//         area: ['100%', '100%'],
//         btn: btnList,
//         success: function(layero, index){
//             var iframeWin  = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：
//             //iframeWin.DataShowDetail("init","1234");
//             var dataValue = null;
//             var allCost = 0 ;
//             // 人工
//             if (type == 1){
//                 //DataInit(data.data[0].laborCostResult ,data.data[0].laborCost);
//                 dataValue = dataList[0].laborCostResult ;
//                 allCost = dataList[0].laborCost ;
//                 var addLaBor = dataList[0].additionalLaborCost ;
//                 iframeWin.setAddLaborValue(addLaBor);
//                 iframeWin.setCanChange(detailCanChange);
//             }
//             // 明细
//             else if (type==2){
//                 dataValue = dataList[0].bomDetailViewExtendList ;
//                 var needSummary = dataList[0].needSummary ;
//                 if (needSummary){
//                     iframeWin.setSummaryRuleMap(dataList[0].summaryRuleMap);
//                     iframeWin.setTotalSummaryRuleMap(dataList[0].totalSummaryRuleMap);
//                 }
//                 allCost = dataList[0].effectiveMaterialCost ;
//                 iframeWin.setCanChange(detailCanChange);
//                 iframeWin.setNormalAllCost(dataList[0].materialCost);
//
//             }
//             // 制造成本
//             else if(type==3)
//             {
//                 dataValue = dataList[0].manufacturingCostDetail ;
//                 allCost = dataList[0].manufacturingCost ;
//             }
//             var showData = JSON.parse(JSON.stringify(dataValue));
//             iframeWin.DataInit(showData ,allCost);
//         },
//         yes: function(index, layero){
//              //按钮【按钮一】的回调
//              //注意：parent 是 JS 自带的全局对象，可用于操作父页面
//             if (type ==2 && detailCanChange){
//                 var iframeWin = window[layero.find('iframe')[0]['name']];
//                 // 调接口更新
//                 iframeWin.SaveChange(orderDetail,mainID);
//                 //var currentRowData = iframeWin.getChangeBackData()
//
//             }
//             else if(type==1 && detailCanChange){
//                 var iframeWin = window[layero.find('iframe')[0]['name']];
//                 // 调接口更新
//                 iframeWin.SaveChange(orderDetail,mainID);
//             }
//             else
//             {
//                 parent.layer.close(index);
//             }
//         }
//         ,btn2: function(index, layero){
//             // 按钮【按钮二】的回调
//             // return false 开启该代码可禁止点击该按钮关闭
//
//             var iframeWin = window[layero.find('iframe')[0]['name']];
//             // 判断是否发生修改
//             if (iframeWin.getIfModify()){
//             }else
//             {
//                 console.log("nochange");
//                 parent.layer.close(index);
//                 return ;
//             }
//
//             if (type == 1){
//                 // 人工明细数据
//                 var datas = iframeWin.getChangeBackData();
//                 var allCount = iframeWin.getAllCost();
//                 // ALL
//                 var beforeLaborCost = dataList[0].laborCost;
//                 // q - h
//                 var ex = allCount - beforeLaborCost ;
//                 dataList[0].laborCost = allCount ;
//                 dataList[0].laborCostResult = datas.laborCostResult;
//                 dataList[0].totalCostExcludeTax_val = dataList[0].totalCostExcludeTax_val + ex;
//                 console.log(datas);
//             }
//
//             if (type ==2){
//                 // 行数据
//                 var datas = iframeWin.getData();
//                 // 有效金额
//                 var allCount = iframeWin.getAllCost();
//                 // 金额
//                 var allCostNormal = iframeWin.getNormalAllCost();
//                 // 正常损耗成本
//                 var normalLost = iframeWin.getNormalLost();
//                 // 可变成本
//                 var variableCost = iframeWin.getVariableCost()
//                 // 总计
//                 var total = iframeWin.getTotal();
//
//
//                 // ALL
//                 var effectiveMaterialCostq = dataList[0].effectiveMaterialCost;
//                 // q - h
//                 var ex = allCount - effectiveMaterialCostq ;
//
//                 // 有效 金额
//                 dataList[0].effectiveMaterialCost = allCount;
//                 // 金额
//                 dataList[0].materialCost = allCostNormal ;
//                 // 行数据
//                 dataList[0].bomDetailViewExtendList = datas;
//                 // 损耗
//                 dataList[0].normalProcessLoss = normalLost ;
//                 // 可变成本
//                 dataList[0].variableCost = variableCost ;
//                 // 总额
//                 //dataList[0].totalCostExcludeTax_val = dataList[0].totalCostExcludeTax_val + ex;
//                 dataList[0].totalCostExcludeTax_val = total;
//
//                 console.log("total :" + total);
//             }
//             DataInit(allData);
//             parent.layer.close(index);
//         },
//         closeBtn: 0,
//         content: tart, // chooseBomType
//         end: function () {
//
//         }
//     });
// }
//
//
// //生成结果表数据
// function getResultTable(returnCode,codeForModels){
//     $('#reportTable4').bootstrapTable('destroy');
//     $('#reportTable4').bootstrapTable({
//         url:"../ProcessController/getResultOfCostGroup?codeForModels="+codeForModels+"&returnCode="+returnCode,
//         method: 'post',
//         dataType: "json",
//         dataField: 'rows',
//         striped: true,//设置为 true 会有隔行变色效果
//         undefinedText: "空",//当数据为 undefined 时显示的字符
//         pagination: true, //设置为 true 会在表格底部显示分页条。
//         showToggle: "true",//是否显示 切换试图（table/card）按钮
//         showColumns: "true",//是否显示 内容列下拉框
//         pageNumber: 1,//初始化加载第一页，默认第一页
//         pageSize: 10,//每页的记录行数（*）
//         pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
//         paginationPreText: '上一页',
//         paginationNextText: '下一页',
//         search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
//         striped : true,//隔行变色
//         showColumns: false,//是否显示 内容列下拉框
//         showToggle: false, //是否显示详细视图和列表视图的切换按钮
//         clickToSelect: true,  //是否启用点击选中行
//         data_local: "zh-US",//表格汉化
//         showColumns: true,
//         sidePagination: "client", //服务端处理分页
//         queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
//         queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
//         columns:getColumns(),
//         onLoadSuccess: function () {
//             if($("#reportTable4").bootstrapTable('getData').length == 0){
//                 $("#table4").addClass("hidden");
//             }else{
//                 $("#table4").removeClass("hidden");
//             }
//         },
//         formatNoMatches: function(){
//             return '无符合条件的记录';
//         }
//     });
//     //服务端分页调用方法
//     function queryParams(params) {
//         console.log(params);
//         return {
//             pageSize: params.limit, // 每页显示数量
//             offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
//             name: params.sort,
//             order: params.order
//         };
//     }
// }
//
//
// function showExcelData(codeForModel,flag ) {
//     // 是否是总表
//     let isStatistics = 1 ;
//     let progarm = "?flag="+flag+"&codeForModels="+codeForModel + "&isStatistics=" +isStatistics+"&menuid="+$("#menuid").val();
//     let url ="../ExcelPlugController/excelPage" + progarm;
//     window.open(url, "_blank");
// }