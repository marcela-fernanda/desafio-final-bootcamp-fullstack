import React from 'react';
import css from './css/title.module.css';

export default function Title() {
  return (
    <div>
      <h1 className={css.title}>Bootcamp Full Stack - Desafio Final</h1>
      <h2 className={css.secondaryTitle}>Controle Financeiro Pessoal</h2>
    </div>
  );
}
