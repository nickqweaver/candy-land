import { getColorFromTrackType } from "helpers/getColorFromTrackType"
import { Card as CardType } from "types/Cards"
import { TrackType } from "types/Track"

export const Card = (props: CardType) => {
  const tiles = [...Array(props.multiplier).keys()].map((_, i) => {
    return (
      <div
        key={i}
        style={{
          gridColumn: "span 1",
          height: "100px",
          width: "100px",
          borderRadius: "6px",
          backgroundColor: getColorFromTrackType(props.type),
          border: "3px solid #FFF",
          boxShadow: "1px -1px 19px 8px rgba(194,194,194,0.75)",
        }}
      ></div>
    )
  })
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "100px",
        justifyItems: "center",
        padding: "16px",
        rowGap: "8px",
        boxShadow: "1px 6px 17px 3px rgba(0,0,0,0.11)",
      }}
    >
      {tiles}
      {(props.type === TrackType.GUM_DROP ||
        props.type === TrackType.ICE_CREAM ||
        props.type === TrackType.PEPPERMINT ||
        props.type === TrackType.CHOCOLATE ||
        props.type === TrackType.LOLLIPOP) && <span>{props.type}</span>}
    </div>
  )
}
