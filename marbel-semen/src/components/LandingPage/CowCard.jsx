import BullImg from "../../assets/media/BullImg.png";

export default function CowCard() {
  return (
    <>
      <div className="container-fluid py-5" style={{backgroundColor:"lightGrey"}}>
        <div className="h2 text-center " style={{ fontFamily: "Syne" }}>
          The World’s Place For Purchasing Top Ranked Genetically Tested Wagyu
          Semen
        </div>
        <div className="row mx-4 mt-4">
          <div className="col-md-6 text-center">
            <img src={BullImg} alt="" width={"100%"} className="fluid-img rounded-4" />
          </div>
          <p className="col-md-6 fs-5 text-justify d-flex align-items-center mt-3 mt-lg-0" style={{fontFamily:"Poppins"}}>
            All the Sires that are on offer here, will appear both on a matrix
            that offers you an easily observed EBV value and accuracy data base
            as well as a link to their individual page. You can search and
            realign the sires in order of category or index trait by selecting
            the category title. 
            <br />
            <br />
            Each sire has a declaration as to which country
            his semen is available and located in. Many of the Sires are stored
            in multiple countries and as such are rapidly available to ship in
            many places throughout the World.
          </p>
        </div>
      </div>
    </>
  );
}
