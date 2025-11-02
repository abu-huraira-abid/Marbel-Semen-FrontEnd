import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import { useLocation } from 'react-router-dom'
// import BullCard from './BullCard'
import AllStatsTable from './AllStatsTable'
// import RelatedBulls from './RelatedBulls'
import SemenCard from './SemenCard'
import RelatedSemens from './RelatedSemens'
// import EmbryoCard from './SemenCard'

export default function AddToCartSemen()
{
    const location = useLocation()
    const {id} = location.state || ""

    return(
        <>
        <NavBar />
        <SemenCard id={id} />
        <AllStatsTable />
        <RelatedSemens id={id} />
        <Footer />
        </>
    )
}