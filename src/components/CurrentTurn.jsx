import { turns } from "../constants";
import Square from "./Square";

const CurrentTurn = ({ turn }) => {
  return (
    <section
      className="flex gap-2 mt-4 justify-center"
      onClick={() => console.log("nada")}
    >
      <Square isSelected={turn === turns.x}>{turns.x}</Square>
      <Square isSelected={turn === turns.o}>{turns.o}</Square>
    </section>
  );
};

export default CurrentTurn;
