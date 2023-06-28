import { event } from '../utils';

export default event('ready', ({ log }, client) => {
	log(`Logged in as ${client.user.tag} and ready to play some beats!`);
});