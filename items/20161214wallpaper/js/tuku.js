/**
 * Created by 61770 on 2016/12/14.
 */

window.onload=function () {
    //1.0实现横向瀑布流
    // alert(1);

    waterFall('main','box');
    //2.0实现横向滚动，加载图片

    window.onscroll=function () {
        if(checkLoadpic()){
            var dateArr=[
                {src:_.random(0,27)},
                {src:_.random(0,27)},
                {src:_.random(0,27)},
                {src:_.random(0,27)},
                {src:_.random(0,27)},
                {src:_.random(0,27)}
            ];
            tianjia(dateArr);
            waterFall('main','box');
        }
    };



    function waterFall(parent,box){
        //获取子盒子
        var allbox= $(parent).getElementsByClassName(box);
        // console.log(allbox);
        var boxheight=allbox[0].offsetHeight;
        console.log(allbox[0].offsetWidth);
        // console.log(boxheight);
        //定义宽度数组
        var widthArr=[],boxWidth=0,minboxW=0,minboxindex=0;
        //遍历自盒子
        for(var i=0;i<allbox.length;i++){
            boxWidth=allbox[i].children[0].offsetWidth+10;
            //注意：两种解决方案：（1）改为获取里面图片的宽（2）获取box宽但是加个左浮动
            // boxWidth=allbox[i].offsetWidth;
            if(i<3){
                allbox[i].style.position='absolute';
                allbox[i].style.top=boxheight*i+'px';
                allbox[i].style.left=0+'px';
                widthArr.push(boxWidth);
            }else{
                minboxW=_.min(widthArr);
                // console.log(minboxW);
                minboxindex=getminboxWindex(widthArr,minboxW);
                allbox[i].style.position='absolute';
                allbox[i].style.top=boxheight*minboxindex+'px';
                allbox[i].style.left=minboxW+'px';
                widthArr[minboxindex]+=boxWidth;
            }
        }
    }

    function getminboxWindex(arr,vaule) {
        for(var j=0;j<arr.length;j++){
            if(arr[j]==vaule){
                return j;
            }
        }
    }
    function checkLoadpic() {
        //获取scrollLeft和最后一张照片的offsetleft
        var allboxs=$('main').children;
        // console.log(allboxs);
        var lastboxOffsetleft=allboxs[allboxs.length-1].offsetLeft;
        var scrollLeft=scroll().left;
        var check2=scrollLeft+document.documentElement.clientWidth;
        if(check2>lastboxOffsetleft){
            return true;
        }
    }
    function tianjia(arr) {
        var str='';
        var main=document.getElementById('main');
        for(var i=0;i<arr.length;i++){

            str='<div class="box"><img src="images/'+document.title+'/'+arr[i].src+'.jpg" alt=""></div>';
            main.innerHTML+=str;
        }
    }
};

























