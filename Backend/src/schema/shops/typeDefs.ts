import { gql } from 'apollo-server-express'

const typeDef = gql`
  type Query {
   testShops: String
  }
`
export default typeDef
