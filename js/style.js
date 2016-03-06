var animiting;
$(document).ready(function(){
    animiting= $(".intro")
    animiting.mouseenter(function(){

        $(this).hide(2000).show(2000);
    });
});
