import { Player } from "../Models/Player.js"
import { appState} from "../AppState.js"
import { PlayersController } from "../Controllers/PlayersController.js"
import { Pop } from "../Utils/Pop.js"
import { saveState } from "../Utils/Store.js"



class PlayersServices{
    constructor(){
        console.log('players services also be workin')
    }
    createPlayer(formData){
        let newPlayer = new Player(formData)
        console.log(newPlayer)
        appState.players.push(newPlayer)
        saveState('players', appState.players)
        appState.emit('players')
    }

    setActivePlayer(playerId){
        let foundPlayer = appState.players.find(p => p.id == playerId)
        appState.activePlayer = foundPlayer
        foundPlayer.playCount++
        console.log(foundPlayer.playCount)
    }

    checkSpelling(formData){
        if (formData.fruitInput == appState.activeFruit) {
            appState.activePlayer.score++
            saveState('players', appState.players)
            appState.emit('activePlayer')
        } else {
            Pop.toast('you suck lol')
        }
    }
}

export const playersServices = new PlayersServices()