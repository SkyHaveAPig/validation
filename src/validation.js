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
	var validation = {
		init: function(dom, rules, execList){
			this.addRule(rules);
			this.checkRegExp(dom, this.rules, execList);
		},

		rules: {},

		addRule: function(rules){
			if(typeof rules == 'object'){
				for(x in rules){
					this.rules[x] = {};
					if(rules[x].expression){
						this.rules[x].expression = rules[x].expression;
					}

					if(rules[x].message){
						this.rules[x].message = rules[x].message;
					}
				}
			}
		},

		checkRegExp: function(dom, rules, execList){
			dom.find('*').each(function(i, ele){
				if($(ele).attr('name')){
					$(ele).on('blur hover', function(){
						for(x in execList){
							if($(ele).attr('name') == x){
								var result = {},
									status = true;

								for(y in execList[x]){
									for(rule in rules){
										if(execList[x][y] && y == rule && status){
											if(typeof rules[rule].expression != 'function'){
												var regStr = rules[rule].expression,
													regExp = '';

												if(typeof regStr == 'string'){
												 	regExp = new RegExp(regStr);
												}else{
													regExp = new RegExp(regStr[0], regStr[1]);
												}
												
												if(!regExp.test($(this).val())){
													result.message = execList[x].message ? execList[x].message : rules[rule].message;
													status = false;
												}
											}else{
												if(!rules[rule].expression(ele, execList[x][y])){
													result.message = execList[x].message ? execList[x].message : rules[rule].message;
													status = false;
												}
											}
											result.ele = this;
										}
									}
								}
								execList[x].callback(result);
							}

						}
					})
				}
			})
		}
	}

	$.fn.validation = function(rules, execList){
		if(rules.isAddRule){
			validation.addRule(rules);
		}else{
			validation.init(this, rules, execList);
		}

		return this;
	}
})