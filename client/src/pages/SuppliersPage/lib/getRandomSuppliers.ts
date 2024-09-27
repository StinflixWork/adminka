import { faker } from '@faker-js/faker/locale/en'

const createRandomSupplier = () => {
	return {
		supplier: faker.person.fullName(),
		product: faker.commerce.productName(),
		quantity: faker.number.int({ min: 80, max: 450 }),
		price: faker.number.int({ min: 230, max: 1270, multipleOf: 10 }),
		status: faker.helpers.arrayElement(['processed', 'cancelled', 'ordered'])
	}
}

export const getRandomSuppliers = (count: number) =>
	faker.helpers.multiple(createRandomSupplier, {
		count
	})
