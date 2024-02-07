import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const itemCards = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div>
      <div className="text-center m-2 p-2 text-2xl font-bold">Cart</div>
      <div className="restaurant-menu-body">
        <ul>
          <button
            className="border border-black m-2 p-2 bg-white text-black rounded-lg"
            onClick={() => handleClearCart()}
          >
            Clear Cart 🗑️
          </button>
          {itemCards.map((item) => (
            <div key={item.id}>
              <div className="border border-gray m-3 p-2 flex justify-between rounded-lg cursor-pointer">
                <div className="text-sm mt-5">
                  <h2>
                    {item.name} - Rs.{item.price / 100}
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

export default Cart;
