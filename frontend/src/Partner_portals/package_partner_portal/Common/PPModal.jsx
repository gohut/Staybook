import "./PPModal.scss";
import { FiX } from "react-icons/fi";

const PPModal = ({ title, children, actions, onClose, variant = "center" }) => {
  return (
    <div className={`pp-modal-backdrop ${variant}`} onClick={onClose}>
      <div
        className={`pp-modal ${variant}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pp-modal-header">
          <h3>{title}</h3>
          <button type="button" className="pp-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="pp-modal-body">{children}</div>
        {actions && <div className="pp-modal-actions">{actions}</div>}
      </div>
    </div>
  );
};

export default PPModal;
