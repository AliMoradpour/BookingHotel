import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

const BookmarkLayout = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map />
    </div>
  );
};

export default BookmarkLayout;
