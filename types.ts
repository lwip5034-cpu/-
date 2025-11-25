export interface Philosopher {
  id: number;
  name: string;
  years: string;
  schoolOfThought: string;
  shortSummary: string;
  detailedTheory: string;
  majorWorks: string[];
  keyQuotes: string[];
}

export interface TimelineData {
  philosophers: Philosopher[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}