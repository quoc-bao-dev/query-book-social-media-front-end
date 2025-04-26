const FilterOptions = ({
  onSortChange,
}: {
  onSortChange: (sortBy: string, order: string) => void;
}) => {
  return (
    <div className='flex flex-wrap gap-4 mt-4 p-4 bg-background rounded-xl shadow-md border border-gray-200'>
      {/* Bộ lọc theo ngày */}
      <div className='flex flex-col'>
        <label className='text-sm font-medium text-gray-700 mb-1'>
          Sort by Date
        </label>
        <select
          className='px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
          onChange={(e) => onSortChange('date', e.target.value)}
        >
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
        </select>
      </div>

      {/* Bộ lọc theo bảng chữ cái */}
      <div className='flex flex-col'>
        <label className='text-sm font-medium text-gray-700 mb-1'>
          Sort by Name
        </label>
        <select
          className='px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
          onChange={(e) => onSortChange('name', e.target.value)}
        >
          <option value='az'>A - Z</option>
          <option value='za'>Z - A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
