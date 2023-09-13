import './Juego.css'
import { useEffect, useState } from 'react'
import Carta from './Carta'
import { generarPares, getRandomCartas } from './cartasDefault'
import { CartaGame } from './interface'

interface Props{
  cantidadCartas?: number
}

export default function Tablero ({ cantidadCartas = 4 }:Props) {
  const [cartas, setCartas] = useState<CartaGame[]>([])

  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<CartaGame[]>([])

  useEffect(() => {
    setCartas(generarPares(getRandomCartas(cantidadCartas)))
  }, [cantidadCartas])

  useEffect(() => {
    let timeout = 0
    if (cartasSeleccionadas.length === 2) {
      timeout = setTimeout(comprobarMatchCartas, 500)
    }
    return () => clearTimeout(timeout)
  }, [cartasSeleccionadas])

  function handleClickCarta (carta:CartaGame) {
    if (cartasSeleccionadas.length < 2) {
      levantarCartaYSeleccionar(carta)
    }
  }

  function comprobarMatchCartas () {
    if (cartasSeleccionadas.every(x => x.valor === cartasSeleccionadas[0].valor)) {
      setCartasSeleccionadas([])
    } else {
      cartas.filter(c => c.key === cartasSeleccionadas[0].key || c.key === cartasSeleccionadas[1].key).forEach(c => { c.mostrar = false })
      setCartas([...cartas])
      setCartasSeleccionadas([])
    }
  }

  function levantarCartaYSeleccionar (carta:CartaGame) {
    if (carta.mostrar) {
      return
    }
    setCartasSeleccionadas(x => [...x, carta])
    const cc = cartas.find(c => c.key === carta.key)
    if (!cc) {
      throw new Error('hay una carta invalida')
    }
    cc.mostrar = true
    const newCartas = [...cartas]
    setCartas(newCartas)
  }

  return (
        <div className='tablero'>
            {
              cartas.map(x =>
                (<>
                <Carta key={x.key} carta={x} mostrar={x.mostrar} handleClick={handleClickCarta}></Carta>
                </>)
              )
            }
        </div>
  )
}
