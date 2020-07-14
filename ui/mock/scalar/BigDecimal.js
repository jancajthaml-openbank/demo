
const { GraphQLScalarType, GraphQLError } = require("graphql")
const { Kind } = require("graphql/language")

const parse = require("../utils/parser")
const serialize = require("../utils/serializer")

/* -------------------------------------------------------------------------- */

/**
 * Definition for type BigDecimal
 */
const scalar = {
  name: "BigDecimal",
  description: "BigDecimal type",
  parseValue(value) {
    return parse.decimalFromString(String(value))
  },
  serialize(value) {
    return Number(serialize.decimalToString(value))
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
        `Query error: Can only parse decimal strings, got a: ${ast.kind}`,
        [ast],
      )
    }
    const expected = parse.decimalFromString(String(ast.value))
    if (!expected) {
      throw new GraphQLError("Query error: not a valid decimal", [ast])
    }
    return expected
  },
}

/* -------------------------------------------------------------------------- */

module.exports = new GraphQLScalarType(scalar)

/* -------------------------------------------------------------------------- */
