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
import { markOpportunitySaved } from '../features/aief/aiefSlice';
import customFetch from '../utils/axios';

const formatDate = (dateValue) => {
  if (!dateValue) return 'Not specified';
  return moment(dateValue).format('D/M/YYYY');
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

const buildOpportunityKey = (companyName = '', internshipTitle = '') =>
  `${companyName}::${internshipTitle}`;

const AiefOpportunity = ({
  _id,
  companyName,
  internshipTitle,
  location,
  workType,
  compensation,
  transportation,
  startDate,
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
  const { savedOpportunityIds, savedOpportunityKeys } = useSelector(
    (store) => store.aief
  );
  const contactEmail = extractEmail(howToApply);
  const isAdmin = user?.role === 'admin';
  const opportunityKey = buildOpportunityKey(companyName, internshipTitle);
  const isInMyJobs =
    savedOpportunityIds.includes(_id) ||
    savedOpportunityKeys.includes(opportunityKey);

  const saveToJobs = async () => {
    if (isInMyJobs) return;

    setIsSaving(true);
    try {
      await dispatch(
        createJob({
          position: internshipTitle,
          company: companyName,
          jobLocation: location || 'Cairo',
          jobType: mapWorkType(workType),
          status: "didn't apply yet",
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
          sourceOpportunityId: _id,
        })
      ).unwrap();
      dispatch(
        markOpportunitySaved({
          opportunityId: _id,
          opportunityKey,
        })
      );
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
            <JobInfo
              icon={<FaCalendarAlt />}
              text={`Deadline: ${formatDate(deadline)}`}
            />
          </div>
          <div className='meta'>
            <p>
              <span>Start at:</span> {formatDate(startDate)}
            </p>
            <p>
              <span>Deadline:</span> {formatDate(deadline)}
            </p>
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
          {isInMyJobs && <p className='saved-indicator'>Already in my jobs</p>}
          <footer>
            <button
              type='button'
              className='btn btn-track'
              onClick={saveToJobs}
              disabled={isSaving || isInMyJobs}
            >
              {isSaving
                ? 'saving...'
                : isInMyJobs
                  ? 'already in my jobs'
                  : 'move to my jobs'}
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
