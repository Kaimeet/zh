/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	config.skin = 'moono-dark';
	CKEDITOR.config.title = false;
	config.language = 'zh-cn';
	config.height = 400;
	config.removePlugins = 'elementspath'; // 移除底部路径提示;
	//字体编辑时的字符集 可以添加常用的中文字符：宋体、楷体、黑体等 plugins/font/plugin.js
	config.font_names = '宋体;楷体;新宋体;黑体;幼圆;微软雅黑;Arial;Comic Sans MS;Courier New;Georgia;Lucida Sans Unicode;';
	//编辑器中回车产生的标签
	config.enterMode = CKEDITOR.ENTER_P; //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_DIV
	config.shiftEnterMode = CKEDITOR.ENTER_BR;
//	config.menu_groups = ''; //鼠标右键菜单
	config.coreStyles_bold = {
		element : 'b',
		overrides : 'strong'
	};
	CKEDITOR.config.fontSize_sizes = '6/6px;8/8px;9/9px/10/10px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;';
	//去除link的目标和高级 tab页
//	config.removeDialogTabs = 'link:advanced;link:target';
	CKEDITOR.config.linkShowTargetTab = false;
	CKEDITOR.config.linkShowAdvancedTab = false;
	CKEDITOR.config.resize_enabled = false;
	
	CKEDITOR.config.pasteFilter=null; //粘贴过滤器设置为null 即可 
	CKEDITOR.config.allowedContent = {//内容规则 允许的标签
	    $1: {
	        // Use the ability to specify elements as an object.
	        elements: CKEDITOR.dtd,
	        attributes: true,
	        styles: true,
	        classes: true
	    }
	  };
//	CKEDITOR.config.disallowedContent = 'script; *[on*];img{width,height};img[width,height]';//内容规则 不允许的标签
	CKEDITOR.config.disallowedContent = 'script; *[on*];img;';//内容规则 不允许的标签

	config.toolbar = [
		{name : 'basicstyles', items : [ 'Undo', 'Redo', '-', 'Bold', 'Italic', '-', 'RemoveFormat']},//, '-', 'RemoveFormat'
		{name : 'paragraph', items : [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ]},
		{name : 'Link'	,items:['Link']},
		'/',
		{name : 'styles', items : [ 'Font', 'FontSize' ]},
		{name : 'colors', items : [ 'TextColor',  'BGColor']},
		{name : 'extent', items: ['-', 'dropDownList'] }
//		{name : 'tools', items : [ 'Maximize' ]} //ipad上不支持全屏
	];
};
