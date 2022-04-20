import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query Restaurants($stringCoordinates: String, $search: String) {
    restaurants(stringCoordinates: $stringCoordinates, search: $search) {
      _id
      name
      logoUrl
      cuisine
      address
      contactNumber
      location {
        type
        coordinates
      }
      available
      capacity
      mainImagesUrl
      adminId
      restaurantDistance
    }
  }
`;

export const GET_RESTAURANT_BY_ID = gql`
  query Restaurant($id: ID!, $itemsByRestaurantIdId2: ID!) {
    restaurant(_id: $id) {
      _id
      name
      logoUrl
      cuisine
      address
      contactNumber
      location {
        type
        coordinates
      }
      available
      capacity
      mainImagesUrl
      adminId
      restaurantDistance
    }
    itemsByRestaurantId(_id: $itemsByRestaurantIdId2) {
      _id
      restaurantId
      name
      price
      categoryItem
      imageUrl
      description
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $customerName: String
    $customerEmail: String
    $customerPhoneNumber: String
    $tableNumber: String
    $totalPrice: Int
    $bookingDate: String
    $numberOfPeople: Int
    $restaurantId: String
    $orderDetails: OrderDetails
  ) {
    createOrder(
      customerName: $customerName
      customerEmail: $customerEmail
      customerPhoneNumber: $customerPhoneNumber
      tableNumber: $tableNumber
      totalPrice: $totalPrice
      bookingDate: $bookingDate
      numberOfPeople: $numberOfPeople
      restaurantId: $restaurantId
      orderDetails: $orderDetails
    ) {
      url
      orderId
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query OrderById($id: ID!) {
    orderById(_id: $id) {
      _id
      customerName
      customerPhoneNumber
      customerEmail
      tableNumber
      totalPrice
      bookingDate
      numberOfPeople
      restaurantId
      status
    }
  }
`;
