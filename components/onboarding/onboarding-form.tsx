type OnboardingFormProps = {
  industries: {
    id: string;
    name: string;
    subIndustries: string[];
  }[];
};

export default function OnboardingForm({ industries }: OnboardingFormProps) {
  return <div>OnboardingForm</div>;
}
