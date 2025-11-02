export default function EssentialStat() {
  const stats = [
    { label: "Gest. L.", value: -1.0, percent: "90%", color: "text-danger" },
    { label: "Birth Wt kg", value: -0.9, percent: "95%", color: "text-danger" },
    { label: "200 D Wt kg", value: 3, percent: "92%", color: "text-success" },
    { label: "Marb. Score", value: 4.5, percent: "75%", color: "text-success" },
    { label: "Brd. Fdr. Idx", value: 658, color: "text-success" },
    { label: "FB Term. Idx", value: 509, color: "text-success" },
    { label: "F1 Term. Idx", value: 509, color: "text-success" },
  ];

  return (
    <div className="container-fluid py-2 pt-4 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Essential Statistics</h3>
        <div className="table-responsive">
          <table
            className="table table-bordered text-center"
            style={{ minWidth: "800px" }} // prevents column wrapping
          >
            <thead className="table-primary">
              <tr>
                {stats.map((stat, idx) => (
                  <th key={idx} style={{ minWidth: "100px" }}>
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
                    {stat.percent && <div className="small">{stat.percent}</div>}
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
