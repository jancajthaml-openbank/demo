

async function getAccountsPage(tenant, offset, limit) {
	const res = await fetch('/api/data-warehouse/graphql', {
	  method: 'post',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
	  	"query": `
	  		query GetAccounts($tenant: String!, $limit: Int!, $offset: Int!) {
			    accounts(tenant: $tenant, limit: $limit, offset: $offset) {
			      name
			      format
			      currency
			      balance
			    }
			}
	  	`,
	  	"variables": {
	  		limit,
	  		offset,
	  		tenant: 'demo',
	  	}
	  })
	})
	const data = await res.json()
	return data.data.accounts
}

async function getAccounts(tenant) {
	const result = []
	const limit = 1000
	let offset = 0
	let page = []
	do {
		page = await getAccountsPage(tenant, offset, limit)
		offset += limit
		result.push(...page)
	} while(page.length > 0)
	return result
}

export {
	getAccounts,
}
