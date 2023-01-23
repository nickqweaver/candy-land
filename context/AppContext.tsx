import { cardDeck, shuffle } from "data/CardDeckData"
import { createContext, useReducer } from "react"
import { CardDeck } from "types/Cards"
import { Player } from "types/Player"

type AppState = {
  players: // Is there a better way to restrict this via TS?
  | (
        | [Player]
        | [Player, Player]
        | [Player, Player, Player]
        | [Player, Player, Player, Player]
      )
    | null
  cardDeck: {
    used: CardDeck
    unused: CardDeck
  }
  activePlayer: Player | null
}

const initialState = {
  players: null,
  cardDeck: {
    used: [],
    unused: [...cardDeck.cards],
  },
  activePlayer: null,
}

export const AppContext = createContext<AppState>(initialState)

export const AppProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(() => {}, initialState)

  useEffect(() => {
    if (state.cardDeck.used.length <= 0) {
      shuffle(state.cardDeck.unused)
    }
  }, [])

  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>
}
