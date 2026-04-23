import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow, FormRowSelect, FormRowTextArea } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import customFetch from '../../utils/axios';

const initialState = {
  companyName: '',
  industry: '',
  website: '',
  internshipTitle: '',
  department: '',
  jobDescription: '',
  qualifications: '',
  requiredMajor: '',
  targetGroup: '',
  workType: 'Internship',
  workDays: '',
  workHours: '',
  location: '',
  transportation: 'Not Mentioned',
  compensation: 'Not Mentioned',
  durationInWeeks: '',
  startDate: '',
  deadline: '',
  howToApply: '',
};

const parseList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const mapOpportunityToFormValues = (opportunity = {}) => ({
  companyName: opportunity.companyName || '',
  industry: opportunity.industry || '',
  website: opportunity.website || '',
  internshipTitle: opportunity.internshipTitle || '',
  department: opportunity.department?.join(', ') || '',
  jobDescription: opportunity.jobDescription || '',
  qualifications: opportunity.qualifications || '',
  requiredMajor: opportunity.requiredMajor?.join(', ') || '',
  targetGroup: opportunity.targetGroup?.join(', ') || '',
  workType: opportunity.workType || 'Internship',
  workDays: opportunity.workDays ?? '',
  workHours: opportunity.workHours ?? '',
  location: opportunity.location || '',
  transportation: opportunity.transportation || 'Not Mentioned',
  compensation: opportunity.compensation || 'Not Mentioned',
  durationInWeeks: opportunity.durationInWeeks ?? '',
  startDate: opportunity.startDate
    ? new Date(opportunity.startDate).toISOString().slice(0, 10)
    : '',
  deadline: opportunity.deadline
    ? new Date(opportunity.deadline).toISOString().slice(0, 10)
    : '',
  howToApply: opportunity.howToApply || '',
});

const CreateOpportunity = () => {
  const { id } = useParams();
  const [values, setValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(Boolean(id));
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (!isEditing) return;

    const loadOpportunity = async () => {
      try {
        const { data } = await customFetch.get(`/aief/${id}`);
        setValues(mapOpportunityToFormValues(data.job));
      } catch (error) {
        toast.error(
          error?.response?.data?.msg || 'Unable to load opportunity'
        );
        navigate('/opportunities');
      } finally {
        setIsFetching(false);
      }
    };

    loadOpportunity();
  }, [id, isEditing, navigate]);

  if (user?.role !== 'admin') {
    return <Navigate to='/opportunities' replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setValues(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.companyName || !values.internshipTitle || !values.workType) {
      toast.error('Please fill out company, title, and work type');
      return;
    }

    const payload = {
      companyName: values.companyName.trim(),
      industry: values.industry.trim(),
      website: values.website.trim(),
      internshipTitle: values.internshipTitle.trim(),
      department: parseList(values.department),
      jobDescription: values.jobDescription.trim(),
      qualifications: values.qualifications.trim(),
      requiredMajor: parseList(values.requiredMajor),
      targetGroup: parseList(values.targetGroup),
      workType: values.workType,
      workDays: Number(values.workDays) || 0,
      workHours: Number(values.workHours) || 0,
      location: values.location.trim(),
      transportation: values.transportation,
      compensation: values.compensation,
      durationInWeeks: Number(values.durationInWeeks) || 0,
      startDate: values.startDate || undefined,
      deadline: values.deadline || undefined,
      howToApply: values.howToApply.trim(),
    };

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await customFetch.patch(`/aief/${id}`, payload);
        toast.success('Opportunity updated');
      } else {
        await customFetch.post('/aief', payload);
        toast.success('Opportunity created');
      }
      navigate('/opportunities');
    } catch (error) {
      toast.error(
        error?.response?.data?.msg ||
          `Unable to ${isEditing ? 'update' : 'create'} opportunity`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return (
      <Wrapper>
        <div className='form'>
          <h3>loading opportunity...</h3>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit opportunity' : 'create opportunity'}</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='companyName'
            labelText='company name'
            value={values.companyName}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='internshipTitle'
            labelText='opportunity title'
            value={values.internshipTitle}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='industry'
            value={values.industry}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='website'
            value={values.website}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={values.location}
            handleChange={handleChange}
          />
          <FormRowSelect
            name='workType'
            labelText='work type'
            value={values.workType}
            handleChange={handleChange}
            list={['Internship', 'Full-Time', 'Part-Time', 'Remote']}
          />
          <FormRowSelect
            name='transportation'
            value={values.transportation}
            handleChange={handleChange}
            list={['Not Mentioned', 'Not Provided', 'Provided']}
          />
          <FormRowSelect
            name='compensation'
            value={values.compensation}
            handleChange={handleChange}
            list={['Not Mentioned', 'Not Specified', 'Paid', 'Unpaid']}
          />
          <FormRow
            type='number'
            name='workDays'
            labelText='work days'
            value={values.workDays}
            handleChange={handleChange}
          />
          <FormRow
            type='number'
            name='workHours'
            labelText='work hours'
            value={values.workHours}
            handleChange={handleChange}
          />
          <FormRow
            type='number'
            name='durationInWeeks'
            labelText='duration in weeks'
            value={values.durationInWeeks}
            handleChange={handleChange}
          />
          <FormRow
            type='date'
            name='startDate'
            labelText='start date'
            value={values.startDate}
            handleChange={handleChange}
          />
          <FormRow
            type='date'
            name='deadline'
            value={values.deadline}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='department'
            labelText='departments (comma separated)'
            value={values.department}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='requiredMajor'
            labelText='required majors (comma separated)'
            value={values.requiredMajor}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='targetGroup'
            labelText='target group (comma separated)'
            value={values.targetGroup}
            handleChange={handleChange}
          />
          <FormRowTextArea
            name='jobDescription'
            labelText='job description'
            value={values.jobDescription}
            handleChange={handleChange}
          />
          <FormRowTextArea
            name='qualifications'
            value={values.qualifications}
            handleChange={handleChange}
          />
          <FormRowTextArea
            name='howToApply'
            labelText='how to apply'
            value={values.howToApply}
            handleChange={handleChange}
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={clearForm}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? 'saving...'
                  : 'creating...'
                : isEditing
                  ? 'save opportunity'
                  : 'create opportunity'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateOpportunity;
