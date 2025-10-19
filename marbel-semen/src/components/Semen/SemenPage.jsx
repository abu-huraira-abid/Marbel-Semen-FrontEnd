import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import FirstCard from './FirstCard'
import MovingCards from './MovingCards'
import TableCards from './TableCard'
import GlobalReach from './GlobalReach'
import EducationalSection from './EducationalSection'
import FinalCTA from './FinalCTA'

export default function SemenPage()
{
    return(
        <>
        <NavBar />
        <FirstCard />
        <MovingCards />
        <TableCards />
        <EducationalSection />
        <GlobalReach />
        <FinalCTA />    
        <Footer />
        </>
    )
}