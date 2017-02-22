/**
 * Created by 61770 on 2016/12/8.
 */
var myfn1208={
    $:function (tagid) {
        return document.getElementById(tagid);
    },
    gettag:function (tag) {
        return document.getElementsByTagName(tag);
    },
    css:function (dom,key,value) {
        dom.style.key=value;
    },
    each:function (doms,fn) {
        for(var i=0;i<doms.length;i++){
            fn(doms[i],i);
        }
    }
}

















