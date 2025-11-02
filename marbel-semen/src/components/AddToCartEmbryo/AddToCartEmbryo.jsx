import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import { useLocation } from 'react-router-dom'
// import BullCard from './BullCard'
import AllStatsTable from './AllStatsTable'
import RelatedBulls from './RelatedBulls'
import EmbryoCard from './EmbryoCard'

export default function AddToCartEmbryo()
{
    const location = useLocation()
    const {id} = location.state || ""

    return(
        <>
        <NavBar />
        <EmbryoCard id={id} />
        <AllStatsTable />
        <RelatedBulls id={id} />
        <Footer />
        </>
    )
}