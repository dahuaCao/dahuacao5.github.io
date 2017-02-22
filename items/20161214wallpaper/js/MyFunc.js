/**
 * Created by 123 on 2016/12/7.
 */

function $(id) {
    return document.getElementById(id);
}

/*
 *  获取文档的头部和左边的偏离位置
 *  使用: scroll().left  scroll().top
 */
function scroll() {
    if(window.pageXOffset != null){ // ie9+ 和 最新浏览器
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){ // 标准浏览器
        return{
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }else {
        return{
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }
}