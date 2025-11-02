export default function GrowthStat() {
  const stats = [
    { label: "Gest. L.", value: -1.0, percent: "90%", color: "text-danger" },
    { label: "Birth Wt kg", value: -0.9, percent: "95%", color: "text-danger" },
    { label: "200 D Wt kg", value: 3, percent: "92%", color: "text-success" },
    { label: "400 D Wt kg", value: 4, percent: "93%", color: "text-success" },
    { label: "600 D Wt kg", value: 12, percent: "91%", color: "text-success" },
    { label: "Mat Cow Wt kg", value: 5.0, percent: "77%", color: "text-success" },
    { label: "Milk kg", value: -3, percent: "66%", color: "text-danger" },
    { label: "F1 Term. Idx", value: 509, color: "text-success" }
  ];

  return (
    <div className="container-fluid py-2 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Growth Statistics</h3>
        <div className="table-responsive">
          <table
            className="table table-bordered text-center"
            style={{ minWidth: "800px" }} // ensures table does not shrink below this width
          >
            <thead className="table-primary">
              <tr>
                {stats.map((stat, idx) => (
                  <th key={idx} style={{ minWidth: "100px" }}>{/* optional per column */} 
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
                    {stat.percent && (
                      <div className="small">{stat.percent}</div>
                    )}
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
