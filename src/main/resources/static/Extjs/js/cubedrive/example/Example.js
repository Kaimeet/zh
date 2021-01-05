layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
Ext.onReady(function(){
    /**
     * 设置配置
     */
    SCONFIG.setupDir('');
         
    /**
     * 将这两种方法定义为全局变量
     */
    SHEET_API = Ext.create('Cubedrive.api.SheetAPI', {
        openFileByOnlyLoadDataFlag: true
    });
    
    SHEET_API_HD = SHEET_API.createSheetApp({
        //withoutTitlebar: true,
        //withoutSheetbar: true,
        //withoutToolbar: true,
        //withoutContentbar: true,
        //withoutSidebar: true,
        renderTo: 'sheet-markup',
        style: 'background:white;border-left:1px solid silver;',
        height: '100%'
    });







    //设置excel的背景色和背景图片的样式
    document.documentElement.style.background = 'none';
    Ext.getBody().setStyle('background-image', 'none');

    /**
     * This function prove how to use EnterpriseSheet loadData API.
     * 
     * By using EnterpriseSheet load loadData API, you can generate the 
     * related json data which can be based on your application logic from  
     * your database and inject it into the Sheet Grid.
     */
    loadData2Grid = function() {
        var id = 'load-example-win';
        var loadWin = Ext.getCmp(id);
        if(!loadWin){
            loadWin = Ext.create('enterpriseSheet.example.LoadDataWin', {
                id: id
			});
        }
    	loadWin.show();
    },
    
    /**
     * This function prove how to use EnterpriseSheet getJsonData API.
     * 
     * By using EnterpriseSheet getJsonData API, you can generate the 
     * json data and save it into your backend. You can use this saved
     * jsondata for load later.
     */
    getDataFromGrid = function() {
//        原来的控件弹出层
//        var retrieveWin = Ext.create('enterpriseSheet.example.GetDataWin', {});
//        retrieveWin.show();
        var bomCode = Ext.get("bomCode").dom.value;
        var excelDate = Ext.encode(SHEET_API.getJsonData(SHEET_API_HD));
        console.log("获取的excel的json数据结构为1="+ unescape(excelDate.replace(/\\u/g, "%u")));
        Ext.Ajax.request({
            url: "../ProcessController/saveExcelDate",
            params: {excelDate : excelDate,bomCode:bomCode},
            method: 'POST',
            callback: function (options, success, response) {
                if (success) {
                    var responseJson = Ext.JSON.decode(response.responseText);
                    if(responseJson.resultCode==1){
                        layer.msg(responseJson.resultMassage, {icon : 6, anim : 5, time : 3000} );
                    }else{
                        layer.msg(responseJson.resultMassage, {icon : 5, anim : 6, time : 3000});
                    }
                } else {
                     layer.msg("保存Excel请求失败，请稍后再试。", {icon : 5, anim : 6, time : 3000});
                }
            }
        });

    },

    back = function() {
        post("../ProcessController/standardBomManage",{});
    },
            
    loadById = function(){
        SHEET_API.loadFile(SHEET_API_HD, '*u5OSUAZO3A_');
    },
            
    updateCells = function(){
        var cells = [];
        for(var i = 1; i <= 100; i++){
            for(var j = 1; j <= 100; j++){
                var cal = (i === j && 2 < i && 2 < j), data;
                if(cal){
                    data = '=A'+i+'+B'+j;
                }else{
                    data = Math.round(Math.random()*100);
                }
                console.log("data="+j+":"+data);
                cells.push({
                    'row': i,
                    'col': j,
                    'json': {
                        'data': data,
                        'cal': cal
                    }
                });
            }
        }

        SHEET_API.updateCells(SHEET_API_HD, cells);
    },

    saveData = function(){
        SHEET_API.saveData(SHEET_API_HD);
    },
            
    toggleReadOnly = function(){
        SHEET_API.setReadOnly(SHEET_API_HD, !SHEET_API_HD.sheet.isReadOnly());
    },



    //导入基本的json,excel初始化
    basicJson = function(fileName,sheets,cells) {
        var json = {
            fileName: fileName,
            sheets: Ext.JSON.decode(sheets,false), //Ext.JSON.decode() 将传入的字符型数据转换成json格式数据
            cells: Ext.JSON.decode(cells,false)
        };
        return json;
    }
    var fileName = Ext.get("fileName").dom.value;
    var sheets = Ext.get("sheets").dom.value;
    var cells = Ext.get("cells").dom.value;
    var json = this.basicJson(fileName,sheets,cells);
    SHEET_API.loadData(SHEET_API_HD,json);
});