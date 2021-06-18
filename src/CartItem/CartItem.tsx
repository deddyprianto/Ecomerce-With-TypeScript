import { Button } from "@material-ui/core";
import { Container } from "./CartItem.style";
// type
import { CartItemType } from "../App";
type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};
const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Container>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: Rp{item.price}</p>
        <p>Total: Rp{(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="button">
        <Button
          onClick={() => removeFromCart(item.id)}
          size="small"
          disableElevation
          variant="contained"
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          onClick={() => addToCart(item)}
          size="small"
          disableElevation
          variant="contained"
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt="" />
  </Container>
);
export default CartItem;
