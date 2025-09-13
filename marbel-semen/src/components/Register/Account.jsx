import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Login from "./Login";
import Register from "./Register";


export default function Account()
{
    return(
        <>
        <NavBar />
        <div className="container py-3 pt-5">
            <div className="row">
                <div className="col-md-6">
                   <Login /> 
                </div>
                <div className="col-md-6">
                    <Register />
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}