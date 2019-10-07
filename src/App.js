import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';


class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () =>{
    //leer state de la pagina actual
    let pagina = this.state.pagina;
    //console.log(pagina);
    //Si la pagina es 1 ya no ir atras
    if(pagina === 1) return null;
    //Restar 1 a la pagina actual
    pagina -= 1;
    //agregar cambios al state
    this.setState({
      pagina
    }, ()=>{
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () =>{
    //leer state de la pagina actual
    let pagina = this.state.pagina;
    //console.log(pagina);
    //Sumar 1 a la pagina actual
    pagina += 1;
    //agregar cambios al state
    this.setState({
      pagina
    }, () =>{
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = ()=>{

    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=12822344-ea389e01f680651d496ba97c1&q=${termino}&image_type=photo&per_page=40&page=${pagina}`

    //console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes : resultado.hits }))
  }

  datosBusqueda = (termino)=>{
    this.setState({
      termino : termino,
      pagina : 1
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
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
