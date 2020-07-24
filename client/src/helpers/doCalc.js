function calcIncome(value) {
  const income = value.filter((currentValue) => {
    return currentValue.type === '+';
  });

  const finalValue = income.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  return finalValue;
}

function calcOutgoing(value) {
  const income = value.filter((currentValue) => {
    return currentValue.type === '-';
  });

  const finalValue = income.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  return finalValue;
}

function calcBalance(value) {
  const income = calcIncome(value);
  const outgoing = calcOutgoing(value);

  return income - outgoing;
}

export { calcIncome, calcOutgoing, calcBalance };
