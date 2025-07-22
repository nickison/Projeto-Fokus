const html = document.querySelector('html')
const focoBt= document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image');
const titulo= document.querySelector('.app__title');

const playPause= document.querySelector('#start-pause')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const playIcon = document.querySelector('.app__card-primary-butto-icon')

const displayTempo = document.querySelector('#timer');

const alertBeep = new Audio('/sons/beep.mp3')
const audioPause = new Audio ('/sons/pause.mp3')
const audioPlay = new Audio ('/sons/play.wav')
const musica = new Audio('/sons/luna-rise-part-one.mp3');

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true
musica.volume= 0.3
playPause.volume= 0.5

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
    
    /*html.setAttribute('data-contexto', 'foco')
    banner.setAttribute('src', 'foco.png')*/
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    
    /*html.setAttribute('data-contexto', 'descanso-curto')
    banner.setAttribute('src', 'descanso-curto.png')*/
})
longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    
    /*html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', 'descanso-longo.png')*/
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case"foco":
        titulo.innerHTML =`
        Otimize sua produtividade.<br>
            <strong class= "app__title-strong">mergulhe no que importa.</strong>
            `
        break;
        case"descanso-curto":
        titulo.innerHTML =`
        Que tal dar uma respirada?.<br>
            <strong class= "app__title-strong">Faça uma pequena pausa.</strong>
            `
        break;
        case"descanso-longo":
        titulo.innerHTML =`
        Hora de voltar a superficie.<br>
            <strong class= "app__title-strong">Faça uma pausa longa.</strong>
            `
        break;
        default:
            break;

    }
}

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }
    else{musica.pause()
    }
})

playPause.addEventListener('click', iniciarOuPausar)


function iniciarOuPausar() {
    if(intervaloId){
        audioPause.play()   // áudio executado quando cronômetro for pausado
        zerar()
        return
    }
    audioPlay.play()   // áudio executado quando cronômetro iniciar
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent ='Pausar'
    playIcon.setAttribute('src','/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBt.textContent ='Começar'
    playIcon.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado= tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'})
    displayTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
/*playPause.addEventListener('click', ()=>{
    playPause.getElementsById('audio')
})*/