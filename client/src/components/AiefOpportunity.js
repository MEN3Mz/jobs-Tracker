import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaEnvelope,
  FaExternalLinkAlt,
  FaLocationArrow,
  FaMoneyBillWave,
  FaTrashAlt,
} from 'react-icons/fa';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/AiefOpportunity';
import JobInfo from './JobInfo';
import AiefApplyModal from './AiefApplyModal';
import { createJob } from '../features/job/jobSlice';
import customFetch from '../utils/axios';

const formatDate = (dateValue) => {
  if (!dateValue) return 'Not specified';
  return moment(dateValue).format('DD/MM/YYYY');
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
  _id,
  companyName,
  internshipTitle,
  location,
  workType,
  compensation,
  transportation,
  deadline,
  requiredMajor,
  targetGroup,
  website,
  howToApply,
  jobDescription,
  qualifications,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const contactEmail = extractEmail(howToApply);
  const isAdmin = user?.role === 'admin';

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
          compensation,
          transportation,
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

  const removeOpportunity = async () => {
    if (!_id || isRemoving) return;

    const confirmed = window.confirm(
      `Remove "${internshipTitle}" from opportunities?`
    );

    if (!confirmed) return;

    setIsRemoving(true);
    try {
      await customFetch.delete(`/aief/${_id}`);
      window.location.reload();
    } catch (error) {
      setIsRemoving(false);
      window.alert(
        error?.response?.data?.msg || 'Unable to remove opportunity'
      );
      return;
    }
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
              <span>Majors:</span>{' '}
              {requiredMajor?.length
                ? requiredMajor.join(', ')
                : 'Open to all GUC majors'}
            </p>
            <p>
              <span>Target group:</span>{' '}
              {targetGroup?.length ? targetGroup.join(', ') : 'Open to all'}
            </p>
            <p>
              <span>Transportation:</span> {transportation || 'Not specified'}
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
          {jobDescription && (
            <p className='description'>
              <span>Responsibilities:</span> {jobDescription}
            </p>
          )}
          {qualifications && (
            <p className='description'>
              <span>Qualifications:</span> {qualifications}
            </p>
          )}
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
              {isSaving ? 'saving...' : 'move to my jobs'}
            </button>
            <button
              type='button'
              className='btn apply-btn'
              onClick={() => setIsModalOpen(true)}
            >
              apply in popup <FaExternalLinkAlt />
            </button>
            {isAdmin && (
              <Link to={`/edit-opportunity/${_id}`} className='btn edit-opportunity-btn'>
                edit opportunity <FaEdit />
              </Link>
            )}
            {isAdmin && (
              <button
                type='button'
                className='btn remove-btn'
                onClick={removeOpportunity}
                disabled={isRemoving}
              >
                {isRemoving ? 'removing...' : 'remove opportunity'}{' '}
                <FaTrashAlt />
              </button>
            )}
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
