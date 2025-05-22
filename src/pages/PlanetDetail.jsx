import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PlanetDetail = () => {
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);
  

  useEffect(() => {
    const fetchPlanet = async () => {
      const response = await fetch(`https://www.swapi.tech/api/planets/${uid}`)
      const data = await response.json()
      setPlanet(data.result.properties)
    }
    fetchPlanet()
  }, [uid])

  if (!planet) return <div>Cargando...</div>

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="card-title mb-3">{planet.name}</h2>
              <p className="card-text text-muted">
                <em>Un planeta del universo de Star Wars.</em>
              </p>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Clima:</strong> {planet.climate}
                </li>
                <li className="list-group-item">
                  <strong>Diámetro:</strong> {planet.diameter} km
                </li>
                <li className="list-group-item">
                  <strong>Gravedad:</strong> {planet.gravity}
                </li>
                <li className="list-group-item">
                  <strong>Población:</strong> {planet.population}
                </li>
                <li className="list-group-item">
                  <strong>Terreno:</strong> {planet.terrain}
                </li>
                <li className="list-group-item">
                  <strong>Período orbital:</strong> {planet.orbital_period}
                </li>
                <li className="list-group-item">
                  <strong>Período de rotación:</strong> {planet.rotation_period}
                </li>
                <li className="list-group-item">
                  <strong>Superficie de agua:</strong> {planet.surface_water}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;