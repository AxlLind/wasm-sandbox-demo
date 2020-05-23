#include <algorithm>
#include <numeric>
#define WASM_EXPORT __attribute__((visibility("default")))

constexpr int combinations[8][3] = {{0,1,2},{3,4,5},{6,7,8},{0,3,6},{1,4,7},{2,5,8},{0,4,8},{2,4,6}};

int get(int board, int i) {
  return (board >> (i * 2)) & 3;
}

int set(int board, int i) {
  return board | (1 << (i * 2));
}

int heuristic(int board) {
  constexpr int scores[4][4] = {
    {     0, 10, 100, 10000},
    {   -10,  0,   0,     0},
    {  -100,  0,   0,     0},
    {-10000,  0,   0,     0},
  };
  return std::accumulate(combinations, combinations+8, 0, [&](auto v, auto arr){
    int a = get(board,arr[0]), b = get(board,arr[1]), c = get(board,arr[2]);
    int theirs = (a == 2) + (b == 2) + (c == 2);
    int ours   = (a == 1) + (b == 1) + (c == 1);
    return v + scores[theirs][ours];
  });
}

WASM_EXPORT extern "C" int makeMove(int board) {
  int s[9] = {0,1,2,3,4,5,6,7,8};
  std::transform(s, s+9, s, [&](auto i){
    return get(board, i) == 0 ? heuristic(set(board,i)) : -100000;
  });
  auto max = std::max_element(s,s+9);
  return std::distance(s,max);
}
