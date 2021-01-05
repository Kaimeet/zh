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
Ext.define('cubedrive.sheet.CONFIG', {
	
	singleton : true,
	
	constructor : function() {
		
		this.callParent(arguments);		

        this.setupDir('');
        
		Ext.apply(this, {
		    // please select one of the following currency code:
			//    'usd', 'rmb', 'eur', 'ars' , 'aud', 'brl', 'cad', 'clp', 'cop', 'dkk', 'hkd', 'isk', 'inr', 'idr', 'ils', 'jpy'		
			//	  'won', 'mxn', 'myr', 'nzd', 'nok', 'pln', 'rub', 'sar', 'sgd', 'zar', 'sek', 'chf', 'twd', 'try', 'gbp', 'afn'
			//    'bob', 'bgn', 'egp', 'ltl', 'vnd', 'uah', 'irr', 'huf', 'cup', 'ron', 'jmd', 'kzt', 'lbp', 'thb', 'ngn', 'zwd'
			//    'all', 
			default_currency: 'usd',
			
			// Please select one of the following items:
			//       english_us, chinese
			default_locale: 'english_us',
			
			// Please contact us for add more date, time format
            english_us_moreDateTimeFm: ['M d, Y, H:i:s', 'M d, Y, H:i', 'M d, Y, g:i:s A', 'l, M d, Y, g:i:s A', 'Y/m/d H:i', 'Y/m/d H:i:s'],
            chinese_moreDateTimeFm: ['Y\u5E74m\u6708j\u65E5', 'y\u5E74m\u6708j\u65E5', 'm\u6708j\u65E5', 'Y\u5E74m\u6708j\u65E5 G\u70B9i\u5206', 'Y\u5E74m\u6708j\u65E5 H\u70B9i\u5206', 'Y\u5E74m\u6708j\u65E5 G\u70B9i\u5206s\u79D2',
                                     'M d, Y, H:i:s', 'M d, Y, H:i', 'M d, Y, g:i:s A', 'l, M d, Y, g:i:s A', 'Y/m/d H:i', 'Y/m/d H:i:s'],
                                     
            // set sheet tab bar position: top OR bottom
            sheet_tab_bar_position: 'top',
            
            // set help menu hide or not: true or false - this is only work for commercial version
            help_menu_hide: false, 
            
            // hide or show language menu
            language_menu_hide: true,
            
            // disable file menu if set as false
            file_menu_hide: true,
            
            // disable import / export
            enableExport : false,
            enableImport : false,
            
            // this flag is set to see whether it is standalone version - only js code
            js_standalone: true
		})
	},
    
    setupDir : function(dir){
        Ext.apply(this, {
            baseDir: dir,
                  
            IMAGES_PATH : dir+'js/cubedrive/sheet/app/src/Swift/resources/images',
                     
            ICONS_PATH : dir+'js/cubedrive/sheet/app/src/Swift/resources/images/icons',
                     
            urls: {
                'list': dir+'document/list',
                'changeFileName': dir+'document/changeFileName',
                'changeFileStared': dir+'document/changeFileStared',
                'createFile': dir+'document/createFile',
                'updateLang': dir + 'userSetting/updateLang',
                     
                'findCells': dir+'sheet/findCells',
                'loadCells': dir+'sheet/loadCells',
                'loadSheet': dir+'sheet/loadSheet',
                'loadActivedSheetOfFile': dir+'sheet/loadActivedSheetOfFile',
                'loadSheetsOfFile': dir+'sheet/loadSheetsOfFile',
                'loadCellOnDemand': dir+'sheet/loadCellOnDemand',
                'loadCalCellOnDemand': dir+'sheet/loadCalCellOnDemand',
                'loadFile': dir+'sheet/loadFile',
                'copyFromTpl': dir+'sheet/copyFromTpl',
                'importExcelUpload': dir+'sheet/uploadFile',
                'exportExcel': dir+'sheet/export',
                     
                'update': dir+'sheetCell/updateBatchCells',
                'createSheet': dir+'sheetTab/create',
                'renameSheet': dir+'sheetTab/renameSheet',
                'changeSheetColor': dir+'sheetTab/changeSheetColor',
                'deleteSheet': dir+'sheetTab/deleteSheet',
                'copySheet': dir+'sheetTab/copySheet',
                'changeSheetOrder': dir+'sheetTab/changeSheetOrder',
                     
                'listCustom': dir+'sheetCustom/list',
                'addCustom': dir+'sheetCustom/create',
                'deleteCustom': dir+'sheetCustom/delete',
                'listDataset': dir+'sheetDropdown/list',
                'createDataset': dir+'sheetDropdown/createUpdate',
                'loadDataset': dir+'sheetDropdown/load',
                'deleteDataset': dir+'sheetDropdown/delete',
                'saveJsonFile': dir+'sheetapi/saveJsonFile',
                'saveFileAs': dir+'sheet/saveFileAs',
                'loadRange': dir+'sheet/loadRange'
            }
        });
    }
}, function(){
	SCONFIG = cubedrive.sheet.CONFIG;	
});