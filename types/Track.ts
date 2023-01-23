export enum TrackType {
  GREEN = "GREEN",
  BLUE = "BLUE",
  YELLOW = "YELLOW",
  ORANGE = "ORANGE",
  RED = "RED",
  PURPLE = "PUPRLE",
  PEPPERMINT = "PEPPERMINT",
  ICE_CREAM = "ICE_CREAM",
  LOLLIPOP = "LOLLIPOP",
  CHOCOLATE = "CHOCOLATE",
  GUM_DROP = "GUM_DROP",
}

export type TrackTileType = {
  type: TrackType
  slideTo?: string
  key?: string
  shouldSkipTurn: boolean
}
