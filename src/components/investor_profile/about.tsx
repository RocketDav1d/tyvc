import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"



export function About() {
  return (
    <Card className="w-[693px]"> {/* Adjust width as needed */}
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>
          Cherry Ventures is a Berlin-based venture capital fund by founders for founders that invests in the best ideas and teams across Europe as early as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div>
            <CardTitle>Investment Criteria</CardTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="stage">Stage</label>
                <Select>
                  <SelectTrigger id="stage">
                    <SelectValue placeholder="Pre-Seed" />
                  </SelectTrigger>
                  {/* Add SelectContent and SelectItem components as needed */}
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="sectors">Sectors</label>
                <Select>
                  <SelectTrigger id="sectors">
                    <SelectValue placeholder="All Sectors" />
                  </SelectTrigger>
                  {/* Add SelectContent and SelectItem components as needed */}
                </Select>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="ticketSize">Ticket Size</label>
            <Select>
              <SelectTrigger id="ticketSize">
                <SelectValue placeholder="EUR 300k - 3Mio" />
              </SelectTrigger>
              {/* Add SelectContent and SelectItem components as needed */}
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
