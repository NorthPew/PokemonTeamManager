const startButton = document.querySelector('.start-button')


const dialogText = document.querySelector('.dialog-text')



const containers = {
    splash: document.querySelector('.splash-screen'),
    intro: document.querySelector('.intro-screen')
}

const textsForIntro = {
    hello: 'Hello there!  (Press Enter)',
    welcome: 'Welcome to the world of Pokémon!',
    oak: 'My name is Oak. People call me the Pokémon Prof.',
    world: 'This world is inhabited by creatures that we call Pokémon.',
    pets: 'For some people, Pokémon are pets. Other use them for fights.',
    myself: 'Myself… I study Pokémon as a profession.',
    enough: "Enough of nostalgic words... Let's begin ur journey!"
}

const enterKeySound = new Audio('./keypress.wav')

dialogText.textContent = textsForIntro.hello

const introStart = () => {

}


startButton.addEventListener('click', event => {
    containers.splash.classList.add('hidden')
    containers.intro.classList.remove('hidden')
    introStart()
})

if (containers.intro.classList.contains !== 'hidden') {
    document.body.addEventListener('keydown', event => {
        setTimeout(() => {
        if (event.key == 'Enter') {
                switch (dialogText.textContent) {
                    case textsForIntro.hello:
                        enterKeySound.play()
                        dialogText.textContent = textsForIntro.welcome
                        break;
                    case textsForIntro.welcome:
                        enterKeySound.play()
                        dialogText.textContent = textsForIntro.oak
                        break;
                    case textsForIntro.oak:
                        enterKeySound.play()
                        dialogText.textContent = textsForIntro.world
                        break;
                    case textsForIntro.world:
                        enterKeySound.play()
                        dialogText.textContent = textsForIntro.pets
                        break;
                    case textsForIntro.pets:
                        enterKeySound.play()
                        dialogText.textContent = textsForIntro.myself
                        break;
                    case textsForIntro.myself:
                        enterKeySound.play()
                        dialogText.textContent = textsForIntro.enough
                        break;
                    case textsForIntro.enough:
                        containers.intro.classList.add('hidden')
                        break;
                }
            }
        }, 800)
    })
}

