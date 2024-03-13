import React from 'react'
import Banner from '../../components/Banner'
import Catagories from './Catagories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import PromotionCountdown from '../../components/Promotion'

const Home = () => {
  return (
    <div>
      <Banner />
      <Catagories />
      <SpecialDishes />
      <Testimonials />
      <OurServices />
      <PromotionCountdown />

    </div>
  )
}

export default Home