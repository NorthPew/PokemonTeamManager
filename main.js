const startButton = document.querySelector('#start-game-button')


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
    game: document.querySelector('.game-screen'),
    add: document.querySelector('.add-pokemon-screen')
}

const textsForIntro = {
    hello: 'Hello there! (Click)',
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


const openAddPokemonScreen = document.querySelector('#open-add-pokemon-screen-button')

openAddPokemonScreen.addEventListener('click', event => {
    containers.game.classList.add('hidden')
    containers.add.classList.remove('hidden')
})

const LS_KEY2 = 'saving-pokemon'

const savePokemonToUl = document.querySelector('.selected-pokemons')

const searchForPokemon = document.querySelector('#search-for-pokemon')
searchForPokemon.addEventListener('keydown', async event => {
    if(event.key == 'Enter') {

        const url = `https://pokeapi.co/api/v2/pokemon/${searchForPokemon.value}`

        const response = await fetch(url, {})
        const data = await response.json()

        let savedPokemons

        if (localStorage.getItem(LS_KEY2) == null) {
            savedPokemons = []
        } else {
            savedPokemons = JSON.parse(localStorage.getItem(LS_KEY2))
        }

        if (savedPokemons.find(pokemon => pokemon.name == data.name)) {

        } else {
            savedPokemons.push(data)
        }

        const arrayAsString = JSON.stringify(savedPokemons)
    
        localStorage.setItem(LS_KEY2, arrayAsString)

        addNewPokemonToUl()
    }

})

const addNewPokemonToUl = () => {

    for (let pokemon of JSON.parse(localStorage.getItem(LS_KEY2))) {
        let newLi = document.createElement('li')

        let newSprite = document.createElement('img')

        let newNameHeading = document.createElement('h1')

        newSprite.src = pokemon.sprites.front_default

        newNameHeading.textContent = pokemon.name

        newLi.append(newSprite, newNameHeading)
        

        savePokemonToUl.append(newLi)

        pokemon.abilities.forEach(element => {
            console.log(element.ability.name);
            let newAbilitiesLegend = document.createElement('legend')
    
            newAbilitiesLegend.textContent = element.ability.name
            newLi.append(newAbilitiesLegend)
        });
    
        savePokemonToUl.append(newLi)
        
    }









/*

    */
}


if(localStorage.getItem(LS_KEY2) !== null){
    addNewPokemonToUl()
}

const closeButtonForAddPokemonScreen = document.querySelector('#close-button-add-pokemon-screen')

closeButtonForAddPokemonScreen.addEventListener('click', () => {
    containers.add.classList.add('hidden')
    containers.game.classList.remove('hidden')
})


