import { useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";
import { format } from "date-fns";
import { createSearchParams, useNavigate } from "react-router-dom";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
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

  const navigate = useNavigate();

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString()
    })
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
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          <span className="seperator"></span>
          {openDate && (
            <DateRange
              ranges={date}
              className="date"
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              handleOption={handleOption}
              options={options}
              setOpenOptions={setOpenOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

const GuestOptionList = ({ options, handleOption, setOpenOptions }) => {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, "optionDropDown", () => {
    setOpenOptions(false);
  });
  return (
    <div className="guestOptions" ref={optionsRef}>
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
