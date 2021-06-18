import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Container, StyledButton } from "./App.styles";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const App = () => {
  const [cartopen, setCartopen] = useState(false);
  const [cart, setCart] = useState([] as CartItemType[]);
  const getProduct = async (): Promise<CartItemType[]> =>
    await (await fetch("https://fakestoreapi.com/products")).json();
  //
  const { data, error, isLoading } = useQuery<CartItemType[]>(
    "products",
    getProduct
  );
  //
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCart((prev) => {
      const isItemIntheCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemIntheCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  //
  const getTotalItems = (item: CartItemType[]) =>
    item.reduce((acc: number, currItem) => acc + currItem.amount, 0);
  //
  // Penangana Tombol hapus Cart
  const handleRemoveCart = (id: number) => {
    setCart((prev) =>
      prev.reduce((acc, currItem) => {
        if (currItem.id === id) {
          if (currItem.amount === 1) return acc;
          return [...acc, { ...currItem, amount: currItem.amount - 1 }];
        } else {
          return [...acc, currItem];
        }
      }, [] as CartItemType[])
    );
  };
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Ada Sesuatu yg salah ...</div>;
  return (
    <Container>
      <Drawer anchor="right" open={cartopen} onClose={() => setCartopen(false)}>
        <Cart
          cartItem={cart}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartopen(true)}>
        <Badge badgeContent={getTotalItems(cart)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid key={item.id} item xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
