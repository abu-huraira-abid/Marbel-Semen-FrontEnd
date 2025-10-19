import BullBatteryImage from "../../../src/assets/media/BullBattery.png"

export default function FirstCard()
{
    return(
        <>
        <div className="row gx-0 bg-light">
            <div className="col-lg-6">
          <div className="m-3 m-lg-5">
            <img
            src={BullBatteryImage}
            alt=""
            className="img-fluid rounded-4"
          />
          </div>
        </div>
            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center px-3 my-5 my-lg-0">
                <h1 className="fw-bold my-2 text-success" style={{fontFamily:"Syne"}}>Bull Battery</h1>
                <p className="my-3 fs-5 fw-light text-center" style={{fontFamily:"Poppins"}}>At MarbleSemen, our Bulls Collection showcases a carefully selected lineup of world-class Wagyu sires. Each bull is backed by comprehensive genetic data, including growth performance, carcass quality, and marbling indexes, giving breeders the insight they need to make confident decisions. Whether you’re looking for conventional or sexed semen, our platform makes it easy to compare sires, explore detailed traits, and order with flexible pricing options. With a focus on transparency and superior genetics, this page is designed to help you build stronger, more profitable herds.</p>
            </div>
        </div>
        </>
    )
}