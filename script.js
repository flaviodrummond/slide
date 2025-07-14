// Seleciona os botões e elementos principais do DOM
let buttonNext = document.querySelector('.next')
let buttonBack = document.querySelector('.back')
let container = document.querySelector('.container')
let list = document.querySelector('.container .list')
let thumb = document.querySelector('.container .thumb')

// Flag para bloquear cliques durante a animação
let isAnimating = false

// Evento ao clicar no botão "Next"
buttonNext.onclick = () => {
    if (!isAnimating) moveButton('next')  // Só executa se não estiver animando
}

// Evento ao clicar no botão "Back"
buttonBack.onclick = () => {
    if (!isAnimating) moveButton('back')  // Só executa se não estiver animando
}

// Função principal que move os slides e reinicia as animações
const moveButton = (type) => {
    isAnimating = true // Impede cliques enquanto anima

    // Seleciona os itens de lista e miniaturas atualizados
    let listItem = document.querySelectorAll('.list .item')
    let listThumb = document.querySelectorAll('.thumb .item')

    // Ação ao clicar no botão "Next"
    if (type === 'next') {
        const movedThumb = listThumb[0]           // Pega o primeiro thumbnail
        list.appendChild(listItem[0])             // Move o primeiro item da lista para o final
        thumb.appendChild(movedThumb)             // Move o primeiro thumbnail para o final

        resetAnimation(movedThumb)                // Reinicia animação da miniatura
        resetAnimation(container, 'next')         // Reinicia animação do container

        // Remove classe 'animate' depois de um tempo para não acumular animações
        setTimeout(() => {
            movedThumb.classList.remove('animate')
        }, 300)
    
    } else { // Ação ao clicar no botão "Back"
        const movedThumb = listThumb[listThumb.length - 1]               // Pega o último thumbnail
        list.prepend(listItem[listItem.length - 1])                      // Move o último item da lista para o início
        thumb.prepend(movedThumb)                                        // Move o último thumbnail para o início

        resetAnimation(movedThumb)                                       // Reinicia animação da miniatura
        resetAnimation(container, 'back')                                // Reinicia animação do container

        setTimeout(() => {
            movedThumb.classList.remove('animate')
        }, 300)
    }

    // Após 1 segundo (tempo da animação), libera o clique novamente
    setTimeout(() => {
        container.classList.remove('next', 'back')  // Remove qualquer classe de animação ativa
        isAnimating = false                         // Libera cliques
    }, 1000)
}

// Função auxiliar que reinicia uma animação forçando reflow
function resetAnimation(element, className = 'animate') {
    element.classList.remove(className)   // Remove classe de animação
    void element.offsetWidth              // Força reflow no DOM (reinicializa a animação)
    element.classList.add(className)      // Reaplica a classe de animação
}
