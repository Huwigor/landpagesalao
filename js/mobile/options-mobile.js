$('document').ready(function () {
    let itemsToShow = 1;
    let currentIndex = 0;
    let autoLoop;
    let checkOverlayInterval;
    let classNames = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8', 'option9', 'option10', 'option11', 'option12', 'option13', 'option14'];
    let cachedItems = []; // Armazena os itens temporariamente durante a pesquisa

    function updateVisibility() {
        $('.mini-options').hide(); // Esconde todos os itens

        // Verifica se há itens no cache temporário
        let itemsArray = cachedItems.length > 0 ? cachedItems : classNames.map(cn => $('.' + cn));

        // Calcula quantos itens serão mostrados nesta rodada
        let itemsRemaining = itemsArray.length - currentIndex;
        let itemsToDisplay = Math.min(itemsToShow, itemsRemaining);

        for (let i = 0; i < itemsToDisplay; i++) {
            let index = (currentIndex + i) % itemsArray.length;
            itemsArray[index].show(); // Mostra os itens com as classes correspondentes ou os itens filtrados
        }
    }

    function startAutoLoop() {
        autoLoop = setInterval(function() {
            currentIndex += itemsToShow;
            if (currentIndex >= (cachedItems.length > 0 ? cachedItems.length : classNames.length)) {
                currentIndex = 0; // Volta ao início quando passar do número total de itens
            }
            updateVisibility();
        }, 3000); // Ajuste o tempo de intervalo conforme necessário
    }

    function stopAutoLoop() {
        clearInterval(autoLoop);
    }

   
        $("#pesquisa").on("input", function() {
            stopAutoLoop(); // Para o loop automático ao digitar
            let valorPesquisa = $(this).val().toLowerCase();
            let temResultados = false; // Variável para verificar se há resultados
    
            if (valorPesquisa === "") {
                cachedItems = []; // Limpa o cache temporário quando a pesquisa está vazia
                currentIndex = 0;
                $(".mini-options").show(); // Mostra todas as mini-options quando o input está vazio
                $(".msg-serviço").hide(); // Oculta a mensagem se o input estiver vazio
            } else {
                cachedItems = []; // Limpa o cache antes de popular
                $('.mini-options').each(function() {
                    let title = $(this).find('.tittle-options').text().toLowerCase();
                    if (title.includes(valorPesquisa)) {
                        cachedItems.push($(this)); // Adiciona ao cache temporário as divs correspondentes à pesquisa
                        temResultados = true; // Define como true se houver correspondências
                        $(this).show(); // Mostra os elementos que correspondem à pesquisa
                    } else {
                        $(this).hide(); // Oculta os elementos que não correspondem à pesquisa
                    }
                });
    
                currentIndex = 0; // Reseta o índice ao realizar uma nova pesquisa
    
                // Exibe ou oculta a mensagem com base nos resultados
                if (!temResultados) {
                    $(".msg-serviço").show(); // Mostra a mensagem se não houver resultados
                    $(".mini-options").hide(); // Oculta todas as mini-options
                } else {
                    $(".msg-serviço").hide(); // Oculta a mensagem se houver resultados
                }
            }
    
            updateVisibility(); // Atualiza a visibilidade dos elementos conforme necessário
        });


        
     // Navegação pelos botões
     $('#next').click(function() {
        stopAutoLoop(); // Para o loop automático ao clicar
        currentIndex += itemsToShow;
        let totalItems = cachedItems.length > 0 ? cachedItems.length : classNames.length;
        if (currentIndex >= totalItems) {
            currentIndex = 0; // Volta ao início quando passar do número total de itens
        }
        updateVisibility();
    });

    $('#prev').click(function() {
        stopAutoLoop(); // Para o loop automático ao clicar
        currentIndex -= itemsToShow;
        let totalItems = cachedItems.length > 0 ? cachedItems.length : classNames.length;
        if (currentIndex < 0) {
            currentIndex = totalItems - (totalItems % itemsToShow || itemsToShow);
        }
        updateVisibility();
    });

    // Inicializa a visibilidade mostrando apenas os primeiros itens
    updateVisibility();

    // Função que verifica se a overlay está visível
    function checkOverlayVisibility() {
        if ($('.overlay').css('display') === 'block') {
            if (!autoLoop) {
                startAutoLoop(); // Inicia o loop quando a overlay está visível
            }
        } else {
            stopAutoLoop(); // Para o loop quando a overlay não está visível
        }
    }

    // Intervalo para verificar o estado da overlay a cada 500ms
    checkOverlayInterval = setInterval(checkOverlayVisibility, 500);
});