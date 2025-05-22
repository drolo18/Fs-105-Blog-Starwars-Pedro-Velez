import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const [isOpen, setIsOpen] = useState(false)
	const { favoritos } = store

	const handleRemoveFavorite = (favorite) => {
		dispatch({
			type: 'remove_favorite',
			payload: {
				name: favorite.data.name,
				uid: favorite.data.uid
			}
		})
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
			<div className="container">
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpNUF0YeUA8O6Qj-tPH8WbjVoQ8aCGrI8DAA&s"
						alt="Star Wars Logo"
						width="40"
						height="40"
						className="d-inline-block align-top rounded-circle me-2"
					/>
					<span className="fw-bold fs-4">Star Wars Blog</span>
				</Link>
				<div className="dropdown">
					<button 
						className="btn btn-primary dropdown-toggle" 
						type="button" 
						onClick={() => setIsOpen(!isOpen)}
					>
						Favorites {favoritos?.length > 0 && `(${favoritos.length})`}
					</button>
					{isOpen && (
						<div className="dropdown-menu show">
							{favoritos?.length === 0 ? (
								<p className="text-center mb-0">No hay favoritos</p>
							) : (
								favoritos.map((fav, index) => (
									<div key={index} className="d-flex justify-content-between align-items-center mb-2">
										<span>{fav.data.name}</span>
										<button
											className="btn btn-sm btn-danger"
											onClick={() => handleRemoveFavorite(fav)}
										>
											🗑️
										</button>
									</div>
								))
							)}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};