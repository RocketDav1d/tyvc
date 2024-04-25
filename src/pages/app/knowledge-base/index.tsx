import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function KnowledgeBasePage() {
  return (
    <AppLayout>
      <h1 className="mb-8 text-4xl font-bold">
        Everything you need for Fundraising
      </h1>
      <p className="mb-8 text-xl">
        Exclusive material developed by the best for the best of tomorrow.
      </p>

      <div className="mb-8">
        <span className="mr-4 text-lg font-semibold">All Resources</span>
        <span className="mr-4 text-lg">Legal</span>
        <span className="mr-4 text-lg">Finance</span>
        <span className="text-lg">Pitch Decks</span>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Branding Design</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="/branding-design.jpg" alt="Branding Design" />
            <button className="mt-4">View Details</button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Best Marketing Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="/marketing-tips.jpg" alt="Marketing Tips" />
            <button className="mt-4">View Details</button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Web Design Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="/web-design.jpg" alt="Web Design" />
            <button className="mt-4">View Details</button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Business Card Design</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="/business-card.jpg" alt="Business Card" />
            <button className="mt-4">View Details</button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Digital Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="/digital-marketing.jpg" alt="Digital Marketing" />
            <button className="mt-4">View Details</button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Creative Agency</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="/creative-agency.jpg" alt="Creative Agency" />
            <button className="mt-4">View Details</button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
