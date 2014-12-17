
/*

inputValue 1.0.1 | 14/Oct/2013

Developed by: V. Radev - http://v.radev.info
Copyright (C) 2013 V. Radev

*/


(function($){

    $.fn.inputValue = function(options){

        options = $.extend({
            value: 'Default Value',
            valueSource: 'direct',
            removeTitle: false,
            reAppear: true,
            dataKey: 'value',
            textOpacity: '',
            formHandle: '',
            alertSubmit: '',
            alerted: false
        }, options);


        var elements = 0;//count objects

        return this.each(function(){
            var o = options,
                obj = $(this),
                defValue;

            // GETTING FIELD DEF VALUE [[
            switch (o.valueSource) {
                case 'direct':
                    if ( $.isArray(o.value) ){//If array of values is passed
                        var multi = true;
                    } else {//if single value
                        defValue = o.value;
                    }
                    break;
                case 'title':
                    defValue = obj.attr('title');
                    break;
                case 'data':
                    defValue = obj.data(o.dataKey);
                    break;
                default:
                    alert('Invalid valueSource!');
            }
            // GETTING FIELD DEF VALUE ]]




            if ( o.removeTitle ){
                obj.removeAttr('title');
            }

            

            if ( multi ){//If array of values is passed

                obj.val(o.value[elements]);
                if (o.textOpacity ){
                    obj.css('color', 'rgba(0, 0, 0, '+ o.textOpacity +')');
                }

                obj.on("focus", function(){
                    $(this).val('');
                    if (o.textOpacity ){
                        $(this).css('color', 'rgba(0, 0, 0, 1)');
                    }
                });//end focus

                if (o.formHandle ){
                    $(o.formHandle).on("submit", function(e){
                        for(var i = 0; i < o.value.length; i++){
                            if ( obj.val() === o.value[i] ){
                                e.preventDefault();
                                var submitted = true;
                            }
                        }//end for loop
                        if ( submitted ){
                            if (o.alertSubmit && !o.alerted ){
                                alert(o.alertSubmit);
                                o.alerted = true;
                            }
                        }//if submitted and aler is On
                    });
                }//if submit with def values

                elements++;

            } else {//if single value

                obj.val(defValue);
                if (o.textOpacity ){
                    obj.css('color', 'rgba(0, 0, 0, '+ o.textOpacity +')');
                }

                obj.on("focus", function(){
                    if (o.textOpacity ){
                        $(this).css('color', 'rgba(0, 0, 0, 1)');
                    }
                    if ( $(this).val() === defValue ){
                        $(this).val('');
                    }
                });//end focus

                if ( o.reAppear ){
                    obj.on("blur", function(){
                        if ( $(this).val() === '' ){
                            $(this).val(defValue);
                            if (o.textOpacity ){
                                obj.css('color', 'rgba(0, 0, 0, '+ o.textOpacity +')');
                            }
                        }
                    });//end blur
                } //end if reApper


                if (o.formHandle ){
                    $(o.formHandle).on("submit", function(e){
                        if ( obj.val() === defValue ){
                            e.preventDefault();
                            if (o.alertSubmit ){
                                alert(o.alertSubmit);
                            } 
                        }
                    });
                }//if submit with def values

            }// end multi



        });//end each

    }

})(jQuery);
