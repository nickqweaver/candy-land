import { AppContext } from "context/AppContext"
import { useContext } from "react"
import { TrackType } from "types/Track"
import { TrackTile } from "./TrackTile"

export const Track = () => {
  const { state } = useContext(AppContext)
  const buildTrack = () => {
    return state.track.map((tile, index) => {
      const matchedPlayer = state.players
        .filter((player) => player.position === index)
        .map((player) => player.color)

      const [activeColor] = matchedPlayer

      return (
        <TrackTile
          key={tile.key}
          {...tile}
          tileKey={tile.key}
          activePlayerColor={activeColor}
        >
          {(tile.type === TrackType.GUM_DROP ||
            tile.type === TrackType.ICE_CREAM ||
            tile.type === TrackType.PEPPERMINT ||
            tile.type === TrackType.CHOCOLATE ||
            tile.type === TrackType.LOLLIPOP) && <span>{tile.type}</span>}
        </TrackTile>
      )
    })
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 120px))",
        rowGap: "64px",
        columnGap: "8px",
      }}
    >
      {buildTrack()}
    </div>
  )
}
