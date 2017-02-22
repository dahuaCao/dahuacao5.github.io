/**
 * Created by 61770 on 2016/12/14.
 */
window.onload=function () {
    //获取
    var screenbox=$('screenbox');
    var show=$('show');
    var st1=$('st1');
    var st2=$('st2');
    var st3=$('st3');
    var standard=$('standard');
    var crazy=$('crazy');
    var times=$('times');
    // console.log(times);
    var screenboxTop=screenbox.offsetTop;

    var timer=null,defen=0,shifen=0,dir=2,daojishi=60;
    end=show.offsetHeight;
    // console.log(end);
    //按钮事件
    standard.onclick=function () {
        clearInterval(timer);
        clearTimeout(timer);
        times.style.display='block';
        show.innerHTML='';
        st3.timer=setInterval(function () {
            daojishi--;
            st3.innerHTML=daojishi+'秒';
            if( daojishi==0){
                clearInterval(st3.timer);
                alert('你输了,本次得分是'+defen+'分');
                clearTimeout(timer);
                starcrazy=null;
            }
        },1000)
        console.log(daojishi)
        //定时器
        timer =  setTimeout(starcrazy,1000);

        function starcrazy(){
            var span=document.createElement('span');
            span.style.left=_.random(24,476)+'px';
            span.style.background= 'url("img/'+_.random(1,11)+'.png")'
            span.style.top=0+'px';
            show.appendChild(span);
            var spanoffL=span.offsetLeft;
            // doMove(span,'top',3,500);
            clearInterval(span.timer);
            span.timer=setInterval(function () {
                var speed=parseInt(getStyle(span,'top'))+dir;
                //闭包
                span.onclick=function () {
                    // dir=dir*1.2;
                    defen++;
                    st1.innerHTML=defen+'分';
                    clearInterval(span.timer);
                    setTimeout(starcrazy,1000);
                    
                    doMove(span,'left',5,spanoffL-6,function () {
                        doMove(span,'left',5,spanoffL+6,function () {
                            doMove(span,'left',5,spanoffL,function () {
                                span.style.display='none';
                            })
                        })
                    })
                    
                }

                if(speed>525){
                    speed=525;
                }
                span.style['top']=speed+'px';
                if(speed==525){//这里的判断记得加==
                    clearInterval(span.timer);
                    // dir=dir*1.2;
                    shifen++;
                    st2.innerHTML=shifen+'分';
                    doMove(screenbox,'top',5,screenboxTop-10,function () {
                        doMove(screenbox,'top',5,screenboxTop+10,function () {
                            doMove(screenbox,'top',5,screenboxTop,function () {
                                span.style.display='none';
                            })
                        })
                    })
                    setTimeout(starcrazy,1000);
                        // console.log(defen+','+dir);
                    
                }


            },30)



        }
        
    }

    crazy.onclick=function () {
        times.style.display='none';
        clearInterval(timer);
        clearTimeout(timer);
        //定时器
        timer =  setTimeout(starcrazy,1000);

        function starcrazy(){
            var span=document.createElement('span');
            span.style.left=_.random(24,476)+'px';
            span.style.background= 'url("img/'+_.random(1,11)+'.png")'
            span.style.top=0+'px';
            show.appendChild(span);
            // doMove(span,'top',3,500);
            clearInterval(span.timer);
            span.timer=setInterval(function () {
                var speed=parseInt(getStyle(span,'top'))+dir;
                //闭包
                span.onclick=function () {
                    dir=dir*1.2;
                    defen++;
                    st1.innerHTML=defen+'分';
                    clearInterval(span.timer);
                    setTimeout(starcrazy,1000);
                    var spanoffL=span.offsetLeft;
                    doMove(span,'left',5,spanoffL-6,function () {
                        doMove(span,'left',5,spanoffL+6,function () {
                            doMove(span,'left',5,spanoffL)
                        })
                    })
                }
                
                if(speed>525){
                    speed=525;
                }
                span.style['top']=speed+'px';
                if(speed==525){//这里的判断记得加==
                    clearInterval(span.timer);
                    dir=dir*1.2;
                    shifen++;
                    st2.innerHTML=shifen+'分';
                    doMove(screenbox,'top',5,screenboxTop-10,function () {
                        doMove(screenbox,'top',5,screenboxTop+10,function () {
                            doMove(screenbox,'top',5,screenboxTop,function () {
                                span.style.display='none';
                            })
                        })
                    })
                    if(shifen<10){
                        setTimeout(starcrazy,1000);
                        console.log(defen+','+dir);
                    }else{
                        span.onclick=null;
                        alert('你输了,本次得分是'+defen+'分');
                    }
                }
                
                
            },30)
            
            
            
        }
        
    }



















}













