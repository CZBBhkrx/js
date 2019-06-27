(function (root) {
    var jQuery = function () {
        return new jQuery.prototype.init();
    }
    jQuery.fn = jQuery.prototype = {
        init: function () {

        },
        css: function () {

        },
    }
    //extend  $.extend({},{name :"lining",age:"19"})
    jQuery.fn.extend = jQuery.extend = function () {
        var target = arguments[0] || {};  //target 指的是$.extend({},{name :"lining",age:"19"})中的{}
        var length = arguments.length;
        var i = 1;
        var deep = false;  //第一个参数为true  是深拷贝
        var options, copy, src, copyIsArray, clone;//定义一个接收扩展任意对象参数的容器
        //如果第一个参数是布尔 代表深拷贝  把deep设置成 arguments[0] 
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1];  //同事 target代表第二个参数 就是arguments[1] 
            i = 2; //同时i = 2
        }
        if (typeof target !== 'object') {
            target = {}
        }
        //当参数个数是一 说明是给jq 或者jq的实例 扩展
        if (length === 1) {
            target = this;
            i--;
        }
        
        //整个操作为浅拷贝
        for (; i < length; i++) {
            //因为 到这里 一定是给任意对象扩展属性 ,任意对象第一个参数不需要for 是{}
            if ((options = arguments[i]) !== null) {
                /*
                options 相当于{name :"lining",age:"19"}
                $.extend({},{name :"lining",age:"19"})

                    var obj1 = {name:"lining",list:{age:19}}
                    var obj2 = {list:{color:"red"}}
                    $.extend(true,{}, obj1, obj2)
                */
                for (var name in options) {
                    copy = options[name];
                    src = target[name];  //相当与传进来的 "lining" , '19' '{ 里边是对象}'  '[里边是数组]'
                    //判断是obj或者数组
                    if (deep && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        }else{
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone , copy);
                    } else if (copy != undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target
    }


    //共享原型对象
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend({
        //扩展一些类型检测的方法
        isPlainObject: function (obj) {
            return toString.call(obj) === '[object Object]'
        },
        isArray: function (obj) {
            return toString.call(obj) === '[object Array]'
        }

    })
    root.$ = root.jQuery = jQuery
})(this)
