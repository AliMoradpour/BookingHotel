import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState } from "react";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 2,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onchange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go ?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023/06/23</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList handleOption={handleOption} options={options} />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

const GuestOptionList = ({ options, handleOption }) => {
  return (
    <div className="guestOptions">
      <OptionItem
        type="adult"
        options={options}
        minLimit={1}
        handleOption={handleOption}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit={0}
        handleOption={handleOption}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={1}
        handleOption={handleOption}
      />
    </div>
  );
};

const OptionItem = ({ type, options, minLimit, handleOption }) => {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOption(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}>
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOption(type, "inc")}
          className="optionCounterBtn">
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
};
