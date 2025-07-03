# Memory Sequence

Memory Sequence is a cross-platform mobile game built with React Native and Expo. The goal is to test and improve your memory by repeating sequences of highlighted squares on a 3x3 grid. The game gets harder as you progress, with longer and more complex sequences.

## Features

- Clean, modern UI
- Increasing difficulty with each level
- Secure random sequence generation using a custom native module (`expo-secure-rng`)
- Works on both Android and iOS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (for package management)
- [Node.js](https://nodejs.org/) (if not already installed)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio and/or Xcode for running on devices or emulators

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd memory-sequence
   ```
2. Install dependencies:
   ```sh
   bun install
   ```
3. Install the custom native module:
   - The `expo-secure-rng` module is included as a local package. No extra steps are needed unless you want to develop it separately.

### Running the App

- **Android:**
  ```sh
  npm run android
  ```
- **iOS:**
  ```sh
  npm run ios
  ```
- **Web:**
  ```sh
  npm run web
  ```

**⚠️ IMPORTANT:**
**TO USE THE CUSTOM NATIVE MODULE, YOU MUST RUN THE APP IN A DEVELOPMENT BUILD, NOT EXPO GO.**

## Development Notes

- The game logic is in `games/game-logic.ts` and `utils/game-utils.ts`.
- The custom RNG module is in `expo-secure-rng/`.
- Linting and formatting are enforced via ESLint and Prettier. Run `bun lint` to check code quality.
- Example/demo code for the RNG module is in `expo-secure-rng/example/` (can be deleted if not needed).

## Troubleshooting

- If you see errors about missing native modules, make sure you are running a development build and have rebuilt the native app after any dependency changes.
- For Android/iOS build issues, ensure your environment is set up with the correct SDKs and tools.

## License

MIT
