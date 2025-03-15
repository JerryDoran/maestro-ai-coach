import { z } from 'zod';

export const onboardingFormSchema = z.object({
  industry: z.string({
    required_error: 'Please select an industry',
  }),
  subIndustry: z.string({
    required_error: 'Please select a specialization',
  }),
  bio: z.string().min(20, 'Bio must be more than 20 characters'),
  experience: z.coerce
    .number()
    .min(0, 'Experience must be at least 0 years')
    .max(50, 'Experience must be less than 50 years'),
  skills: z.string().transform((value) =>
    value
      ? value
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});
