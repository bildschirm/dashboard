import io from 'socket.io-client';
import store from './store';

const socket = io('http://mat.local:3000');

socket.on('connect', () => {
	console.log('Connected to Mission Control.');

	socket.emit('subscribe', {
		event: 'update'
	});
});

socket.on('disconnect', () => {
	console.log('Disconnected to Mission Control.');
});

socket.on('initial-state', data => {
	console.log('GOT INITIAL STATE', data);
	store.commit('fullUpdateMcState', data.state);
});

socket.on('update', data => {
	console.log('RECEIVED FULL STATE UPDATE', data);
	store.commit('updateMcState', data.state);
});

export default {
	callAction(action, data) {
		console.log(`Calling action: ${action} with data:`, data);
		socket.emit('action', { action, data });
	}
};
