import {
  FaBriefcase,
  FaCalendarAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaLocationArrow,
  FaMoneyBillWave,
} from 'react-icons/fa';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/AiefOpportunity';
import JobInfo from './JobInfo';
import AiefApplyModal from './AiefApplyModal';
import { createJob } from '../features/job/jobSlice';

const formatDate = (dateValue) => {
  if (!dateValue) return 'Not specified';
  return moment(dateValue).format('MMM Do, YYYY');
};

const extractEmail = (value) => {
  const emailMatch = value?.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return emailMatch ? emailMatch[0] : '';
};

const mapWorkType = (value) => {
  const normalized = value?.toLowerCase();

  if (normalized === 'full-time') return 'full-time';
  if (normalized === 'part-time') return 'part-time';
  if (normalized === 'remote') return 'remote';

  return 'internship';
};

const AiefOpportunity = ({
  companyName,
  internshipTitle,
  location,
  workType,
  compensation,
  deadline,
  industry,
  requiredMajor,
  targetGroup,
  website,
  howToApply,
  jobDescription,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const contactEmail = extractEmail(howToApply);

  const saveToJobs = async () => {
    setIsSaving(true);
    try {
      await dispatch(
        createJob({
          position: internshipTitle,
          company: companyName,
          jobLocation: location || 'Cairo',
          jobType: mapWorkType(workType),
          status: "didn't yet",
          industry,
          compensation,
          deadline,
          website,
          contactEmail,
          applicationInstructions: howToApply || '',
          description: jobDescription || '',
          requiredMajor: requiredMajor || [],
          targetGroup: targetGroup || [],
          sourceType: 'AIEF',
          sourceOpportunityId: companyName + internshipTitle,
        })
      ).unwrap();
    } finally {
      setIsSaving(false);
    }
  };

  const openApplication = () => {
    const target = website || (contactEmail ? `mailto:${contactEmail}` : '');

    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>
        <header>
          <div className='main-icon'>{companyName?.charAt(0) || 'A'}</div>
          <div className='info'>
            <h5>{internshipTitle}</h5>
            <p>{companyName}</p>
          </div>
        </header>
        <div className='content'>
          <div className='content-center'>
            <JobInfo icon={<FaLocationArrow />} text={location || 'Flexible'} />
            <JobInfo icon={<FaBriefcase />} text={workType} />
            <JobInfo icon={<FaMoneyBillWave />} text={compensation} />
            <JobInfo icon={<FaCalendarAlt />} text={formatDate(deadline)} />
          </div>
          <div className='meta'>
            <p>
              <span>Industry:</span> {industry || 'Not specified'}
            </p>
            <p>
              <span>Majors:</span>{' '}
              {requiredMajor?.length ? requiredMajor.join(', ') : 'Open to all'}
            </p>
            <p>
              <span>Target group:</span>{' '}
              {targetGroup?.length ? targetGroup.join(', ') : 'Open to all'}
            </p>
            {contactEmail && (
              <p>
                <span>Contact:</span>{' '}
                <a href={`mailto:${contactEmail}`}>
                  <FaEnvelope /> {contactEmail}
                </a>
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
          </div>
          {jobDescription && <p className='description'>{jobDescription}</p>}
          <p className='how-to-apply'>
            <span>How to apply:</span> {howToApply || 'Check the company website'}
          </p>
          <footer>
            <button
              type='button'
              className='btn btn-track'
              onClick={saveToJobs}
              disabled={isSaving}
            >
              {isSaving ? 'saving...' : 'move to all jobs'}
            </button>
            <button
              type='button'
              className='btn apply-btn'
              onClick={() => setIsModalOpen(true)}
            >
              apply in popup <FaExternalLinkAlt />
            </button>
          </footer>
        </div>
      </Wrapper>
      {isModalOpen && (
        <AiefApplyModal
          companyName={companyName}
          internshipTitle={internshipTitle}
          contactEmail={contactEmail}
          website={website}
          howToApply={howToApply}
          onClose={() => setIsModalOpen(false)}
          onSave={saveToJobs}
          onOpenApplication={openApplication}
          isSaving={isSaving}
        />
      )}
    </>
  );
};

export default AiefOpportunity;
