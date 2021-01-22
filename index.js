const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const gql = require("graphql-tag");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// Some fake data
const books = [
  {
    id: "kf940",
    inStock: false,
    title: "The Vanishing Half",
    price: "$15.00",
    author: "Britt Benning",
    description:
      "An indelible tale of identity, family and home that centers around identical twin sisters and their daughters, all living vastly different lives",
    thumbnail:
      "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780525536291_p0_v10%5D&call=url%5Bfile:common/decodeProduct.chain%5D",
  },
  {
    id: "fj894",
    title: "A Promised Land",
    price: "$32.00",
    inStock: true,
    author: "Barack Obama",
    description:
      "In the stirring, highly anticipated first volume of his presidential memoirs, Barack Obama tells the story of his improbable odyssey...",
    thumbnail:
      "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9781524763169_p0_v2%5D&call=url%5Bfile:common/decodeProduct.chain%5D",
  },
  {
    id: "fk903",
    title: "Untamed",
    price: "$25.99",
    inStock: false,
    author: "Glennon Doyle",
    description:
      "More than just a memoir, this book takes the reader on a journey of self-discovery. It seeks to liberate women from the societal...",
    thumbnail:
      "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9781984801258_p0_v5%5D&call=url%5Bfile:common/decodeProduct.chain%5D",
  },
  {
    id: "so923",
    inStock: true,
    title: "Mexican Gothic",
    price: "$21.99",
    author: "Silvia Moreno-Garcia",
    description:
      "After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noemí Taboada heads to.",
    thumbnail:
      "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780525620785_p0_v3%5D&call=url%5Bfile:common/decodeProduct.chain%5D",
  },
];

const typeDefs = gql`
  type Query {
    books: [Book!]!
  }

  type Mutation {
    addBookToCart(bookId: String!): Book!
  }

  type Book {
    id: String!
    inStock: Boolean!
    title: String!
    author: String!
    thumbnail: String!
    description: String!
    price: String!
  }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use(cors());
app.options("*", cors());

// The GraphQL endpoint
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, introspection: true, playground: true })
);

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
