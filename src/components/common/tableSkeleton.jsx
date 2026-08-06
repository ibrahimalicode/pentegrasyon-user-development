import { cn } from "../../lib/utils";

// Mirrors the real table chrome (tableStyles.js): 10px card, header band on
// the recessed --gr-4 plane, divider rows, px-3 rhythm — so the skeleton and
// the loaded table occupy the same box and nothing jumps on load.
//
// The shimmer runs on the blocks only, never on the container, so the card
// border stays steady while the content loads.
const DEFAULT_COLUMNS = ["w-20", "w-32", "w-24", "w-28", "w-20", "w-16"];

const TableSkeleton = ({
  row = 8,
  columns = DEFAULT_COLUMNS,
  headerClass = "h-[30px]",
  rowClass = "h-8",
}) => {
  const rowNumbers = Array.from({ length: row }, (_, index) => index + 1);
  const cols = columns?.length ? columns : DEFAULT_COLUMNS;

  return (
    <div className="w-full text-sm rounded-xl border border-solid border-[--border-1] bg-[--white-1] overflow-hidden">
      <div
        className={cn(
          "flex items-center gap-6 px-3 bg-[--light-3] border-b border-solid border-[--border-1]",
          headerClass
        )}
      >
        {cols.map((width, i) => (
          <span key={i} className={cn("h-2 rounded-sm shimmer", width)} />
        ))}
      </div>

      <div>
        {rowNumbers.map((i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-6 px-3 border-t border-solid border-[--border-1]",
              rowClass
            )}
          >
            {cols.map((width, j) => (
              <span key={j} className={cn("h-2.5 rounded-sm shimmer", width)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
