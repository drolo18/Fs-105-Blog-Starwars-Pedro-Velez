import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { array } from "prop-types";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [people, setPeople] = useState([])
	const [planets, setPlanets]=useState([])
	const {person, favoritos} = store
	const [vehicles,setVehicles]= useState([])



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
			console.log(data)
			const peoples = await Promise.all(data.results.map(getPeopleDetail))
			setPeople(peoples)
			localStorage.setItem("people", JSON.stringify(peoples))
			dispatch({
				type: 'add_people',
				payload: data.results
			})
			

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
	const getVehicleDetail = async (vehicle) => {
		try {
			const response = await fetch(vehicle.url)
			const data = await response.json()
			
			return { ...data.result.properties, uid: data.result.uid }
		} catch (error) {
			console.log(error)
		}
	}

	const getVehicles = async () => {
		try {
			const vehiclesStorage = localStorage.getItem("vehicles")
			if(vehiclesStorage){
				setVehicles(JSON.parse(vehiclesStorage))
				return
			}
			const response = await fetch('https://www.swapi.tech/api/vehicles/')
			const data = await response.json()
			console.log(data)
			const vehicles = await Promise.all(data.results.map(getVehicleDetail))
			setVehicles(vehicles)
			localStorage.setItem("vehicles", JSON.stringify(vehicles))
		

		} catch (error) {
			console.log(error)
		}
	}

	const isFavorite =(item)=> { 
		const favoritos = Array.isArray(store.favoritos)?store.favoritos : []
		return favoritos.some(fav => fav && fav.data && fav.data.name === item.name && fav.data.uid === item.uid)
	}
	

	const HandleFavorite = (item) => {
		const isCurrentlyFavorite = isFavorite(item)
		if (isCurrentlyFavorite) {
			dispatch({
				type: 'remove_favorite',
				payload: {
					name: item.name,
					uid: item.uid
				}
			})
		} else {
			dispatch({
				type: 'add_favorite',
				payload: {
					data: {
						name: item.name,
						uid: item.uid,
						type: item
					}
				}
			})
		}
	}
	

	

	useEffect(() => {
		getPlanets()
		getPeople()
		getVehicles()
		
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
								<button onClick={() => HandleFavorite(person)} className="btn btn-outline-warning">&#9829;</button>
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
								<button onClick={() => HandleFavorite(planet)} className="btn btn-outline-warning">&#9829;</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<h1 className="text-center">Vehiculos</h1>
			<div className="carrousel">
				{vehicles
				.filter(vehicle=> vehicle.uid)
				.map((vehicle) => (
					<div key={vehicle.uid} className="card" style={{ width: '18rem', minWidth: '18rem' }}>
						<img src="" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre: {vehicle.name}</h5>
							<p className="card-text">Capacidad de Carga: {vehicle.cargo_capacity}</p>
							<p className="card-text">Consumibles: {vehicle.consumables}</p>
							<p className="card-text">Valor: {vehicle.cost_in_credits}</p>
							<div className="d-flex justify-content-between">
								<Link
                                    to={`/vehicles/${vehicle.uid}`}
                                    className="btn btn-outline-primary"
                                >
                                    Learn More!
                                </Link>
								<button onClick={() => HandleFavorite(vehicle)} className="btn btn-outline-warning">&#9829;</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
