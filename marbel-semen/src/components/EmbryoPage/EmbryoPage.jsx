import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import FirstCard from "./FirstCard"
import SecondCard from "./SecondCard"
import ThirdCard from "./ThirdCard"
import TableCards from "./TableCards"
import FourthCard from "./FourthCard"

export default function EmbryoPage()
{
    return(
        <>
        <NavBar /> 
        <FirstCard />
        <SecondCard />
        <ThirdCard />
        <TableCards />
        <FourthCard />
        <Footer />
        </>
    )
}