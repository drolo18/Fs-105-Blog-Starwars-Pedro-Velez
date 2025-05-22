import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [people, setPeople] = useState([])
	const [planets, setPlanets]=useState([])




	const getPeopleDetail = async (person) => {
		try {
			const response = await fetch(person.url)
			const data = await response.json()
			return { ...data.result.properties, uid: data.result.uid }
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
	const getPlanetsDetail = async (planet) => {
		try {
			const response = await fetch(planet.url)
			const data = await response.json()
			return { ...data.result.properties, uid: data.result.uid }
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
			<h1 className="text-center">Personajes</h1>
			<div className="carrousel">
				{people
				.filter(people=> people.uid)
				.map((person) => (
					<div key={person.uid} className="card" style={{ width: '18rem', minWidth: '18rem' }}>
						<img src="" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre: {person.name}</h5>
							<p className="card-text">Gender: {person.gender}</p>
							<p className="card-text">Hair-color: {person.hair_color}</p>
							<p className="card-text">Eye-color: {person.eye_color}</p>
							<div className="d-flex justify-content-between">
								<Link
                                    to={`/person/${person.uid}`}
                                    className="btn btn-outline-primary"
                                >
                                    Learn More!
                                </Link>
								<a href="" className="btn btn-outline-warning">&#9829;</a>
							</div>
						</div>
					</div>
				))}
			</div>
			<h1 className="text-center">Planetas</h1>
			<div className="carrousel">
				{planets
				.filter(planet => planet.uid)
				.map((planet) => (
					<div key={planet.uid} className="card" style={{ width: '18rem', minWidth: '18rem' }}>
						<img src="" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre: {planet.name}</h5>
							<p className="card-text">Climate: {planet.climate}</p>
							<p className="card-text">Diameter: {planet.diameter}</p>
							<p className="card-text">Gravity: {planet.gravity}</p>
							<div className="d-flex justify-content-between">
								 <Link
                                    to={`/planet/${planet.uid}`}
                                    className="btn btn-outline-primary"
                                >
                                    Learn More!
                                </Link>
								<a href="" className="btn btn-outline-warning">&#9829;</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
