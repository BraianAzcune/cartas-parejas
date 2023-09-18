import { useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import { GanasteMensaje } from './components/GanasteMensaje'
import { MenuOpciones } from './components/MenuOpciones'
import Tablero from './components/Tablero'

function App () {
  const [dificultad, setDificultad] = useState(0)
  const [gano, setGano] = useState(false)

  const [intentos, setIntentos] = useState(0)
  function seGano () {
    setGano(true)
  }

  function finJuego () {
    setGano(false)
    setIntentos(0)
  }

  return (
    <>
    {gano && createPortal(<GanasteMensaje cerrar={finJuego}></GanasteMensaje>, document.body)}
      <Tablero key={+gano} onWin={seGano} cantidadCartas={dificultad} incrementarIntentos={() => setIntentos(prev => prev + 1)}></Tablero>
      <MenuOpciones dificultadSeleccionada={(dif) => setDificultad(dif)}></MenuOpciones>
      <h3>Intentos: <span>{intentos}</span></h3>
    </>
  )
}

export default App
