import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import ConnectedCard from "./ConnectedCard";
import CowCard from "./CowCard";
import FeaturedBull from "./FeaturedBull";
import FirstCard from "./FirstCard";
import RecentlyAdded from "./RecentlyAdded";


export default function LandingPage()
{
    return(
        <>
        <NavBar />
        <FirstCard />
        <CowCard />
        <RecentlyAdded />
        <FeaturedBull />
        <ConnectedCard />
        <Footer />
        </>
    )
}