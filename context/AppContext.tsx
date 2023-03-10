import { createContext, useReducer, useEffect } from "react"
import { cardDeck, isGeneralType, shuffle } from "data/CardDeckData"
import { trackData } from "data/TrackData"
import { Card, CardDeck } from "types/Cards"
import { MinimalPlayer, IndexedPlayer } from "types/Player"
import { TrackTileType } from "types/Track"

type AppState = {
  players: IndexedPlayer[]
  cardDeck: {
    used: CardDeck
    unused: CardDeck
  }
  activeCard: Card | null
  activePlayerIndex: number
  track: TrackTileType[]
}

const initialState: AppState = {
  players: [],
  cardDeck: {
    used: [],
    unused: [...cardDeck.cards],
  },
  activeCard: null,
  activePlayerIndex: 0,
  track: trackData,
}

type Action =
  | { type: "SET_ACTIVE_PLAYER"; player: IndexedPlayer }
  | { type: "MOVE_PLAYER" }
  | { type: "CREATE_PLAYER"; player: MinimalPlayer }
  | { type: "SHUFFLE_CARD_DECK" }
  | { type: "PULL_CARD" }

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
    case "PULL_CARD":
      const unusedCards = [...state.cardDeck.unused]
      const cardPulled = unusedCards.pop()

      if (!cardPulled) {
        throw "There are no cards left!"
      }
      const usedCards = [...state.cardDeck.used, cardPulled]

      return {
        ...state,
        cardDeck: {
          used: usedCards,
          unused: unusedCards,
        },
        activeCard: cardPulled,
      }

    case "MOVE_PLAYER":
      const currentPosition = state.players[state.activePlayerIndex].position

      let newPosition = currentPosition
      let movedCount = 0

      if (!state.activeCard) {
        throw "There's no active card!"
      }

      // Clean this up... Way too much duplicate code
      if (!isGeneralType(state.activeCard.type)) {
        const newPosition = state.track.findIndex(
          (trackTile) => trackTile.type === state?.activeCard?.type
        )
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
        }
      } else {
        let shouldSkipNextTurn = false
        for (let i = currentPosition + 1; i < trackData.length; i++) {
          if (trackData[i].type === state.activeCard.type) {
            movedCount++
            newPosition = i
          }
          if (movedCount === state.activeCard.multiplier) {
            if (trackData[i].shouldSkipTurn) {
              shouldSkipNextTurn = true
            }
            break
          }
        }

        const newPlayers = state.players.map((player, index) =>
          state.activePlayerIndex === player.index
            ? { ...player, position: newPosition, shouldSkipNextTurn }
            : player
        )

        const nextIndex = state.activePlayerIndex + 1

        return {
          ...state,
          players: newPlayers,
          activePlayerIndex: nextIndex >= state.players.length ? 0 : nextIndex,
        }
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
