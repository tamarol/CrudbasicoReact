import React, { useState } from 'react'
import { nanoid } from 'nanoid'
function App() {

  const [tarea,setTarea] = useState('');
  const [tareas,setTareas] = useState([]);
  const [modoEdicion,setModoEdicion] = useState(false);
  const [id,setId] = useState('');
  const [error,setError] = useState(null);
  const agregartarea = (e) =>{
    e.preventDefault();
    
    if(!tarea.trim()){
      console.log('elemento vacio')
      setError('Escribe algo')
      return
    }
  setTareas([
    ...tareas,{id:nanoid(10), nombretarea:tarea}
  ])

    setTarea('');
    setError(null)
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editarTarea = item => {
    setModoEdicion(true);
    setTarea(item.nombretarea)
    setId(item.id)
  }

  const editar = e =>{
    e.preventDefault();
    
    if(!tarea.trim()){
      console.log('elemento vacio')
      setError('Escribe algo')
      return
    }
    const arrayeditado = tareas.map(
      item => item.id === id ? {id:id,nombretarea:tarea} : item
    )
    setTareas(arrayeditado);
    setModoEdicion(false);
    setTarea('')
    setId('')
    setError(null)
  }
  return (
    <div className="Container mt-5">
      <h1 className='text-center'>Crud Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className='text-center'>Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0?(
                <li className="list-group-item text-center">No hay tareas</li>
              ):(
                tareas.map(item =>(
              <li className="list-group-item" key={item.id}>
              <span className='lead'>{item.nombretarea}</span>
              <button 
              className="btn btn-sm btn-danger float-right mx-2"
              onClick={()=>eliminarTarea(item.id)}
              >
                Eliminar
              </button>
              <button 
              className="btn btn-sm btn-warning float-right"
              onClick={() => editarTarea(item)}
              >
                Editar
              </button>
            </li>
              ))
              )
              
            }
          </ul>
        </div>
        <div className="col-4">
        <h4 className='text-center'>
          {
            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
          }
        </h4>
        <form onSubmit={modoEdicion ? editar : agregartarea}>
          
          {
            error ? <span className="text-danger">{error}</span> : null
          }
          <input 
          type="text" 
          className="form-control mb-2" 
          placeholder='Ingrese Tarea'
          onChange={(e) => setTarea(e.target.value)}
          value={tarea}
          />
          {
            modoEdicion ? 
            (
              <button className='btn btn-warning btn-block' type='submit'>Editar</button>
            ) 
            : 
            (
              <button className='btn btn-dark btn-block' type='submit'>Agregar</button>
            )
          }
        </form>
        </div>
      </div>      
    </div>
  );
}

export default App;
