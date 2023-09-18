import React, { useState, useEffect } from 'react'
import './Juego.css'

const DIFICULTAD = [1, 2, 3, 4]

export interface PropsMenuOpciones{
    dificultadSeleccionada?: (dificultad:number)=>void
}

export function MenuOpciones ({ dificultadSeleccionada }:PropsMenuOpciones) {
  const [dificultad, setDificultad] = useState(1)

  useEffect(() => { dificultadSeleccionada?.(dificultad) }, [dificultad, dificultadSeleccionada])

  function onSelect (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!(event.target instanceof HTMLButtonElement)) {
      throw new Error('tipo incorrecto')
    }
    if (dificultad === +event.target.value) {
      return
    }
    setDificultad(+event.target.value)
  }
  return (
        <div>
            <h2>Dificultad</h2>
            <div className='dificultad'>
                {DIFICULTAD.map(i => (
                <button key={i} onClick={onSelect} value={i} className={dificultad === i ? 'boton-seleccionado' : ''}>{i}</button>
                ))
                }
            </div>
        </div>
  )
}
