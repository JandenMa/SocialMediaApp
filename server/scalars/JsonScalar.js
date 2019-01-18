const { GraphQLScalarType, GraphQLError, Kind } = require('graphql');

const JsonScalar = new GraphQLScalarType({
    name: 'Json',
    description: 'Json Transfer',
    parseValue(value) {
        let json = JSON.parse(value);
        return json; // sent to the client
    },
    serialize(value) {
        return value; // sent to resolvers
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Query error: Can only parse Json strings, got a: ${ast.kind}`,
                [ast],
            );
        }
        try {
            let json = JSON.parse(ast.value);
            return json;
        } catch{
            return ast.value;
        }
    },
})

module.exports = JsonScalar;