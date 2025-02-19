import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardFooter, CardContent } from "@/components/ui/card";

interface StartupCardProps {
  name: string;
  country: string;
  description: string;
  logo: string;
  progress: number;
  daysLeft: number;
  raised?: string;
  tag?: string;
  featured?: boolean;
}

export function StartupCard({
  name,
  country,
  description,
  logo,
  progress,
  daysLeft,
  raised,
  tag,
  featured,
}: StartupCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] w-full">
  {tag && (
    <div className="absolute left-4 top-4 z-10">
      <span className="rounded-md bg-green-500 px-3 py-1 text-sm font-medium text-white">{tag}</span>
    </div>
  )}
  <div className="relative h-full w-full overflow-hidden">
    <Image
      src={`${process.env.NEXT_PUBLIC_API_URL}${logo}`}
      alt={`${name} logo`}
      fill
      className="object-cover"
      quality={95}
    />
  </div>
</div>

        {/* Content */}
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{name}</h3>
              <span className="text-sm text-muted-foreground">{country}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm">
              {raised && <span className="font-medium">{raised} raised</span>}
              <span className="text-muted-foreground">{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button variant="ghost" className="w-full justify-between hover:bg-transparent hover:text-primary">
          Find out more
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}