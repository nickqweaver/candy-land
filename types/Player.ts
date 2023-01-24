export type PlayerColors = "RED" | "GREEN" | "BLUE" | "YELLOW"

export type MinimalPlayer = {
  name: string
  color: PlayerColors
}

export type Player = {
  position: number
  shouldSkipNextTurn: boolean
} & MinimalPlayer

export type IndexedPlayer = Player & { index: number }
