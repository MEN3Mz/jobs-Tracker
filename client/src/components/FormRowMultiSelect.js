const formatOptionLabel = (value = '') =>
  value.replace(/\b([a-z])/g, (match) => match.toUpperCase());

const getOptionRank = (value = '') => {
  const normalizedValue = value.toLowerCase();

  if (normalizedValue === 'all') return 0;
  if (normalizedValue === 'a-z') return 1;
  if (normalizedValue === 'z-a') return 2;

  return 3;
};

const FormRowMultiSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  size = 6,
}) => {
  const sortedList = [...list].sort((a, b) => {
    const rankDifference = getOptionRank(a) - getOptionRank(b);

    if (rankDifference !== 0) return rankDifference;

    return formatOptionLabel(a).localeCompare(formatOptionLabel(b));
  });

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        multiple
        size={size}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-select form-multiselect'
      >
        {sortedList.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {formatOptionLabel(itemValue)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowMultiSelect;
