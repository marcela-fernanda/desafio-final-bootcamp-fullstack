import React from 'react';
import css from './css/finances.module.css';
import { formatNumber } from '../helpers/formatValue';

export default function Finances({ finances, onClickEdit, onClickDelete }) {
  const handleEditFinance = (event) => {
    const currentId = event.target.parentElement.parentElement.getAttribute(
      'data-key'
    );

    const currentData = finances.filter((finance) => {
      return finance._id === currentId;
    });

    onClickEdit(true, currentData[0]);
  };

  const handleDeleteFinance = (event) => {
    onClickDelete(
      event.target.parentElement.parentElement.getAttribute('data-key')
    );
  };

  return (
    <div className="center">
      {finances.map((finance, index, array) => {
        const backgroundValue =
          finance.type === '-' ? '240, 161, 168' : '161, 240, 220';

        const marginValue =
          index + 1 < array.length && finance.day < array[index + 1].day
            ? '5px 5px 20px'
            : '5px';

        const day = finance.day <= 9 ? `0${finance.day}` : `${finance.day}`;

        return (
          <div
            data-key={finance._id}
            key={finance._id}
            className={css.mainDiv}
            style={{
              backgroundColor: `rgb(${backgroundValue})`,
              margin: `${marginValue}`,
            }}
          >
            <span className={css.day}>{day}</span>
            <div className={css.dataDiv}>
              <div className={css.infoDiv}>
                <span className={css.category}>{finance.category}</span>
                <span className={css.description}>{finance.description}</span>
              </div>
              <span className={css.value}>{formatNumber(finance.value)}</span>
            </div>
            <div className={css.buttonsDiv}>
              <span
                className={`material-icons ${css.buttons}`}
                onClick={handleEditFinance}
              >
                edit
              </span>
              <span
                className={`material-icons ${css.buttons}`}
                onClick={handleDeleteFinance}
              >
                delete
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
