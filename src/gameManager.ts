// import { FifoMatchmaker } from 'matchmaking';
import { FifoMatchmaker } from './src/fifo';
import { Chat } from 'node-telegram-bot-api';
import { MessageManager } from './messageManager'

export interface Player extends Chat { };

function runGame(players: Player[]) {
	let messageManager = new MessageManager(players[0], players[1]);
	messageManager.sendGameStart();
}

function getKey(player: Player) {
	return player.username || player.first_name || player.id.toString();
}

export let matchmaker = new FifoMatchmaker<Player>(runGame, getKey);