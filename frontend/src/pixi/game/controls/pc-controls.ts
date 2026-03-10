
import type { IGame } from "../../interfaces/IGame";
import type { InputSignal } from "../../interfaces/InputSignal";



export class PCControls {
  game: IGame;
  controlState: InputSignal = {
    movementImpulse: {x: 0, y: 0}
  }
  constructor(game: IGame){
    this.game = game
    this,this.initialize()
  }

  initialize(){
    window.addEventListener("keydown", (event) => this.handleMovementImpulse(event))
    window.addEventListener("keyup", (event) => this.handleMovementImpulse(event))
  }

  handleMovementImpulse(event: KeyboardEvent) {
    const movementImpulse = this.controlState.movementImpulse

    if(event.key == "w") {
      movementImpulse.y = event.type == "keydown" ? -1 : 0 
    }
    if(event.key == "s") {
      movementImpulse.y = event.type == "keydown" ? 1 : 0 
    }
    if(event.key == "a") {
      movementImpulse.x = event.type == "keydown" ? -1 : 0 
    }
    if(event.key == "d") {
      movementImpulse.x = event.type == "keydown" ? 1 : 0
    }

    this.game.sendControlInput(this.controlState)
  }
}
