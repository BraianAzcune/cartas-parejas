export interface ICarta{
    valor:string,
    imagen:string
  }

export interface CartaGame extends ICarta{
    key: string,
    mostrar: boolean
  }
