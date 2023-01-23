import { cardDeck } from "data/CardDeckData"
import { trackData } from "data/TrackData"
import { TrackType } from "types/Track"
import { TrackTile } from "./TrackTile"

export const Track = () => {
  cardDeck.shuffle()
  console.log(cardDeck.cards)
  const buildTrack = () => {
    return trackData.map((tile) => {
      return (
        <TrackTile key={tile.key} {...tile} tileKey={tile.key}>
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
