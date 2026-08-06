import { cn } from "../../lib/utils";

// Mirrors the real table chrome (tableStyles.js): rounded-xl card, uppercase
// header band on --light-3, divider rows, px-4 rhythm — so the skeleton and
// the loaded table occupy the same box and nothing jumps on load.
const COLUMNS = ["w-20", "w-32", "w-24", "w-28", "w-20", "w-16"];

const TableSkeleton = ({ row = 8, headerClass = "h-10", rowClass = "h-12" }) => {
  const rowNumbers = Array.from({ length: row }, (_, index) => index + 1);

  return (
    <div className="w-full text-sm rounded-xl border border-solid border-[--border-1] bg-[--white-1] overflow-hidden fade">
      <div
        className={cn(
          "flex items-center gap-6 px-4 bg-[--light-3]",
          headerClass
        )}
      >
        {COLUMNS.map((width, i) => (
          <span
            key={i}
            className={cn("h-2.5 rounded-full bg-[--gr-5]/60", width)}
          />
        ))}
      </div>

      <div>
        {rowNumbers.map((i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-6 px-4 border-t border-solid border-[--border-1]",
              rowClass
            )}
          >
            {COLUMNS.map((width, j) => (
              <span
                key={j}
                className={cn("h-3 rounded-md bg-[--gr-5]/35", width)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
