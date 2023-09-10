import React, { useState } from "react";
import Square from "./components/Square";
import confeti from 'canvas-confetti'

const App = () => {
  const turns = {
    x: "x",
    o: "o",
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.x);
  const [winner, setWinner] = useState(null);

  const winner_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para ver quien gano
    for (const combo of winner_combos) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && //x u o --> si el board(tablero que le estamos pasando) la primera posicion coincide con cualquiera primer valor de uno de los combos, sigue al siguiente
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null; //si no hay ganador
  };

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
    const newWinner = checkWinner(newBoard);// esto arregla el problema de que el estado es asincrono, teniendo cuenta siempre el valor actual
    if (newWinner) {
      setWinner(newWinner); // la actualizacion de estado es ASINCRONA. no bloquea el estado
      confeti()
      console.log(winner);
    }

    if(newBoard){//check if game is over

    }
  };


  const handleStartOver = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)
  }

  return (  
    <main className="w-fit md:w-[100%] flex m-10 text-center md:justify-center">
      <div className="flex justify-center items-center flex-col">
      <h1 className="text-5xl mb-9 font-extralight">Noughts and Crosses ×o</h1>
      <section className="grid grid-cols-3 auto-cols-auto gap-[10px] md:gap-[10px]">
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>

      <section
        className="flex gap-2 mt-4 justify-center"
        onClick={() => console.log("nada")}
        >
        <Square isSelected={turn === turns.x}>{turns.x}</Square>
        <Square isSelected={turn === turns.o}>{turns.o}</Square>
      </section>

        </div>
      {winner !== null && (
        <section className="absolute w-[100vw] h-[100vh] top-0 left-0 grid items-center justify-center bg-[rgba(0,0,0,0.6)] rounded-[10px]">
          <div className="bg-[#111] h-[300px] w-[320px] border-solid border-2 border-[#eee] flex flex-col justify-center items-center gap-5">
            <h2 className="text-white">
              {winner === false ? "Empate" : "Winner is:"}
              <article className="mt-8 mb-4 m-auto w-fit border-solid border-2 border-[#eee] rounded-[10px] flex gap-4">
                {winner && <Square>{winner}</Square>}
              </article>
              <button onClick={handleStartOver} className="border-white bg-blue-500 hover:bg-blue-600 duration-300 border-solid p-2 rounded-[10px] w-24 text-center">
                Try again
              </button>
            </h2>
          </div>
        </section>
      )}
    </main>
  );
};

export default App;
