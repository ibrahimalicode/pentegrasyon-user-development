const DeleteLogsActions = ({
  isSelectMode,
  selectedCount,
  onToggleSelectMode,
  onDeleteSelected,
  onToggleDateDelete,
}) => {
  return (
    <div className="flex gap-2 max-sm:order-1">
      <button
        className="h-11 flex items-center justify-center text-[--white-1] bg-[--red-1] px-3 rounded-md text-sm font-normal border border-solid border-[--red-1] hover:opacity-90"
        onClick={onToggleSelectMode}
      >
        {isSelectMode ? "Toplu Silmeyi Kapat" : "Toplu Sil"}
      </button>

      {isSelectMode && (
        <button
          className="h-11 flex items-center justify-center text-[--white-1] bg-[--red-1] px-3 rounded-md text-sm font-normal border border-solid border-[--red-1] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          onClick={onDeleteSelected}
          disabled={selectedCount < 1}
        >
          Seçilenleri Sil ({selectedCount})
        </button>
      )}

      <button
        className="h-11 flex items-center justify-center text-[--white-1] bg-[--red-1] px-3 rounded-md text-sm font-normal border border-solid border-[--red-1] hover:opacity-90"
        onClick={onToggleDateDelete}
      >
        Tarihe Göre Sil
      </button>
    </div>
  );
};

export default DeleteLogsActions;
