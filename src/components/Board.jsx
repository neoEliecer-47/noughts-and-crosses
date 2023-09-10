import Square from "./Square";

const Board = ({ board, updateBoard }) => {
  return (
    <section className="mt-4 grid grid-cols-3 auto-cols-auto gap-[10px] md:gap-[10px]">
      {board.map((_, index) => (
        <Square key={index} index={index} updateBoard={updateBoard}>
          {board[index]}
        </Square>
      ))}
    </section>
  );
};

export default Board;
