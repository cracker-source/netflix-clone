import React, { useState, useEffect } from 'react';
import './Row.css';
import axio from '../../axios';
import Youtube from 'react-youtube';
import axios from 'axios';

const baseUrl = 'https://image.tmdb.org/t/p/original';

const Row = ({ title, fetchUrl, isLarge }) => {
	const [ movies, setMovies ] = useState([]);
	const [ trailerUrl, setTrailerUrl ] = useState('');

	useEffect(
		() => {
			const fetchData = async () => {
				const request = await axio.get(fetchUrl);
				setMovies(request.data.results);
				return request;
			};

			fetchData();
		},
		[ fetchUrl ]
	);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1
		}
	};

	const API_KEY = 'AIzaSyAuv8TZGMU2vaLVSD1drFmkCeVMGeWsN0k';

	const handleClick = (movie) => {
		const fetchTrendingSongs = async () => {
			const request = await axios.get(
				`https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY} &q=${movie.name ||
					movie.title}`
			);
			const data = request.data.items;

			const videoId = data[0].id.videoId;
			setTrailerUrl(videoId);
		};
		fetchTrendingSongs();
	};

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => {
					return (
						<img
							onClick={() => handleClick(movie)}
							key={movie.id}
							className={`row__poster ${isLarge && 'row__posterLarge'}`}
							src={`${baseUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
							alt={movie.name}
						/>
					);
				})}
			</div>
			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
<<<<<<< HEAD
=======
			
>>>>>>> 4bf02b083819d80003dfc711a18f5b114d491cc3
		</div>
	);
};

export default Row;
