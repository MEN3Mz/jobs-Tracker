import Wrapper from '../assets/wrappers/AiefApplyModal';

const AiefApplyModal = ({
  companyName,
  internshipTitle,
  contactEmail,
  website,
  howToApply,
  onClose,
  onSave,
  onOpenApplication,
  isSaving,
}) => {
  return (
    <Wrapper>
      <div className='overlay' onClick={onClose} />
      <div className='modal'>
        <button type='button' className='close-btn' onClick={onClose}>
          close
        </button>
        <p className='eyebrow'>Application popup</p>
        <h4>{internshipTitle}</h4>
        <p className='company'>{companyName}</p>
        <div className='details'>
          {contactEmail && (
            <p>
              <span>Contact:</span>{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          )}
          {website && (
            <p>
              <span>Website:</span>{' '}
              <a href={website} target='_blank' rel='noreferrer'>
                {website}
              </a>
            </p>
          )}
          {howToApply && (
            <p>
              <span>Instructions:</span> {howToApply}
            </p>
          )}
        </div>
        <div className='actions'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? 'saving...' : 'save to my jobs'}
          </button>
          <button type='button' className='btn' onClick={onOpenApplication}>
            open application
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AiefApplyModal;
