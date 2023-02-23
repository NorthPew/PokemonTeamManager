/// START ///

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


// Alla screens som finns till projektet
const containers = {
    splash: document.querySelector('.splash-screen'),
    intro: document.querySelector('.intro-screen'),
    game: document.querySelector('.game-screen'),
    add: document.querySelector('.add-pokemon-screen')
}


/// INTRO ///

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

/// GAME ///


const openAddPokemonScreen = document.querySelector('#open-add-pokemon-screen-button')

openAddPokemonScreen.addEventListener('click', event => {
    containers.game.classList.add('hidden')
    containers.add.classList.remove('hidden')
})

const LS_KEY2 = 'saving-pokemon'
const LS_KEY3 = 'list-all-pokemons'

const savePokemonToUl = document.querySelector('.selected-pokemons')

const errorMSG = document.querySelector('#error-too-many-selected-pokemons')

const addSearchResultToSavePokemon = async urlFromSearch => {
    if (savePokemonToUl.childElementCount < 3) {
        const url = urlFromSearch

        const response = await fetch(url, {})
        const data = await response.json()

        let savedPokemons

        if (localStorage.getItem(LS_KEY2) == null) {
            savedPokemons = []
        } else {
            savedPokemons = JSON.parse(localStorage.getItem(LS_KEY2))
        }
        
        // Om det finns redan pokemon med samma namn, lägg då inte till
        if (savedPokemons.find(pokemon => pokemon.name == data.name)) {

        } else {
            savedPokemons.push(data)
        }

        const arrayAsString = JSON.stringify(savedPokemons)
    
        localStorage.setItem(LS_KEY2, arrayAsString)

        addNewPokemonToUl()
        countTeamMembers()


        errorMSG.classList.add('hidden')
        searchBarForPokemons.value = ''
    } else {
        console.log('Du får inte ha mer än 3 pokemons!');
        tooManyPokemonsErrorMSG()
    }
} 

const tooManyPokemonsErrorMSG = () => {
    errorMSG.classList.toggle('hidden')
}


const listAllPokemonsUl = document.querySelector('#list-all-pokemons')

const searchBarForPokemons = document.querySelector('#search-for-pokemons')
searchBarForPokemons.addEventListener('keydown', () => {
   /*
    const getSearchResults = JSON.parse(localStorage.getItem(LS_KEY3)).results.filter(searchForPokemon => {
        if (searchForPokemon.name.match(searchBarForPokemons.value.toLowerCase()))  {
            listAllPokemonsUl.innerHTML = ''
            let newListElem = document.createElement('li')
            newListElem.textContent = searchForPokemon.name
            listAllPokemonsUl.append(newListElem)
        } 
    })
    */
/*
    const getSearchResults = JSON.parse(localStorage.getItem(LS_KEY3)).results
    for (let pokemon of getSearchResults) {
        if(pokemon.name.match(searchBarForPokemons.value))  {
            listAllPokemonsUl.innerHTML = ''
            let newListElem = document.createElement('li')
            newListElem.textContent = pokemon.name
            listAllPokemonsUl.append(newListElem)
        }
    }
    */
   
    const getSearchResults = JSON.parse(localStorage.getItem(LS_KEY3)).results.forEach(pokemon => {
        if(pokemon.name.match(searchBarForPokemons.value)) {
            listAllPokemonsUl.innerHTML = ''
            displayAllPokemons(pokemon)
        }
    })

    if (searchBarForPokemons.value == '' - length ) {
        SavedPokemonsInfo()
    }

})

const SavedPokemonsInfo = async () => {

    if(localStorage.getItem(LS_KEY3) == null) {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
        const response = await fetch(url, {})
        const data = await response.json()

        const dataAsString = JSON.stringify(data)
        localStorage.setItem(LS_KEY3, dataAsString)

    } else {
        let showAllResults = JSON.parse(localStorage.getItem(LS_KEY3)).results

        for (let pokemon of showAllResults) {
            displayAllPokemons(pokemon)
        }
    }
}

