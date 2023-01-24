import { createContext, useReducer, useEffect } from "react"
import { cardDeck, shuffle } from "data/CardDeckData"
import { trackData } from "data/TrackData"
import { CardDeck } from "types/Cards"
import { MinimalPlayer, IndexedPlayer } from "types/Player"
import { TrackTileType } from "types/Track"

type AppState = {
  players: IndexedPlayer[]
  cardDeck: {
    used: CardDeck
    unused: CardDeck
  }
  activePlayerIndex: number
  track: TrackTileType[]
}

const initialState: AppState = {
  players: [],
  cardDeck: {
    used: [],
    unused: [...cardDeck.cards],
  },
  activePlayerIndex: 0,
  track: trackData,
}

type Action =
  | { type: "SET_ACTIVE_PLAYER"; player: IndexedPlayer }
  | { type: "MOVE_PLAYER" }
  | { type: "CREATE_PLAYER"; player: MinimalPlayer }
  | { type: "SHUFFLE_CARD_DECK" }

export const AppContext = createContext<{
  state: AppState
  dispatch: (action: Action) => void
}>({
  state: initialState,
  dispatch: () => {},
})

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SHUFFLE_CARD_DECK":
      return {
        ...state,
        cardDeck: {
          unused: shuffle(cardDeck.cards),
          used: [],
        },
      }
    case "SET_ACTIVE_PLAYER":
      return {
        ...state,
        activePlayerIndex: action.player.index,
      }
    case "CREATE_PLAYER":
      const players = [
        ...state.players,
        {
          ...action.player,
          shouldSkipNextTurn: false,
          position: 0,
          index: state.players.length - 1 + 1,
        },
      ]
      return {
        ...state,
        players,
      }
    case "MOVE_PLAYER":
      const currentPosition = state.players[state.activePlayerIndex].position
      const unusedCards = [...state.cardDeck.unused]
      const cardPulled = unusedCards.pop()

      if (!cardPulled) {
        throw "There are no cards left!"
      }

      const usedCards = [...state.cardDeck.used, cardPulled]

      let newPosition = currentPosition
      let movedCount = 0

      for (let i = currentPosition; i < trackData.length; i++) {
        console.log(cardPulled.type, "Card Pulled")
        if (trackData[i].type === cardPulled.type) {
          movedCount++
          newPosition = i
        }
        if (movedCount === cardPulled.multiplier) {
          break
        }
      }

      const newPlayers = state.players.map((player, index) =>
        state.activePlayerIndex === player.index
          ? { ...player, position: newPosition }
          : player
      )

      const nextIndex = state.activePlayerIndex + 1

      return {
        ...state,
        players: newPlayers,
        activePlayerIndex: nextIndex >= state.players.length ? 0 : nextIndex,
        cardDeck: {
          used: usedCards,
          unused: unusedCards,
        },
      }
    default:
      return state
  }
}

export const AppProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: "SHUFFLE_CARD_DECK" })
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}
