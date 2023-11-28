import React, { useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import FormText from '@/components/form/Text';
import FormDropzone from '@/components/form/Dropzone';
import FormSelect from '@/components/form/Select';
import Btn from '@/components/Btn';
import {
  FooterEntryMeta,
  HeaderEntryMeta,
  PostJobPageEntryMeta,
} from '../../../bcms/types';
import { JobPostPageData, PageData } from '../../../types';
import { InputObject } from '@/composables/error';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { graphql } from 'gatsby';

interface PostJobPageProps extends PageData<JobPostPageData> {
  data: {
    header: {
      bcms: {
        meta: {
          en: HeaderEntryMeta;
        };
      };
    };
    footer: {
      bcms: {
        meta: {
          en: FooterEntryMeta;
        };
      };
    };
    page: {
      bcms: {
        meta: {
          en: PostJobPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
  };
}

const PostJobPage: React.FC<PostJobPageProps> = ({ data }) => {
  const [activeStep, setActiveStep] = useState(1);

  const [stepOne, setStepOne] = useState({
    jobTitle: {
      value: '',
      error: '',
    },
    jobDescription: {
      value: '',
      error: '',
    },
    responsibility: {
      value: '',
      error: '',
    },
    jobDetails: {
      value: '',
      error: '',
    },
  });

  const [stepTwo, setStepTwo] = useState({
    companyName: {
      value: '',
      error: '',
    },
    companyLogo: {
      value: undefined,
      error: '',
    },
    companyWebsite: {
      value: '',
      error: '',
    },
    fullName: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
    phoneNumber: {
      value: '',
      error: '',
    },
    companyAddress: {
      value: '',
      error: '',
    },
    mailingAddress: {
      value: '',
      error: '',
    },
  });

  const [stepThree, setStepThree] = useState({
    jobType: {
      value: '',
      error: '',
    },
    minSalary: {
      value: '',
      error: '',
    },
    maxSalary: {
      value: '',
      error: '',
    },
    experienceLevel: {
      value: '',
      error: '',
    },
    education: {
      value: '',
      error: '',
    },
    requiredSkill: {
      value: '',
      error: '',
    },
    workScheduleDays: {
      value: '',
      error: '',
    },
    workScheduleHours: {
      value: '',
      error: '',
    },
  });

  const [stepFour, setStepFour] = useState({
    howToApply: {
      value: '',
      error: '',
    },
    whatToSubmit: {
      value: '',
      error: '',
    },
    howToSubmit: {
      value: '',
      error: '',
    },
    deadline: {
      value: '',
      error: '',
    },
    companyBenefit: {
      value: '',
      error: '',
    },
  });

  const handleInputChange = (name: string, value: string) => {
    switch (activeStep) {
      case 1:
        setStepOne((prev) => ({
          ...prev,
          [name]: {
            value,
            error: '',
          },
        }));
        break;
      case 2:
        setStepTwo((prev) => ({
          ...prev,
          [name]: {
            value,
            error: '',
          },
        }));
        break;
      case 3:
        setStepThree((prev) => ({
          ...prev,
          [name]: {
            value,
            error: '',
          },
        }));
        break;
      case 4:
        setStepFour((prev) => ({
          ...prev,
          [name]: {
            value,
            error: '',
          },
        }));
        break;
      default:
        break;
    }
  };

  const checkForInputErrors = (
    inputs: {
      [key: string]: InputObject;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    let hasError = false;

    const newInputs = { ...inputs };

    Object.keys(newInputs).forEach((key) => {
      if (!inputs[key].value) {
        hasError = true;
        newInputs[key].error = 'This field is required.';
      } else {
        newInputs[key].error = '';
      }
    });

    setter(newInputs);

    return hasError;
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      const errors = checkForInputErrors(stepOne, setStepOne);

      if (!errors) {
        setActiveStep(2);
      }
    } else if (activeStep === 2) {
      const errors = checkForInputErrors(stepTwo, setStepTwo);

      if (!errors) {
        setActiveStep(3);
      }
    } else if (activeStep === 3) {
      const errors = checkForInputErrors(stepThree, setStepThree);

      if (!errors) {
        setActiveStep(4);
      }
    } else {
      const errors = checkForInputErrors(stepFour, setStepFour);

      if (!errors) {
        // TODO: Submit
      }
    }
  };

  return (
    <PageWrapper
      page={data.page}
      header={data.header}
      footer={data.footer}
      location={`/job/${data.page.bcms.meta.en.slug}`}
    >
      <div className="pt-8 pb-14 md:pb-20 lg:pt-20 lg:pb-[120px]">
        <div className="container">
          <div className="max-w-[632px] mx-auto">
            <div className="grid grid-cols-1 gap-6 bg-[#E3E1DC] border border-[#B0AEAB] rounded-[14px] p-6 mb-6 lg:mb-10">
              <h1 className="sr-only">Post your job</h1>
              {activeStep === 1 && (
                <>
                  <FormText
                    value={stepOne.jobTitle.value}
                    error={stepOne.jobTitle.error}
                    label="Job title"
                    placeholder="Enter job title..."
                    name="jobTitle"
                    onChange={(value) => handleInputChange('jobTitle', value)}
                  />
                  <FormText
                    value={stepOne.jobDescription.value}
                    error={stepOne.jobDescription.error}
                    label="Job description"
                    placeholder="Enter job description..."
                    name="jobDescription"
                    onChange={(value) =>
                      handleInputChange('jobDescription', value)
                    }
                    type="textarea"
                  />
                  <FormText
                    value={stepOne.responsibility.value}
                    error={stepOne.responsibility.error}
                    label="Responsibility"
                    placeholder="Enter job responsibility..."
                    name="responsibility"
                    onChange={(value) =>
                      handleInputChange('responsibility', value)
                    }
                    type="textarea"
                  />
                  <FormText
                    value={stepOne.jobDetails.value}
                    error={stepOne.jobDetails.error}
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
                    value={stepTwo.companyName.value}
                    error={stepTwo.companyName.error}
                    label="Company name"
                    placeholder="Enter your company name..."
                    name="companyName"
                    onChange={(value) =>
                      handleInputChange('companyName', value)
                    }
                  />
                  <FormDropzone
                    value={stepTwo.companyLogo.value}
                    error={stepTwo.companyLogo.error}
                    label="Upload your company logo"
                    onFileUpload={(value) =>
                      handleInputChange(
                        'companyLogo',
                        value as unknown as string,
                      )
                    }
                  />
                  <FormText
                    value={stepTwo.companyWebsite.value}
                    error={stepTwo.companyWebsite.error}
                    label="Company website"
                    placeholder="Enter your company website or url..."
                    name="companyWebsite"
                    onChange={(value) =>
                      handleInputChange('companyWebsite', value)
                    }
                  />
                  <fieldset className="grid grid-cols-2 gap-x-2 items-end gap-y-4 lg:gap-x-3">
                    <FormText
                      value={stepTwo.fullName.value}
                      error={stepTwo.fullName.error}
                      label="Contact person"
                      placeholder="Enter full name"
                      name="contactPerson.fullName"
                      onChange={(value) => handleInputChange('fullName', value)}
                    />
                    <FormText
                      value={stepTwo.email.value}
                      error={stepTwo.email.error}
                      label="Email"
                      placeholder="Enter your email"
                      name="contactPerson.email"
                      onChange={(value) => handleInputChange('email', value)}
                      type="email"
                    />
                    <FormText
                      value={stepTwo.phoneNumber.value}
                      error={stepTwo.phoneNumber.error}
                      label="Phone number"
                      placeholder="Phone number"
                      name="contactPerson.phoneNumber"
                      onChange={(value) =>
                        handleInputChange('phoneNumber', value)
                      }
                    />
                    <FormText
                      value={stepTwo.mailingAddress.value}
                      error={stepTwo.mailingAddress.error}
                      label="Mailing address"
                      placeholder="Mailing address"
                      name="contactPerson.address"
                      onChange={(value) =>
                        handleInputChange('mailingAddress', value)
                      }
                    />
                  </fieldset>
                  <FormText
                    value={stepTwo.companyAddress.value}
                    error={stepTwo.companyAddress.error}
                    label="Company address"
                    placeholder="Enter your company address or location..."
                    name="companyAddress"
                    onChange={(value) =>
                      handleInputChange('companyAddress', value)
                    }
                  />
                </>
              )}
              {activeStep === 3 && (
                <>
                  <FormSelect
                    value={stepThree.jobType.value}
                    error={stepThree.jobType.error}
                    label="Job type"
                    placeholder="Job type"
                    options={['Full-time', 'Part-time', 'Freelance']}
                    name="jobType"
                    onChange={(value) => handleInputChange('jobType', value)}
                  />
                  <fieldset className="grid grid-cols-2 gap-2 items-end lg:gap-3">
                    <FormText
                      value={stepThree.minSalary.value}
                      error={stepThree.minSalary.error}
                      label="Salary range"
                      placeholder="Min salary"
                      name="minSalary"
                      onChange={(value) =>
                        handleInputChange('minSalary', value)
                      }
                    />
                    <FormText
                      value={stepThree.maxSalary.value}
                      error={stepThree.maxSalary.error}
                      placeholder="Max salary"
                      name="maxSalary"
                      onChange={(value) =>
                        handleInputChange('maxSalary', value)
                      }
                    />
                  </fieldset>
                  <FormSelect
                    value={stepThree.experienceLevel.value}
                    error={stepThree.experienceLevel.error}
                    label="Experience level"
                    placeholder="Level"
                    options={['Entry', 'Mid', 'Senior']}
                    name="experienceLevel"
                    onChange={(value) =>
                      handleInputChange('experienceLevel', value)
                    }
                  />
                  <FormSelect
                    value={stepThree.education.value}
                    error={stepThree.education.error}
                    label="Education"
                    placeholder="Education"
                    options={['High School', "Bachelor's", "Master's"]}
                    name="education"
                    onChange={(value) => handleInputChange('education', value)}
                  />
                  <FormSelect
                    value={stepThree.requiredSkill.value}
                    error={stepThree.requiredSkill.error}
                    label="Required skill"
                    placeholder="Skill"
                    options={[
                      'Programming',
                      'Data Analysis',
                      'Project Management',
                    ]}
                    name="requiredSkill"
                    onChange={(value) =>
                      handleInputChange('requiredSkill', value)
                    }
                  />
                  <fieldset className="grid grid-cols-2 gap-2 items-end lg:gap-3">
                    <FormText
                      value={stepThree.workScheduleDays.value}
                      error={stepThree.workScheduleDays.error}
                      label="Work schedule"
                      placeholder="Days"
                      name="workScheduleDays"
                      onChange={(value) =>
                        handleInputChange('workScheduleDays', value)
                      }
                    />
                    <FormText
                      value={stepThree.workScheduleHours.value}
                      error={stepThree.workScheduleHours.error}
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
                    value={stepFour.howToApply.value}
                    error={stepFour.howToApply.error}
                    label="How to apply"
                    placeholder="Explain how to apply for this job..."
                    name="howToApply"
                    onChange={(value) => handleInputChange('howToApply', value)}
                    type="textarea"
                  />
                  <FormText
                    value={stepFour.whatToSubmit.value}
                    error={stepFour.whatToSubmit.error}
                    label="What to submit"
                    placeholder="What to submit"
                    name="whatToSubmit"
                    onChange={(value) =>
                      handleInputChange('whatToSubmit', value)
                    }
                  />
                  <FormText
                    value={stepFour.howToSubmit.value}
                    error={stepFour.howToSubmit.error}
                    label="How to submit"
                    placeholder="Explain how to submit the attachment..."
                    name="howToSubmit"
                    onChange={(value) =>
                      handleInputChange('howToSubmit', value)
                    }
                    type="textarea"
                  />
                  <FormText
                    value={stepFour.deadline.value}
                    error={stepFour.deadline.error}
                    label="Deadline"
                    placeholder="DD/MM/YY"
                    name="deadline"
                    onChange={(value) => handleInputChange('deadline', value)}
                    type="date"
                  />
                  <FormText
                    value={stepFour.companyBenefit.value}
                    error={stepFour.companyBenefit.error}
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

export const query = graphql`
  query {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsPostJobPage {
      ...PostJobPage
    }
  }
`;

export default PostJobPage;
