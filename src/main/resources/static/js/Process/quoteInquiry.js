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
//                search: true,
                showColumns: true,
                showToggle: true,
//    				showRefresh: true,
//    				showExport: true,
//    				exportTypes: ['csv','txt','xml'],
                clickToSelect: true,
                locale: 'zh-CN',
                columns: [
                            {
                                field:"index",
                                title:"序号",
                                align:"center",
                                valign:"middle",
                                sortable:"true"
                            },
                            {
                                field:"mcode",title:"物料名称",align:"center",valign:"middle",sortable:"true",
                            },
                            {
                                field:"mname",title:"物料编号",align:"center",valign:"middle",sortable:"true",
                            },
                            {
                                field:"usething",title:"耗量",align:"center",valign:"middle",sortable:"true",

                            },
                            {
                                field:"mprice",title:"材料价格",align:"center",valign:"middle",sortable:"true",

                            },
                             {
                                 field:"price",title:"报价价格",align:"center",valign:"middle",sortable:"true",

                             }
                        ],
                data : [
                            {
                                "index":"1",
                                "mcode":"10101010101001",
                                "mname":"单开门一",
                                "usething":"竹皮",
                                "mprice":"120.00",
                                "price":"200.00"
                            },{
                                "index":"2",
                                "mcode":"10101010101001",
                                "mname":"单开门一",
                                "usething":"竹皮",
                                "mprice":"110.00",
                                "price":"150.00"
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
                $('#reportTable2').bootstrapTable('resetView');
                $('#reportTable3').bootstrapTable('resetView');
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
            ,format: 'yyyy-MM' //可任意组合
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
    post("../ProcessController/quotationsIndependentInquiry",{})
}