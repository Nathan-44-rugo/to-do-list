import { CartDataSource } from '../data/datasource/cart.datasource'
import { CartRepositoryImpl } from '../data/repositories/cart.repositories'
import { GetCart, AddCart, UpdateCart, DeleteCart } from '../domain/usecases/cart.usecases'

const cartDataSource = new CartDataSource()
const cartRepo = new CartRepositoryImpl(cartDataSource)

const fetchCart = new GetCart(cartRepo)
const createCart = new AddCart(cartRepo)
const modifyCart = new UpdateCart(cartRepo)
const removeCart = new DeleteCart(cartRepo)

export { fetchCart, createCart, modifyCart, removeCart }
