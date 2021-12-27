
const { GraphQLScalarType, GraphQLError } = require("graphql")
const { Kind } = require("graphql/language")

const parse = require("../utils/parser")
const serialize = require("../utils/serializer")

/* -------------------------------------------------------------------------- */

/**
 * Definition for type DateTime
 */
const scalar = {
  name: "DateTime",
  description: "DateTime type",
  parseValue(value) {
    return parse.dateFromString(value)
  },
  serialize(value) {
    return serialize.dateToString(value)
  },
  parseLiteral(ast) {
    if (!ast) {
      throw new GraphQLError(
        "Query error: Can only parse dates strings, got undefined",
        [],
      )
    }
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query error: Can only parse dates strings, got a: ${ast.kind}`,
        [ast],
      )
    }
    const expected = parse.dateFromString(ast.value)
    if (!expected) {
      throw new GraphQLError("Query error: not a valid date", [ast])
    }
    return expected
  },
}

/* -------------------------------------------------------------------------- */

module.exports = new GraphQLScalarType(scalar)

/* -------------------------------------------------------------------------- */
