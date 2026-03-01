import './style.css'
import { Game } from './game'


const appContainer: HTMLElement = document.getElementById("app")!

const game = new Game()
await game.init(appContainer)
game.spawnArnold()
