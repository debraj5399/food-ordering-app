import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [topRated, setTopRated] = useState(false);
  const onlineStatus = useOnlineStatus();
  useEffect(() => {
    fetchData();
  }, []);

  if (!onlineStatus) {
    return <h1>User is offline</h1>;
  }
  const topRatedSelection = () => {
    setTopRated(!topRated);
    let filteredRestaurant = restaurantList;
    if (!topRated) {
      filteredRestaurant = restaurantList.filter(
        (res) => res.info.avgRating > 4
      );
    }

    setFilteredRestaurant(filteredRestaurant);
  };
  const fetchData = async () => {
    const response = await fetch(SWIGGY_API);
    const data = await response.json();
    setRestaurantList(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="res-container">
      <div className="filter">
        <div className="search">
          <input
            className="search-field"
            value={searchText}
            placeholder="Search 🔎"
            autoFocus
            onChange={(e) => {
              setSearchText(e.target.value);
              let filteredRestaurant = restaurantList.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          ></input>
        </div>
        <button
          className={!topRated ? "top-rated-btn" : "top-rated-btn-selected"}
          onClick={() => {
            topRatedSelection();
          }}
        >
          Top Rated Restaurant 🔥
        </button>
        <button
          className="fast-delivery-btn"
          onClick={() => {
            let filteredRestaurant = restaurantList.filter(
              (res) => res.info.sla.deliveryTime < 20
            );
            setFilteredRestaurant(filteredRestaurant);
          }}
        >
          Fast Delivery 🏍️
        </button>
      </div>
      <div className="card">
        {filteredRestaurant?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
