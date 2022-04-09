import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		web3: null,
		accounts: [],
		networkId: null,
		deployedNetwork: null,
		contract: null,
		posts: [],
		loading: false,
		loadingPosts: false,
	},
	reducers: {
		setWeb3: (state, action) => {
			return {
				...state,
				web3: action.payload.web3,
				accounts: action.payload.accounts,
				networkId: action.payload.networkId,
				deployedNetwork: action.payload.deployedNetwork,
				contract: action.payload.contract,
				loading: false,
			};
		},
		setPosts: (state, action) => {
			return {
				...state,
				posts: action.payload,
				loadingPosts: false,
			};
		},
		addPost: (state, action) => {
			return {
				...state,
				posts: [...state.posts, action.payload],
			};
		},
		setLoading: (state) => {
			return {
				...state,
				loading: true,
			};
		},
		setLoadingPosts: (state) => {
			return {
				...state,
				loadingPosts: true,
			};
		},
	},
});

export const { setWeb3, setPosts, addPost, setLoading, setLoadingPosts } = postSlice.actions;

export default postSlice;
