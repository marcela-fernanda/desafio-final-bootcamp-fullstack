import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import css from './css/modalEdit.module.css';

export default function ModalEdit({ data, onClose, onSave }) {
  const [description, setDescription] = useState(data.description);
  const [category, setCategory] = useState(data.category);
  const [value, setValue] = useState(data.value);
  const [date, setDate] = useState(data.yearMonthDay);

  //Style
  const modalStyle = { overlay: { zIndex: 10 } };

  const handleModalClose = () => {
    onClose(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(false);
    }
  };

  const handleChangeDesc = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCateg = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const currentData = {
      description: description,
      value: parseFloat(value),
      category: category,
      year: parseInt(moment(date).format('YYYY')),
      month: parseInt(moment(date).format('M')),
      day: parseInt(moment(date).format('D')),
      yearMonth: moment(date).format('YYYY-MM'),
      yearMonthDay: date,
      type: data.type,
    };

    onSave(data._id, currentData);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div>
      <Modal isOpen={true} style={modalStyle} className={css.modal}>
        <div>
          <div className={css.divHeader}>
            <h3 className={css.title}>Inclusão de lançamento</h3>
            <button
              className="waves-effect waves-light btn red darken-4"
              onClick={handleModalClose}
            >
              X
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className={css.divForm}>
              <div className={css.divRadioButton}>
                <label className={css.labelRadioButton}>
                  <input
                    type="radio"
                    value="-"
                    disabled
                    checked={data.type === '-'}
                  />
                  <span className={css.outgoing}>Despesa</span>
                </label>
                <label className={css.labelRadioButton}>
                  <input
                    type="radio"
                    value="+"
                    disabled
                    checked={data.type === '+'}
                  />
                  <span className={css.income}>Receita</span>
                </label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={handleChangeDesc}
                />
                <label className="active" htmlFor="description">
                  Descrição
                </label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={handleChangeCateg}
                />
                <label className="active" htmlFor="category">
                  Categoria
                </label>
              </div>
              <div className={css.divHeader}>
                <div className={`input-field ${css.value}`}>
                  <input
                    type="number"
                    id="value"
                    min="0"
                    step="0.01"
                    value={value}
                    onChange={handleChangeValue}
                  />
                  <label className="active" htmlFor="value">
                    Valor
                  </label>
                </div>
                <input
                  placeholder="Data"
                  type="date"
                  className="browser-default"
                  value={date}
                  onChange={handleChangeDate}
                ></input>
              </div>
            </div>
            <input
              type="submit"
              className="waves-effect waves-light btn"
              value="Salvar"
              disabled={
                !description.match(/(.|\s)*\S(.|\s)*/) ||
                !category.match(/(.|\s)*\S(.|\s)*/) ||
                value < 0 ||
                !date
              }
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}
