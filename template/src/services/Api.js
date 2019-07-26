import axios from 'axios';
import store from '@/store';

export default () => {
	return axios.create({
		baseURL: `http://192.168.88.29:4000/api/`,
		headers: {
			Authorization: `Bearer ${store.state.token}`,
		},
	});
};
