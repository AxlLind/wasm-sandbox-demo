#define WASM_EXPORT __attribute__((visibility("default")))
#define EMPTY 0

WASM_EXPORT int makeMove(int state) {
  // Parse the board into a more managable format
  int board[9];
  for (int i = 0; i < 9; ++i)
    board[i] = (state >> (i * 2)) & 3;

  // Take the middle square if available
  if (board[5] == EMPTY)
    return 5;

  // Otherwise, pick the first available square
  for (int i = 0; i < 9; ++i) {
    if (board[i] == EMPTY)
      return i;
  }
  return -1;
}