const displayAllPokemons = pokemon => {
    let newListElem = document.createElement('li'), newImageElem = document.createElement('img'), newNameElem = document.createElement('legend'), newButtonElem = document.createElement('button')
            

    let modifiedURL = pokemon.url.substring(34).replace('/', '.png')
    try {
        newImageElem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${modifiedURL}`
    } catch {

    }
    newNameElem.textContent = pokemon.name

    newButtonElem.innerHTML = `<span class="material-symbols-outlined">
    add
    </span>`
    newButtonElem.title = 'Add to team'

    newButtonElem.addEventListener('click', event => {
        addSearchResultToSavePokemon(pokemon.url)
    })
    
    newListElem.append(newImageElem, newNameElem, newButtonElem)
    listAllPokemonsUl.append(newListElem)
}

SavedPokemonsInfo()

const addNewPokemonToUl = () => {

    // Gör så att det blir inga dubbletter
    savePokemonToUl.innerHTML = ''


    // Denna gör så att man kan få värderna från localstorage och applicerar dem på en lista (ul)
    for (let pokemon of JSON.parse(localStorage.getItem(LS_KEY2))) {

        // Variabler
        let newLi = document.createElement('li')

        let newSprite = document.createElement('img')

        let newNameHeading = document.createElement('h1')


        // Knappar
        let deleteButton = document.createElement('button'), changeOrderToTop = document.createElement('button'), changeOrderToBottom = document.createElement('button'), changeNameOfPokemon = document.createElement('button')

        let emptyDiv = document.createElement('div')

        // Namn och ikoner för knapparna
        deleteButton.innerHTML = `<span class="material-symbols-outlined">remove</span>`
        deleteButton.title = 'Remove member'

        changeOrderToBottom.innerHTML =  `<span class="material-symbols-outlined">
        arrow_downward
        </span>`
        changeOrderToBottom.title = 'Move to bottom'

        changeOrderToTop.innerHTML = `<span class="material-symbols-outlined">
        arrow_upward
        </span>`
        changeOrderToTop.title = 'Move to top'

        changeNameOfPokemon.innerHTML = `<span class="material-symbols-outlined">
        favorite
        </span>`
        changeNameOfPokemon.title = 'Change member name'

        // Ta bort pokemon från ul listan och från localstorage och sparar den nya listan istället
        deleteButton.addEventListener('click', () => {
            newLi.remove()

            countTeamMembers()

            const saveFilterResult = JSON.parse(localStorage.getItem(LS_KEY2)).filter(result => result.name !== newNameHeading.textContent)

            const saveNewString = JSON.stringify(saveFilterResult)

            localStorage.setItem(LS_KEY2, saveNewString)

        })

        changeNameOfPokemon.addEventListener('click', () => {
            let changeNameInput
            if (emptyDiv.childElementCount < 1) {
                changeNameInput = document.createElement('input')
                changeNameInput.type = 'text'
                changeNameInput.placeholder = pokemon.name
                emptyDiv.append(changeNameInput)
                changeNameInput.addEventListener('keydown', event => {
                    if(event.key == 'Enter') {
                        if (changeNameInput.value !== '') {
                            console.log(changeNameInput.value);
                            newNameHeading.textContent = `"${changeNameInput.value}"`

                            changeNameInput.remove()
                        } else {
                            newNameHeading.textContent = pokemon.name

                            changeNameInput.remove()
                        }
                    }
                })
            } else {
                emptyDiv.innerHTML = ''
            }
        })


        // Använder metoden prepend för att få upp ett element först i listan
        changeOrderToTop.addEventListener('click', () => {
            savePokemonToUl.prepend(newLi)
        })


        // Använder metoden append för att få elementet sist i listan
        changeOrderToBottom.addEventListener('click', () => {
            savePokemonToUl.append(newLi)
        })


        // Gör så att man kan få namnet och bilden för en specifik pokemon
        newNameHeading.textContent = pokemon.name

        newSprite.src = pokemon.sprites.front_default

        newLi.append(newSprite, newNameHeading)


        // En typ av funktion som sätter dit alla abilities i en lista
        pokemon.abilities.forEach(element => {
            let newAbilitiesLegend = document.createElement('legend')
    
            newAbilitiesLegend.textContent = element.ability.name
            newLi.append(newAbilitiesLegend)
        });

        newLi.append(deleteButton, changeNameOfPokemon, changeOrderToTop, changeOrderToBottom, emptyDiv)
        
        savePokemonToUl.append(newLi)
    }
}

// Gör så att listan ska visas
if(localStorage.getItem(LS_KEY2) !== null){
    addNewPokemonToUl()
}

const closeButtonForAddPokemonScreen = document.querySelector('#close-button-add-pokemon-screen')

closeButtonForAddPokemonScreen.addEventListener('click', () => {
    containers.add.classList.add('hidden')
    containers.game.classList.remove('hidden')
})



const countTeamMembers = () => {
const countTeamMembersSpan = document.querySelector('#count-selected-pokemons')
    countTeamMembersSpan.textContent = ` ${savePokemonToUl.childElementCount}`
}

countTeamMembers()


