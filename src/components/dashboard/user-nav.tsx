import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUserDetails from '@/hooks/use-user-details';

type UserNavProps = {
  onSignout: () => void;
};

export function UserNav({ onSignout }: UserNavProps) {
  const { userDetails } = useUserDetails();
  const userAvatarLabel =
    userDetails && userDetails.onboardingData
      ? `${userDetails.onboardingData['firstName'][0]}${userDetails.onboardingData['lastName'][0]}`
      : 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarFallback>{userAvatarLabel}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userDetails?.onboardingData['firstName']}{' '}
              {userDetails?.onboardingData['lastName']}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userDetails?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
