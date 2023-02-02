import { appState } from "../AppState.js"
import { playersServices } from "../Services/PlayersServices.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawPlayers(){
    let players = appState.players
    let template = ''
    players.forEach(p => template += p.ListTemplate)
    setHTML('playersBox', template)
}

function _drawActivePlayer(){
    let player = appState.activePlayer
    setHTML('activePlayer', player.ActivePlayerTemplate)
    console.log(player.name)
}

function _drawActiveFruit(){
    let fruit = appState.activeFruit
    setText('activeFruit', fruit)
}

function _endGame(){
    window.alert('GAME OVER')
}

export class PlayersController{
    constructor(){
        console.log('players controller be workin')
        _drawPlayers()
        appState.on('activePlayer', _drawActivePlayer)
        appState.on('players', _drawPlayers)
        appState.on('activeFruit', _drawActiveFruit)
    }
    createPlayer(){
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            console.log(formData)
            playersServices.createPlayer(formData)
            form.reset()
        } catch (error) {
            Pop.error(error)
        }
    }
    checkSpelling(){
        try {
            window.event.preventDefault()
        const form = window.event.target
        const formData = getFormData(form)
        console.log(formData.fruitInput)
        playersServices.checkSpelling(formData)
        form.reset()
        this.randomFruit()
        } catch (error) {
            Pop.error(error)
        }
    }

    setActivePlayer(playerId){
        try {
            playersServices.setActivePlayer(playerId)
            this.randomFruit()
            this.startGame()
        } catch (error) {
            Pop.error(error)
        }
    }

    randomFruit(){
        let randomFruit =  appState.fruits[Math.floor(Math.random()*appState.fruits.length)]
        appState.activeFruit = randomFruit
    }

    startGame(){
        document.getElementById('fruitInput').focus()
        setTimeout(_endGame, 1000)
    }
}