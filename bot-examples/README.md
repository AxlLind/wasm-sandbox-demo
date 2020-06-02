# WebAssembly Bots
These are bots a few different bots written in different languages that play TicTacToe. They were created as part of the demo, to be uploaded to the website.

## Trivial Bot (C)
This bot is very stupid. It selects the middle square if available and the next available square otherwise. This was just created to be used during development and for testing purposes.

See [trivial-bot.c](./trivial-bot.c).

## Heuristic (C++)
This bot uses a [heuristic](https://en.wikipedia.org/wiki/Heuristic_(computer_science)) approach to play TicTacToe. In essence, it tries to assign a score to a board, indicating how good that position is for the bot. When making a new move it simply looks at all possible moves and picks the move that yields the highest score. The heuristic is based in assigning each row, column, and diagonal a score and letting the total score be the sum of those.

See [heuristic.cpp](./heuristic.cpp).

## Optimal (Rust)
This bot uses a variant of the famous [Minimax algorithm](https://en.wikipedia.org/wiki/Minimax), used to play zero-sum games. For larger games you would need to pair this with a heuristic but due to the small size of TicTacToe the bot is able to fully examine the search space. It therefore only needs to look at leaf-nodes, i.e were one of the players has won. It also prioritizes winning early if possible. Due to how it represents the board memory allocations are fully eliminated, making it very performant. It is able to do an exhaustive search from an empty board (which means looking at every possible TicTacToe board!) in less than 50ms in the browser.

See [optimal.rs](./optimal.rs).

# Compiling these to WebAssembly
You can of course set up the required toolchains locally for each language but considering the size of these files and that this is a demo we choose a simpler approach. We used a web application called [WebAssembly Studio](https://webassembly.studio/) to compile these programs. To use it create a new project for the corresponding language (i.e Rust or C) and replace the contents of the main file with the bot code.

1. Create a new project for the corresponding language (i.e Rust or C).
2. Replace the contents of the main file with the bot code.
3. Compile it to WASM by clicking the `Build` button.
4. Download the generated WASM file.

## Compiling C++
For C++ you need to do a few extra steps since the application actually supports C++ but does not let you create a C++ project directly.

1. Start with creating a C project.
2. Create a new file in `./src` called `main.cpp`.
3. In `build.ts` change line 5 to:
```ts
const data = await Service.compileFile(project.getFile("src/main.cpp"), "cpp", "wasm", "-g -O3");
```
4. Do step 3 and 4 from above.
