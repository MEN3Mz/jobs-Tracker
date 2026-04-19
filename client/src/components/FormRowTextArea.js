const FormRowTextArea = ({
  name,
  value,
  handleChange,
  labelText,
  rows = 5,
  placeholder,
}) => {
  return (
    <div className='form-row form-row-textarea'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        className='form-textarea'
      />
    </div>
  );
};

export default FormRowTextArea;
