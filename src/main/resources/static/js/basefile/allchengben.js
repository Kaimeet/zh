//成本汇总
function allchengbentrend(){
    $("#mytable").bootstrapTable({
        method : 'get',
        url: "../basicFileController/getalllabor",
        //url:"http://localhost:80/api/User/GetList",   //请求地址
        striped : false, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : false,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize : 20,//单页记录数
        pageList : [ 5, 10, 20],//可选择单页记录数
        showRefresh : false,//刷新按钮
        queryParams : function(params) {//上传服务器的参数
            return { pageSize : 100 };
        },
        onClickRow:function (row,$element) {
           // window.location.href="chengben_detail.html?ID=" + row.id +"&name=" + row.name ;
        },
        columns : [
            {
            title : '模型',
            field : 'autoid',
            sortable : false,
        },
            {
                title : '变量',
                field : 'cinvname',
                sortable : true
            },
            {
                title : '变量值',
                field : 'allprice',
                sortable : true
            },
            {
                title : '生产基地',
                field : 'allprice',
                sortable : true,
            },
            {
                title : '工艺版本',
                field : 'allprice',
                sortable : true,
            }
        ],
        data: [
            {'cinvname': '中千板' , 'allprice': 10000 , 'doo':''},
            {'cinvname': '厘板' , 'allprice': 10000 , 'doo':''},
            {'cinvname': '面筋板' , 'allprice': 10000 , 'doo':''}
        ] ,
        onPostBody:function(data){
        }
    })
}

//成本详情汇总
function chengbenDetail(){
    $("#mytable").bootstrapTable({
        method : 'get',
        url: "http://172.16.1.33:8899/getwuliaopricenow",
        //url:"http://localhost:80/api/User/GetList",   //请求地址
        striped : false, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize : 20,//单页记录数
        pageList : [ 5, 10, 20],//可选择单页记录数
        showRefresh : false,//刷新按钮
        queryParams : function(params) {//上传服务器的参数
            return { pageSize : 100 };
        },
        // onClickRow:function (row,$element) {
        //     window.location.href="chengbenextend.html?ID=" + row.id;
        // }
        columns : [ {
            title : '序号',
            field : 'autoid',
            sortable : false,
            width:'50px',
            formatter:function (value, row, index) {
                return index+1;
            }
        },
            {
                title : '材料名称',
                field : 'cinvname',
                sortable : false
            },
            {
                title : '规格',
                field : 'cInvStd',
                sortable : false
            },
            {
                title : '入库金额',
                field : 'iunitprice',
                sortable : false
            }

        ],
        onPostBody:function(data){
        }
    })
}


/// 原材料分类维护
function chengbentable(){
    var deleteCellIndex =12;
    $("#mytable").bootstrapTable({
        method : 'get',
        url: "http://172.16.1.33:8899/getwuliaopricenow",
        //url:"http://localhost:80/api/User/GetList",   //请求地址
        striped : false, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize : 20,//单页记录数
        pageList : [ 5, 10, 20],//可选择单页记录数
        showRefresh : false,//刷新按钮
        queryParams : function(params) {//上传服务器的参数
            return { pageSize : 100 };
        },
        onClickRow:function (row,$element) {
            // window.location.href="chengbenextend.html?ID=" + row.id + "&name=" + row.cinvdefine5.toString() ;
        }
        ,columns : [ {
            title : '序号',
            field : 'autoid',
            sortable : false,
            width:'50px',
            formatter:function (value, row, index) {
                return index+1;
            }
        },
            {
                title : '物料大类名称',
                field : 'cinvdefine5',
                sortable : false
            },
            {
                title : '操作',
                field : 'createtime',
                formatter:'operateFormatter'
            }
        ],
        onPostBody:function(data){

        }
    })
}

/// 自定义cell
function operateFormatter(value, row, index) {
    var contanerID =  "container" + row.id;
    return [
        '<div class="btn-group">',
        '<a class="btn btn-xs btn-default" href="chengbenextend.html?id='+ row.id +'&name='+ row.cinvdefine5+'" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>',
        '<a class="btn btn-xs btn-default" href="#!" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a></div>'
    ].join('');
};

/// detail
function detailCell(value, row, index) {
    var contanerID =  "container" + row.id;
    return [
        '<div class="btn-group">',
        '<a class="btn btn-xs btn-default" href="allchengben_detail.html?id='+ row.id +'&name='+ row.cinvname+'" title="详情" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>',
        '</div>'
    ].join('');
};


/// 自定义cell
function bianji(value, row, index) {
    var contanerID =  "container" + row.id;
    return [
        '<div class="btn-group">',
        '<a class="btn btn-xs btn-default" href="mater_add.html?id='+ row.id+'&type=modify "title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>',
        '<a class="btn btn-xs btn-default" href="#!" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a></div>'
    ].join('');
};

/// 材料大类下物料维护
function chengbenmaterextend(){
    var gysCellIndex = 2 ;
    var rawMaterialCellIndex = 3 ;
    $("#mytable").bootstrapTable({
        method : 'get',
        url: "http://172.16.1.33:8899/getwuliaopricenow",
        //url:"http://localhost:80/api/User/GetList",   //请求地址
        striped : false, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize : 20,//单页记录数
        pageList : [ 5, 10, 20],//可选择单页记录数
        showRefresh : false,//刷新按钮
        queryParams : function(params) {//上传服务器的参数
            return { pageSize : 100 };
        }
        ,
        // onClickRow:function (row,$element) {
        //     var jsonStr = JSON.stringify(row);
        //
        //     var clickCellIndex =  $element.context.cellIndex;
        //     if (clickCellIndex === gysCellIndex)
        //     {
        //         console.log($element);
        //         // 弹出供应商页面
        //         showGongYingShang();
        //     }else if(clickCellIndex === rawMaterialCellIndex )
        //     {
        //         console.log($element.context.cellIndex);
        //         // 弹出物料选择页面
        //         showMaterial();
        //     }
        //
        //
        //     //alert(jsonStr);
        //     //setCookie('ts' ,jsonStr);
        //     //window.location.href="back.html?tsID=" + row.id;
        //     //alert(row.id);
        // }
        columns : [ {
            title : '序号',
            field : 'autoid',
            sortable : false,
            width:'50px',
            formatter:function (value, row, index) {
                return index+1;
            }
        },
            {
                title : '物料编码',
                field : 'cinvcode',
                formatter:tagShow,
                sortable : false
            },
            {
                title : '物料名称',
                field : 'cinvname',
            },
            {
                title : '规格',
                field : 'cInvStd',
            },
            {
                title : '长',
                field : 'iinvweight',
            },
            {
                title : '宽',
                field : 'iinvweight',
            },
            {
                title : '厚',
                field : 'iinvweight',
            },
            {
                title : '单位',
                field : 'cComUnitName',
            },
            {
                title : '操作',
                field : 'createtime',
                formatter:bianji
            }
        ],
        onPostBody:function(data){

        }
    })
}


/// tag显示
function tagShow(value, row, index){
    var dd= [];
    dd.push(value);
    dd.push(row.autoid);
    return tagsInit(dd);
}
///
function tagsInit(datas) {
    var tags = '';
    for (var cell in datas) {
        var data = [  '<span class="tag">',
            ' <span>'+datas[cell]+'&nbsp;&nbsp;</span>',
            ' </span>'].join('');
        tags += data;
    }
    var res = [
        ' <div id="example-tags_tagsinput" class="tagsinput" style="width: 100%; min-height: 36px; height: 36px;">',
        tags,
        ' </div>'
    ].join('');
    console.log(res)
    return res;
}

