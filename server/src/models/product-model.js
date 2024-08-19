import {Schema, model} from 'mongoose'

const ProductSchema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	image: {type: String},
	isFavourite: {type: Boolean, default: false},
})

export default model("Product", ProductSchema);
