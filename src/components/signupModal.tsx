"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  type: "investor" | "startup" | "mentor"
  userType: string
}

export function SignUpModal({ isOpen, onClose, type, userType }: SignUpModalProps) {
  const router = useRouter()

  const handleLinkedInSignUp = () => {
    // Implement LinkedIn OAuth
    console.log("LinkedIn sign up clicked")
    router.push(`/signup/${userType}/linkedin`)
  }

  const handleEmailSignUp = () => {
    router.push(`/signup/${type}/email`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center text-xl">
            <div className="rounded-full bg-gray-100 p-2">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            Join Investify
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Join our club, meet other {type}s and start exploring exciting opportunities.
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" className="w-full flex gap-2 h-11" onClick={handleLinkedInSignUp}>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.68 1.68 0 0 0-1.68 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
          Sign up with LinkedIn
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button className="w-full h-11" onClick={handleEmailSignUp}>
          Sign up with e-mail
        </Button>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Yes, I understand the nature of Investify
          </label>
        </div>
        <div className="text-center text-sm">
          Do you already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            log in
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
