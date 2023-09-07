import { FC } from 'react'
import { mainImage } from 'assets'

const Home: FC = () => {
  return (
    <>
      <img
        src={mainImage}
        style={{ objectFit: 'cover', width: '85vw', height: '550px' }}
        alt="main section imge"
      />
    </>
  )
}

export default Home
