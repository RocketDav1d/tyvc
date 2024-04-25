import { FC } from 'react';
import * as React from "react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip"

import Rating from "./stars";





interface ReviewData {
    tyvcscore: number,
    criteria: number[],
    tags: string[],
    date: string,
    headline: string,
    subheadline: string,
    content: string,
    author: string,
    investor_name: string,
    helpfulness: number,
    stage: string,
    labels: {
        verifiedInvestment: string,
        founderReceivedInvestment: string,
        trustYourVCVerified: string,
        reportReview: string,
        showStars: string,
        foundersFoundReviewHelpful: string,
        youToo: string,
        connection: string,
        sendConnectionRequest: string,
        authorWillReceiveMail: string,
        whenAuthorAccepts: string,
        cancel: string,
        continue: string
    }
}

export interface ReviewProps {
  review: ReviewData;
}


// The FC type from React is used to define a functional component with TypeScript
const Review: FC<ReviewProps> = ({ review }) => {

    const [isOpen, setIsOpen] = React.useState(false)



  return (
    <Card className="relative w-4/5 min-h-[20vh] max-w-[80vh]">
      <CardContent>



        <div className="header flex justify-between items-center py-3">
          <div className="fheader">
            <h2 className="flex-grow text-2xl font-semibold">
              {review.headline}
            </h2>
          </div>
          <div className=" ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex items-center gap-2 px-2 py-1 text-white bg-tyvc-green border rounded-md border-tyvc-green">
                    <svg
                      className="shrink-0 ml-2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15.5 9.5M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{review.labels.verifiedInvestment}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="flex">
                  <p>
                    {review.labels.founderReceivedInvestment}{' '}
                    {review.investor_name}
                  </p>
                  <p>{review.labels.trustYourVCVerified}</p>
                  <p className="">{review.labels.reportReview}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Separator />

        <div className="header flex justify-between items-center pt-5">
          <div className="flex gap-2">
            <div className="inline-flex items-center gap-1">
              <span className="text-sm font-semibold">
                {review.tyvcscore},0
              </span>
              <Rating stars={review.tyvcscore} />




            </div>
            <div className="tags">
              {review.tags.map((stage, index) => (
                <Badge
                  className="mr-2 font-normal text-gray-500 rounded"
                  key={index}
                  variant="secondary"
                >
                  {stage}
                </Badge>
              ))}
            </div>
          </div>
          <div className="dat text-xs text-gray-500">{review.date}</div>
        </div>

        <div className="py-4 pt-5 text">
          <div className="headline font-bold">
            <p className="pb-2 text-">{review.subheadline}</p>
          </div>
          <div className="content">
            <p>{review.content}</p>
          </div>
        </div>

        <div className="criteria pt-4">
          <Separator className="w-full" />
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full pt-1 space-y-2"
          >
            <div className="w-full">
              <CollapsibleTrigger asChild>
                <Button
                  className="inline-flex justify-start items-center gap-2 px-1 text-blue-500"
                  variant="ghost"
                  size="sm"
                >
                  <svg
                    className="shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12L12 16M12 16L16 12M12 16V8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{review.labels.showStars}</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="w-full space-y-2">
              <div className="w-full flex">
                <div className="individual-ratings w-4/5">
                  <div className="1-row flex justify-between items-center pr-24 pb-3">
                    <div className="criteria-1">
                      Criteria 1
                      <Rating stars={review.criteria[0]} />


















































                    </div>
                    <div className="criteria-4">
                      Criteria 4
                      <Rating stars={review.criteria[1]} />
                    </div>
                    <div className="criteria-7">
                      Criteria 7
                      <Rating stars={review.criteria[2]} />
                    </div>
                    <div className="criteria-10">
                      Criteria 10
                      <Rating stars={review.criteria[3]} />
                    </div>
                  </div>
                  <div className="2-row flex justify-between items-center pr-24 pb-3">
                    <div className="criteria-2">
                      Criteria 2
                      <Rating stars={review.criteria[4]} />
                    </div>
                    <div className="criteria-5">
                      Criteria 5
                      <Rating stars={review.criteria[5]} />
                    </div>
                    <div className="criteria-8">
                      Criteria 8
                      <Rating stars={review.criteria[6]} />
                    </div>
                    <div className="criteria-11">
                      Criteria 11
                      <Rating stars={review.criteria[7]} />
                    </div>
                  </div>
                  <div className="3-row flex justify-between items-center pr-24 pb-3">
                    <div className="criteria-3">
                      Criteria 3
                      <Rating stars={review.criteria[8]} />
                    </div>
                    <div className="criteria-6">
                      Criteria 6
                      <Rating stars={review.criteria[9]} />
                    </div>
                    <div className="criteria-9">
                      Criteria 9
                      <Rating stars={review.criteria[10]} />
                    </div>
                    <div className="criteria-12">
                      Criteria 12
                      <Rating stars={review.criteria[11]} />
                    </div>
                  </div>
                </div>
                <div className="overall-score w-1/5 flex flex-col items-center">
                  <span>TYVC Score</span>
                  <Rating stars={3} />
                  <span className="pt-3 text-5xl font-bold">
                    {review.tyvcscore},0
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>


        <div className="footer flex justify-between pt-4">
          <div className="helpfulness">
            <Button className="inline-flex justify-start items-center p-2 text-gray-600 bg-gray-200">
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                {review.helpfulness} {review.labels.foundersFoundReviewHelpful}
                <span className="text-blue-600 underline">
                  {review.labels.youToo}You too?
                </span>
              </span>
            </Button>
          </div>
          <div className="connect">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="inline-flex items-center gap-2 bg-blue-600">
                  <svg
                    width="80%"
                    height="80%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 8.50224C10.1762 8.00136 10.524 7.579 10.9817 7.30998C11.4395 7.04095 11.9777 6.9426 12.501 7.03237C13.0243 7.12213 13.499 7.39421 13.8409 7.80041C14.1829 8.20661 14.37 8.72072 14.3692 9.25168C14.3692 10.7506 12.1209 11.5 12.1209 11.5M12.1499 14.5H12.1599M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Connection{review.labels.connection}</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {review.labels.sendConnectionRequest} Send out a connection
                    request to {review.author}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {review.author} {review.labels.authorWillReceiveMail} will
                    receive a mail about the connectio request.
                    {review.labels.whenAuthorAccepts} When the author accepts
                    the request you get access to their LinkedIn
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{review.labels.cancel}</AlertDialogCancel>
                  <AlertDialogAction>
                    {review.labels.continue}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>








        </div>
      </CardContent>



    </Card>
  );
};

export default Review;
