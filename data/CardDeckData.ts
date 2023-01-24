import { Card, CardDeck } from "types/Cards"
import { TrackType } from "types/Track"

export const isGeneralType = (type: TrackType) => {
  if (
    type === TrackType.BLUE ||
    type === TrackType.GREEN ||
    type === TrackType.ORANGE ||
    type === TrackType.PURPLE ||
    type === TrackType.YELLOW ||
    type === TrackType.RED
  )
    return true
  return false
}

const flattenCardTuples = (tuple: [Card[], Card[]]): Card[] =>
  tuple.flatMap((pair) => pair.flatMap((card) => card))

const generalCardFactory = (type: Card["type"]): Card[] => {
  if (!isGeneralType(type)) {
    throw new Error("General card Factory only accepts general card types")
  }

  const singles = Array.from(
    Array(4),
    (_): Card => ({ type: type, multiplier: 1 })
  )
  const doubles = Array.from(
    Array(3),
    (_): Card => ({ type: type, multiplier: 2 })
  )

  return flattenCardTuples([singles, doubles])
}

const specialCardFactory = (type: Card["type"]): Card => {
  if (isGeneralType(type)) {
    throw new Error("Special card factory only accepts special card types")
  }
  return { type, multiplier: 1 }
}

export const shuffle = (deck: CardDeck) => {
  const copiedDeck = [...deck]
  const generateRandom = (max: number) => Math.floor(Math.random() * max)

  for (let i = copiedDeck.length - 1; i >= 0; i--) {
    const random = generateRandom(i)
    const temp = copiedDeck[random]

    copiedDeck[random] = copiedDeck[i]
    copiedDeck[i] = temp
  }

  return copiedDeck
}

const PURPLE = generalCardFactory(TrackType.PURPLE)
const BLUE = generalCardFactory(TrackType.BLUE)
const RED = generalCardFactory(TrackType.RED)
const GREEN = generalCardFactory(TrackType.GREEN)
const ORANGE = generalCardFactory(TrackType.ORANGE)
const YELLOW = generalCardFactory(TrackType.YELLOW)
const LOLLIPOP = specialCardFactory(TrackType.LOLLIPOP)
const CHOCOLATE = specialCardFactory(TrackType.CHOCOLATE)
const GUM_DROP = specialCardFactory(TrackType.GUM_DROP)
const PEPPERMINT = specialCardFactory(TrackType.PEPPERMINT)
const ICE_CREAM = specialCardFactory(TrackType.ICE_CREAM)

const cardDeckFactory = () => {
  return [
    LOLLIPOP,
    CHOCOLATE,
    GUM_DROP,
    PEPPERMINT,
    ICE_CREAM,
    ...BLUE,
    ...RED,
    ...GREEN,
    ...ORANGE,
    ...YELLOW,
    ...PURPLE,
  ]
}

export const cardDeck = {
  cards: cardDeckFactory(),
  shuffle: function () {
    shuffle(this.cards)
  },
}
