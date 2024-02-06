import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SWIGGY_API } from "../utils/constants";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

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
              console.log(filteredRestaurant);
              setFilteredRestaurant(filteredRestaurant);
            }}
          ></input>
        </div>
        <button
          className="top-rated-btn"
          onClick={() => {
            let filteredList = restaurantList.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant 🔥
        </button>
        <button
          className="fast-delivery-btn"
          onClick={() => {
            let filteredList = restaurantList.filter(
              (res) => res.info.sla.deliveryTime < 20
            );
            setFilteredRestaurant(filteredList);
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
