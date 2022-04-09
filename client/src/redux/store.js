import { configureStore } from '@reduxjs/toolkit';
import { postSlice } from 'redux/postSlice';

export default configureStore({
	reducer: {
		post: postSlice.reducer,
	},
});
