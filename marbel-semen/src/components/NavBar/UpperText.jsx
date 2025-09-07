
export default function UpperText() {
    return(
        <>
        <div className="container-fluid mx-0 d-none d-md-block">
                <div className="py-2 mx-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-lg-6" style={{ fontFamily: "Poppins" }}>
                            <p className="text-primary mt-1 text-center">
                                Top Ranked Genetically Tested Wagyu Semen
                            </p>
                        </div>
                        <div
                            className="col-lg-6 d-flex align-items-center justify-content-around text-primary"
                            style={{fontSize:"90%"}}
                        >
                            <div>
                                <i class="bi bi-telephone">305-923-1730</i>
                            </div>
                            <div>
                                <i class="bi bi-envelope-at">marblesemen@gmail.com</i>
                            </div>
                            <div>
                                <i class="bi bi-geo-alt-fill">
                                    1866 Omni Blvd. Mount Pleasant, SC 29466
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}