import React from "react";

const Square = ({ children, index, isSelected, updateBoard }) => {
  const classSquare =
    "grid items-center cursor-pointer text-5xl w-[90px] md:w-[100px] md:h-[100px] h-[90px] border-solid border-2 rounded-[10px] ";
  const className = `${classSquare} ${
    isSelected ? "text-white bg-[#09f]" : ""
  }`;

  const handleClick = () => {
    updateBoard(index); //la funcion que estamos pasando como prop desde el componente padre
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Square;
