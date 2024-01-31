import { useState } from "react";
import resList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState(resList);
  return (
    <div className="res-container">
      <div className="filter">
        <button
          className="top-rated-btn"
          onClick={() => {
            let filteredList = resList.filter((res) => res.info.avgRating > 4);
            setRestaurantList(filteredList);
          }}
        >
          Top Rated Restaurant 🔥
        </button>
        <button
          className="fast-delivery-btn"
          onClick={() => {
            let filteredList = resList.filter(
              (res) => res.info.sla.deliveryTime < 20
            );
            setRestaurantList(filteredList);
          }}
        >
          Nearby Restaurant 🏍️
        </button>
      </div>
      <div className="card">
        {restaurantList?.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
