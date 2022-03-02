/**
 * The socket module handles all communiations with Bildschirm.
 *
 * @module @socket
 * @see https://mateffy.me/mission-control-client
 * @requires mission-control-client
 */
import config from '@config';
import { store } from './store';
import {
	MissionControlClient,
	SOCKET_ERROR,
} from '../../../mission-control-client';

const apiKey = window.BILDSCHIRM_API_KEY;

if (!apiKey)
	console.error('No API key found in window.BILDSCHIRM_API_KEY!');

export const client = new MissionControlClient(
	config.bildschirmUrl,
	apiKey
);

store.commit('setConnectionStatus', 'connecting');

client.on('connect', () => {
	store.commit('setConnectionStatus', 'connected');
	store.commit('confirmFirstConnection');
	console.log('Connected to Bildschirm.');
});

client.on('reconnecting', () => {
	store.commit('setConnectionStatus', 'connecting');
});

client.on('disconnect', (reason) => {
	console.log('Disconnected from Bildschirm. Reason:', reason);
	store.commit('setConnectionStatus', 'disconnected');
});

client.on('error', (errorType, err) => {
	console.error('Error:', errorType, err);

	// if we ran out of reconnection attempts
	if (errorType === SOCKET_ERROR.NO_ATTEMPTS_LEFT) {
		store.commit('setConnectionStatus', 'disconnected');
	}
});

client.on('initial-state', (data) => {
	console.log('Received Initial State:', data);
	store.commit('fullUpdateMcState', data.state);
});

/**
 * Evoke an action on the Bildschirm server.
 * @param  {string} action The actions name / key.
 * @param  {Object} data   The data to be sent along with the action.
 */
export async function invokeAction(action, data) {
	console.log(`Calling action: ${action} with data:`, data);
	await client.action(action, data);
}

window.invokeAction = invokeAction;
