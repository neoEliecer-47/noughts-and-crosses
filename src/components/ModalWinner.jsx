import React from "react";
import Square from "./Square";
import { buttonClass } from "../constants";

const ModalWinner = ({ winner, handleStartOver }) => {
  return (
    <>
      {winner !== null && (
        <section className="absolute w-[100vw] h-[100vh] top-0 left-0 grid items-center justify-center bg-[rgba(0,0,0,0.6)] rounded-[10px]">
          <div className="bg-[#111] h-[300px] w-[320px] border-solid border-2 border-[#eee] flex flex-col justify-center items-center gap-5">
            <h2 className="text-white">
              {winner === false ? "Empate" : "Winner is:"}
              <article className="mt-8 mb-4 m-auto w-fit border-solid border-2 border-[#eee] rounded-[10px] flex gap-4">
                {winner && <Square>{winner}</Square>}
              </article>
              <button onClick={handleStartOver} className={buttonClass}>
                Try again
              </button>
            </h2>
          </div>
        </section>
      )}
    </>
  );
};

export default ModalWinner;
