var $window = $(window);
$window.resize(function() {
    resizewindow();
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
    				                field:"user_company",title:"类型",align:"center",valign:"middle",sortable:"true",
    				                formatter : function(value, row, index) {
                                        return '<input id="user_company'+index+'" value="'+row.user_company+'" class="form-control parsley-validated"  maxlength="11" style="background-color:#fff" />';
                                    }
    				            },
    				            {
    				                field:"user_dates",title:"数值(%)",align:"center",valign:"middle",sortable:"true",
                                    formatter : function(value, row, index) {
                                        return '<input id="user_dates'+index+'" value="'+row.user_dates+'" class="form-control parsley-validated"  maxlength="11" style="background-color:#fff" />';
                                    }

    				            },
    				            {
    				                field:"user_lastlogintime",title:"备注",align:"center",valign:"middle",sortable:"true",
                                    formatter : function(value, row, index) {
                                        return '<input id="user_lastlogintime'+index+'" value="'+value+'" class="form-control parsley-validated"  maxlength="11" style="background-color:#fff" />';
                                    }
    				            }
                            ],
    				data : [
{
    				                "index":"1",
    				                "user_company":"出口退税差",
    				                "user_dates":"0",
    				                "user_lastlogintime":""
                                },{
                                    "index":"2",
                                    "user_company":"销售费用率",
                                    "user_dates":"8",
                                    "user_lastlogintime":""
                                  },{
                                    "index":"3",
                                    "user_company":"部门费用",
                                    "user_dates":"1",
                                    "user_lastlogintime":""
                                  },{
                                    "index":"4",
                                    "user_company":"附加税率",
                                    "user_dates":"1",
                                    "user_lastlogintime":""
                                  },{
                                    "index":"5",
                                    "user_company":"业务提成",
                                    "user_dates":"1",
                                    "user_lastlogintime":""
                                  },{
                                    "index":"6",
                                    "user_company":"净利率",
                                    "user_dates":"12",
                                    "user_lastlogintime":""
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

//                if($("#createEndTime").val()!= null && $("#createEndTime").val()!="" && new Date(value).getTime() > new Date($("#createEndTime").val()).getTime()){
//                    layer.msg("创建开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});
//
//                }
            }
        });

});
//返回
function back() {
    post("../ProcessController/foreignTradeExpenses",{})
}
//下一步
function nextstep(){
    post("./ProcessController/foreignTradeExpenses",{});
}
function save(){

    layer.msg("已保存。", {icon:6, anim:5, time: 3000});

}
