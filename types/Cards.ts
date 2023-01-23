import { TrackType } from "./Track"

export type Card = {
  type: TrackType
  multiplier: 1 | 2
}

export type CardDeck = Card[]
