import { useState } from 'react'
import './App.css'
import Tablero from './components/Tablero'
import { GanasteMensaje } from './components/GanasteMensaje'
import { createPortal } from 'react-dom'
import { MenuOpciones } from './components/MenuOpciones'

function App () {
  const [dificultad, setDificultad] = useState(0)
  const [gano, setGano] = useState(false)
  function seGano () {
    setGano(true)
  }
  return (
    <>
    {gano && createPortal(<GanasteMensaje cerrar={() => setGano(false)}></GanasteMensaje>, document.body)}
      <Tablero key={+gano} onWin={seGano} cantidadCartas={dificultad}></Tablero>
      <MenuOpciones dificultadSeleccionada={(dif) => setDificultad(dif)}></MenuOpciones>
    </>
  )
}

export default App
