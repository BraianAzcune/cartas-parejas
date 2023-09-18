import './Juego.css'
interface Props{
    cerrar: ()=>void
}
export function GanasteMensaje ({ cerrar }:Props) {
  return (
        <div className='modal'>
            <p>Ganaste!</p>
            <button onClick={cerrar}>Aceptar</button>
        </div>
  )
}
