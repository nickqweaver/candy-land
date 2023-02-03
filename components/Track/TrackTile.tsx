import { getColorFromTrackType } from "helpers/getColorFromTrackType"
import { getPlayerColor } from "helpers/getPlayerColor"
import { PlayerColors } from "types/Player"
import { TrackTileType } from "types/Track"

export const TrackTile = (
  props: Omit<TrackTileType, "key"> & {
    children: React.ReactNode
    tileKey?: string
    activePlayerColor?: PlayerColors // Support multi player on same tile
  }
) => {
  return (
    <div
      style={{
        gridColumn: "span 1",
        height: "100px",
        borderRadius: "6px",
        backgroundColor: getColorFromTrackType(props.type),
        border: `3px solid ${
          props.activePlayerColor
            ? getPlayerColor(props.activePlayerColor)
            : "#FFF"
        }`,
        boxShadow: "1px -1px 19px 8px rgba(194,194,194,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.activePlayerColor && (
        <div
          style={{
            background: getPlayerColor(props.activePlayerColor),
            borderRadius: "1000rem",
            width: "64px",
            height: "64px",
          }}
        />
      )}
      {props.children}
      {props.tileKey}
      {props.shouldSkipTurn && "X"}
    </div>
  )
}
