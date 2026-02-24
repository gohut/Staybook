import "./PPCard.scss";

const PPCard = ({ title, subtitle, action, children, className = "" }) => {
  return (
    <div className={`pp-card ${className}`}>
      {(title || subtitle || action) && (
        <div className="pp-card-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action && <div className="pp-card-action">{action}</div>}
        </div>
      )}
      <div className="pp-card-body">{children}</div>
    </div>
  );
};

export default PPCard;
