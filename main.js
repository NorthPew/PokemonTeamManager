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
    myself: 'Myself… I study Pokémon as a profession.'
}


dialogText.textContent = textsForIntro.hello

const introStart = () => {

}

startButton.addEventListener('click', event => {
    containers.splash.classList.add('hidden')

    introStart()
})


document.body.addEventListener('keydown', event => {

    if (event.key == 'Enter') {
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
        }
    }
})

