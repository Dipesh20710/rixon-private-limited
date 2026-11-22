export const PROJECT_TYPES = [
  'Basic landing page',
  'Personal portfolio',
  'Business website',
  'Premium business website',
  'E-commerce website',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

const pricing: Record<ProjectType, { minimum: number; maximum: number; includedPages: number }> = {
  'Basic landing page': { minimum: 1999, maximum: 3999, includedPages: 1 },
  'Personal portfolio': { minimum: 2999, maximum: 5999, includedPages: 4 },
  'Business website': { minimum: 4999, maximum: 8999, includedPages: 5 },
  'Premium business website': { minimum: 8999, maximum: 14999, includedPages: 8 },
  'E-commerce website': { minimum: 9999, maximum: 19999, includedPages: 5 },
};

export const PROJECT_ESTIMATE_EVENT = 'rixon:project-estimate';

export type ProjectEstimateDetails = {
  projectType: ProjectType;
  pages: number;
  integrations: boolean;
  contentSupport: boolean;
  minimum: number;
  maximum: number;
};

export function getIncludedPages(projectType: ProjectType) {
  return pricing[projectType].includedPages;
}

export function calculateProjectEstimate(
  projectType: ProjectType,
  pages: number,
  integrations: boolean,
  contentSupport: boolean,
) {
  const base = pricing[projectType];
  const additionalPages = Math.max(0, Math.floor(pages) - base.includedPages);
  const adjustment = 1
    + additionalPages * 0.05
    + (integrations ? 0.1 : 0)
    + (contentSupport ? 0.1 : 0);

  return {
    minimum: Math.round(base.minimum * adjustment),
    maximum: Math.round(base.maximum * adjustment),
    includedPages: base.includedPages,
  };
}

export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}
