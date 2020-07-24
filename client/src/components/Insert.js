import React from 'react';

export default function Insert({ button, onButtonClick }) {
  const handleButtonClick = () => {
    onButtonClick(true);
  };

  return (
    <button
      className={`waves-effect waves-light btn ${button}`}
      onClick={handleButtonClick}
    >
      + Novo lançamento
    </button>
  );
}
