import { PlayerColors } from "types/Player"

export const getPlayerColor = (color: PlayerColors) => {
  switch (color) {
    case "BLUE":
      return "#0018a1"
    case "RED":
      return "#db352c"
    case "YELLOW":
      return "#dbca2c"
    case "GREEN":
      return "#00a10d"
  }
}
