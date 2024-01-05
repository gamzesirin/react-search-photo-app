function Photo({ photographer, src }) {
	return (
		<div>
			<div className="pic">
				<a href={src}>
					<img src={src} alt="photo" />
				</a>
				<h1>
					Photo by <i>{photographer}</i>
				</h1>
			</div>
		</div>
	)
}

export default Photo
