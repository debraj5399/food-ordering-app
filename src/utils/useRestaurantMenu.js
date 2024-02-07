import { useEffect, useState } from "react";
import { SWIGGY_API_RESTAURANT } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  //   console.log("called 2");
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    // console.log("called");
    fetchRestaurantMenu();
  }, []);

  const fetchRestaurantMenu = async () => {
    const response = await fetch(SWIGGY_API_RESTAURANT + resId);
    const data = await response.json();
    setResInfo(data.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
