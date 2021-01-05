CKEDITOR.plugins.add( 'dropDownList',
{   
   requires : ['richcombo'], //, 'styles' ],
   init : function( editor )
   {
      var config = editor.config,
         lang = editor.lang.format;

      // Gets the list of tags from the settings.
      var tags = []; //new Array();
      //this.add('value', 'drop_text', 'drop_label');
      tags[0]=['<span class="replacer_label" data-val="name" data-html="[姓名]">[姓名]</span>', "姓名", "姓名"];
      tags[1]=['<span class="replacer_label" data-val="nickname" data-html="[昵称]">[昵称]</span>', "昵称", "昵称"];
      
      // Create style objects for all defined styles.

      editor.ui.addRichCombo( 'dropDownList',
         {
            label : "添加替换",
            title :"添加替换",
            voiceLabel : "添加替换",
            className : 'cke_format',
            multiSelect : false,

            panel :
            {
               css : [ config.contentsCss, CKEDITOR.getUrl( CKEDITOR.skin.getPath('editor') ) ],
               voiceLabel : lang.panelVoiceLabel
            },

            init : function()
            {
               this.startGroup( "添加替换" );
               //this.add('value', 'drop_text', 'drop_label');
               for (var this_tag in tags){
                  this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
               }
            },

            onClick : function( value )
            {         
               editor.focus();
               editor.fire( 'saveSnapshot' );
               editor.insertHtml(value);
//               var a = editor.getData();
//               editor.setData(a);
               editor.fire( 'saveSnapshot' );
            }
         });
   }
});