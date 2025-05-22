import { Link } from "react-router-dom";

export const Navbar = () => {
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
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Favorites</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};