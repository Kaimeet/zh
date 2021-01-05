/*
该软件为试用版，如需购买，请联系我们。
<p>网站: www.6excel.com</p>
<p>地址：北京市朝阳区北苑路媒体村天畅园6-701</p>
<p>邮编： 100976</p>
<p>电话：010-84827961</p>
<p>传真：010-84827985</p>
*/
Ext.define('Swift.lang.Lang', {
	
	extend: 'Swift.lang.Lanuage'
	
}, function(){
	/*
	 * define a global var
	 */
	SLANG = window.LANG || (Ext.create('Swift.lang.Lang')).content;
});