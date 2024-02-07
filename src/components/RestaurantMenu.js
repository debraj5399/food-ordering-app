import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../utils/cartSlice";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    const { id, name, price } = item.card.info; // Extract necessary data
    dispatch(addItem({ id, name, price })); // Pass only serializable data
  };

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
            <div key={item.card.info.id}>
              <div className="border border-gray m-3 p-2 flex justify-between rounded-lg cursor-pointer">
                <div className="text-sm mt-5">
                  <h2>
                    {item.card.info.name} - Rs.{item.card.info.price / 100}
                  </h2>
                </div>
                <button
                  className="border border-black m-2 p-2 bg-black text-white rounded-lg"
                  onClick={() => {
                    handleAddItem(item);
                  }}
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
