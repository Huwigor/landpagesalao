$('document').ready(function () {
    let itemsToShow = 3;
    let currentIndex = 0;
    let autoLoop;
    let checkOverlayInterval;
    let classNames = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8', 'option9', 'option10', 'option11', 'option12', 'option13', 'option14'];
    let cachedItems = []; 

    function updateVisibility() {
        $('.mini-options').hide(); 

        let itemsArray = cachedItems.length > 0 ? cachedItems : classNames.map(cn => $('.' + cn));

        let itemsRemaining = itemsArray.length - currentIndex;
        let itemsToDisplay = Math.min(itemsToShow, itemsRemaining);

        for (let i = 0; i < itemsToDisplay; i++) {
            let index = (currentIndex + i) % itemsArray.length;
            itemsArray[index].show(); 
        }
    }

    function startAutoLoop() {
        autoLoop = setInterval(function() {
            currentIndex += itemsToShow;
            if (currentIndex >= (cachedItems.length > 0 ? cachedItems.length : classNames.length)) {
                currentIndex = 0; 
            }
            updateVisibility();
        }, 3000); 
    }

    function stopAutoLoop() {
        clearInterval(autoLoop);
    }

    $("#pesquisa").on("input", function() {
        stopAutoLoop(); 
        let valorPesquisa = $(this).val().toLowerCase();
        let temResultados = false; 

        if (valorPesquisa === "") {
            cachedItems = []; 
            currentIndex = 0;
            $(".mini-options").show(); 
            $(".msg-serviço").hide(); 
        } else {
            cachedItems = []; 
            $('.mini-options').each(function() {
                let title = $(this).find('.tittle-options').text().toLowerCase();
                if (title.includes(valorPesquisa)) {
                    cachedItems.push($(this)); 
                    temResultados = true; 
                    $(this).show(); 
                } else {
                    $(this).hide(); 
                }
            });

            currentIndex = 0; 

            if (!temResultados) {
                $(".msg-serviço").show();
                $(".mini-options").hide(); 
            } else {
                $(".msg-serviço").hide(); 
            }
        }

        updateVisibility(); 
    });

    $('#next').click(function() {
        stopAutoLoop(); 
        currentIndex += itemsToShow;
        let totalItems = cachedItems.length > 0 ? cachedItems.length : classNames.length;
        if (currentIndex >= totalItems) {
            currentIndex = 0; 
        }
        updateVisibility();
    });

    $('#prev').click(function() {
        stopAutoLoop(); 
        currentIndex -= itemsToShow;
        let totalItems = cachedItems.length > 0 ? cachedItems.length : classNames.length;
        if (currentIndex < 0) {
            currentIndex = totalItems - (totalItems % itemsToShow || itemsToShow);
        }
        updateVisibility();
    });

    updateVisibility();

    function checkOverlayVisibility() {
        if ($('.overlay').css('display') === 'block') {
            if (!autoLoop) {
                startAutoLoop(); 
            }
        } else {
            stopAutoLoop(); 
        }
    }

    checkOverlayInterval = setInterval(checkOverlayVisibility, 500);
});