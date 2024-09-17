import Banner from '../components/Banner'
import Category from '../components/Category'
import Header from '../components/Header'
import FeatureProducts from '../components/products/FeatureProducts'

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Category />
      <div className="py-[45px]">
        <FeatureProducts />
      </div>
    </div>
  )
}

export default Home
