import reactLogo from '../assets/react.svg'
import './Juego.css'
import { CartaGame } from './interface'

export interface CartaProp {
  carta: CartaGame,
  mostrar: boolean,
  handleClick: (carta: CartaGame) => void
}

export default function Carta (prop: CartaProp) {
  const clases = prop.mostrar ? 'mostrar' : ''
  return (
    <main className={clases}>
      <div className='carta ' onClick={() => prop.handleClick(prop.carta)}>
        <div className='carta-contenedor'>
          <div className='carta-frente'>
            <img className='imagen-carta' src={prop.carta.imagen}></img>
          </div>
          <div className='carta-espalda'>
            <img className='imagen-carta' src={reactLogo}></img>
          </div>
        </div>
      </div>
    </main>
  )
}
