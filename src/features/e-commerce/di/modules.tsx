import { RemoteSource } from "../data/datasource/remote.datasource";
import { ProductRepositoryImpl } from "../data/repositories/product.repositories";
import { AddProduct, GetAllProducts, GetCategoryList, GetProduct, GetProductsByCategories, SearchProducts } from "@/features/e-commerce/domain/usecases/product.usecases";

const dataSource = new RemoteSource()

const productRepo = new ProductRepositoryImpl(dataSource)

const createProduct = new AddProduct(productRepo)

const findProduct = new GetProduct(productRepo)

const listAllProducts = new GetAllProducts(productRepo)

const searchForProducts = new SearchProducts(productRepo)

const fetchCatergories = new GetCategoryList(productRepo)

const fetchProductsByCategory = new GetProductsByCategories(productRepo)

export {createProduct, findProduct, listAllProducts, searchForProducts, fetchCatergories, fetchProductsByCategory}