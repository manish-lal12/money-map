"use server";

import { prisma } from "@/lib/db";
import { ProfileFormValues } from "@/components/profile/profile-info";

export async function updateProfile(data: ProfileFormValues) {
  const { name, email, phone, dob, address, bio } = data;
  const user = await prisma.user.update({
    where: { email: email },
    data: {
      name,
      phone,
      dob,
      address,
      bio,
    },
  });
  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }
  return {
    error: false,
    message: "Profile updated successfully",
    user,
  };
}

export async function getProfile(email: string) {
  if (!email) {
    return {
      error: true,
      message: "Email is required to fetch the profile",
    };
  }
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }
  return {
    error: false,
    message: "Profile fetched successfully",
    user,
  };
}
