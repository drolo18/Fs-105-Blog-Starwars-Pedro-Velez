import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PersonDetail = () => {
  const { uid } = useParams();
  const [person, setPerson] = useState(null);
  

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch(`https://www.swapi.tech/api/people/${uid}`)
      const data = await response.json()
      setPerson(data.result.properties)
    }
    fetchPerson()
  }, [uid])

  if (!person) return <div>Cargando...</div>

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="card-title mb-3">{person.name}</h2>
              <p className="card-text text-muted">
                <em>Un personaje del universo de Star Wars.</em>
              </p>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Color de Ojos:</strong> {person.eye_color}
                </li>
                <li className="list-group-item">
                  <strong>Género:</strong> {person.gender}
                </li>
                <li className="list-group-item">
                  <strong>Color de Pelo:</strong> {person.hair_color}
                </li>
                <li className="list-group-item">
                  <strong>Altura:</strong> {person.height}
                </li>
                <li className="list-group-item">
                  <strong>Peso:</strong> {person.mass}
                </li>
                <li className="list-group-item">
                  <strong>Color de Pelo:</strong> {person.skin_color}
                </li>
                 <li className="list-group-item">
                  <strong>Año de Nacimiento:</strong> {person.birth_year}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;