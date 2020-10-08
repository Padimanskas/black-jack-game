import { CARD_RANKS } from "@/const/const";

export const getRandomRank = (ranks: {[key in keyof typeof CARD_RANKS]: {name: string; value: number; }}): {name: string; value: number; } => {
    const keys = Object.keys(ranks);
    return ranks[keys[keys.length * Math.random() << 0]];
}

export const getRandomSuit = (suits: string[]): string => {
    return suits[Math.floor(Math.random() * suits.length)];
}
