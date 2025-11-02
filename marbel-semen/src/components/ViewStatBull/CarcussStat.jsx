const stats = [
  { label: "Carc. Wt kg", value: 18.0, percent: "82%", color: "text-success" },
  { label: "Eye Musc. A. sq cm", value: 12.5, percent: "74%", color: "text-success" },
  { label: "Rump Fat mm", value: 3.0, percent: "74%", color: "text-success" },
  { label: "Ret. Beef Yld %", value: -0.6, percent: "62%", color: "text-danger" },
  { label: "Marb. Score", value: 4.5, percent: "75%", color: "text-success" },
  { label: "Marb. Fine. Idx", value: 0.61, percent: "64%", color: "text-success" },
  { label: "F1 Term. Idx", value: 509, color: "text-success" }
];

export default function CracussStat() {
  return (
    <div className="container-fluid py-2 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Carcass Statistics</h3>
        <div className="table-responsive">
          <table
            className="table table-bordered text-center"
            style={{ minWidth: "900px" }} // ensures columns don’t shrink too much
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
