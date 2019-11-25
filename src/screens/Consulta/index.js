import React from 'react';
import Header from '../../components/Header'

import './styles.css';

const Consulta = () => {
  return (
    <div>
      <Header />
      <div className="card">
        Empresa: Banco Intermedium<br />
        SIGLA: BIDI4<br />
        SETOR: Financeiro<br />
        SubSetor: Banco<br />
        Valor de Mercado: 10317200000<br />
        Última Cotação: 14,68<br />
        Valor do Dividendo: 0,11 por cota<br />
        <br /><br />
        Preço sob Lucro: 134,68<br />
        Preço sob valor patrimonial: 4,71<br />
        Lucro por ação: 0,11<br />
        Valor Patrimonial por ação: 3,11<br />
        Dividend Yield: 0,5%<br />
        ROE: 3,5%
      </div>
    </div>
  )
}

export default Consulta;
