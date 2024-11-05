import "./index.css";

function FilterButton({
  filterType,
  isActive,
  handleClick,
}: Readonly<{
  filterType: string;
  isActive: boolean;
  handleClick: () => void;
}>) {
  return (
    <button
      className={`filter__button ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {filterType}
    </button>
  );
}

export default FilterButton;
