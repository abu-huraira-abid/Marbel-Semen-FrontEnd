
export default function FirstCard()
{
    return(
        <>
        <div className="row gx-0">
            <div className="col-lg-6">
                <img src="https://copilot.microsoft.com/th/id/BCO.a35f685f-595a-498e-9f51-4733edd8cf83.png" alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center bg-light px-3 my-5 my-lg-0">
                <h1 className="text-center text-danger fw-bold" style={{fontFamily:"Syne"}}>Marblesemen.com</h1>
                <h3 className="text-center my-4" style={{fontFamily:"Poppins"}}>“The World’s Place for purchasing Top Ranked Genetically tested Wagyu Semen”</h3>
                <p className="text-center my-2 fs-5 " style={{fontFamily:"Poppins"}}>All the Sires that are on offer here, will appear both on a matrix that offers you an easily observed EBV value and accuracy data base as well as a link to their individual page. You can search and realign the sires in order of category or index trait by selecting the category title.</p>
            </div>
        </div>
        </>
    )
}