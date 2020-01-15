export function showCustomersRoute():string {
	return `/customers`;
}

export function addCustomerRoute(): string {
	return `/customers/create`;
}

export function editCustomerRoute(customerId: number): string {
	return `/customers/edit/${customerId}`;
}

/*

export function createAccountingDocumentRoute(
	type: ?AccountingDocumentAssignedType,
	direction: string,
	organizationID?: string,
) {
	return `/${

*/