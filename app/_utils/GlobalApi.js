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
}

export default {
  GetCategory
};
