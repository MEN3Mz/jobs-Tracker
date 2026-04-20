const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  readOnly = false,
  disabled = false,
  title = '',
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className={`form-input ${readOnly ? 'form-input-readonly' : ''}`.trim()}
        readOnly={readOnly}
        disabled={disabled}
        title={title}
      />
    </div>
  );
};
export default FormRow;
