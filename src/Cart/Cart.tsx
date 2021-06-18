import CartItem from "../CartItem/CartItem";
// style
import { Container } from "./Cart.style";
// types
import { CartItemType } from "../App";
type Props = {
  cartItem: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItem, addToCart, removeFromCart }) => {
  return (
    <Container>
      <h2>Ini adalah Keranjang belanja anda</h2>
      {cartItem.length === 0 ? <p>Keranjang belanja anda Kosong</p> : null}
      {cartItem.map((item) => (
        <CartItem
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </Container>
  );
};
export default Cart;
