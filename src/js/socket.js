import io from 'socket.io-client';
import config from '@config';
import store from './store';

const socket = io(config.socketUrl);

store.commit('setConnectionStatus', 'connecting');

socket.on('connect', () => {
	store.commit('setConnectionStatus', 'connected');
	console.log('Connected to Mission Control.');

	socket.emit('subscribe', {
		event: 'update'
	});
});

socket.on('reconnecting', () =>
	store.commit('setConnectionStatus', 'connecting')
);

socket.on('reconnect_failed', () =>
	store.commit('setConnectionStatus', 'disconnected')
);

socket.on('disconnect', () => {
	console.log('Disconnected from Mission Control.');
	store.commit('setConnectionStatus', 'disconnected');
});

socket.on('initial-state', data => {
	console.log('Received Initial State:', data);
	store.commit('fullUpdateMcState', data.state);
});

socket.on('update', data => {
	console.log('State Update:', data);
	store.commit('updateMcState', data.state);
});

export default {
	callAction(action, data) {
		console.log(`Calling action: ${action} with data:`, data);
		socket.emit('action', { action, data });
	}
};
