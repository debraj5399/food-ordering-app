import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SWIGGY_API_RESTAURANT } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const fetchRestaurantMenu = async () => {
    const response = await fetch(SWIGGY_API_RESTAURANT + resId);
    const data = await response.json();
    setResInfo(data.data);
  };

  useEffect(() => {
    fetchRestaurantMenu();
  }, []);
  if (resInfo === null) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
  } = resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  console.log(itemCards);

  return (
    <div className="restaurant-menu">
      <div className="restaurant-menu-heading">
        {/* <div> */}
        <div className="restaurant-menu-heading-name">
          <h3>{name}</h3>
          <h6>{cuisines.join(", ")}</h6>
        </div>
        <div className="restaurant-menu-heading-extra">
          <div>
            <h5>
              {avgRatingString}-{totalRatingsString}
            </h5>
            <h6>{costForTwoMessage}</h6>
          </div>

          {/* </div> */}
        </div>
      </div>
      <div className="restaurant-menu-body">
        <ul>
          {itemCards.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - Rs.{item.card.info.price / 100}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
