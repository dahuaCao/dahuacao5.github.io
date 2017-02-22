/**
 * Created by 61770 on 2016/12/11.
 */
/*获取id等函数*/
function $( v ){
    if( typeof v === 'function' ){
        window.onload = v;
    } else if ( typeof v === 'string' ) {
        return document.getElementById(v);//获取id
    } else if ( typeof v === 'object' ) {
        return v;
    }
}

//获取目标样式兼容
/*
 获取到的是计算机（浏览器）计算后的样式

 background: url() red ……		复合样式（不要获取）
 backgroundColor				单一样式（不要用来做判断）
 1、不要有空格
 2、不要获取未设置后的样式：不兼容
 */
function getStyle( obj, attr ){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}

/*运动的封装函数
* 用法：doMove(obj,属性,方向/步长,目标值,回调函数)
* */
function doMove(obj,attr,dir,target,endFn) {
    dir=parseInt(getStyle(obj,attr))<target?dir:-dir;
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var speed=parseInt(getStyle(obj,attr))+dir;//这里其实是步长，记得转换成数字
        if(speed>target&&dir>0 ||speed<target&&dir<0){
            speed=target;
        }
        obj.style[attr]=speed+'px';//这里记住用[]，不要用.
        if(speed==target){//这里的判断记得加==
            clearInterval(obj.timer);
            endFn && endFn();//回调函数
        }
    },30)
}

/*函数：获取scrollTop 和scrollLeft
 *用法：用法: scroll().top;  scroll().left;
 */
function scroll() {
    if(window.pageXOffset != null){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }
    return{
        top:document.body.scrollTop,
        left:document.body.scrollLeft
    }
}














