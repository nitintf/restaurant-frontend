export interface UserT {
	email: string
	name: string
	id?: string
	admin?: boolean
	password?: string
}

export interface RestaurantT {
	id?: string
	name: string
	address: string
	rating?: number
	createdAt?: string
	updatedAt?: string
	ratings?: RatingT[]
}

export interface RatingT {
	id?: string
	restaurantId?: string
	comment: string
	rating: number
	user?: UserT
	createdAt?: string
	updatedAt?: string
}
