const MASTER_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL;
const GetCategory=async()=>{
    const query=gql`
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
    `
    const result=await requestAnimationFrame(MASTER_URL,query)
}