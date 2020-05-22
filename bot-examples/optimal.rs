/*
  Optimal bot using the negamax algorithm to find the best move.
  Prioritizes winning early if possible.
  See: https://en.wikipedia.org/wiki/Negamax

  By keeping the board representation in a single int the bot
  is incredibly fast. It finishes an exhaustive search of an
  empty board in less than 50ms even in the browser!
*/
const WINNING_COMBINATIONS: [[i32;3];8] = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const EMPTY: i32 = 0;

fn get(board: i32, i: i32) -> i32 {
  (board >> (i * 2)) & 3
}

fn set(board: i32, i: i32, v: i32) -> i32 {
  let mask = 3 << (i * 2);
  (board & !mask) | (v << (i * 2))
}

fn negamax(board: i32, player: i32, depth: i32) -> (i32,i32) {
  let winner = WINNING_COMBINATIONS.iter()
    .map(|&[a,b,c]| [get(board,a), get(board,b), get(board,c)])
    .find(|&[a,b,c]| a != EMPTY && a == b && a == c)
    .map(|[a,_,_]| a);
  if let Some(p) = winner {
    let v = 10 - depth;
    return (-1, if p == player {v} else {-v});
  }

  (0..9)
    .filter(|&i| get(board,i) == EMPTY)
    .map(|i| {
      let new_board = set(board, i, player);
      let new_player = 3 - player;
      (i, negamax(new_board, new_player, depth+1))
    })
    .map(|(mv,(_,v))| (mv, -v))
    .max_by_key(|&(_,v)| v)
    .unwrap_or((-1, 0))
}

#[no_mangle]
#[allow(non_snake_case)]
pub extern "C" fn makeMove(board: i32) -> i32 {
  negamax(board, 1, 0).0
}
