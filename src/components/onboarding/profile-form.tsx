import { useState } from 'react';

import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';

import AngelForm from '@/components/onboarding/angel-form';
import FounderForm from '@/components/onboarding/founder-form';
import LimitedPartnerForm from '@/components/onboarding/limited-partner-form';
import VCForm from '@/components/onboarding/vc-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


type OnboardingProfileFormProps = {
  onSubmit: (selectedRole: string, data: any) => void;
};

export function OnboardingProfileForm({ onSubmit }: OnboardingProfileFormProps) {
  const [activeTab, setActiveTab] = useState('founder');
  const founderMethods = useForm();
  const vcMethods = useForm();
  const angelMethods = useForm();
  const lpMethods = useForm();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const methods = {
      founder: founderMethods,
      vc: vcMethods,
      angel: angelMethods,
      lp: lpMethods,
    }[activeTab];
    if (methods) {
      methods.handleSubmit((data) => onSubmit(activeTab, data))();
    }
  };

  return (
    <FormProvider
      {...({
        founder: founderMethods,
        vc: vcMethods,
        angel: angelMethods,
        lp: lpMethods,
      }[activeTab] as UseFormReturn<any>)}
    >
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardDescription>
              Kindly complete the form below to finalize your profile setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Label className="block text-sm font-medium text-gray-700">
              Your role:
            </Label>
            <Tabs
              defaultValue="founder"
              aria-label="Profile type"
              className="mt-2"
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full">
                <TabsTrigger value="founder" className="w-full">
                  Founder
                </TabsTrigger>
                <TabsTrigger value="vc" className="w-full">
                  VC
                </TabsTrigger>
                <TabsTrigger value="angel" className="w-full">
                  Business Angel
                </TabsTrigger>
                <TabsTrigger value="lp" className="w-full">
                  LP
                </TabsTrigger>
              </TabsList>
              <TabsContent value="founder">
                <FounderForm />
              </TabsContent>
              <TabsContent value="vc">
                <VCForm />
              </TabsContent>
              <TabsContent value="angel">
                <AngelForm />
              </TabsContent>
              <TabsContent value="lp">
                <LimitedPartnerForm />
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
    </FormProvider>
  );
}
