import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [people, setPeople] = useState([])
	const [planets, setPlanets]=useState([])




	const getPeopleDetail = async (people) => {
		try {
			const response = await fetch(people.url)
			const data = await response.json()
			return data.result.properties
		} catch (error) {
			console.log(error)
		}
	}

	const getPeople = async () => {
		try {
			const peoplesStorage = localStorage.getItem("people")
			if(peoplesStorage){
				setPeople(JSON.parse(peoplesStorage))
				return
			}
			const response = await fetch('https://www.swapi.tech/api/people/')
			const data = await response.json()
			const peoples = await Promise.all(data.results.map(getPeopleDetail))
			setPeople(peoples)
			localStorage.setItem("people", JSON.stringify(peoples))

		} catch (error) {
			console.log(error)
		}
	}
	const getPlanetsDetail = async (planets) => {
		try {
			const response = await fetch(planets.url)
			const data = await response.json()
			return data.result.properties
		} catch (error) {
			console.log(error)
		}
	}


	const getPlanets = async () => {
		try {
			const planetsStorage = localStorage.getItem("planets")
			if(planetsStorage){
				setPlanets(JSON.parse(planetsStorage))
				return
			}
			const response = await fetch('https://www.swapi.tech/api/planets/')
			const data = await response.json()
			const planets = await Promise.all(data.results.map(getPlanetsDetail))
			setPlanets(planets)
			localStorage.setItem("planets", JSON.stringify(planets))

		} catch (error) {
			console.log(error)
		}
	}



	useEffect(() => {
			getPlanets()
			getPeople()
		
	}, [])

	return (

		<>
			<div className="carrousel">
				{people.map((people) => (
					<div key={people.url} className="card" style={{ width: '18rem', minWidth: '18rem' }}>
						<img src="" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre: {people.name}</h5>
							<p className="card-text">Gender: {people.gender}</p>
							<p className="card-text">Hair-color: {people.hair_color}</p>
							<p className="card-text">Eye-color: {people.eye_color}</p>
							<div className="d-flex justify-content-between">
								<a href="#" className="btn btn-outline-primary">Learn More!</a>
								<a href="" className="btn btn-outline-warning">&#9829;</a>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="carrousel">
				{planets.map((planets) => (
					<div key={planets.url} className="card" style={{ width: '18rem', minWidth: '18rem' }}>
						<img src="" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre: {planets.name}</h5>
							<p className="card-text">Climate: {planets.climate}</p>
							<p className="card-text">Diameter: {planets.diameter}</p>
							<p className="card-text">Gravity: {planets.gravity}</p>
							<div className="d-flex justify-content-between">
								<a href="#" className="btn btn-outline-primary">Learn More!</a>
								<a href="" className="btn btn-outline-warning">&#9829;</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
