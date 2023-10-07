import './Juego.css'
import { useCallback, useEffect, useState } from 'react'
import Carta from './Carta'
import { generarPares, getRandomCartas } from './cartasDefault'
import { CartaGame } from './interface'

interface Props{
  onWin?: ()=>void,
  cantidadCartas?: number,
  incrementarIntentos?: ()=>void,
}

export default function Tablero ({ cantidadCartas = 4, onWin, incrementarIntentos }:Props) {
  const [cartas, setCartas] = useState<CartaGame[]>([])
  const [cartasGanadas, setCartasGanadas] = useState(0)
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<CartaGame[]>([])

  useEffect(() => {
    setCartas(generarPares(getRandomCartas(cantidadCartas)))
    setCartasSeleccionadas([])
  }, [cantidadCartas])

  const comprobarMatchCartas = useCallback(
    () => {
      if (cartasSeleccionadas.every(x => x.valor === cartasSeleccionadas[0].valor)) {
        setCartasSeleccionadas([])
        const newCartasGanadas = cartasGanadas + 2
        setCartasGanadas(newCartasGanadas)
        if (newCartasGanadas === cartas.length) {
          // ! fin del juego
          onWin?.()
        }
      } else {
        cartas.filter(c => c.key === cartasSeleccionadas[0].key || c.key === cartasSeleccionadas[1].key).forEach(c => { c.mostrar = false })
        setCartas([...cartas])
        setCartasSeleccionadas([])
      }
    },
    [cartas, cartasGanadas, cartasSeleccionadas, onWin]
  )

  useEffect(() => {
    console.log('re render')
    let timeout = 0
    if (cartasSeleccionadas.length === 2) {
      timeout = setTimeout(comprobarMatchCartas, 500)
    }
    return () => clearTimeout(timeout)
  }, [cartasSeleccionadas, comprobarMatchCartas, incrementarIntentos])

  function handleClickCarta (carta:CartaGame) {
    if (cartasSeleccionadas.length < 2) {
      levantarCartaYSeleccionar(carta)
    }
    if (cartasSeleccionadas.length === 1) {
      incrementarIntentos?.()
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
                (
                <Carta key={x.key} carta={x} mostrar={x.mostrar} handleClick={handleClickCarta}></Carta>
                )
              )
            }
        </div>
  )
}
