import useFetch from "../../hooks/useFetch";

const LocationList = () => {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) <p>Loading ...</p>;

  return (
    <div className="nearbyLocation">
      <h2>Nearby locations</h2>
      <div className="locationList">
        {data.map((item) => (
          <div className="locationItem" key={item.key}>
            <img src={item.picture_url.url} alt={item.name} />
            <div className="locationItemDesc">
              <p className="locaiton">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price}&nbsp;
                <span></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
