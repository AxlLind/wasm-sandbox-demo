#![allow(non_snake_case)]
const WINNING_COMBINATIONS: [[i32;3];8] = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const EMPTY: i32 = 0;
const FULL:  i32 = 0;

fn get(board: i32, i: i32) -> i32 {
  (board >> (i * 2)) & 3
}

fn set(board: i32, i: i32, v: i32) -> i32 {
  let mask = 3 << (i * 2);
  (board & !mask) | (v << (i * 2))
}

fn winner_or_full(board: i32) -> Option<i32> {
  WINNING_COMBINATIONS.iter()
    .map(|&[a,b,c]| [get(board,a), get(board,b), get(board,c)])
    .find(|&[a,b,c]| a != EMPTY && a == b && b == c)
    .map(|[a,_,_]| a)
    .or_else(|| {
      let full = (0..9).all(|i| get(board, i) != EMPTY);
      if full { Some(FULL) } else { None }
    })
}

// Negamax algorithm to find the best move
// See: https://en.wikipedia.org/wiki/Negamax
fn negamax(board: i32, player: i32) -> (i32,i32) {
  // check if board has winner or is full
  match winner_or_full(board) {
    Some(FULL)  => return (-1, 0),
    Some(winner) => return (-1, if winner == player {1} else {-1}),
    _ => {}
  }

  // evaluate all available moves
  let moves = (0..9)
    .filter(|&i| get(board,i) == EMPTY)
    .map(|i| (i, negamax(set(board, i, player), 3 - player)))
    .map(|(mv,(_,v))| (mv, -v));

  // find the best move, return early if guaranteed win
  let mut max = (-1, -1000);
  for (mv,v) in moves {
    if v == 1 { return (mv,v); }
    if max.1 < v { max = (mv,v); }
  }
  max
}

#[no_mangle]
pub extern "C" fn makeMove(board: i32) -> i32 {
  if board == 0 { return 4; }
  negamax(board, 1).0
}
