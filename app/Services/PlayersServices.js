import { Player } from "../Models/Player.js"
import { appState} from "../AppState.js"
import { PlayersController } from "../Controllers/PlayersController.js"
import { Pop } from "../Utils/Pop.js"



class PlayersServices{
    constructor(){
        console.log('players services also be workin')
    }
    createPlayer(formData){
        let newPlayer = new Player(formData)
        console.log(newPlayer)
        appState.players.push(newPlayer)
        appState.emit('players')
    }

    setActivePlayer(playerId){
        let foundPlayer = appState.players.find(p => p.id == playerId)
        appState.activePlayer = foundPlayer
        console.log(foundPlayer)
    }

    checkSpelling(formData){
        if (formData.fruitInput == appState.activeFruit) {
            appState.activePlayer.score++
            appState.emit('activePlayer')
        } else {
            Pop.toast('you suck lol')
        }
    }
}

export const playersServices = new PlayersServices()