import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Job } from "../../../types/career"

interface JobListingProps {
  job: Job
  onApply: () => void
}

export function JobListing({ job, onApply }: JobListingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">
          {job.department} • {job.location}
        </p>
        <p className="mb-4">{job.shortDescription}</p>
        <h4 className="font-semibold mb-2">Requirements:</h4>
        <ul className="list-disc pl-5 mb-4">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onApply}>Apply Now</Button>
      </CardFooter>
    </Card>
  )
}

