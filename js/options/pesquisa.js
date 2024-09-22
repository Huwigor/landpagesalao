$(document).ready(function() {
    $("#pesquisa").on("keyup", function() {
        var valorPesquisa = $(this).val().toLowerCase();
        
        $(".mini-options").filter(function() {
            var titulo = $(this).find(".tittle-options").text().toLowerCase();
            $(this).toggle(titulo.indexOf(valorPesquisa) > -1);
        });
    });
});