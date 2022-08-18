const graphql = require("graphql");

const {GraphQLObjectType , GraphQLSchema , GraphQLString , GraphQLID , GraphQLInt , GraphQLList} = graphql ;

const movies = [
    {
      "id": 1,
      "name": "Carr Albert",
      "genre": "ut",
      "directorId": 1
    },
    {
      "id": 2,
      "name": "Bird Mitchell",
      "genre": "sunt",
      "directorId": 1
    },
    {
      "id": 3,
      "name": "Peters Serrano",
      "genre": "aliqua",
      "directorId": 1
    },
    {
      "id": 4,
      "name": "Munoz Lane",
      "genre": "nisi",
      "directorId": 4
    },
    {
      "id": 5,
      "name": "Beasley Logan",
      "genre": "mollit",
      "directorId": 5
    },
    {
      "id": 6,
      "name": "Nunez Lynch",
      "genre": "labore",
      "directorId": 6
    },
    {
      "id": 7,
      "name": "Vincent Hendricks",
      "genre": "laborum",
      "directorId": 7
    },
    {
      "id": 8,
      "name": "Landry Cantrell",
      "genre": "mollit",
      "directorId": 8
    },
    {
      "id": 9,
      "name": "Combs Mack",
      "genre": "veniam",
      "directorId": 9
    },
    {
      "id": 10,
      "name": "Collins Bradley",
      "genre": "excepteur",
      "directorId": 10
    }
  ]

const directors = [
    {
      "id": 1,
      "name": "Hudson Russo",
      "age": 95
    },
    {
      "id": 2,
      "name": "Bright Lambert",
      "age": 69
    },
    {
      "id": 3,
      "name": "Mccray Kelly",
      "age": 63
    },
    {
      "id": 4,
      "name": "Galloway Dejesus",
      "age": 99
    },
    {
      "id": 5,
      "name": "Pennington Avila",
      "age": 67
    },
    {
      "id": 6,
      "name": "Bray Stephenson",
      "age": 87
    },
    {
      "id": 7,
      "name": "Whitley Solis",
      "age": 41
    },
    {
      "id": 8,
      "name": "Fitzpatrick David",
      "age": 50
    },
    {
      "id": 9,
      "name": "Stout Odonnell",
      "age": 70
    },
    {
      "id": 10,
      "name": "Lee Caldwell",
      "age": 36
    }
]

const MovieType = new GraphQLObjectType({
    name: 'Movie' , 
    fields : () => ({
        id : { type: GraphQLID },
        name : { type: GraphQLString },
        genre : { type: GraphQLString },
        director : { type : DirectorType ,
            resolve(parent,args){
                return directors.find( director => director.id === parent.id )
            }
        }
    })
}) ;

const DirectorType = new GraphQLObjectType({
    name: "Director" ,
    fields: () => ({
        id: { type : GraphQLID   },
        name: { type : GraphQLString} ,
        age: { type : GraphQLInt   } ,
        movies: {
            type: new GraphQLList(MovieType) ,
            resolve(parent,args){
                return movies.filter( movie => movie.directorId === parent.id )
            }
        }
    })
})

const Query = new GraphQLObjectType({
    name : "Query",
    fields : {
        movie:{
            type : MovieType ,
        args : { id : { type : GraphQLID } } ,
        resolve(parent , args){
            return movies.find( movie => movie.id == args.id )
         }
        },
        director: {
            type: DirectorType ,
            args: { id : { type : GraphQLID } },
            resolve(parent,args){
                return directors.find( director => director.id == args.id )
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent,args){
                return movies
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent , args){
                return directors
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: Query
})