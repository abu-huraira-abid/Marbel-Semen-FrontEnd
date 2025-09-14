import SideBar from "../SideBar";
import BullData from "./BullData";


export default function BullView()
{
    return(
        <>
        <div className="row">
            <div className="col-3">
                <SideBar />
            </div>
            <div className="col-12 col-lg-9 p-5 p-lg-2">
                <BullData />
            </div>
        </div>
        </>
    )
}