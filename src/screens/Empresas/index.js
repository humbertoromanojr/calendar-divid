import React, { Component } from 'react';
import Header from '../../components/Header'

import { Button, Card } from 'react-bootstrap';
import Modal from 'react-awesome-modal';

import api from '../../services/api'
import './styles.css';

class Empresas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pagamentos: [],
      visible : false,
    }
  }

  componentDidMount() {
    api.get('/pagamentos').then((res) => {
      this.setState({
        pagamentos: res.data
      });
    });
  }

  handleChange = (event) => {
    const { state } = this;
    state[event.target.name] = event.target.value;

    this.setState({
      state,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // redirect with params
    const redirectWithParams = (destination) => {
      const query = window.location.search || '';
      const result = `${destination}${query}`;
      window.location = result;
    }
    redirectWithParams("http://localhost:3000/consulta");

  };

  openModal() {
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({
      visible : false,
    });
  }

  render() {
    const { pagamentos } = this.state;
    const pList = pagamentos.length ? (
      pagamentos.map(p => (
        <Card key={p.sigla} className="card" style={{float: 'left'}}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title><h3>{p.nome}</h3></Card.Title>
            <Card.Text>
              <strong>Sigla: {p.sigla}</strong><br/>
              <span>{p.tipo}</span><br/><br/>
              <small>{p.data}</small>
            </Card.Text>
            <Button variant="primary" onClick={() => this.openModal()}>Consultar</Button>
          </Card.Body>
        </Card>
      ))
      ) : (
        <div>Not found</div>
    );

    return (
      <div>
        <Header />
        <div className="empresas">
          {pList}
        </div>
        <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp">
          <div className="modalHeader">
            <h2>EMPRESAS</h2>
            <button title="Close" onClick={() => this.closeModal()}> X </button>
          </div>
          <form onSubmit={this.handleSubmit} className="Form">
            <label>Seu nome</label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.nome}
              name="nome"
              required
            />
            <label>Seu email</label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
              required
            />
            <button type="submit" value="Salvar">Salvar</button>
          </form>
        </Modal>
        
      </div>
    )
    
  }

}

export default Empresas
