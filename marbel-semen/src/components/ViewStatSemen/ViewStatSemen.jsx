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
// import EmbryoCard from "./SemenCard";
// import RelatedEmbryos from "./RelatedSemens";
import SemenCard from "./SemenCard";
import RelatedSemens from "./RelatedSemens";

export default function ViewStatSemen()
{

    const location = useLocation()
    const {id} = location.state || ""

    return(
        <>
        <NavBar />
        <SemenCard id={id} />
        {/* <Description id={id} /> */}
        <EssentialStat />
        <GrowthStat />
        <CracussStat />
        <IndexesStat />
        <RelatedSemens id={id} />
        <Footer />
        </>
    )
}