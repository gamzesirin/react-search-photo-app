import './App.css'

import { useEffect, useState } from 'react'

import Photo from './Photo'
import { createClient } from 'pexels'

function App() {
	const [photo, setphoto] = useState([])
	const [input, setinput] = useState('')
	const [pagenr, setpagenr] = useState(1)
	const [curated, setcurated] = useState(false)
	const client = createClient('gUJaGzO7xelNdtO9yLyKxwyd8BXtq6uiFwpumo2vyeoOcmrse5OMGJiF')
	useEffect(() => {
		const fetchData = async () => {
			const result = await client.photos.curated({
				per_page: 20,
				page: pagenr
			})
			setphoto(result.photos)
		}
		fetchData()
	}, [])
	const searchbyvalue = async () => {
		document.getElementById('a').click()
		setpagenr(1)
		setcurated(true)
		const query = input
		if (curated) {
			const result = await client.photos.search({
				query,
				per_page: 20,
				page: pagenr
			})
			setphoto(result.photos)
		} else {
			const result = await client.photos.curated({
				per_page: 20,
				page: pagenr
			})
			setphoto(result.photos)
		}
	}
	const increasepagenr = () => {
		document.getElementById('a').click()
		setpagenr((state) => state + 1)
		searchbybuttons() // Call searchbybuttons to trigger the search with the new page number
	}
	const decreasepagenr = () => {
		document.getElementById('a').click()
		setpagenr((state) => state - 1)
		searchbybuttons()
	}
	const searchbybuttons = async () => {
		const query = input
		if (curated) {
			const result = await client.photos.search({
				query,
				per_page: 20,
				page: pagenr
			})
			setphoto(result.photos)
		}
	}
	return (
		<div>
			<header>
				<p className="p">Search Find Photo</p>
				<input
					value={input}
					onChange={(e) => setinput(e.target.value)}
					type="text"
					placeholder="Search a Photo..."
				></input>
				<button disabled={!input} onClick={searchbyvalue}>
					Search
				</button>
			</header>
			<div className="photobody" id="photobody">
				<div className="right" onClick={increasepagenr}>
					{'>'}
				</div>
				<div className="left" onClick={decreasepagenr}>
					{'<'}
				</div>
				{photo?.map((item) => (
					<Photo key={item.id} src={item.src.medium} photographer={item.photographer} />
				))}
				<a href="#photobody" id="a"></a>
			</div>
		</div>
	)
}

export default App
