import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import BullCard from './BullCard'
import AllStatsTable from './AllStatsTable'
import RelatedBulls from './RelatedBulls'

export default function AddToCart()
{
    const location = useLocation()
    const {id} = location.state || ""

    return(
        <>
        <NavBar />
        <BullCard id={id} />
        <AllStatsTable />
        <RelatedBulls id={id} />
        <Footer />
        </>
    )
}