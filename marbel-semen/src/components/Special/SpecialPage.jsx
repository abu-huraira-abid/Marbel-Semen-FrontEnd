import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import FirstCard from './FirstCard'
import SecondCard from './SecondCard'
import ThirdCard from './ThirdCard'
import LimitedOffer from './LimitedOffer'
import BreederStories from './BreederStories'

export default function SpecialPage()
{
    return(
        <>
        <NavBar />
        <FirstCard />
        <SecondCard />
        <ThirdCard />
        <LimitedOffer />
        <BreederStories />
        <Footer />
        </>
    )
}