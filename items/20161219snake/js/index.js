/**
 * Created by 61770 on 2016/12/17.
 */
window.onload=function () {
    //说明：地图是一个25*25的数组，蛇和食物都是蛇长*2（xy坐标）数组
    //1.0获取标签
    var begin=$('begin'),reset=$('reset'),speed=$('speed'),screen=$('screen'),score=$('fenshu'),fensh=0;
    //2.0定义屏幕地图二维数组
    var trs=document.getElementsByTagName('tr');
    var tds=document.getElementsByTagName('td');
    var trlen=trs.length;
    var tdlen=tds.length;
    var elementArr=creatArr(trlen,(tdlen/trlen));//对象
    // console.log(elementArr);
    //创建二维数据函数
    function creatArr(m,n) {
        var arr=new Array(n);
        for(var i=0;i<m;i++){
            arr[i]=new Array(m);
        }
        return arr;
    }

    //创建地图二维数组
    var mapArr=creatArr(trlen,(tdlen/trlen));
    for(var j=0;j<trlen;j++){
        for(var k=0;k<(tdlen/trlen);k++){
            mapArr[j][k]=(trs[j].children[k]);
        }
    }
    // console.log(mapArr)
    //蛇初始化
    var snake=new Array;//是一组坐标值
    function creatSnake() {
        var pionter=randomPionter(3,3,15,15);
        for(var i=0;i<3;i++){
            var x=pionter[0]-i,
                y=pionter[1];
            snake.push([x,y]);
            // mapArr[x][y].className='snake';
            elementArr[x][y]='snake';
        }
        // console.log(snake[0])
    }
    //食物产生函数
    function creatFood() {
        var food=randomPionter(0,0,24,24);
        elementArr[food[0]][food[1]] ='food';
        // console.log(elementArr[food[0]][food[1]]+food[0]+','+food[1]);
        mapArr[food[0]][food[1]].className='food';
        mapArr[food[0]][food[1]].style.background='url("images/'+_.random(0,4)+'.jpg") no-repeat';
        mapArr[food[0]][food[1]].style.backgroundSize='100% 100%';
    }
    //产生随机点
    function randomPionter(x1,y1,x2,y2) {//一个范围
        var pionter=[];
        var x=_.random(x1,x2),
            y=_.random(y1,y2);
        pionter[0]=x;
        pionter[1]=y;

        return pionter;
    }

    //点击开始按钮
    var snakeTimer=null;
    var dir=40;//行走方向
    begin.onclick=function () {
        creatSnake();
        creatFood();
        // console.log(snake[1]);
        clearInterval(snakeTimer);
        snakeTimer=setInterval(timeFn,speed.value);
    };

    //点击重置按钮
    reset.onclick=function () {
        window.location.reload();
    }
    //每一秒函数
    function timeFn() {
        //获取蛇头坐标
        var snakeheadX=snake[0][0],
            snakeheadY=snake[0][1];
        console.log(snakeheadX)
        console.log(snakeheadY)
        //方向控制
        switch (dir){
            case 37:snakeheadY-=1;break;
            case 38:snakeheadX-=1;break;
            case 39:snakeheadY+=1;break;
            case 40:snakeheadX+=1;break;
        }
        //判断是否输了
        if(snakeheadX >= trlen || snakeheadX < 0 || snakeheadY >= trlen || snakeheadY < 0 || elementArr[snakeheadX][snakeheadY] == "snake" ) {
            alert('你输了');

            begin.removeAttribute("disabled");
            window.clearInterval(snakeTimer);
        }
        //判断是否吃到食物
        if(elementArr[snakeheadX][snakeheadY] != 'food') {
            var lastX = snake[snake.length-1][0],
                lastY = snake[snake.length-1][1];
            elementArr[lastX][lastY] = false;
            mapArr[lastX][lastY].className ='';
            snake.pop();
        } else {
            elementArr[snakeheadX][snakeheadY] = false;
            mapArr[snakeheadX][snakeheadY].style.background='none';
            fensh++;
            creatFood();
            // alert('食物');
            score.innerHTML=fensh+'分';
        }
        //蛇运动
        snake.unshift([snakeheadX,snakeheadY]);
        elementArr[snakeheadX][snakeheadY] = 'snake';
        mapArr[snakeheadX][snakeheadY].className='snake';
    }

    //监听键盘方向事件
    document.onkeydown=function (event) {
        var event=event||window.event;
        dir=Math.abs(event.keyCode - dir) != 2 && event.keyCode > 36 && event.keyCode < 41 ? event.keyCode : dir; //非方向键、反向无效
        // console.log(dir);
    }
};