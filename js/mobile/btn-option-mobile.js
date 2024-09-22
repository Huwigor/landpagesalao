$(document).ready(function(){

    function abrirOptions() {
        $('.overlay').css('display', 'block');
        $('.conteudo-options').css('display', 'block');
    }

    function fecharOptions() {
        $('.overlay').css('display', 'none');
        $('.conteudo-options').css('display', 'none');
    }

    $('.btn-close').click(function(){
        fecharOptions()
    })

    $('.btn-options').click(function(){
        abrirOptions()
    });

    $('.btn-options').focus(function(){
        abrirOptions()
    });

    $('.btn-options').hover(function(){
       abrirOptions()
    });

    $('.header').click(function(){
    fecharOptions()
});

});