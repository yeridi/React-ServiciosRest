import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      prestamos:[],
      pos:null,
      titulo:"nuevo",
      id:0,
      idlibro:'',
      idusuario:'',
      fecprestamo:'',
      fecdevolucion:''
    })
    this.cambiolibro = this.cambiolibro.bind(this);
    this.cambiousuario = this.cambiousuario.bind(this);
    this.cambiofecprestamo = this.cambiofecprestamo.bind(this);
    this.cambiofecdevolucion = this.cambiofecdevolucion.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  cambiolibro(e){
    this.setState({
      libro: e.target.value
    })
  }
  cambiousuario(e){
    this.setState({
      usuario: e.target.value
    })
  }
  cambiofecprestamo(e){
    this.setState({
      prestamo: e.target.value
    })
  }
  cambiofecdevolucion(e){
    this.setState({
      devolucion: e.target.value
    })
  }
  componentWillMount(){
    axios.get('http://127.0.0.1:8000/prestamos/')
    .then(res =>{
      this.setState({ prestamos: res.data })
    });
  }

  eliminar(cod){
    let rpta=window.confirm("Desea eliminar?...");
    if(rpta){
      axios.delete('http://127.0.0.1:8000/prestamos/'+cod+'/')
      .then(res =>{
        var temp= this.state.prestamos.filter((prestamo)=>prestamo.id !== cod);
        this.setState({
          prestamos:temp
        })
      });
    }
  }

  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    let datos ={
      idlibro: this.state.libro,
      idusuario:this.state.usuario,
      fecprestamo:this.state.prestamo,
      fecdevolucion:this.state.devolucion
    }
    if(cod > 0){
      axios.put('http://127.0.0.1:8000/prestamos/'+cod+'/',datos)
      .then(res=>{
        let indx = this.state.pos;
        this.state.prestamos[indx] = res.data;
        var temp = this.state.prestamos;
        this.setState({
          pos:null,
          titulo:"nuevo",
          id:0,
          idlibro:'',
          idusuario:'',
          fecprestamo:'',
          fecdevolucion:'',
          prestamos:temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }else{
      axios.post('http://127.0.0.1:8000/prestamos/',datos)
      .then(res =>{
        this.state.prestamos.push(res.data);
        var temp = this.state.series;
        this.setState({
          id:0,
          idlibro:'',
          idusuario:'',
          fecprestamo:'',
          fecdevolucion:'',
          prestamos:temp
        });
        }).catch((error)=>{
          console.log(error.toString());
      });
    }
  }

  mostrar(cod,index){
    axios.get('http://127.0.0.1:8000/prestamos/'+cod+'/')
    .then(res=>{
      this.setState({
        pos: index,
        titulo: "Editar",
        id: res.data.id,
        libro: res.data.idlibro,
        usuario: res.data.idusuario,
        prestamo: res.data.fecprestamo,
        devolucion: res.data.fecdevolucion
      })
    });
  }
  render() {
    return (
    <div className="container">
      <h1 className="text-center mt-2 mb-5 color-primary">Listado de Libros de Prestamo</h1>
      <table border="1" className="table align-middle text-center">
        <thead className="table-dark">
          <tr>
            <td scope="col">id Libro</td>
            <td scope="col">id Usuario</td>
            <td scope="col">Fecha de Prestamo</td>
            <td scope="col">Fecha de Devolucion</td>
            <td scope="col">Acciones</td>
          </tr>
        </thead>
        <tbody>
          {this.state.prestamos.map((prestamo,index) =>{
            return (
              <tr key={prestamo.id}>
                <td>{prestamo.idlibro}</td>
                <td>{prestamo.idusuario}</td>
                <td>{prestamo.fecprestamo}</td>
                <td>{prestamo.fecdevolucion}</td>
                <td>
                    <button className="btn btn-primary m-1" onClick={()=>this.mostrar(prestamo.id,index)}>Editar</button>
                    <button className="btn btn-danger m-1" onClick={()=>this.eliminar(prestamo.id)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr/>
      <h1>{this.state.titulo}</h1>
      <form onSubmit={this.guardar}>
          <input type="hidden" value={this.state.id}></input>
          <p>
            Ingrese Libro:
            <input type="text" value={this.state.libro} onChange={this.cambiolibro}/>
          </p>
          <p>
            Ingrese Usuario:
            <input type="number" value={this.state.usuario} onChange={this.cambiousuario}/>
          </p>
          <p>
            Ingrese fecha de prestamo:
            <input type="text" value={this.state.prestamo} onChange={this.cambiofecprestamo}/>
          </p>
          <p>
            Ingrese Fecha de devolucion:
            <input type="text" value={this.state.devolucion} onChange={this.cambiofecdevolucion}/>
          </p>
          <p><input type="submit"/></p>
      </form>
    </div>
    )
  }
}
export default App;
