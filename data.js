// new 操作符
function _new() {
    let target = {};  //创建一个空对象 
    let [constructor, ...argu] = [...arguments];  //解构 构造函数和参数
    target.__proto__ = constructor.prototype;  //建立构造函数和 实例的链接
    let result = constructor.apply(target, argu);  //执行构造函数 把属性和方法继承给新的实例
    if (result && typeof (result) == 'object' || typeof (result) == 'function') {  //  如果构造函数执行结果返回一个obj  就将该结果返回
        return result
    }
    //如果该构造函数返回的不是一个obj  则返回创建的对象
    return target
}
//call
Function.prototype.Mycall = function() {
    let [thisArgu, ...argu] = [...arguments];  //解构出指针和参数
    if (!thisArgu){
        //context 为null或者undefined 重新定义指针
        thisArgu = typeof window === 'undefined' ?  'global' : 'window'
    }
    //this的指向是当前函数 func()  func.call()//谁调用myCall方法，this就指向谁
    thisArgu.func = this;
    //执行函数
    let result = thisArgu.func(...argu);
    //删除 没有的func方法
    delete thisArgu.func;
    return result ;
}
