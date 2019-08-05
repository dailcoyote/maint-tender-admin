import axios from 'axios';
import store from '@/store';

export default () => {
	const serverURL = process.env.VUE_APP_ROOT_API;
	return axios.create({
		baseURL: `${serverURL}/api/`,
		headers: {
			Authorization: `Bearer ${store.state.token}`,
		},
	});
};