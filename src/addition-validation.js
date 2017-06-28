;(function(factory){
	if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        define([ "jquery" ],factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
})(function($){
	$.fn.validation({
		isAddRule: true,
		required: {
			expression: function(ele){
				if($(ele).val()){
					return true;
				}
			},
			message: '此选项为必填'
		},
		number: {
			expression: '^\\d+$',
			message: '请填写数字'
		},
		date: {
			expression: '^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$',
			message: '请填写日期'
		},
		contactName: {
			expression: '^[\\u4E00-\\u9FA5]{2,6}$',
			message: '请填写联系人姓名（必须为中文）'
		},
		phone: {
			expression: '^[1][34578][0-9]{9}$',
			message: '请填写手机号码'
		},
		float: {
			expression: '^\\d+(\\.\\d+)?$',
			message: '请填写浮点数'
		},
		greaterThan: {
			expression: function(ele){
				if($(ele).val() > 0){
					return true;
				}else{
					return false;
				}
			},
			message: '请输入大于0的数值'
		},
		lessThan: {
			expression: function(ele, son){
				if($(ele).val() < $(son).val()){
					return true;
				}else{
					return false;
				}
			},
			message: '请输入小于货物重量的数值'
		},
		equalTo: {
			expression: function(ele, son){
				if($(ele).val() == $(son).val()){
					return true;
				}else{
					return false;
				}
			},
			message: '请重复确认的您所输入的值'
		}
	})
})