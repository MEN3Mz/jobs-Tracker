import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment';
import { deleteJob, setEditJob } from '../features/job/jobSlice';

const getStatusClassName = (status) => {
  return status
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-');
};

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
  industry,
  compensation,
  deadline,
  website,
  contactEmail,
  applicationInstructions,
  description,
  notes,
  requiredMajor,
  targetGroup,
  sourceType,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format('MMM Do, YYYY');
  const statusClassName = getStatusClassName(status);
  const deadlineText = deadline ? moment(deadline).format('MMM Do, YYYY') : null;

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
          {sourceType && <small className='source-tag'>{sourceType}</small>}
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          {compensation && (
            <JobInfo icon={<FaMoneyBillWave />} text={compensation} />
          )}
          <div className={`status ${statusClassName}`}>{status}</div>
        </div>
        <div className='details'>
          {industry && (
            <p>
              <span>Industry:</span> {industry}
            </p>
          )}
          {deadlineText && (
            <p>
              <span>Deadline:</span> {deadlineText}
            </p>
          )}
          {requiredMajor?.length > 0 && (
            <p>
              <span>Majors:</span> {requiredMajor.join(', ')}
            </p>
          )}
          {targetGroup?.length > 0 && (
            <p>
              <span>Target group:</span> {targetGroup.join(', ')}
            </p>
          )}
          {description && <p className='description'>{description}</p>}
          {notes && (
            <p className='notes'>
              <span>Notes:</span> {notes}
            </p>
          )}
          {applicationInstructions && (
            <p className='instructions'>
              <span>How to apply:</span> {applicationInstructions}
            </p>
          )}
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
                {website} <FaExternalLinkAlt />
              </a>
            </p>
          )}
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                    industry,
                    compensation,
                    deadline,
                    website,
                    contactEmail,
                    applicationInstructions,
                    description,
                    notes,
                    requiredMajor,
                    targetGroup,
                    sourceType,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
