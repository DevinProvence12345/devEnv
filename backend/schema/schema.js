const graphql = require('graphql');
const Highschool = require('../models/highschool')
const User = require('../models/user');
const Whitelist = require('../models/whitelist');

const {
    GraphQLObjectType, 
    GraphQLString, 
    //GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    //GraphQLNonNull
} = graphql;

const WhitelistType = new GraphQLObjectType({
    name: 'Whitelist',
    fields: () => ({
        id: {type: GraphQLID},
        highschoolId: {type: GraphQLString}, 
        studentId: {type: GraphQLString}, 
        domain: {type: GraphQLString} 
    })
})

const HighschoolType = new GraphQLObjectType({
    name: 'Highschool',
    fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    users: {
        type: UserType,
        resolve(parent, args){
            return User.find({HighschoolId: parent.id});
        }
    }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
    id: {type: GraphQLID},
    googleId: {type: GraphQLString},
    placeId: {type: GraphQLString},
    highschool: {type: HighschoolType,
        resolve(parent, args){
            return Highschool.findById(parent.highschoolId)
        }
    }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        highschool: {
            type: HighschoolType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Highschool.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return User.findById(args.id);
                }
        },
        },
        highschools: {
            type: new GraphQLList(HighschoolType),
            resolve(parent, args){
                return Highschool.find({});
                }   
            }, 
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
                }   
            }
    });

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
            return author.save()
            }
        },
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
