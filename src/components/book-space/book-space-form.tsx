'use client';

import type { BookSpaceFormData } from '@/types/book-coworking';

import { z } from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatInTimeZone } from 'date-fns-tz';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import HeadingSection from '@/components/common/heading-section';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone_number: z.string().optional(),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.',
    })
    .optional()
    .or(z.literal('')),
  message: z.string().optional(),
  date_and_time: z.date({
    required_error: 'Please select a date and time.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Asia timezone constant
const ASIA_TIMEZONE = 'Asia/Kathmandu';

// Generate time slots for the select
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Function to convert date to Asia timezone
const convertToAsiaTimezone = (date: Date): string =>
  formatInTimeZone(date, ASIA_TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

const bookSpaceMutationFn = async (data: BookSpaceFormData) => {
  try {
    // Convert the date to Asia timezone before sending
    const asiaDateTime = convertToAsiaTimezone(data.date_and_time);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book-space/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        date_and_time: asiaDateTime,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Booking failed');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to connect to the server. Please try again later.');
  }
};

export default function BookSpaceForm() {
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone_number: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await bookSpaceMutationFn(values);
      toast({
        title: 'Booking Successful!',
        description: `Your co-working space has been booked for ${formatInTimeZone(values.date_and_time, ASIA_TIMEZONE, 'PPP p')} .`,
      });
      form.reset();
      setSelectedTime('');
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: error instanceof Error ? error.message : 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateTimeChange = (date: Date | undefined, time: string) => {
    if (date && time) {
      const [hours, minutes] = time.split(':').map(Number);
      const dateTime = new Date(date);
      dateTime.setHours(hours, minutes, 0, 0);
      form.setValue('date_and_time', dateTime);
    }
  };

  // Get current date in Asia timezone for calendar display
  const getCurrentAsiaDate = () => {
    const now = new Date();
    const asiaTime = new Date(now.toLocaleString('en-US', { timeZone: ASIA_TIMEZONE }));
    return asiaTime;
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <HeadingSection
              title="Book Co-working Space"
              subtitle={`Reserve your workspace for your next productive session `}
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12" {...field} />
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
                        <FormLabel className="text-base font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+977-9800000000" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="date_and_time"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-base font-medium">Select Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'h-12 pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                if (date && selectedTime) {
                                  handleDateTimeChange(date, selectedTime);
                                }
                              }}
                              disabled={(date) =>
                                date < getCurrentAsiaDate() || date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="text-base font-medium">Select Time *</FormLabel>
                    <Select
                      value={selectedTime}
                      onValueChange={(time) => {
                        setSelectedTime(time);
                        const currentDate = form.getValues('date_and_time');
                        if (currentDate && time) {
                          handleDateTimeChange(currentDate, time);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Additional Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requirements or notes..."
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  type="submit"
                  className="w-full max-w-xs h-12 text-base font-medium transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Book Space'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
