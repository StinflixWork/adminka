export interface ISuppliers {
	fullName: string
	productCategory: string
	quantityProducts: number
	deliveryStatus: TypeSuppliersCode
}

type TypeSuppliersCode = 'processed' | 'on the way' | 'delivered'

// fake data
export const SUPPLIERS_DATA: ISuppliers[] = [
	{
		fullName: 'John Davis Haris',
		productCategory: 'drinks',
		quantityProducts: 344,
		deliveryStatus: 'delivered'
	},
	{
		fullName: 'Tom Holland',
		productCategory: 'snacks',
		quantityProducts: 122,
		deliveryStatus: 'on the way'
	},
	{
		fullName: 'Michael Brownie Jr.',
		productCategory: 'beer',
		quantityProducts: 43,
		deliveryStatus: 'processed'
	},
	{
		fullName: 'TenZ Sentinal',
		productCategory: 'drinks',
		quantityProducts: 66,
		deliveryStatus: 'delivered'
	},
	{
		fullName: 'Rocky Terry',
		productCategory: 'snacks',
		quantityProducts: 34342,
		deliveryStatus: 'on the way'
	},
	{
		fullName: 'Michael Brownie Jr.',
		productCategory: 'beer',
		quantityProducts: 43,
		deliveryStatus: 'processed'
	},
	{
		fullName: 'John Davis Haris',
		productCategory: 'drinks',
		quantityProducts: 344,
		deliveryStatus: 'delivered'
	},
	{
		fullName: 'Tom Holland',
		productCategory: 'snacks',
		quantityProducts: 122,
		deliveryStatus: 'on the way'
	},
	{
		fullName: 'Michael Brownie Jr.',
		productCategory: 'beer',
		quantityProducts: 43,
		deliveryStatus: 'processed'
	},
	{
		fullName: 'John Davis Haris',
		productCategory: 'drinks',
		quantityProducts: 344,
		deliveryStatus: 'delivered'
	},
	{
		fullName: 'Tom Holland',
		productCategory: 'snacks',
		quantityProducts: 122,
		deliveryStatus: 'on the way'
	},
	{
		fullName: 'Michael Brownie Jr.',
		productCategory: 'beer',
		quantityProducts: 43,
		deliveryStatus: 'processed'
	},
	{
		fullName: 'TenZ Sentinal',
		productCategory: 'drinks',
		quantityProducts: 622216,
		deliveryStatus: 'delivered'
	},
	{
		fullName: 'Rocky Terry',
		productCategory: 'snacks',
		quantityProducts: 21222,
		deliveryStatus: 'on the way'
	}
]
