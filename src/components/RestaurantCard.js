import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, costForTwo, cloudinaryImageId, avgRating, locality } =
    resData?.info;
  return (
    <div className="res-card">
      <div className="res-logo-container">
        <img className="res-logo" src={CDN_URL + cloudinaryImageId} />
      </div>
      <div className="res-details-container">
        <h4>{name}</h4>
        <h6>{cuisines.join(", ")}</h6>
        <div className="rating">
          <h6>{avgRating} ⭐️</h6>
          <h6>{resData.info.sla.slaString}</h6>
          <h6>{costForTwo}</h6>
        </div>

        <h5>{locality}</h5>
      </div>
    </div>
  );
};

export default RestaurantCard;
