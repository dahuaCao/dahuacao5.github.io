/**
 * Created by 61770 on 2017/2/8.
 */
$(function () {
    var screen_hd = $('#screen_hd');
    var screen_ft = $('#screen_ft');
    //1.男女开关
    var sexNum = 0;
    var changeSexNum=0;
    sexChange();
    var div1 = $('#div1')[0];
    var div2 = $('#div2')[0];
    div2.onclick=function(){
        sexNum = sexNum==0?1:0;
        sexChange()
    };

    //2.人称按钮
    var btns = $('.buttons');
    var btnlen = btns.length;
    for(var i=0;i<btnlen;i++){
        btns[i].onclick=function () {
            if($(this).data('sex') == "nan"){
                changeSexNum=0;
                toggleSex();
            }else if($(this).data('sex') == "nv"){
                changeSexNum=1;
                toggleSex();
            }

            if(screen_ft[0].value ==''|| screen_ft[0].value =='还没写入这个关系'){
                screen_ft[0].value += this.name;//注意this的使用
            }else{
                screen_ft[0].value += "的" + this.name;
            }
        }
    }

    //3.等于号
    $('#deng').click(function () {
        var screen_ftV = screen_ft[0].value;
        //3.0先置换
        screen_hd[0].value = screen_ft[0].value+'=';

        //3.1获取数据
        if(window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();
        }else{
            var xhr = new ActiveXObject("Micorsoft XMLHTTP");
        }
        xhr.open("get","relation.json");
        xhr.send();
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if(xhr.status >=200 && xhr.status<300 || xhr.status == 304){
                    var result =JSON.parse(xhr.responseText);
                    var dataArr = result.relation;
                    $(dataArr).each(function (index, item) {
                        if(item.content == screen_ft[0].value){
                            screen_ft.val(item.rec);
                            //互换按钮
                            $('#exchange').click(function () {
                                screen_hd.val(item.rec);
                                screen_ft.val(screen_ft.val()==item.rec?item.exchange[sexNum]:item.rec);
                            });
                            return false;
                        }
                    });
                    if(screen_ft[0].value == screen_ftV){
                        screen_ft.val('还没写入这个关系');
                    }
                }
            }
        }
    });

    //4.清空按钮
    $('#clearall').click(function () {
        screen_ft.val('');
        screen_hd.val('');
    });

    //撤销按钮
    $('#back').click(function () {
        var str = screen_ft.val();
        screen_ft.val(str.substring(0,str.length-3));
    })

    function toggleSex() {
        if(changeSexNum ==1){
            $("#husband").removeClass('lose').removeAttr("disabled");
            $("#wife").addClass('lose').attr("disabled", "true");
        }else if(changeSexNum ==0){
            $("#husband").addClass('lose').attr("disabled", "true");
            $("#wife").removeClass('lose').removeAttr("disabled");
        }
    }
});
//男女关系运算
function sexChange() {
    if(div1.className=="close1"){
        div1.className = "open1";
        //toggleSex();
        $("#husband").removeClass('lose').removeAttr("disabled");
        $("#wife").addClass('lose').attr("disabled", "true");
    }else{
        div1.className = "close1";
        //toggleSex();
        $("#husband").addClass('lose').attr("disabled", "true");
        $("#wife").removeClass('lose').removeAttr("disabled");
    }

    if(div2.className=="close2"){
        div2.className = "open2";
    }else{
        div2.className = "close2";
    }
}
