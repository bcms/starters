import React, { useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import FormText from '@/components/form/Text';
import FormDropzone from '@/components/form/Dropzone';
import FormSelect from '@/components/form/Select';
import Btn from '@/components/Btn';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  ContactPageEntryMeta,
  PostJobPageEntry,
  PostJobPageEntryMeta,
} from '@/bcms/types';
import { JobPostPageData, PageProps } from '@/types';

interface PostJobPageProps extends PageProps<JobPostPageData> {
  page: {
    meta: ContactPageEntryMeta;
  };
}

const PostJobPage: React.FC<PostJobPageProps> = (props) => {
  const [activeStep, setActiveStep] = useState(1);
  const [stepOne, setStepOne] = useState({
    jobTitle: '',
    jobDescription: '',
    responsibility: '',
    jobDetails: '',
  });

  const [stepTwo, setStepTwo] = useState({
    companyName: '',
    companyLogo: undefined,
    companyWebsite: '',
  });

  const [contactPerson, setContactPerson] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [stepTwoCompanyAddress, setStepTwoCompanyAddress] = useState('');

  const [stepThree, setStepThree] = useState({
    jobType: '',
    minSalary: '',
    maxSalary: '',
    experienceLevel: '',
    education: '',
    requiredSkill: '',
    workScheduleDays: '',
    workScheduleHours: '',
  });

  const [stepFour, setStepFour] = useState({
    howToApply: '',
    whatToSubmit: '',
    howToSubmit: '',
    deadline: '',
    companyBenefit: '',
  });

  const handleInputChange = (name: string, value: string) => {
    switch (activeStep) {
      case 1:
        setStepOne((prev) => ({ ...prev, [name]: value }));
        break;
      case 2:
        setStepTwo((prev) => ({ ...prev, [name]: value }));
        break;
      case 3:
        setStepThree((prev) => ({ ...prev, [name]: value }));
        break;
      case 4:
        setStepFour((prev) => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
  };

  const handleContactPersonInputChange = (name: string, value: string) => {
    setContactPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    let errors = false;

    const checkStepErrors = (step: Record<string, string | undefined>) => {
      for (const key in step) {
        // eslint-disable-next-line no-prototype-builtins
        if (step.hasOwnProperty(key)) {
          if (step[key] === '' || step[key] === undefined) {
            errors = true;
            break;
          }
        }
      }
    };

    switch (activeStep) {
      case 1:
        checkStepErrors(stepOne);
        break;
      case 2:
        checkStepErrors(stepTwo);
        if (errors) {
          checkStepErrors(contactPerson);
          if (errors) {
            checkStepErrors({ companyAddress: stepTwoCompanyAddress });
          }
        }
        break;
      case 3:
        checkStepErrors(stepThree);
        break;
      case 4:
        checkStepErrors(stepFour);
        break;
      default:
        break;
    }

    if (!errors && activeStep !== 4) {
      setActiveStep(activeStep + 1);
      return;
    }

    // properly handle form submission here
  };

  return (
    <PageWrapper {...props}>
      <div className="pt-8 pb-14 md:pb-20 lg:pt-20 lg:pb-[120px]">
        <div className="container">
          <div className="max-w-[632px] mx-auto">
            <div className="grid grid-cols-1 gap-6 bg-[#E3E1DC] border border-[#B0AEAB] rounded-[14px] p-6 mb-6 lg:mb-10">
              <h1 className="sr-only">Post your job</h1>
              {activeStep === 1 && (
                <>
                  <FormText
                    value={stepOne.jobTitle}
                    label="Job title"
                    placeholder="Enter job title..."
                    name="jobTitle"
                    onChange={(value) => handleInputChange('jobTitle', value)}
                  />
                  <FormText
                    value={stepOne.jobDescription}
                    label="Job description"
                    placeholder="Enter job description..."
                    name="jobDescription"
                    onChange={(value) =>
                      handleInputChange('jobDescription', value)
                    }
                    type="textarea"
                  />
                  <FormText
                    value={stepOne.responsibility}
                    label="Responsibility"
                    placeholder="Enter job responsibility..."
                    name="responsibility"
                    onChange={(value) =>
                      handleInputChange('responsibility', value)
                    }
                    type="textarea"
                  />
                  <FormText
                    value={stepOne.jobDetails}
                    label="Job details"
                    placeholder="Enter job details..."
                    name="jobDetails"
                    onChange={(value) => handleInputChange('jobDetails', value)}
                    type="textarea"
                  />
                </>
              )}
              {activeStep === 2 && (
                <>
                  <FormText
                    value={stepTwo.companyName}
                    label="Company name"
                    placeholder="Enter your company name..."
                    name="companyName"
                    onChange={(value) =>
                      handleInputChange('companyName', value)
                    }
                  />
                  <FormDropzone
                    value={stepTwo.companyLogo}
                    label="Upload your company logo"
                    onFileUpload={(value) =>
                      handleInputChange(
                        'companyLogo',
                        value as unknown as string,
                      )
                    }
                  />
                  <FormText
                    value={stepTwo.companyWebsite}
                    label="Company website"
                    placeholder="Enter your company website or url..."
                    name="companyWebsite"
                    onChange={(value) =>
                      handleInputChange('companyWebsite', value)
                    }
                  />
                  <fieldset className="grid grid-cols-2 gap-x-2 items-end gap-y-4 lg:gap-x-3">
                    <FormText
                      value={contactPerson.fullName}
                      label="Contact person"
                      placeholder="Enter full name"
                      name="contactPerson.fullName"
                      onChange={(value) =>
                        handleContactPersonInputChange('fullName', value)
                      }
                    />
                    <FormText
                      value={contactPerson.email}
                      label="Email"
                      placeholder="Enter your email"
                      name="contactPerson.email"
                      onChange={(value) =>
                        handleContactPersonInputChange('email', value)
                      }
                      type="email"
                    />
                    <FormText
                      value={contactPerson.phoneNumber}
                      label="Phone number"
                      placeholder="Phone number"
                      name="contactPerson.phoneNumber"
                      onChange={(value) =>
                        handleContactPersonInputChange('phoneNumber', value)
                      }
                    />
                    <FormText
                      value={contactPerson.address}
                      label="Mailing address"
                      placeholder="Mailing address"
                      name="contactPerson.address"
                      onChange={(value) =>
                        handleContactPersonInputChange('address', value)
                      }
                    />
                  </fieldset>
                  <FormText
                    value={stepTwoCompanyAddress}
                    label="Company address"
                    placeholder="Enter your company address or location..."
                    name="companyAddress"
                    onChange={(value) => setStepTwoCompanyAddress(value)}
                  />
                </>
              )}
              {activeStep === 3 && (
                <>
                  <FormSelect
                    value={stepThree.jobType}
                    label="Job type"
                    placeholder="Job type"
                    options={['']}
                    name="jobType"
                    onChange={(value) => handleInputChange('jobType', value)}
                  />
                  <fieldset className="grid grid-cols-2 gap-2 items-end lg:gap-3">
                    <FormText
                      value={stepThree.minSalary}
                      label="Salary range"
                      placeholder="Min salary"
                      name="minSalary"
                      onChange={(value) =>
                        handleInputChange('minSalary', value)
                      }
                    />
                    <FormText
                      value={stepThree.maxSalary}
                      placeholder="Max salary"
                      name="maxSalary"
                      onChange={(value) =>
                        handleInputChange('maxSalary', value)
                      }
                    />
                  </fieldset>
                  <FormSelect
                    value={stepThree.experienceLevel}
                    label="Experience level"
                    placeholder="Level"
                    options={['']}
                    name="experienceLevel"
                    onChange={(value) =>
                      handleInputChange('experienceLevel', value)
                    }
                  />
                  <FormSelect
                    value={stepThree.education}
                    label="Education"
                    placeholder="Education"
                    options={['']}
                    name="education"
                    onChange={(value) => handleInputChange('education', value)}
                  />
                  <FormSelect
                    value={stepThree.requiredSkill}
                    label="Required skill"
                    placeholder="Skill"
                    options={['']}
                    name="requiredSkill"
                    onChange={(value) =>
                      handleInputChange('requiredSkill', value)
                    }
                  />
                  <fieldset className="grid grid-cols-2 gap-2 items-end lg:gap-3">
                    <FormText
                      value={stepThree.workScheduleDays}
                      label="Work schedule"
                      placeholder="Days"
                      name="workScheduleDays"
                      onChange={(value) =>
                        handleInputChange('workScheduleDays', value)
                      }
                    />
                    <FormText
                      value={stepThree.workScheduleHours}
                      placeholder="Hours"
                      name="workScheduleHours"
                      onChange={(value) =>
                        handleInputChange('workScheduleHours', value)
                      }
                    />
                  </fieldset>
                </>
              )}
              {activeStep === 4 && (
                <>
                  <FormText
                    value={stepFour.howToApply}
                    label="How to apply"
                    placeholder="Explain how to apply for this job..."
                    name="howToApply"
                    onChange={(value) => handleInputChange('howToApply', value)}
                    type="textarea"
                  />
                  <FormText
                    value={stepFour.whatToSubmit}
                    label="What to submit"
                    placeholder="What to submit"
                    name="whatToSubmit"
                    onChange={(value) =>
                      handleInputChange('whatToSubmit', value)
                    }
                  />
                  <FormText
                    value={stepFour.howToSubmit}
                    label="How to submit"
                    placeholder="Explain how to submit the attachment..."
                    name="howToSubmit"
                    onChange={(value) =>
                      handleInputChange('howToSubmit', value)
                    }
                    type="textarea"
                  />
                  <FormText
                    value={stepFour.deadline}
                    label="Deadline"
                    placeholder="DD/MM/YY"
                    name="deadline"
                    onChange={(value) => handleInputChange('deadline', value)}
                    type="date"
                  />
                  <FormText
                    value={stepFour.companyBenefit}
                    label="Company benefit"
                    placeholder="Enter company benefit..."
                    name="companyBenefit"
                    onChange={(value) =>
                      handleInputChange('companyBenefit', value)
                    }
                  />
                </>
              )}
              <Btn
                className="justify-center w-full lg:mt-4"
                onClick={handleNextStep}
              >
                <span>{activeStep === 4 ? 'Post your job' : 'Next'}</span>
              </Btn>
            </div>
            <div className="flex items-center gap-2.5 lg:gap-[22px]">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`flex flex-1 w-full h-1 rounded-[3px] transition-colors duration-300 ${
                    index <= activeStep ? 'bg-appAccent' : 'bg-[#BDBBB7]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<JobPostPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);
    const postJobPage = (await client.entry.get({
      template: 'post_job_page',
      entry: 'post-your-job',
    })) as PostJobPageEntry;

    if (!postJobPage) {
      throw new Error('Job post page entry does not exist.');
    }

    return {
      props: {
        header,
        footer,
        page: {
          meta: postJobPage.meta.en as PostJobPageEntryMeta,
        },
      },
    };
  } catch (error) {
    throw {
      statusCode: 500,
    };
  }
};

export default PostJobPage;
