const TrendUpI = ({ className, strokeWidth = 1.5 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="none"
    strokeWidth={strokeWidth}
    className={`size-5 ${className}`}
  >
    <path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"></path>
  </svg>
);
export default TrendUpI;
