import { gql, request } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

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
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const AddToCart=async(data)=>{
  const query=gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+data?.email+`", price: `+data?.price+`, productDescription: "`+data?.discription+`", productImage: "`+data?.productImage+`", productName: "`+ data?.name+`"}
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
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}
export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  AddToCart,
  GetUserCart
};
