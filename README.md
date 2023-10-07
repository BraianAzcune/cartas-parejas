### TODO

hacer testing con playwright, antes de cambiar cualquier cosa.

# PRACTICAS NO RECOMENDADAS
https://www.youtube.com/watch?v=Wm6LX9a-sLA&ab_channel=CosdenSolutions

No utilizar useEffect para reaccionar a lo que cambie un estado, hay que directamente donde se cambie el estado, tambien ejecutar la otra funcion



# REVISION CODIGO EN BUSCA DE MEJORAS
[Every Beginner React Developer Makes This Mistake With State](https://www.youtube.com/watch?v=tz0fDABt67g&list=WL&index=103&t=3s&ab_channel=WebDevSimplified)

#### Estados derivados 
Como se enseña en el video, guardar estados derivados lleva a bugs en React.  
Esto consiste en que se tenga por ejemplo un array de objetos en un useState y que luego se guarde en otro useState alguno de esos objetos.  
Eso crea una copia y lleva a desincronizacion entre el objeto del array y el objeto del estado  

##### Revisando en el codigo si existe este error
Se podria considerar en **Tablero.tsx** que existe el error ya que se tiene el estado de **cartas** y de **cartasSeleccionadas**

La solucion que se propone a esta situacion es nunca guardar el objeto sino algo que te permita referenciarlo de la lista original.
En este caso se podria usar **key**

Sin embargo, no se utilizara esta mejora, ya que no es posible "editar" a las cartas, sim embargo, es cierto que existe una dependencia implicita entre **cartas** y **cartasSeleccionadas**
y cada vez que **cartas**  cambie debe sincronizarse **cartasSeleccionadas**.  
Esto ultimo lleva a encontrar un bug, donde al seleccionar una carta y cambiar la cantidad de cartas mostradas y seleccionar otra carta, inmediatamente se cierra la primera carta!.  
Pero no se puede hacer que cuando **cartas** cambie **cartasSeleccionadas** tambien cambie, ya que hay partes que requieren cambiar **cartas** para mostrar la imagen oculta.  
Por lo que la unica solucion es hacer que **cartasSeleccionadas** cambie de estado cuando de lo que depende **cartas** cambia de estado que esto es la prop **cantidadCartas**
