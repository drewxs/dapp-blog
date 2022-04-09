import { setWeb3, setPosts, addPost, setLoading, setLoadingPosts } from 'redux/postSlice';
import PostListContract from 'contracts/PostList.json';
import getWeb3 from 'getWeb3';
import store from 'redux/store';

export const init = async () => {
	store.dispatch(setLoading());

	try {
		const web3 = await getWeb3();
		const accounts = await web3.eth.getAccounts();
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = PostListContract.networks[networkId];
		const contract = new web3.eth.Contract(PostListContract.abi, deployedNetwork && deployedNetwork.address);

		const res = {
			web3,
			accounts,
			networkId,
			deployedNetwork,
			contract,
		};

		store.dispatch(setWeb3(res));
	} catch (error) {
		console.log(error);
	}
};

export const fetchPosts = async () => {
	store.dispatch(setLoadingPosts());
	const { contract } = store.getState().post;

	try {
		const posts = await contract.methods.getPosts().call();
		console.log(posts);
		store.dispatch(setPosts(posts));
	} catch (error) {
		console.log(error);
	}
};

export const createPost = async (author, body) => {
	const { contract, accounts, posts } = store.getState().post;

	try {
		const post = await contract.methods.createPost(author, body).send({ from: accounts[0] });
		console.log(post);
		store.dispatch(addPost([`${posts.length + 1}`, author, body]));
	} catch (error) {
		console.log(error);
	}
};
