import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type OnboardingProfileCardProps = {
  onSubmit: (data: any) => void;
};

export function OnboardingProfileCard({
  onSubmit,
}: OnboardingProfileCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardDescription>
            Please fill in the form to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <Tabs defaultValue="founder" aria-label="Profile type">
            <TabsList className="flex space-x-1">
              <TabsTrigger value="founder">Founder</TabsTrigger>
              <TabsTrigger value="vc">VC</TabsTrigger>
              <TabsTrigger value="angel">Business Angel</TabsTrigger>
              <TabsTrigger value="lp">LP</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <p>Please select your primary function:</p>
            </div>
            <TabsContent value="founder">
              <div className="grid gap-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First"
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && (
                  <p className="text-red-500">First name is required.</p>
                )}
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last"
                  {...register('lastName', { required: true })}
                />
                {errors.lastName && (
                  <p className="text-red-500">Last name is required.</p>
                )}
                {/* ... other founder input fields ... */}
              </div>
            </TabsContent>
            <TabsContent value="vc">
              <div className="grid gap-4">
                <Label htmlFor="companyNameVC">Company Name</Label>
                <Input
                  id="companyNameVC"
                  placeholder="Company Name"
                  {...register('companyNameVC', { required: true })}
                />
                {errors.companyNameVC && (
                  <p className="text-red-500">Company name is required.</p>
                )}
                {/* ... other VC specific input fields ... */}
              </div>
            </TabsContent>
            <TabsContent value="angel">
              <div className="grid gap-4">
                <Label htmlFor="companyNameAngel">Company Name</Label>
                <Input
                  id="companyNameAngel"
                  placeholder="Company Name"
                  {...register('companyNameAngel', { required: true })}
                />
                {errors.companyNameAngel && (
                  <p className="text-red-500">Company name is required.</p>
                )}
                {/* ... Business Angel specific input fields ... */}
              </div>
            </TabsContent>
            <TabsContent value="lp">
              <div className="grid gap-4">
                {/* ... LP specific input fields ... */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
