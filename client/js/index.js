import { uiDrag } from "./uiDrag.js";
import { deckBuilder } from "./deckBuilder.js";
import { playerDeck } from "./playerDeck.js";
import { Connector } from "./Connector.js";



Connector.getInstance("http://localhost:3000");

deckBuilder.builder();
playerDeck.deckShuffle();
uiDrag.init(".drop-zone", ".card");

