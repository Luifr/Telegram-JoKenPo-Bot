import TelegramBot from 'node-telegram-bot-api';
import { MessageManager } from './messageManager'

export interface Player extends TelegramBot.Chat { };

export function runGame(players: Player[]) {
	let messageManager = new MessageManager(players[0], players[1]);
	messageManager.sendGameStart();
}