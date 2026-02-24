import "./PPTable.scss";

const PPTable = ({ columns = [], rows = [], renderRow, emptyMessage }) => {
  if (!rows.length) {
    return <div className="pp-table-empty">{emptyMessage || "No records found."}</div>;
  }

  return (
    <div className="pp-table-wrapper">
      <table className="pp-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key || col.label} style={{ textAlign: col.align || "left" }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) =>
            renderRow ? (
              renderRow(row, index)
            ) : (
              <tr key={row.id || index}>
                {columns.map((col) => (
                  <td key={col.key || col.label} style={{ textAlign: col.align || "left" }}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PPTable;
