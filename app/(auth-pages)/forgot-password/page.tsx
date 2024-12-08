"use client";
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useEffect, useState } from "react";

interface ForgotPasswordProps {
  searchParams?: Message; // Optional prop for message handling
}

export default function ForgotPassword({ searchParams }: ForgotPasswordProps) {
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (searchParams) {
      setMessage(searchParams);
    }
  }, [searchParams]);

  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          {message && <FormMessage message={message} />}
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}