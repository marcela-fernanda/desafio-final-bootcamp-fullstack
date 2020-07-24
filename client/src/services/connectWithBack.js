import axios from 'axios';

//Definindo URL base de origem para consume de serviços
const http = axios.create({
  baseURL: 'http://localhost:3001/api/transaction',
  headers: {
    'Content-type': 'application/json',
  },
});

//Definindo rotas dos serviços
const getMonths = () => {
  return http.get('/months');
};

const getData = (periodValue) => {
  return http.get(`?period=${periodValue}`);
};

const doFilter = (periodValue, filter) => {
  return http.get(`/filter?period=${periodValue}&filter=${filter}`);
};

const insertData = (data) => {
  return http.post('/insert', {
    data: {
      description: data.description,
      value: data.value,
      category: data.category,
      year: data.year,
      month: data.month,
      day: data.day,
      yearMonth: data.yearMonth,
      yearMonthDay: data.yearMonthDay,
      type: data.type,
    },
  });
};

const deleteData = (id) => {
  return http.delete(`/delete?id=${id}`);
};

const updateData = (id, data) => {
  return http.put('/update', {
    id: id,
    data: {
      description: data.description,
      value: data.value,
      category: data.category,
      year: data.year,
      month: data.month,
      day: data.day,
      yearMonth: data.yearMonth,
      yearMonthDay: data.yearMonthDay,
      type: data.type,
    },
  });
};

export default {
  getMonths,
  getData,
  doFilter,
  insertData,
  deleteData,
  updateData,
};
