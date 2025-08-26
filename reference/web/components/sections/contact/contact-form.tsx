"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Divider } from "@/components/ui/divider"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactEmail } from "@/lib/actions"

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.email("Please enter a valid email address"),
  problem: z
    .string()
    .min(1, "Please describe the problem you're trying to solve"),

  reason: z.string(),
  role: z.string(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to our privacy policy",
  }),
  marketingConsent: z.boolean(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      reason: "",
      name: "",
      company: "",
      role: "",
      email: "",
      problem: "",
      privacyConsent: false,
      marketingConsent: false,
    },
  })

  const { isSubmitting, isSubmitSuccessful, errors } = form.formState

  async function onSubmit(data: ContactFormValues) {
    try {
      await sendContactEmail({
        reason: data.reason,
        name: data.name,
        company: data.company,
        role: data.role,
        email: data.email,
        problem: data.problem,
        marketingConsent: data.marketingConsent,
        privacyConsent: data.privacyConsent,
      })

      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)

      form.setError("root", {
        type: "manual",
        message:
          "Something went wrong. Please try again or contact us directly.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What brings you here</FormLabel>
              <FormControl>
                <Input
                  placeholder="I'd like to explore working with Sparq"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="What's your company name?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title or role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What problem are you trying to solve?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a high-level look at your problem"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="privacyConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-neutral-dark-500 text-lg font-normal">
                    <span>
                      By submitting, you consent to Sparq processing your
                      information in accordance with our{" "}
                      <Link
                        href="/privacy-policy"
                        className="underline decoration-[1px] underline-offset-4"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-neutral-dark-500 text-lg font-normal">
                    Yes, I would like to receive emails from Sparq. I may
                    unsubscribe or change my email preferences at any time.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Divider theme="dark" className="md:my-8" />

        {isSubmitSuccessful && (
          <div className="bg-accent-200 text-foreground rounded-lg px-6 py-4 text-lg">
            Got it! We&apos;ll connect to move things forward
          </div>
        )}

        {errors.root && (
          <div className="rounded-lg bg-red-100 px-6 py-4 text-lg text-red-800">
            Something went wrong. Please try again or contact us directly.
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send Information to Sparq"}
        </Button>

        <p className="text-neutral-dark-500 text-lg">
          You&apos;ll hear from us within 1-2 business days.
        </p>
      </form>
    </Form>
  )
}
