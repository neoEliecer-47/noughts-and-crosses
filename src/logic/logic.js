import { winner_combos } from "../constants";

export const checkWinner = (boardToCheck) => {
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

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null); //si cada posicion en el array (board) es distinto de null (o sea que todas las posiciones ya estan ocupadas por valores x u o) entonces el juegfo ha terminado y por ende sera empate porque every devuelve un booleano
};
