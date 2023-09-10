import React, { useState } from "react";
import Square from "./components/Square";
import confeti from "canvas-confetti";
import { turns, buttonClass } from "./constants";
import ModalWinner from "./components/ModalWinner";
import { checkWinner, checkEndGame } from "./logic/logic";
import Board from "./components/Board";
import CurrentTurn from "./components/CurrentTurn";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.x);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    //recibimos el index aqui para saber en que index del array (square) el jugador esta dando click

    if (board[index] || winner) return; //si ya hay algo en esa posicion, pues no se escribe o sobreescribe nada
    //LAS PROPS O LOS ESTADOS JAMAS DEBEN CAMBIARSE O MODIFICARSE. LO IDEAL SERIA CREAR UN NUEVO ARRAY O CONSTANTE Y LUEGO MODIFICAR ESE ESTADO CON EL VALOR DE MODIFICACION DE ESTADO: SETESTADO
    const newBoard = [...board];
    newBoard[index] = turn; //array[index][value] en el indice que le pasamos, le metemos el turno correspondiente, x u o
    setBoard(newBoard); //los datos siempre deben ser nuevos incluso si no los modificamos para evitar problemas de renderizado
    const newTurn = turn === turns.x ? turns.o : turns.x; //newTurn sera el valor que corresponda segun si turn sea igual a x u o, retorna lo contrario
    setTurn(newTurn);
    //revisamos cada vaz que actualizamos el tablero si hay ganador
    const newWinner = checkWinner(newBoard); // esto arregla el problema de que el estado es asincrono, teniendo cuenta siempre el valor actual
    if (newWinner) {
      setWinner(newWinner); // la actualizacion de estado es ASINCRONA. no bloquea el estado
      confeti();
      console.log(winner);
    } else if (checkEndGame(newBoard)) {
      //check if game is over
      setWinner(false); //empate
    }
  };

  const handleStartOver = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.x);
    setWinner(null);
  };

  return (
    <main className="w-fit md:w-[100%] flex m-10 text-center md:justify-center">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-5xl mb-9 font-extralight border p-4">
          Noughts and Crosses ✖️⭕
        </h1>
        <button
          className={buttonClass + " text-white"}
          onClick={handleStartOver}
        >
          Start over
        </button>
        <Board board={board} updateBoard={updateBoard} />
        <CurrentTurn turn={turn} />
      </div>

      <ModalWinner winner={winner} handleStartOver={handleStartOver} />
    </main>
  );
};

export default App;
