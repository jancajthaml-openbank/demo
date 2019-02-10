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

/* -------------------------------------------------------------------------- */

/**
 * Mongo search for multiple transfers
 *
 * @param {*} _
 * @param {object} params - query parameters
 * @param {object} context - execution context
 *
 * @returns {Promise} Promise object represents result of mongo search
 */
async function TransfersResolve(_, params, context) {
  /*
  const {
    tenant,
    credit,
    debit,
    status,
    currency,
    take,
    skip,
    sort_field,
    sort_order,
  } = params

  if (!tenant) {
    return []
  }

  const firstSliceCriteria = {
    tenant,
  }

  if (status) {
    firstSliceCriteria["status"] = status
  }

  if (currency) {
    firstSliceCriteria["currency"] = currency
  }

  const afterUnwindCriteria = {}

  if (credit) {
    afterUnwindCriteria["credit.name"] = credit
  }

  if (debit) {
    afterUnwindCriteria["debit.name"] = debit
  }

  const query = [
    { $match: firstSliceCriteria },
    { $lookup: {
      from: context.cfg.AccountCollectionName,
      localField: "credit",
      foreignField: "_id",
      as: "credit",
    }
    },
    { $unwind: "$credit" },
    { $lookup: {
      from: context.cfg.AccountCollectionName,
      localField: "debit",
      foreignField: "_id",
      as: "debit",
    }
    },
    { $unwind: "$debit" },
    { $match: afterUnwindCriteria },
  ]

  if (sort_field) {
    switch (sort_order) {
      case "ASC": {
        query.push({ [sort_field]: 1 })
        break
      }
      case "DESC": {
        query.push({ [sort_field]: -1 })
        break
      }
    }
  }

  if (skip > 0) {
    query.push({ $skip: skip })
  }

  if (take > 0) {
    query.push({ $limit: take })
  }

  // FIXME try without await
  return await context.mongo.db
    .collection(context.cfg.TransferCollectionName)
    .aggregate(query)
    .toArray()
  */

  return []
}

/**
 * Mongo search for multiple transfers base on transaction id
 *
 * @param {*} _
 * @param {object} params - query parameters
 * @param {object} context - execution context
 *
 * @returns {Promise} Promise object represents result of mongo search
 */
async function TransferResolve(_, params, context) {
  /*
  const { transaction, transfer, tenant } = params

  if (!transaction || !transfer || !tenant) {
    return null
  }

  const query = [
    { $match: {
      _id: `${tenant}/${transaction}/${transfer}`
    } },
    { $lookup: {
      from: context.cfg.AccountCollectionName,
      localField: "credit",
      foreignField: "_id",
      as: "credit",
    }
    },
    { $unwind: "$credit" },
    { $lookup: {
      from: context.cfg.AccountCollectionName,
      localField: "debit",
      foreignField: "_id",
      as: "debit",
    }
    },
    { $unwind: "$debit" },
    { $limit: 1 },
  ]

  // FIXME try without await
  const result = await context.mongo.db
    .collection(context.cfg.TransferCollectionName)
    .aggregate(query)
    .toArray()

  // FIXME better
  return result[0]
  */

  return null
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  Transfers: TransfersResolve,
  Transfer: TransferResolve,
})
