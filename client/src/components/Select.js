import React, { useState, useEffect } from 'react';
import css from './css/select.module.css';

import BackService from '../services/connectWithBack';
import moment from 'moment';
import formatDate from '../helpers/formatDate';

export default function Select({ onChangeDate, onClickButton }) {
  const [dates, setDates] = useState([]);

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM'));
  const [disabledBtnPrev, setDisabledBtnPrev] = useState('');
  const [disabledBtnNext, setDisabledBtnNext] = useState('');

  const getDates = async () => {
    const allDates = await BackService.getMonths();
    setDates(allDates.data);
  };

  const handleClickButton = (event) => {
    event.preventDefault();
    const formSelect = event.target.parentElement.elements[1];

    setDisabledBtnPrev('');
    setDisabledBtnNext('');

    if (event.target.textContent === '<') {
      formSelect.selectedIndex--;
      setSelectedDate(formSelect.value);
      onClickButton(formSelect.value);
    } else {
      formSelect.selectedIndex++;
      setSelectedDate(formSelect.value);
      onClickButton(formSelect.value);
    }

    if (formSelect.selectedOptions[0] === formSelect.firstChild) {
      setDisabledBtnPrev('disabled');
      return;
    }

    if (formSelect.selectedOptions[0] === formSelect.lastChild) {
      setDisabledBtnNext('disabled');
      return;
    }
  };

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
    onChangeDate(event.target.value);

    setDisabledBtnPrev('');
    setDisabledBtnNext('');

    if (event.target.selectedOptions[0] === event.target.firstChild) {
      setDisabledBtnPrev('disabled');
      return;
    }

    if (event.target.selectedOptions[0] === event.target.lastChild) {
      setDisabledBtnNext('disabled');
      return;
    }
  };

  useEffect(() => {
    getDates();
  }, []);

  return (
    <div>
      <form className={css.form}>
        <button
          className={`waves-effect waves-light btn ${disabledBtnPrev}`}
          onClick={handleClickButton}
        >
          &lt;
        </button>
        <select
          className={`browser-default ${css.select}`}
          value={selectedDate}
          onChange={handleChangeDate}
        >
          {dates.map((date) => {
            return (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            );
          })}
        </select>
        <button
          className={`waves-effect waves-light btn ${disabledBtnNext}`}
          onClick={handleClickButton}
        >
          &gt;
        </button>
      </form>
    </div>
  );
}
