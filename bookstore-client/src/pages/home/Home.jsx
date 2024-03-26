import React from 'react'
import Banner from '../../components/Banner'
import Catagories from './Catagories'
import PopularBooks from './PopularBooks'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import PromotionCountdown from '../../components/Promotion'

const Home = () => {
  return (
    <div>
      <Banner />
      <Catagories />
      <PopularBooks />
      <Testimonials />
      <OurServices />
      <PromotionCountdown />

    </div>
  )
}

export default Home