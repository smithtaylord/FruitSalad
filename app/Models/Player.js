import { generateId } from "../Utils/generateId.js"



export class Player{
    constructor(data){
        this.id = generateId()
        this.name = data.name
        this.score = 0
    }
    get ListTemplate() {
        return `
        <div class="d-flex justify-content-between align-items-center border-dark border-bottom">
        <h2 onclick="app.playersController.setActivePlayer('${this.id}')" class="selectable">${this.name}</h2>
        <h2>SCORE: ${this.score}</h2>
        </div>
        `
    
    }
    get ActivePlayerTemplate() {
        return `
        <h2>${this.name} - ${this.score}</h2>
        <h2 id="active-fruit"></h2>
        <form onsubmit="app.playersController.checkSpelling()" >
            <input id="fruitInput" name="fruitInput" type="text" />
        </form>
    `
    }
}