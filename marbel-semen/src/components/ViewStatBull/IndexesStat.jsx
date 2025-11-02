const stats = [
  { label: "Brd. Fdr. Idx", value: 658, color: "text-success" },
  { label: "FB Term. Idx", value: 509, color: "text-success" },
  { label: "F1 Term. Idx", value: 509, color: "text-success" }
];

export default function IndexesStat() {
  return (
    <div className="container-fluid py-2 pb-4 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Indexes Statistics</h3>
        <div className="table-responsive">
          <table
            className="table table-bordered text-center"
            style={{ minWidth: "400px" }} // keeps table wide enough for all 3 columns
          >
            <thead className="table-primary">
              <tr>
                {stats.map((stat, idx) => (
                  <th key={idx} style={{ minWidth: "120px" }}>
                    {stat.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {stats.map((stat, idx) => (
                  <td key={idx} className={stat.color}>
                    {stat.value > 0 ? `+${stat.value}` : stat.value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
