import NavBar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";
// import BullCard from "./EmbryoCard";
import  Footer from "../Footer/Footer"
import Description from "./Description";
import EssentialStat from "./EssentailStats";
import GrowthStat from "./GrowthStat";
import CracussStat from "./CarcussStat";
import IndexesStat from "./IndexesStat";
// import RelatedBulls from "./RelatedBulls";
import EmbryoCard from "./EmbryoCard";
import RelatedEmbryos from "./RelatedEmbryos";

export default function ViewStatEmbryo()
{

    const location = useLocation()
    const {id} = location.state || ""

    return(
        <>
        <NavBar />
        <EmbryoCard id={id} />
        <Description id={id} />
        <EssentialStat />
        <GrowthStat />
        <CracussStat />
        <IndexesStat />
        <RelatedEmbryos id={id} />
        <Footer />
        </>
    )
}