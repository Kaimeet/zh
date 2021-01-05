/*
该软件为试用版，如需购买，请联系我们。
<p>网站: www.6excel.com</p>
<p>地址：北京市朝阳区北苑路媒体村天畅园6-701</p>
<p>邮编： 100976</p>
<p>电话：010-84827961</p>
<p>传真：010-84827985</p>
*/
/**
 * Enterprise Spreadsheet Solution
 * Copyright (c) FeyaSoft Inc 2014. All right reserved.
 * http://www.enterpriseSheet.com
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THEloadData2Grid()
 * WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Ext.define('enterpriseSheet.example.LoadDataWin', {
	
	extend : 'Ext.window.Window',
	
	bodyStyle : 'padding:5px;background-color:white;',
	
	resizable : false,			
    
    stateful: false,
    
    modal: true,
    
    shim : true,
    
    buttonAlign : "right",
	
	cancelText : '取消',
    
    closable : true,
    
    closeAction : 'hide',	
    
    width : 800,
    	
    height: 500,
    
    title: '应用程序界面 loadData() 实例 - 加载json数据到工作表',
        
	layout : 'border',
	
	initComponent : function(){
		
		this.exampleRadio = Ext.create('Ext.form.RadioGroup', {
            columns: 1,
            vertical: true,
            items: [
                {boxLabel: '基本的Json', name: 'example', inputValue: 1, checked: true},
                {boxLabel: '禁用Json', name: 'example', inputValue: 2},
                {boxLabel: '图表Json', name: 'example', inputValue: 3},
                {boxLabel: '复选框Json', name: 'example', inputValue: 4},
                {boxLabel: '下拉列表Json', name: 'example', inputValue: 5},
                {boxLabel: '表格模板Json', name: 'example', inputValue: 6}
            ],
            listeners: {
                change: {
                    fn: function (field, newValue, oldValue) {
                        var val = newValue['example'];

                        if(1 === val){
                            this.centerPanel.update('<pre>' + this.htmlHead('Basic File') + this.htmlBasicCells() + this.htmlFoot() + '</pre>');
                        }
                    },
                    scope: this
                }
            }
        });
		//导入JSON数据窗口 数据初始化
        this.centerPanel = Ext.create('Ext.Panel', {
            title: '导入Json数据',
            region: 'center', //居中
            anchor: '100%',
            bodyStyle : 'padding:2px 0px 5px 10px;',
            split: true,
            autoScroll: true,
            html: '<pre>' + this.htmlHead('Basic File') + this.htmlBasicCells() + this.htmlFoot() + '</pre>'
        });
		this.items = [{
            region: 'north', //该组件在顶部
            collapsible: false,
            split: true,
            border: false,
            height: 45,
            html: '请选择一个项目来生成相关的json数据。 ' + 
                  '一般来说, 这个 json 数据会自动从你的应用中生成,然后调用我们的loadData 应用程序界面, 并将它们导入到工作表。'
                  + ' 单击"导入数据到工作表" 按钮来处理。'
                  + '<br/>详细的代码在:  <font color=blue>*/js/cubedrive/Example/*.js </font>'
        }, {
        	region: 'center',//居中
        	border: false,
        	split: true,
            layout : 'border',
            items: [{
            	region: 'west',
            	title: '实例',
            	collapsible: true,
            	width: 170,
            	split: true,
            	items: [this.exampleRadio]
            }, this.centerPanel]
        }];
		
		this.buttons = [{
			text:this.cancelText, //文本为去取消
			handler:this.onCancel, //文本为调用弹出框，hide方法
			scope:this
		},{
			text: "<b>导入数据到工作表</b>", //按钮文字
			handler:this.onInject,//为调用数据导入方法
			scope:this
		}];
				
		this.callParent();		
	},
	
	// this is function to inject into sheet
	onInject : function() {
		
		// check which radio is selected ...
        var val = this.exampleRadio.getValue()['example'];
        
        // var jsonString = '{"name":"Checkbox file","sheets":[{"id":1,"name":"First","actived":true,"color":"orange"},{"id":2,"name":"Second"}],"cells":[{"i":1,"x":2,"y":2,"j":"{\"data\":\"Favorite fruit:\"}"},{"i":1,"x":3,"y":2,"j":"{\"data\":\"Banana\",\"it\":\"checkbox\",\"itn\":\"fruit\",\"itchk\":false}"},{"i":1,"x":4,"y":2,"j":"{\"data\":\"Apple\",\"it\":\"checkbox\",\"itn\":\"fruit\",\"itchk\":true}"},{"i":1,"x":5,"y":2,"j":"{\"data\":\"Orange\",\"it\":\"checkbox\",\"itn\":\"fruit\",\"itchk\":false}"},{"i":1,"x":2,"y":4,"j":"{\"data\":\"Most favorite sport:\"}"},{"i":1,"x":3,"y":4,"j":"{\"data\":\"Soccer\",\"it\":\"radio\",\"itn\":\"sports\",\"itchk\":true}"},{"i":1,"x":4,"y":4,"j":"{\"data\":\"Basketball\",\"it\":\"radio\",\"itn\":\"sports\",\"itchk\":false}"},{"i":1,"x":5,"y":4,"j":"{\"data\":\"Ski\",\"it\":\"radio\",\"itn\":\"sports\",\"itchk\":false}"}],"floatings":[],"fileConfig":[]}';
        
        //var chartJ = this.chartJson();
        //var jsonString = Ext.encode(chartJ);
        //var json = Ext.decode(jsonString);

        var json;
        if(1 === val) json = this.basicJson();
        console.log(SHEET_API_HD);
		SHEET_API.loadData(SHEET_API_HD, json);
		this.hide();
	},
	//取消按钮，隐藏弹出层
	onCancel : function() {
	    this.hide();	
	},
	
	/////////////////////////////////////////// this is for html data to show in screen ///////////////
	htmlHead : function(filename) {
		return 'SHEET_API.loadData(SHEET_API_HD, {' +
            	          '<br/>    name: \'' + filename + '\',' +
            	          '<br/>    sheets: [{' +
            	          '<br/>        name: \'First tab\',' +
            	          '<br/>        color: \'orange\',' +
            	          '<br/>        id: 1' +
            	          '<br/>    },{' +
            	          '<br/>        name: \'Second tab\',' +
            	          '<br/>        id: 2' +
            	          '<br/>    }],';
	},
	
	htmlFoot : function() {
	    return '<br/>});';
	},
	
	htmlBasicCells : function() {
		return '<br/>    cells: [{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 0,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {width: 152}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 1,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {data: 110}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 2,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {data: \'string\'}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 3,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {data: \'=today()\', cal: true, fm: \'date\', dfm: \'Y-m-d\'}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 4,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {bgc: \'#F79646\'}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 5,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {data: "123.45", fm: "money|$|2|none"}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 6,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {data: \'=sum(1,2,3)\', cal: true}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 7,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {data: "bold", fw: "bold"}' +
            	'<br/>    },{' +
                '<br/>        sheet: 1,' +
            	'<br/>        row: 8,' +
            	'<br/>        col: 1,' +
            	'<br/>        json: {data: "link", link: "www.enterprisesheet.com"}' +
            	'<br/>    }]';
	},
	//////////////////////////////////////////// this is for different json ///////////////////////////


	//初始化sheet数据
	sheets : function() {
	    return [{
                name: 'First',
                id: 1,
                color: 'orange'
            } ];
	},
	
	basicCells : function() {
		return [{
                sheet: 1,
                row: 0,
                col: 1,
                json: {
                    width: 152
                }
            },{
                sheet: 1,
                row: 1,
                col: 1,
                json: {
                    data: 110
                }
            }, {
                sheet: 1,
                row: 2,
                col: 1,
                json: {
                    data: 'String'
                }
            }, {
                sheet: 1,
                row: 3,
                col: 1,
                json: {
                    data: '=today()',
                    cal: true,
                    fm: 'date',
                    dfm: 'Y-m-d'
                }
            }, {
                sheet: 1,
                row: 4,
                col: 1,
                json: {
                    bgc: '#F79646'
                }
            }, {
                sheet: 1,
                row: 5,
                col: 1,
                json: {
                    data: "123.45",
                    fm: "money|$|2|none"
                }
            }, {
                sheet: 1,
                row: 6,
                col: 1,
                json: {
                    data: '=sum(1,2,3)',
                    cal: true
                }
            }, {
                sheet: 1,
                row: 7,
                col: 1,
                json: {
                    data: "bold",
                    fw: "bold"
                }
            }, {
                sheet: 1,
                row: 8,
                col: 1,
                json: {
                    data: "link",
                    link: "www.enterprisesheet.com"
                }
            }];
	},
	//////////////////////////////////////////////////////////////////////////////
	//导入基本的json
	basicJson : function() {
		var json = {
            fileName: 'Basic file',
            sheets: this.sheets(),
            cells: this.basicCells()
        };
		return json;
	}
});