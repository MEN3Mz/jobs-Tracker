const CreditFooter = ({ className = '' }) => {
  const footerClassName = ['credit-footer', className].filter(Boolean).join(' ');

  return <footer className={footerClassName}>@2026 MEN3Mz</footer>;
};

export default CreditFooter;
