import { TrackType } from "types/Track"

export const getColorFromTrackType = (type: TrackType) => {
  switch (type) {
    case TrackType.GREEN:
      return "#a1f542"
    case TrackType.BLUE:
      return "#1da5db"
    case TrackType.ORANGE:
      return "#ff6200"
    case TrackType.PURPLE:
      return "#c800f0"
    case TrackType.YELLOW:
      return "#ffef45"
    case TrackType.RED:
      return "#ff474a"
    case TrackType.GUM_DROP:
    case TrackType.ICE_CREAM:
    case TrackType.GUM_DROP:
    case TrackType.PEPPERMINT:
    case TrackType.CHOCOLATE:
    case TrackType.LOLLIPOP:
      return "#ff7dba"
  }
}
