// Pulsing status dot. Colours come in as inline styles from the call site
// (marketplace / status hues), so only the geometry is defined here.
const CustomPing = ({ bgColor1, bgColor2, width, height }) => {
  return (
    <span className="relative flex h-2 w-2" style={{ width, height }}>
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--red-1] opacity-70"
        style={{ backgroundColor: bgColor1 }}
      ></span>
      <span
        className="relative inline-flex h-2 w-2 rounded-full bg-[--red-1]"
        style={{ width, height, backgroundColor: bgColor2 }}
      ></span>
    </span>
  );
};

export default CustomPing;
