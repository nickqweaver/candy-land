import { TrackTileType, TrackType } from "types/Track"

export const TrackTile = (
  props: Omit<TrackTileType, "key"> & {
    children: React.ReactNode
    tileKey?: string
  }
) => {
  const getColorFromTrackType = (type: TrackType) => {
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
  return (
    <div
      style={{
        gridColumn: "span 1",
        height: "100px",
        borderRadius: "6px",
        backgroundColor: getColorFromTrackType(props.type),
        border: "3px solid white",
        boxShadow: "1px -1px 19px 8px rgba(194,194,194,0.75)",
      }}
    >
      {props.children}
      {props.tileKey}
    </div>
  )
}
