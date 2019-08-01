import axios from 'axios';
import store from '@/store';

export default () => {
	return axios.create({
		baseURL: `http://localhost:3434/api/`,
		headers: {
			Authorization: `Bearer ${store.state.token}`,
		},
	});
};
