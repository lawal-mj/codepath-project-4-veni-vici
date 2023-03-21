export default function Mainpage(props) {
	return (
		<>
			<h1>Daily dose of Cats</h1>
			<p>{props.catData.name}</p>
			<div>
				{props.catData.url & (
					<div>
						<img src={props.catData.url} alt="" />
						<p>Name: {props.catData.name}</p>
						<p>Breed: {props.catData.breed}</p>
						<p>Origin: {props.catData.origin}</p>
						<p>Weight: {props.catData.weight}</p>
					</div>
				)}
			</div>
			<button>Next Cat</button>
		</>
	)
}
