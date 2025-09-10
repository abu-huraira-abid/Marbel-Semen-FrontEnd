
export default function FirstCard()
{
    return(
        <>
        <div className="container-fluid bg-light">
            <div className="container py-4">
                <div className="row d-flex align-items-center">
                    <div className="col-lg-6 p-4">
                        <img src="https://copilot.microsoft.com/th/id/BCO.1e8f2daa-8d93-41bb-b6ca-a6919bab5f04.png" alt="" className="img-fluid rounded-4" />
                    </div>
                    <div className="col-lg-6 my-3 my-lg-0 text-center text-lg-start">
                        <h1 className="text-primary fw-bold" style={{fontFamily:"Syne"}}>BULL COMPARE</h1>
                        <p className="fs-5 fw-light" style={{fontFamily:"Poppins"}}>
                            “Welcome to our Bull Statistics Comparison page. Here you can explore and compare detailed genetic and performance traits of our sires side by side. Key measures such as gestation length, growth weights, carcass yield, fertility indicators, and marbling scores are presented in one view to help you make informed breeding decisions. The indexes included offer a quick benchmark, ensuring you can confidently select the bulls that best fit your herd goals.”
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}