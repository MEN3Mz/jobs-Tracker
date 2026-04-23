const FormRowMultiSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  size = 6,
}) => {
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
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowMultiSelect;
