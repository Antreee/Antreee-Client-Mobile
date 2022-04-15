import { gql } from '@apollo/client'

export const GET_RESTAURANTS = gql`
  query Restaurants {
    restaurants {
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
    }
  }
`

export const GET_RESTAURANT_BY_ID = gql`
  query Restaurant($id: ID!) {
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
    }
  }
`

export const ADD_TO_CART = gql`
  mutation Mutation(
    $customerName: String
    $customerPhoneNumber: String
    $tableNumber: String
    $totalPrice: Int
    $bookingDate: String
    $numberOfPeople: Int
  ) {
    createOrder(
      customerName: $customerName
      customerPhoneNumber: $customerPhoneNumber
      tableNumber: $tableNumber
      totalPrice: $totalPrice
      bookingDate: $bookingDate
      numberOfPeople: $numberOfPeople
    ) {
      message
    }
  }
`
