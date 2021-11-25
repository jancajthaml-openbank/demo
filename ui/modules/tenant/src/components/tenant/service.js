async function getTenantsPage(offset, limit) {
	const res = await fetch("/api/data-warehouse/graphql", {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `
	  			query GetTenants($limit: NaturalNumber!, $offset: NaturalNumber!) {
				  tenants(limit: $limit, offset: $offset) {
				    name
				  }
				}
	  		`,
			variables: {
				limit,
				offset,
			},
		}),
	});
	const data = await res.json();
	return data.data.tenants;
}

async function getTenants() {
	const result = [];
	const limit = 1000;
	let offset = 0;
	let page = [];
	do {
		page = await getTenantsPage(offset, limit);
		offset += limit;
		result.push(...page);
		if (page.length < limit) {
			break
		}
	} while (page.length > 0);
	return result.map((item) => item.name);
}

export { getTenants };