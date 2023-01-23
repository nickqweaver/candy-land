import { Track } from "components/Track/Track"
import { TrackType, TrackTileType } from "../types/Track"

export const trackTileFactory = (
  type: TrackType,
  key?: string,
  slideTo?: string,
  shouldSkipTurn?: boolean
): TrackTileType => {
  return {
    type,
    shouldSkipTurn: false ?? shouldSkipTurn,
    slideTo,
    key,
  }
}
export const trackPatternFactory = (
  modifier?: {
    tile: TrackType
    key?: string
    slideTo?: string
    shouldSkipTurn?: boolean
  },
  insert?: { tile: TrackTileType; index: number }
) => {
  const trackPatterns = [
    trackTileFactory(TrackType.RED),
    trackTileFactory(TrackType.PURPLE),
    trackTileFactory(TrackType.YELLOW),
    trackTileFactory(TrackType.BLUE),
    trackTileFactory(TrackType.ORANGE),
    trackTileFactory(TrackType.GREEN),
  ].map((tile) => {
    if (modifier?.tile === tile.type) {
      return trackTileFactory(
        tile.type,
        tile.key,
        tile.slideTo,
        tile.shouldSkipTurn
      )
    }
    return tile
  })
  if (insert) {
    trackPatterns.splice(insert.index, 0, insert.tile)
  }
  return trackPatterns
}

export const trackData: TrackTileType[] = [
  ...trackPatternFactory({
    tile: TrackType.BLUE,
    key: "gr_enter",
    slideTo: "gr_exit",
  }),
  ...trackPatternFactory(),
  ...trackPatternFactory({
    tile: TrackType.GREEN,
    key: "twister_enter",
    slideTo: "twister_exit",
  }),
  ...trackPatternFactory(
    { tile: TrackType.GREEN, key: "twister_exit" },
    {
      index: 2,
      tile: trackTileFactory(TrackType.PEPPERMINT),
    }
  ),
  ...trackPatternFactory({ tile: TrackType.PURPLE, shouldSkipTurn: true }),
  ...trackPatternFactory(
    { tile: TrackType.BLUE, key: "gr_exit" },
    {
      tile: trackTileFactory(TrackType.GUM_DROP),
      index: 1,
    }
  ),
  ...trackPatternFactory(undefined, {
    tile: trackTileFactory(TrackType.CHOCOLATE),
    index: 4,
  }),
  ...trackPatternFactory(),
  ...trackPatternFactory(),
  ...trackPatternFactory(),
  ...trackPatternFactory(),
  ...trackPatternFactory(),
]
