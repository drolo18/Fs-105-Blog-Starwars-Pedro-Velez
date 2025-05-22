import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VehiclesDetail = () => {
  const { uid } = useParams();
  const [vehicle, setVehicle] = useState(null);
  

  useEffect(() => {
    const fetchVehicle = async () => {
      const response = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`)
      const data = await response.json()
      setVehicle(data.result.properties)
    }
    fetchVehicle()
  }, [uid])

  if (!vehicle) return <div>Cargando...</div>

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="card-title mb-3">{vehicle.name}</h2>
              <p className="card-text text-muted">
                <em>Un Vehiculo del universo de Star Wars.</em>
              </p>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Capacidad de Carga:</strong> {vehicle.cargo_capacity}
                </li>
                <li className="list-group-item">
                  <strong>Consumibles:</strong> {vehicle.consumables}
                </li>
                <li className="list-group-item">
                  <strong>Valor:</strong> {vehicle.cost_in_credits}
                </li>
                <li className="list-group-item">
                  <strong>Tripulacion:</strong> {vehicle.crew}
                </li>
                <li className="list-group-item">
                  <strong>Tamaño:</strong> {vehicle.length}
                </li>
                <li className="list-group-item">
                  <strong>Fabricante:</strong> {vehicle.manufacturer}
                </li>
                 <li className="list-group-item">
                  <strong>Modelo:</strong> {vehicle.model}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesDetail;