import React from 'react';
import css from './css/infos.module.css';
import { formatNumber } from '../helpers/formatValue';
import { calcIncome, calcOutgoing, calcBalance } from '../helpers/doCalc';

export default function Infos({ finances }) {
  return (
    <div className={`${css.mainDiv} ${css.strongItems}`}>
      <span>
        <strong>Lançamentos: </strong>
        {finances.length}
      </span>
      <span>
        <strong>Receitas: </strong>
        <span className={css.income}>{formatNumber(calcIncome(finances))}</span>
      </span>
      <span>
        <strong>Despesas: </strong>
        <span className={css.outgoing}>
          {formatNumber(calcOutgoing(finances))}
        </span>
      </span>
      <span>
        <strong>Saldo: </strong>

        <span
          style={{
            color: `${
              calcBalance(finances) < 0
                ? 'rgb(192, 57, 43)'
                : 'rgb(22, 160, 133)'
            }`,
          }}
        >
          {formatNumber(calcBalance(finances))}
        </span>
      </span>
    </div>
  );
}
