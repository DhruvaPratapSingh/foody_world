
import { gql, request } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

console.log(MASTER_URL);
//  Used to make get Category API request 
//  @returns
const GetCategory = async () => {
  const query = gql`
    query Categories {
      categories(first: 50) {
        id
        slug
        name
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

//  Used to make get Business API request for a specific category
//  @returns
const GetBusiness = async (category) => {
  const query = gql`
  query GetBusiness {
    resaurants(where: {categories_some: {slug: "`+category+`"}}) {
      aboutUs
      address
      banner {
        url
      }
      categories {
        name
      }
      id
      name
      restroType
      slug
      workingHours
      review {
        star
      }
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusinessDetail=async(businessSlug)=>{
  const query=gql`
  query RestaurantDetails {
    resaurant(where: {slug: "`+businessSlug+`"}) {
      aboutUs
      address
      categories {
        name
      }
      id
      name
      restroType
      slug
      workingHours
      banner {
        url
      }
      menu {
        ... on Menu {
          id
          category
          menuitem {
            ... on MenuItem {
              id
              name
              price
              description
              productImage {
                url
              }
            }
          }
        }
      }
      review {
        star
      }
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const AddToCart=async(data)=>{
  const query=gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+data?.email+`", price: `+data?.price+`, productDescription: "`+data?.discription+`", productImage: "`+data?.productImage+`", productName: "`+ data?.name+`",restaurant: {connect: {slug: "`+data?.restaurantSlug+`"}}}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}
const GetUserCart=async(userEmail)=>{
  const query=gql`
  query GetUserCart {
    userCarts(where: {email: "`+userEmail+`"}) {
      id
      price
      productDescription
      productImage
      productName
      restaurant {
        name
        banner {
          url
        }
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}
const DisconnectRestaurantFromCartItem=async(id)=>{
  const query=gql`
  mutation DisconnectRestaurantFromCartItem {
    updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"}) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const DeleteItemCart=async(id)=>{
  const query=gql`
  mutation DeleteCartItem {
    deleteUserCart(where: {id: "`+id+`"}) {
      id
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}
const AddNewReview=async(data)=>{
  const query=gql`
  mutation AddNewReview {
    createReview(
      data: {email: "`+data?.email+`",
         profileImage: "`+data?.profileImage+`",
          reviewText: "`+data?.reviewText+`",
           star: `+data?.star+`,
            userName: "`+data?.userName+`",
            restaurant: {connect: {slug: "`+data?.RestroSlug+`"}}}
    ) {
      id
    }
    publishManyReviews(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getRestaurantReviews=async(slug)=>{
  const query=gql`
  query RestaurantReviews {
    reviews(where: {restaurant: {slug: "`+slug+`"}},orderBy: updatedAt_DESC) {
      userName
      id
      profileImage
      publishedAt
      reviewText
      star
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const CreateNewOrder=async(data)=>{
  const query=gql`
  mutation CreateNewOrder {
    createOrder(
      data: {email: "`+data?.email+`",
        orderAmount: `+data?.orderAmount+`,
        restaurantName: "`+data?.restaurantName+`",
        userName: "`+data?.userName+`",
        address: "`+data?.address+`",
        zipCode: "`+data?.zipCode+`",
        phone: "`+data?.phone+`"
      }
    ) {
      id
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const UpdateorderDetails=async({name,price,id,email})=>{
  const query=gql`
  mutation UpdateorderDetails {
    updateOrder(
      data: {orderDetail: {create: {OrderItem: {data: {name: "`+name+`", price: `+price+`}}}}}
      where: {id: "`+id+`"}
    ) {
      id
    }
    publishManyOrders(to: PUBLISHED) {
      count
    }
      deleteManyUserCarts(where: {email: "`+email+`"}) {
        count
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
}
// const  DeleteUserCartDetail=async()=>{
//   const query=gql`
//   mutation DeleteUserCart {
//     deleteManyUserCarts(where: {email: ""}) {
//       count
//     }
//   }`
//   const result = await request(MASTER_URL, query);
//   return result;
// }
export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  AddToCart,
  GetUserCart,
  DisconnectRestaurantFromCartItem,
  DeleteItemCart,
  AddNewReview,
  getRestaurantReviews,
  CreateNewOrder,
  UpdateorderDetails,
};
