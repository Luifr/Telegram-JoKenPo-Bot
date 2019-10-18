import { FifoMatchmaker } from 'matchmaking';
import { runGame } from './gameManager';

function getKey(player: any) {
	return player.username;
}

export let matchmaker = new FifoMatchmaker(runGame, getKey);