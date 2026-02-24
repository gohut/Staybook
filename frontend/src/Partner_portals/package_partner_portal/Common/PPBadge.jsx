import "./PPBadge.scss";

const PPBadge = ({ tone = "default", children }) => {
  return <span className={`pp-badge ${tone}`}>{children}</span>;
};

export default PPBadge;
