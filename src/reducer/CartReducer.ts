import { Product } from "@/app/utils/types";

export type CartProduct = Product & {
  orderSize: string;
};

export interface State {
  quantity: number;
  cartItems: number;
  cartProducts: CartProduct[];
  total: number;
}

export type ActionType =
  | "INCREASE_QUANTITY"
  | "DECREASE_QUANTITY"
  | "ADD_TO_CART"
  | "DELETE_FROM_CART"
  | "CALCULATE_TOTAL"
  | "INCREASE_FROM_CART"
  | "DECREASE_FROM_CART"
  | "CLEAR_CART";

export type ActionPayload = { items: number; product: CartProduct, totalAmount?: number };

export interface Action {
  type: ActionType;
  payload?: ActionPayload;
}

export const handleCartReducer = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case "ADD_TO_CART":
      return addToCart(state, action.payload!);

    case "INCREASE_QUANTITY":
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        quantity: Math.max(state.quantity - 1, 1),
      };

    case "DELETE_FROM_CART":
      const { payload } = action;
      const { product } = payload!;
      return {
        ...state,
        total: state.total - product.subTotal,
        cartItems: state.cartItems - product.quantity,
      };

    case "INCREASE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems + action.payload!.items!,
        total: state.total + action.payload!.product.price,
      };

    case "DECREASE_FROM_CART":
      return {
        ...state,
        cartItems: action.payload!.items,
        total: action.payload!.product.quantity > 1 ? state.total - action.payload!.product.price : state.total,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: 0,
        cartProducts: [],
        total: 0,
      }

    default:
      throw Error("Action not defined: " + action.type);
  }
};

const addToCart = (_state: State, _payload: ActionPayload) => {
  const { items, product } = _payload;
  const { cartItems, cartProducts, total } = _state;
  const productExistsInCart = cartProducts.some(
    (prod: CartProduct) =>
      prod._rev === product._rev && prod.orderSize === product.orderSize
  );

  if (productExistsInCart) {
    return {
      ..._state,
      cartItems: cartItems + items!,
      total: total + product.price * items!,
    };
  } else {
    // console.log("order_quantity from reducer: ", product.quantity);
    return {
      ..._state,
      cartItems: cartItems + items!,
      cartProducts: [...cartProducts, product],
      total: total + product.price * items!,
    };
  }
};
