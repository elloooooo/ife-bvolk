var animiting;
$(document).ready(function(){
    animiting= $(".intro")
    animiting.mouseenter(function(){

        $(this).hide(500).show(500);
    });
});
