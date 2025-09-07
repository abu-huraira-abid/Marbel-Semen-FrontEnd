export default function Description({id}) {

  const bulls = [
  {
    id: 1,
    name: "Champion Wagyu Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.80397891-1a9a-4ee1-9f7c-d4f304256098.png",
    breed: "Wagyu",
    description: "Superior marbling genetics with proven pedigree.",
  },
  {
    id: 2,
    name: "Elite Angus Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.c74f7f1f-481b-4292-a30a-f19de826e740.png",
    breed: "Angus",
    description: "High fertility rates and consistent performance.",
  },
  {
    id: 3,
    name: "Premium Sahiwal Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.fc49d174-2cba-4412-a939-1b06f993a1ba.png",
    breed: "Sahiwal",
    description: "Strong adaptability and reliable milk genetics.",
  },
  {
    id: 4,
    name: "Holstein Friesian",
    image:
      "https://copilot.microsoft.com/th/id/BCO.b8c124be-3d2a-4e62-a7f3-f913b679299f.png",
    breed: "Holstein",
    description: "Excellent milk yield and superior dairy genetics.",
  },
  {
    id: 5,
    name: "Red Sindhi Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.8a141874-674f-469b-99ad-475ec5dff4b8.png",
    breed: "Sindhi",
    description: "Renowned for resilience and fertility performance.",
  },
  {
    id: 6,
    name: "Brahman Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.bdf84f43-f3d8-4a29-8184-b1723e19d461.png",
    breed: "Brahman",
    description: "Heat-tolerant and resilient, ideal for tropical climates.",
  },
  {
    id: 7,
    name: "Charolais Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.6b25b2be-e826-44a1-9b30-b958cc8af722.png",
    breed: "Charolais",
    description: "Known for rapid growth, heavy muscling, and beef quality.",
  },
  {
    id: 8,
    name: "Hereford Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.016aa7b0-6c0a-4f6b-a1a1-322302845993.png",
    breed: "Hereford",
    description: "Hardy and adaptable with excellent meat yield.",
  },
  {
    id: 9,
    name: "Belgian Blue Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.c253a7cc-d7cd-48b0-9644-c9a38c2ccf23.png",
    breed: "Belgian Blue",
    description: "Famous for double-muscling and high lean meat percentage.",
  },
  {
    id: 10,
    name: "Nili-Ravi Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.1a276348-d565-4260-9808-49931878bae7.png",
    breed: "Nili-Ravi",
    description:
      "Renowned Pakistani breed for both milk and breeding strength.",
  },
];

  return (
    <div className="container-fluid py-5" style={{fontFamily:"Poppins"}}>
      <div className="container">
        {/* Heading */}
        <h2 className="text-center mb-4">{bulls[id-1].name} – Wyndford Itoguni 308H <span className="text-danger">(WYNFR308H)</span></h2>

        {/* Breed */}
        <p className="text-center fst-italic mb-4 fs-5"><strong className="text-success">Breed:</strong>{bulls[id-1].breed}</p>

        {/* Quick Highlights */}
        <div className="row mb-4">
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>#2 Marbling Sire</strong> (male with progeny) in the world
              </li>
              <li className="list-group-item">
                World-leading <strong>+4.8 Marble Score</strong> and <strong>+.64 Marble Fineness</strong>
              </li>
              <li className="list-group-item">
                70% of progeny in the <strong>top 10% for marbling</strong> (+2.5 or higher)
              </li>
              <li className="list-group-item">
                Top 1% on selection indexes: <strong>BFI (+$701), FTI ($542), F1TI ($542)</strong>
              </li>
              <li className="list-group-item">
                Proven progeny: <strong>17 offspring scoring 4.0+</strong>, highest +4.6
              </li>
              <li className="list-group-item">
                Strong sales record: female progeny sold for <strong>$50,000–$60,000</strong>
              </li>
              <li className="list-group-item">
                Hybrid genetics: perfect blend of <strong>USA & Australian bloodlines</strong>
              </li>
              <li className="list-group-item">
                Used in 27 top herds worldwide with <strong>242 progeny, 184 analyzed</strong>
              </li>
            </ul>
          </div>

          {/* Marketing Paragraph */}
          <div className="col-md-6 d-flex align-items-center py-3 py-lg-0">
            <p>
              Wyndford Itoguni 308H is a proven Wagyu breeding sire, combining exceptional marbling with impressive size. Trusted by leading herds worldwide—including Irongate, Booth Creek, Landgraf Ranch, and Nordik Wagyu—he is a key tool for introducing <strong>high marbling genetics</strong> into your herd. With top progeny performance and record-setting sales, Itoguni 308H delivers consistent quality and superior results.
            </p>
          </div>
        </div>

        {/* Callout / badges */}
        <div className="text-center mt-lg-4 mt-0 d-flex flex-column flex-lg-row justify-content-center">
          <span className="badge bg-primary mx-2 my-2 my-lg-0 p-2 rounded-0">Top Marbling Genetics</span>
          <span className="badge bg-success mx-2 my-2 my-lg-0 p-2 rounded-0">Proven Progeny</span>
          <span className="badge bg-warning text-dark mx-2 my-2 my-lg-0 p-2 rounded-0">Global Herd Use</span>
        </div>
      </div>
    </div>
  );
}
