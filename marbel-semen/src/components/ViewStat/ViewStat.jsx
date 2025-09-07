import NavBar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";
import BullCard from "./BullCard";
import  Footer from "../Footer/Footer"
import Description from "./Description";
import EssentialStat from "./EssentailStats";
import GrowthStat from "./GrowthStat";
import CracussStat from "./CarcussStat";
import IndexesStat from "./IndexesStat";
import RelatedBulls from "./RelatedBulls";

export default function ViewStat()
{

    const location = useLocation()
    const {id} = location.state || ""

    return(
        <>
        <NavBar />
        <BullCard id={id} />
        <Description id={id} />
        <EssentialStat />
        <GrowthStat />
        <CracussStat />
        <IndexesStat />
        <RelatedBulls id={id} />
        <Footer />
        </>
    )
}