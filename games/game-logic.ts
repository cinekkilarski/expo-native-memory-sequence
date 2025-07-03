import { generateRandomSequence } from "../utils/game-utils";

export interface GameState {
  level: number;
  score: number;
  sequence: number[];
  playerSequence: number[];
  isPlaying: boolean;
  isShowingSequence: boolean;
  gameOver: boolean;
  timeRemaining: number;
}

export interface GameConfig {
  initialSequenceLength: number;
  timeLimit: number;
  maxLevel: number;
}

export const DEFAULT_CONFIG: GameConfig = {
  initialSequenceLength: 3,
  timeLimit: 5,
  maxLevel: 20,
};

export class MemorySequenceGame {
  private config: GameConfig;
  private state: GameState;

  constructor(config: Partial<GameConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = this.getInitialState();
  }

  getInitialState(): GameState {
    return {
      level: 1,
      score: 0,
      sequence: [],
      playerSequence: [],
      isPlaying: false,
      isShowingSequence: false,
      gameOver: false,
      timeRemaining: this.config.timeLimit,
    };
  }

  startNewGame(): GameState {
    this.state = this.getInitialState();
    this.generateNewSequence();
    return { ...this.state };
  }

  generateNewSequence(): void {
    const sequenceLength =
      this.config.initialSequenceLength + this.state.level - 1;
    this.state.sequence = generateRandomSequence(sequenceLength);
  }

  startLevel(): GameState {
    this.state.isPlaying = true;
    this.state.isShowingSequence = true;
    this.state.playerSequence = [];
    this.state.timeRemaining = this.config.timeLimit;
    this.generateNewSequence();
    return { ...this.state };
  }

  showSequence(): GameState {
    this.state.isShowingSequence = true;
    return { ...this.state };
  }

  startPlayerTurn(): GameState {
    this.state.isShowingSequence = false;
    this.state.playerSequence = [];
    this.state.timeRemaining = this.config.timeLimit;
    return { ...this.state };
  }

  addPlayerInput(sliceIndex: number): GameState {
    if (!this.state.isPlaying || this.state.isShowingSequence) {
      return { ...this.state };
    }

    this.state.playerSequence.push(sliceIndex);

    const currentIndex = this.state.playerSequence.length - 1;
    if (
      this.state.playerSequence[currentIndex] !==
      this.state.sequence[currentIndex]
    ) {
      this.endGame();
      return { ...this.state };
    }

    if (this.state.playerSequence.length === this.state.sequence.length) {
      this.completeLevel();
    }

    return { ...this.state };
  }

  updateTimeRemaining(timeRemaining: number): GameState {
    this.state.timeRemaining = timeRemaining;

    if (
      timeRemaining <= 0 &&
      this.state.isPlaying &&
      !this.state.isShowingSequence
    ) {
      this.endGame();
    }

    return { ...this.state };
  }

  private completeLevel(): void {
    this.state.level++;
    this.state.score += this.state.level * 10;
    this.state.isPlaying = false;

    if (this.state.level > this.config.maxLevel) {
      this.state.gameOver = true;
    }
  }

  private endGame(): void {
    this.state.isPlaying = false;
    this.state.gameOver = true;
  }

  getState(): GameState {
    return { ...this.state };
  }

  getSequence(): number[] {
    return [...this.state.sequence];
  }

  getPlayerSequence(): number[] {
    return [...this.state.playerSequence];
  }

  isGameOver(): boolean {
    return this.state.gameOver;
  }

  isLevelComplete(): boolean {
    return this.state.playerSequence.length === this.state.sequence.length;
  }

  getCurrentLevel(): number {
    return this.state.level;
  }

  getScore(): number {
    return this.state.score;
  }
}
