import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';


class App extends Component {

  state = {
    termino: '',
    imagenes: []
  }

  consultarApi = ()=>{

    const termino = this.state.termino
    const url = `https://pixabay.com/api/?key=12822344-ea389e01f680651d496ba97c1&q=${termino}&image_type=photo`

    //console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes : resultado.hits }))
  }

  datosBusqueda = (termino)=>{
    this.setState({
      termino
    }, ()=>{
      this.consultarApi()
    })
  }

  render(){
    return (
      <div className="app scontainer">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
          />
        </div>
      </div>
    );
  }
}

export default App;
