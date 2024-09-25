import authReducer from "./reducers/authReducer"
import bannerReducer from "./reducers/bannerReducer"
import categoryReducer from "./reducers/categoryReducer"
import dashboardReducer from "./reducers/dashboardReducer"
import orderReducer from "./reducers/orderReducer"
import productReducer from "./reducers/productReducer"
import sellerReducer from "./reducers/sellerReducer"

const rootReducer = {
  auth: authReducer,
  banner: bannerReducer,
  category: categoryReducer,
  dashboard: dashboardReducer,
  order: orderReducer,
  product: productReducer,
  seller: sellerReducer,
}

export default rootReducer