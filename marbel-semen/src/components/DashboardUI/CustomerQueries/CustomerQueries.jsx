import SideBar from "../SideBar";
import Queries from "./Queries";

export default function CustomerQueries()
{
    return(
        <>
        <div className="row">
            <div className="col-3">
                <SideBar />
            </div>
            <div className="col-12 col-lg-9 p-5 p-lg-2">
                <Queries />
            </div>
        </div>
        </>
    )
}