export type Player = {
  name: string
  color: "RED" | "GREEN" | "BLUE" | "YELLOW"
  position: number
  shouldSkipNextTurn: boolean
}
