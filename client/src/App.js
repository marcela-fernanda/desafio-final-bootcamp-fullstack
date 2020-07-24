import React, { useState, useEffect } from 'react';
import BackService from './services/connectWithBack';
import moment from 'moment';
import css from './components/css/app.module.css';

//Components
import Title from './components/Title';
import Select from './components/Select';
import Finances from './components/Finances';
import Infos from './components/Infos';
import Insert from './components/Insert';
import Filter from './components/Filter';
import ModalInsert from './components/ModalInsert';
import ModalEdit from './components/ModalEdit';

export default function App() {
  const [finances, setFinances] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [actualDate, setActualDate] = useState('');
  const [button, setButton] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [currentEditData, setCurrentEditData] = useState({});

  const getData = async (date) => {
    const finances = await BackService.getData(
      date || moment().format('YYYY-MM')
    );
    setFinances(finances.data);

    setActualDate(date || moment().format('YYYY-MM'));
  };

  const filterData = async (period, filter) => {
    const filteredData = await BackService.doFilter(period, filter);
    setFinances(filteredData.data);
  };

  const handleValueChange = (newValue, period) => {
    setFilterValue(newValue);
    filterData(period, newValue);

    if (newValue.length !== 0) {
      setButton('disabled');
      return;
    }
    setButton('');
  };

  const handleChangeDate = (selectedDate) => {
    setActualDate(selectedDate);

    if (filterValue) {
      handleValueChange(filterValue, selectedDate);
      return;
    }

    getData(selectedDate);
  };

  const handleButtonClick = (valueModal) => {
    setIsModalOpen(valueModal);
  };

  const handleInsertFinance = async (data) => {
    await BackService.insertData(data);
    setIsModalOpen(false);
    getData(actualDate);
  };

  const handleModalInsertClose = (valueModal) => {
    setIsModalOpen(valueModal);
  };

  const handleEditFinance = (valueModal, data) => {
    setCurrentEditData(data);
    setIsModalEditOpen(valueModal);
  };

  const handleDeleteFinance = async (financeId) => {
    await BackService.deleteData(financeId);
    getData(actualDate);
  };

  const handleModalEditClose = (valueModal) => {
    setIsModalEditOpen(valueModal);
  };

  const handleSaveEditFinance = async (financeId, data) => {
    await BackService.updateData(financeId, data);
    setIsModalEditOpen(false);
    getData(actualDate);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <Title />
      <Select
        onChangeDate={handleChangeDate}
        onClickButton={handleChangeDate}
      />
      <Infos finances={finances} />
      <div className={css.div}>
        <Insert button={button} onButtonClick={handleButtonClick} />
        <Filter
          onValueChange={handleValueChange}
          filterValue={filterValue}
          period={actualDate}
        />
      </div>
      <Finances
        finances={finances}
        onClickEdit={handleEditFinance}
        onClickDelete={handleDeleteFinance}
      />
      {isModalOpen && (
        <ModalInsert
          onSave={handleInsertFinance}
          onClose={handleModalInsertClose}
        />
      )}
      {isModalEditOpen && (
        <ModalEdit
          data={currentEditData}
          onClose={handleModalEditClose}
          onSave={handleSaveEditFinance}
        />
      )}
    </div>
  );
}
