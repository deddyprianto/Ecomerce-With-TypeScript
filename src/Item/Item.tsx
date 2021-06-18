import { Button } from "@material-ui/core";
import { Container } from "./Item.styles";
import { CartItemType } from "../App";

type Props = {
  item: CartItemType;
  handleAddToCart: (click: CartItemType) => void;
};
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Container>
    <img src={item.image} alt="" />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>{item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>
      Tambahkan ke keranjang Belanja
    </Button>
  </Container>
);
export default Item;
