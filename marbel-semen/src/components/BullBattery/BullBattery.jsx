import NavBar from '../NavBar/NavBar'
import FirstCard from './FirstCard'
import Footer from "../Footer/Footer"
import MovingCards from './MovingCards'
import "../../assets/styles/BullBattery.css"
import TableCards from './TableCards'
import Banner from './Banner'

export default function BullBattery()
{
    return(
        <>
        <NavBar />
        <FirstCard />
        <MovingCards />
        <TableCards />
        <Banner />
        <Footer />
        </>
    )
}