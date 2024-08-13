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
      resaurants(where: { categories_some: { slug: "${category}" } }) {
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

export default {
  GetCategory,
  GetBusiness
};
