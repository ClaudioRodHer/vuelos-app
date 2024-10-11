
const FlightDetails = ({flightData}) => {
    
    if (!flightData || !flightData.origin) return <p>No hay datos disponibles</p>;
  
    return (
      <div>
         <div className="flight-details">
      <h3>Datos de tu vuelo</h3>
      <div className="flight-info" key={flightData.id}>
        <div>
          <strong>Origen:</strong> {flightData.origin}
        </div>
        <div>
          <strong>Destino:</strong> {flightData.destination}
        </div>
        <div>
          <strong>Aerolínea:</strong> {flightData.airline}
        </div>
        <div>
          <strong>Número de vuelo:</strong> {flightData.flightNum}
        </div>
        {/* Aquí puedes agregar más detalles, como el clima, usando una API de clima */}
      </div>
        <p>Clima en {flightData.origin}: {flightData.weatherOrigin}</p>
        <p>Clima en {flightData.destination}: {flightData.weatherDestination}</p>
    
    </div>
         
      </div>
    );
  };
  
  export default FlightDetails;
  
  