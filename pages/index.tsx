import { Card } from "components/Deck/Card"
import { Track } from "components/Track/Track"
import { AppContext } from "context/AppContext"
import { getPlayerColor } from "helpers/getPlayerColor"
import { useContext, useState } from "react"

export default function Home() {
  const { state, dispatch } = useContext(AppContext)
  const [isMoveDisabled, setIsMoveDisabled] = useState(false)

  const takeTurn = () => {
    setIsMoveDisabled(true)
    dispatch({ type: "PULL_CARD" })
    setTimeout(() => {
      dispatch({ type: "MOVE_PLAYER" })
      setIsMoveDisabled(false)
    }, 2000)
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px" }}>
      <Track />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "256px 1fr 1fr",
          alignItems: "center",
          position: "fixed",
          right: "0px",
          width: "280px",
          margin: "auto",
          background: "#FFF",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "64px 64px 64px",
            rowGap: "8px",
          }}
        >
          <button
            disabled={state.players.length >= 3}
            onClick={() =>
              dispatch({
                type: "CREATE_PLAYER",
                player: { name: "Nick", color: "BLUE" },
              })
            }
          >
            Create Player
          </button>
          <button
            disabled={state.players.length >= 3}
            onClick={() =>
              dispatch({
                type: "CREATE_PLAYER",
                player: { name: "Olivia", color: "GREEN" },
              })
            }
          >
            Create 2nd Player
          </button>
          <button
            disabled={state.players.length >= 3}
            onClick={() =>
              dispatch({
                type: "CREATE_PLAYER",
                player: { name: "Lenny", color: "RED" },
              })
            }
          >
            Create 3rd Player
          </button>
          <button
            onClick={() => takeTurn()}
            disabled={isMoveDisabled}
            style={{
              background: `${
                isMoveDisabled ? "rgba(0, 0, 0, .50)" : "rgba(0, 0, 0, .90)"
              }`,
              padding: "8px 24px",
              fontSize: "16px",
              color: "#FFF",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Pull Card
          </button>
        </div>

        {state.activeCard && <Card {...state.activeCard} />}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
          }}
        >
          {state.players.map((player, index) => {
            const isActive = state.activePlayerIndex === index

            return (
              <div
                key={player.index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span style={{ marginBottom: "8px" }}>{player.name}</span>
                <div
                  key={player.index}
                  style={{
                    background: getPlayerColor(player.color),
                    borderRadius: "1000rem",
                    width: "64px",
                    height: "64px",
                    border: `${
                      isActive ? "4px solid #0dff00" : "4px solid transparent"
                    }`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
