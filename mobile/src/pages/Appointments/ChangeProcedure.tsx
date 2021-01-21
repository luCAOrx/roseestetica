import React from 'react';

import Button from '../../components/Button';
import CustonCheckbox from '../../components/Checkbox';
import Header from '../../components/Header';

export default function ChangeProcedure() {
  return (
    <>
      <Header title="Selecione o procedimento" showIcon={true} fontSize={23} />
      <CustonCheckbox text="Tratamento" price="R$ 30,00" />
      <CustonCheckbox text="Limpeza de pele" price="R$ 40,00" />
      <CustonCheckbox text="Tratamento + limpeza de pele" price="R$ 50,00" />

      <Button title="ALTERAR O PROCEDIMENTO" backgroundColor="#3A4498" />
    </>
  );
}