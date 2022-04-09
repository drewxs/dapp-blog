import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { init, fetchPosts, createPost } from 'redux/post';
import { Box, Button, Card, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({ typography: { fontSize: 10 } });

export const App = () => {
	const contract = useSelector((state) => state.post.contract);
	const loading = useSelector((state) => state.post.loading);
	const loadingPosts = useSelector((state) => state.post.loadingPosts);
	const posts = useSelector((state) => state.post.posts);

	const [author, setAuthor] = useState('');
	const [body, setBody] = useState('');

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [loading, contract]);

	const handleCreatePost = async (e) => {
		e.preventDefault();

		if (!loading && contract.methods) {
			createPost(author, body);
			setAuthor('');
			setBody('');
		} else console.log('No create method found');
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				className='app'
				maxWidth='sm'
				sx={{
					fontSize: 3,
					padding: 4,
				}}
			>
				{loading ? (
					<CircularProgress />
				) : (
					<>
						<form onSubmit={handleCreatePost}>
							<Box>
								<TextField
									label='Author'
									variant='outlined'
									fullWidth
									value={author}
									onChange={(e) => setAuthor(e.target.value)}
									sx={{ marginBottom: 1 }}
								></TextField>
								<TextField
									label='Post'
									variant='outlined'
									multiline
									minRows={4}
									fullWidth
									value={body}
									onChange={(e) => setBody(e.target.value)}
									sx={{ marginBottom: 1 }}
								/>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									fullWidth
									sx={{ marginBottom: 2 }}
								>
									Post
								</Button>
							</Box>
						</form>
						{loadingPosts ? (
							<CircularProgress />
						) : (
							posts
								?.slice(0)
								.reverse()
								.map((post, key) => (
									<Card sx={{ padding: 2, marginBottom: 1 }} key={key}>
										<Typography variant='h6'>{post[1]}</Typography>
										<Typography variant='body1'>{post[2]}</Typography>
									</Card>
								))
						)}
					</>
				)}
			</Container>
		</ThemeProvider>
	);
};
