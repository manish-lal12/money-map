"use client";

import { useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Pencil, Upload } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { profileSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { isEqual } from "@/utils/is-equal";

import { getProfile, updateProfile } from "@/app/actions/profile";

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileInfo() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState<ProfileFormValues>({
    name: "",
    email: "",
    image: "",
    bio: "",
    dob: undefined,
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (session?.user?.email) {
      getProfile(session.user.email)
        .then((res) => {
          if (res.error) {
            console.error(res.message);
            return;
          }
          const user = res.user;
          setUserDetails({
            name: user?.name as string,
            email: user?.email as string,
            image: user?.image as string,
            bio: user?.bio || "",
            dob: user?.dob || undefined,
            phone: user?.phone || "",
            address: user?.address || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [session]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userDetails,
  });
  useEffect(() => {
    // Update the form default values whenever userDetails changes
    form.reset(userDetails);
  }, [userDetails, form]);

  const formValues = form.watch();

  const isChanged = useMemo(() => {
    return !isEqual(formValues, userDetails);
  }, [formValues, userDetails]);

  function onSubmit(data: ProfileFormValues) {
    if (isChanged) {
      updateProfile(data);
      toast({
        title: (
          <div className="flex items-center">
            <span>Successfully updated</span>
            <FaCheckCircle className="ml-2 h-4 w-4" />
          </div>
        ),
        description: "Your profile has been updated successfully.",
        variant: "default",
      });
    }
    setIsEditing(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-2">
              {userDetails.image && (
                <Avatar className="h-28 w-28">
                  <Image
                    src={userDetails.image as string}
                    alt="Profile picture"
                    height={80}
                    width={200}
                  />
                  <AvatarFallback>AJ</AvatarFallback>/
                </Avatar>
              )}
              <Button variant="outline" size="sm" className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
            <div className="flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
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
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  disabled={!isEditing}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile. Maximum 160
                          characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isEditing && (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={!isChanged}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
          <CardDescription>Your personal financial objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Retirement</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Save $1.5M for retirement by age 65
              </p>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">35%</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Home Purchase</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Save $100K for down payment on a house by 2025
              </p>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Education Fund</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Save $50K for children's education by 2030
              </p>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">20%</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Manage Financial Goals
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
