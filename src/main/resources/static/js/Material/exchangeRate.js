var $window = $(window);
$window.resize(function() {
    resizewindow();
});
var flagall = 0;
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    laydate.render({
        elem: '#createStartTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#createEndTime").val()!= null && $("#createEndTime").val()!="" && new Date(value).getTime() > new Date($("#createEndTime").val()).getTime()){
                layer.msg("创建开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#createEndTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#createStartTime").val()!= null && $("#createStartTime").val()!="" && new Date(value).getTime() < new Date($("#createStartTime").val()).getTime()){
                layer.msg("创建结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
            elem: '#replyStartDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){

                if($("#replyEndDate").val()!= null && $("#replyEndDate").val()!="" && new Date(value).getTime() > new Date($("#replyEndDate").val()).getTime()){
                    layer.msg("回复开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

                }
            }
        });
        laydate.render({
            elem: '#replyEndDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){

                if($("#replyStartDate").val()!= null && $("#replyStartDate").val()!="" && new Date(value).getTime() < new Date($("#replyStartDate").val()).getTime()){
                    layer.msg("回复结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

                }
            }
        });
});
$(function() {
    resizewindow();

    			$('#reportTable1').bootstrapTable({
    				method: 'get',
    				cache: false,
//    				height: 400,
    				striped: true,
    				pagination: true,
    				pageSize: 20,
    				pageNumber:1,
    				pageList: [10, 20, 50, 100, 200, 500],
    				search: true,
    				showColumns: true,
    				showToggle: true,
//    				showRefresh: true,
//    				showExport: true,
//    				exportTypes: ['csv','txt','xml'],
    				clickToSelect: true,
    				locale: 'zh-CN',
    				columns: [
    				            {
                                    checkbox: true
                                },
    				            {
    				                field:"index",
    				                title:"序号",
    				                align:"center",
    				                valign:"middle",
    				                sortable:"true"
                                },
    				            {
    				                field:"user_company",title:"月份",align:"center",valign:"middle",sortable:"true",
    				                formatter : function(value, row, index) {
                                        return '<input id="user_company'+index+'" value="'+row.user_company+'" class="form-control parsley-validated"  maxlength="11" style="background-color:#fff" disabled />';
                                    }
    				            },
    				            {
    				                field:"user_dates",title:"记账汇率(%)",align:"center",valign:"middle",sortable:"true",
                                    formatter : function(value, row, index) {
                                        return '<input id="user_dates'+index+'" value="'+row.user_dates+'" class="form-control parsley-validated"  maxlength="11" style="background-color:#fff" disabled />';
                                    }

    				            }
                            ],
    				data : [
{
    				                "index":"1",
    				                "user_company":"2020.01",
    				                "user_dates":"6"
                                },{
                                    "index":"2",
                                    "user_company":"2020.02",
                                    "user_dates":"7"
                                  },{
                                    "index":"3",
                                    "user_company":"2020.03",
                                    "user_dates":"8"
                                  },{
                                    "index":"4",
                                    "user_company":"2020.04",
                                    "user_dates":"9"
                                  },{
                                    "index":"5",
                                    "user_company":"2020.05",
                                    "user_dates":"10"
                                  },{
                                    "index":"6",
                                    "user_company":"2020.06",
                                    "user_dates":""
                                  },{
                                    "index":"7",
                                    "user_company":"2020.07",
                                    "user_dates":""
                                  },{
                                    "index":"8",
                                    "user_company":"2020.08",
                                    "user_dates":""
                                  },{
                                    "index":"9",
                                    "user_company":"2020.09",
                                    "user_dates":""
                                  },{
                                    "index":"10",
                                    "user_company":"2020.10",
                                    "user_dates":""
                                  },{
                                    "index":"11",
                                    "user_company":"2020.11",
                                    "user_dates":""
                                  }
                           ],
    				onPageChange: function (size, number) {
    					//$("#pageSizeInput").val(size);
    					//$("#pageNumberInput").val(number);

    					//var form = $('#tableForm');
    					//form.action= '${base}/showReport';
    					//form.submit();
                    },
    				//onSort: function (name, order) {
                   // },
    				//formatShowingRows: function (pageFrom, pageTo, totalRows) {
    				//	return '';
                   // },
    				//formatRecordsPerPage: function () {
    				//	return '';
                  //  },
                    formatNoMatches: function(){
                    	return '无符合条件的记录';
                    }
    			});




    			$(window).resize(function () {
    				$('#reportTable1').bootstrapTable('resetView');
    				//$('#reportTable2').bootstrapTable('resetView');
    			});



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


//返回
function back() {
    post("../ProcessController/exchangeRate",{})
}
//下一步
function nextstep(){
    post("./ProcessController/exchangeRate",{});
}
function save(){

    layer.msg("已保存。", {icon:6, anim:5, time: 3000});

}
