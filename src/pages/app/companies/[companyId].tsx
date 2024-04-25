import { Metadata } from 'next';

import About from '@/components/companies/about';
import CompanyHeader from '@/components/companies/company-header';
import { Icons } from '@/components/ui/icons';
import AppLayout from '@/layouts/app-layout';

export const metadata: Metadata = {
  title: 'Company',
  description: '',
};

// Example data for Cherry Ventures
const mockCompanyData = {
  logoSrc: '/assets/cherry-header.png',
  name: 'Cherry Ventures',
  description:
    'Early-stage venture capital firm empowering exceptional founders.',
  isVerified: true,
  socialLinks: [
    { icon: <Icons.twitter />, href: 'https://twitter.com/cherryventures' },
    {
      icon: <Icons.twitter />,
      href: 'https://www.linkedin.com/company/cherryventures/',
    },
  ],
  tabs: [
    { title: 'About', content: <div>About Content</div> },
    { title: 'Products', content: <div>Products Content</div> },
    { title: 'Team', content: <div>Team Content</div> },
  ],
  isFollowing: false,
  onFollowToggle: () => console.log('Follow toggled'),
  followLabel: 'Follow',
  unfollowLabel: 'Unfollow',
  onContact: () => console.log('Contact clicked'),
  companyData: {
    about:
      'Cherry Ventures is an early-stage venture capital firm that empowers exceptional founders. We focus on B2B and consumer technologies.',
    foundedYear: 2012,
    teamSize: '11-50 employees',
    headquarters: 'Berlin, Germany',
  },
  milestones: {
    2022: 'Series B Funding',
    2020: 'Expanded to US market',
  },
};

export default function CompanyPage() {
  return (
    <AppLayout>
      <CompanyHeader
        logoSrc={mockCompanyData.logoSrc}
        name={mockCompanyData.name}
        description={mockCompanyData.description}
        isVerified={mockCompanyData.isVerified}
        socialLinks={mockCompanyData.socialLinks}
        tabs={mockCompanyData.tabs}
        isFollowing={mockCompanyData.isFollowing}
        onFollowToggle={mockCompanyData.onFollowToggle}
        followLabel={mockCompanyData.followLabel}
        unfollowLabel={mockCompanyData.unfollowLabel}
        onReview={mockCompanyData.onContact}
      />
      <div className="w-full flex flex-col px-8 py-8 bg-gray-50">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <About companyData={mockCompanyData.companyData} />
        </div>
      </div>
    </AppLayout>
  );
}
