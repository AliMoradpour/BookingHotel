import { useHotels } from "../context/HotelsProvider";

const Map = () => {
  const { isLoading, hotels } = useHotels();
  return <div className="mapContainer">Map</div>;
};

export default Map;
