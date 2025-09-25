import SiteLinks from "./SiteLinks";
import "../../../src/assets/styles/Footer.css"
import Connect from "./Connect";
import FollowUs from "./FollowUs";
import Copyright from "./Copyright";


export default function Footer()
{
    return(
        <>
        <div className="container-fluid bg-light py-5">
            <div className="container">
                <div className="row">
                <div className="col-sm-6 col-md-3 text-center align-self-center">
                    <img src="https://www.marblesemen.com/wp-content/uploads/2021/05/marblesemenlogo-271x300.png" alt="" className="img-fluid w-50" />
                </div>
                <div className="col-sm-6 col-md-3">
                    <SiteLinks />
                </div>
                <div className="col-sm-6 col-md-3">
                    <Connect />
                </div>
                <div className="col-sm-6 col-md-3">
                    <FollowUs />
                </div>
            </div>
            </div>
            <div className="border container border-white-50"></div>
            <div className="container">
                <Copyright />
            </div>
        </div>
        </>
    )
}