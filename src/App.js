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
    const url = `https://pixabay.com/api/videos/?key=12822344-ea389e01f680651d496ba97c1&q=${termino}&per_page=40`

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
        <Resultado
          imagenes={this.state.imagenes}
        />
      </div>
    );
  }
}

export default App;
