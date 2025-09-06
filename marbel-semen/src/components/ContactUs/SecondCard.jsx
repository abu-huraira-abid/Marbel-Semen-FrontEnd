

export default function SecondCard()
{
    return(
        <>
        <div className="row gx-0">
            <div className="col-lg-6">
          <div className="m-3 m-lg-5">
            <img
            src="https://copilot.microsoft.com/th/id/BCO.d0ceee66-65c1-4f2b-9696-c7423587deae.png"
            alt=""
            className="img-fluid rounded-4"
          />
          </div>
        </div>
            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center px-3 my-5 my-lg-0">
                <h1 className="text-center text-primary my-2 fw-bold" style={{fontFamily:"Syne"}}>Contact us</h1>
               <form action="" className="w-75">
                <div className="my-4">
                    <input type="text" name="name" id="name" placeholder="Name" className="form-control py-2 rounded-0" />
                </div>
                <div className="my-4">
                    <input type="email" name="email" id="email" placeholder="Email" className="form-control py-2 rounded-0" />
                </div>
                <div className="my-4">
                    <input type="text" name="number" id="number" placeholder="Phone number" className="form-control py-2 rounded-0" />
                </div>
                <div className="my-4">
                    <textarea name="mesasge" id="message" className="form-control rounded-0" placeholder="Message"></textarea>
                </div>
                <button className="btn btn-primary btn-lg mt-2 rounded-1">Submit</button>
               </form>
            </div>
        </div>
        </>
    )
}