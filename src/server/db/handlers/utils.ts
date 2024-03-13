import { CompanyDiversity } from '@prisma/client';

function mapDiversityToCompany(diversity: string): CompanyDiversity {
  switch (diversity) {
    case 'WHITE_MALE':
      return CompanyDiversity.ONLY_WHITE_MALE_FOUNDERS;
    case 'WHITE_FEMALE':
      return CompanyDiversity.ONLY_WHITE_FEMALE_FOUNDERS;
    case 'BLACK_MALE':
      return CompanyDiversity.ONLY_POC_MALE_FOUNDERS;
    case 'BLACK_FEMALE':
      return CompanyDiversity.ONLY_POC_FEMALE_FOUNDERS;
    case 'MIN_1_W':
      return CompanyDiversity.MIN_1_W;
    case 'MIN_1_POC':
      return CompanyDiversity.MIN_1_POC;
    case 'MIN_1_W_POC':
      return CompanyDiversity.MIN_1_W_POC;
    default:
      return CompanyDiversity.ONLY_WHITE_MALE_FOUNDERS; // Default or fallback diversity
  }
}

export { mapDiversityToCompany };
