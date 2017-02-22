/**
 * Created by Orange on 2016/12/15.
 */
function beginrotate() {

    var angle = 0;

    function rotateloop() {
        if (angle < 360) {
            angle++;
//use angle
//......
            setTimeout(rotateloop, 100);
        }
    }
//do something
//......
    setTimeout(rotateloop, 100);
} 