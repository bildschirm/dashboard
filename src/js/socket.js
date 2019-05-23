import io from 'socket.io-client';
import config from '@config';
import store from './store';
import { MissionControlClient, SOCKET_ERROR } from 'mission-control-client';

const client = new MissionControlClient(
	config.socketUrl,
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoibWF0In0sImlhdCI6MTU1ODUxNDAzNywiZXhwIjoxNTU4NjAwNDM3LCJhdWQiOiJob21lLm1hdGVmZnkubWUiLCJpc3MiOiJzc28uaG9tZS5tYXRlZmZ5Lm1lIn0.9Uk3TJrKs_jCr0-xZhpGnL3H-BzWS9BzjMtDHzhbLyk'
);

store.commit('setConnectionStatus', 'connecting');

client.on('connect', () => {
	store.commit('setConnectionStatus', 'connected');
	console.log('Connected to Mission Control.');
});

client.on('reconnecting', () => {
	store.commit('setConnectionStatus', 'connecting');
});

client.on('disconnect', reason => {
	console.log('Disconnected from Mission Control. Reason:', reason);
	store.commit('setConnectionStatus', 'disconnected');
});

client.on('error', errorType => {
	// if we ran out of reconnection attempts
	if (errorType === SOCKET_ERROR.NO_ATTEMPTS_LEFT) {
		store.commit('setConnectionStatus', 'disconnected');
	}
});

client.on('initial-state', data => {
	console.log('Received Initial State:', data);
	store.commit('fullUpdateMcState', data.state);
});

client.subscribe('update', data => {
	console.log('State Update:', data);
	store.commit('updateMcState', data.state);
});

export default {
	callAction(action, data) {
		console.log(`Calling action: ${action} with data:`, data);
		client.action(action, data);
	}
};
