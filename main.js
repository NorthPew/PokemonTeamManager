const startButton = document.querySelector('.start-button')


const dialogText = document.querySelector('.dialog-text')

const LS_KEY1 = 'intro-state'


// Om den inte finner en nyckel med det namnet, gör en ny en
if (!localStorage.getItem(LS_KEY1)) {
    let introState = {
        hasPlayerSeenIntro: false
    }
    
    const LS_KEY1 = 'intro-state'
    
    let introStateToString = JSON.stringify(introState)
    
    localStorage.setItem(LS_KEY1, introStateToString)
}


const containers = {
    splash: document.querySelector('.splash-screen'),
    intro: document.querySelector('.intro-screen'),
    game: document.querySelector('.game-screen')
}

const textsForIntro = {
    hello: 'Hello there!  (Click)',
    welcome: 'Welcome to the world of Pokémon!',
    oak: 'My name is Oak. People call me the Pokémon Prof.',
    world: 'This world is inhabited by creatures that we call Pokémon.',
    pets: 'For some people, Pokémon are pets. Other use them for fights.',
    myself: 'Myself… I study Pokémon as a profession.',
    enough: "Enough of nostalgic words... Let's begin ur journey!"
}

const enterKeySound = new Audio('./keypress.wav')

dialogText.textContent = textsForIntro.hello


startButton.addEventListener('click', event => {
    containers.splash.classList.add('hidden')

    let test = localStorage.getItem(LS_KEY1)
    let tested = JSON.parse(test)

    console.log(tested);

    if (tested.hasPlayerSeenIntro == false) {
        containers.intro.classList.remove('hidden')
    } else {
        containers.game.classList.remove('hidden')
    }
    
})

let stateFromLS = localStorage.getItem(LS_KEY1)
let tested = JSON.parse(stateFromLS)

let saveNewIntroStateLS = () => {
    const introState = {
        hasPlayerSeenIntro: true
    }
    
    let introStateToString = JSON.stringify(introState)
    
    localStorage.setItem(LS_KEY1, introStateToString)
}

let introStartDialogs = () => {
    enterKeySound.play()
    switch (dialogText.textContent) {
        case textsForIntro.hello:
            
            dialogText.textContent = textsForIntro.welcome
            break;
        case textsForIntro.welcome:
            dialogText.textContent = textsForIntro.oak
            break;
        case textsForIntro.oak:
            dialogText.textContent = textsForIntro.world
            break;
        case textsForIntro.world:
            dialogText.textContent = textsForIntro.pets
            break;
        case textsForIntro.pets:
            dialogText.textContent = textsForIntro.myself
            break;
        case textsForIntro.myself:
            dialogText.textContent = textsForIntro.enough
            break;
        case textsForIntro.enough:
            containers.intro.classList.add('hidden')
            setTimeout(() => {
                containers.game.classList.remove('hidden')
            }, 100)
            saveNewIntroStateLS()
    }
}

    containers.intro.addEventListener('click', event => {
        introStartDialogs()
    })
