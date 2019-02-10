// Copyright (c) 2016-2018, Jan Cajthaml <jan.cajthaml@gmail.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { GraphQLScalarType, GraphQLError } = require("graphql")
const { Kind } = require("graphql/language")

const parse = require("../utils/parser")
const serialize = require("../utils/serializer")

/* -------------------------------------------------------------------------- */

/**
 * Definition for type Date
 */
const scalar = {
  name: "Date",
  description: "Date type",
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
