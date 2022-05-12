const { ApolloServer, gql } = require('apollo-server');

//Scheme
// Define the query
const typeDefs = gql`

type Account{
    id:ID
    name:String
    email:String
    password:String
}

type Query{
    accounts:[Account]
    getAccount(name:String! , email:String!): Account

}

type Mutation {
    createAccount(name: String!,email: String!,password: String!): Account
  }
`
const accounts=[
    {id:'1', name:'name1', email:'email1@gmail.com', password:"password1"},
    {id:'2', name:'name2', email:'email2@gmail.com', password:"password2"}
]
//resolvers
const resolvers={
    Query:{
        accounts:()=>{
            return accounts;
        },

        getAccount(_,{name ,email}){
        return accounts.find(account => account.name === name &&  account.email === email);
        },

    },
    Mutation: {
        createAccount: (_, { name ,email, password }) => {
        accounts.push({ id: accounts.length + 1, name ,email, password });
          return [...accounts].pop();
        },
    }
}

const app = new ApolloServer({
    typeDefs,
    resolvers
});

app.listen(8000);