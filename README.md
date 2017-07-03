# validation.js

'validation.js'是一个可扩展的表单验证插件。



## 使用

```
$("#example").validation(rules, execList);
```

1. 'rules'为表单的相关提示提供参数，类型为对象，命名使用小驼峰；注意事项

   1. 如果校验规则名相同，并且有'message'属性，后者会将前者覆盖；

      ```
      {
        required: {
          message: '此项为必填！'
        },
        ......
      }
      ```

   2. 如果‘rules’中包含'isAddRule'属性并且值为‘true’时，可在规则名称下添加‘expression’属性，插件只会执行添加规则，不会执行校验；

   3. ‘expression’值可为用于生成正则的字符串（有反斜杠需要转义），或者为一个方法（必须有返回值，并且为‘true’时才会通过校验），用于处理两个元素间的检验；

      ```
      字符串：
      {
        isAddRule: true,
        number: {
          expression: '^\\d+$',		//'\\d'转义为'\d'
          message: '请填写数字'
        }
      }

      方法: 
      {
        isAddRule: true,
        required: {
          expression: function(ele){
        	  if($(ele).val()){
              return true;			//校验通过时，返回'true'
            }
          },
          message: '此选项为必填'
        }
      }
      ```

   4. 此操作请在‘addition-validation.js’文件下进行，此文件包含默认规则，并且用于存储规则；

   5. 此项为必填。

2. ‘execList’为插件的使用提供参数，其中的属性为表单元素的‘name’属性的值，其类型为对象，内有两种属性：

   1. 例如‘required: true’,需要填写已存在的规则名称，可填写一种或者多种，并且值为‘true’时，插件校验才会生效，在校验时，如果有多种规则，则取最后一个错误的提示作为返回；

   2. ‘callback’，是校验的回调函数，会在每次校验执行后执行，使用的规则为正则时，其第一个值在校验错误时会存在‘ele’（校验的表单元素）、‘message’（默认设置的提示语），成功时只会返回‘ele’；

      ```
      {
        text: { 
          required: true,
          callback: function(e){				//e为当前元素与校验结果
            if(e.message){
              console.log(e.ele, e.message);	  //当校验值存在错误时，会在控制台输出校验元素与校验提示
            }
          }
        }
      }
      ```

   3. 当存在第二参数时，如果当前的操作的规则为方法而并非正则时，并且是两个元素之间的操作，第二参数的值为操作的另一个元素。

      ​

## 执行

1. 建议结合‘bootstrap.js’中的‘tooltip’使用

   以下实例：

   ```
   HTML：
   <form id="example">
     <input type="text" name="myname" data-toggle="tooltip" data-placement="bottom">
   </form>

   JS：
   $('#example').validation({
     required: {
       message: '此项不允许为空'
     }
   },
   {
     myname: { 
       required: true,
       callback: function(e){									   //e为当前元素与校验结果
         if(e.message){
           console.log(e.ele, e.message);		 				//输入校验的元素与‘此项不允许为空’
           if(!$(e.ele).attr('title')){
             $(e.ele).attr('title', e.message);
           }else{
             $(e.ele).attr('data-original-title', e.message);
           }
           $('[data-toggle="tooltip"]').tooltip('toggle');		  //使用 'tooltip'
         }
       }
     }
   })
   ```