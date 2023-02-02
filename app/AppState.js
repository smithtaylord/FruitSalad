import { Player } from "./Models/Player.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./Models/Player').Player[]} */
  players = [
    new Player({
      name: 'Bobert'
    }), 
    new Player
    ({
      name: 'Bob'
    })
  ]
  activePlayer = null

  fruits = ['pear', 'apple','banana', 'dragon fruit', 'cherry', 'blueberry', 'grapes', 'guava', 'kiwi','lemon','lime','papaya','pineapple','raspberry','tangerine','pomegranate','orange','apricot','elderberry','freak fruit']
  activeFruit = null
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
