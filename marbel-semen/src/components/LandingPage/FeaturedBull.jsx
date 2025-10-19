import BullAdd from '../../../src/assets/media/BullAdd.png'

export default function FeaturedBull() {
  return (
    <>
      <div className="container-fluid py-5 bg-dark text-white">
        <h1 className="fw-bold text-center">FEATURED BULLS</h1>
        <div className="row mt-5" style={{fontFamily:"Poppins"}}>
          <div className="col-md-6">
            <img
              src={BullAdd}
              alt=""
              className="img-fluid float-end rounded-4"
            />
          </div>
          <div className="col-md-6 mt-3 mt-lg-0">
            <h3 className="text-primary text-center">FWCF23U215L FLORIDA FW TOMU KUN S001 215L</h3>
            <p className="my-2">
              : FWCF23U215L FLORIDA FW TOMU KUN S001 215L (ET) Australian
              Registration: FWCF23U215L FLORIDA FW TOMU KUN S001 215L (ET)
              Notes: Here is the long awaited debut of the a special Bull in the
              USA with a BFI ! Meet FWCF23U215L Florida FW TOMU KUN 215L! A
              direct son of TAK MS SHIGESHIGETANI S001 who has produced many
              sale toppers and labeled herself as a standout donor in her own
              right. TOMO KUN is a top 1% EMA (+14.2) , top 1% MS (+3.7), top 1%
              MF (+.53), top 1% all indexes! These are the first 3 conventional
              straws to be offered, Straws are exportable to Canada , Australia
              and South America.
              <br />
              The buyer of these straws will have an immediate release available
              at Hawkeye breeders where the straws are stored.
              <br />
              If you have any questions please contact Joe Pettit at
              305-923-1730.
            </p>
            <div className="border mt-4 mx-auto border-2 p-3 w-75 btn btn-outline-light d-flex align-items-center justify-content-center">
              <span>FWCF23U215L FLORIDA FW TOMU KUN S001 215L</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-forward-fill mx-2"
                viewBox="0 0 16 16"
              >
                <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
