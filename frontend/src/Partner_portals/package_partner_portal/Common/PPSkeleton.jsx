import "./PPSkeleton.scss";

const PPSkeleton = ({ rows = 3 }) => {
  return (
    <div className="pp-skeleton">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="pp-skeleton-row" />
      ))}
    </div>
  );
};

export default PPSkeleton;
