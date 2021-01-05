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
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Ext.define('enterpriseSheet.example.GetDataWin', {
	
	extend : 'Ext.window.Window',
	
	bodyStyle : 'padding:5px;background-color:white;',
	
	resizable : false,			
    
    stateful: false,
    
    modal: true,
    
    shim : true,
    
    buttonAlign : "right",
	
	cancelText : '关闭',
    
    closable : true,
    
    closeAction : 'hide',	
    
    width : 800,
    	
    height: 400,
    
    title: '应用程序界面 getJsonData()实例 - 从工作表检索json数据',
        
	layout : 'border',
	
	initComponent : function(){
		
		var json = SHEET_API.getJsonData(SHEET_API_HD);
		
        this.centerPanel = Ext.create('Ext.Panel', {
            title: '工作表中的Json数据',
            region: 'center',
            anchor: '100%',
            bodyStyle : 'padding:2px 0px 5px 10px;',
            split: true,
            autoScroll: true,
            html: '<pre>' + Ext.encode(json) + '</pre>'
        });
        
		this.items = [{
            region: 'north',
            collapsible: false,
            split: true,
            border: false,
            height: 100,
            html: '从当前工作表调用下面的方法检索json数据:<br/>' +
                  '<pre>var json = SHEET_API.getJsonData(SHEET_API_HD);<br/>' + 
                  'var jsonString = Ext.encode(json);<br/></pre>' + 
                  '你可以将它编码并保存为string类型到数据库。 当调用SHEET_API.loadData(SHEET_API_HD, json)应用程序界面的时候, 请先调用Ext.decode(inJson),并将它导入到loadData应用程序界面中。'
        }, {
        	region: 'center',
        	border: false,
        	split: true,
            layout : 'border',
            items: [this.centerPanel]
        }];
		
		this.buttons = [{
			text:this.cancelText,
			handler:this.onCancel,
			scope:this
		}];
				
		this.callParent();		
	},
	
	onCancel : function() {
	    this.hide();	
	}
    
});