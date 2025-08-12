"use server";

import { prisma } from "@/lib/db";
import { auth } from "../../../auth";
import { UserProfile } from "@/lib/get-dashboard-data";

export async function updateProfile(data: UserProfile) {
  const { name, email, phone, dob, address, bio } = data;
  try {
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
    return {
      error: false,
      message: "Profile updated successfully",
      user,
    };
  } catch (error) {
    console.log("Error updating user profile:", error);
    return {
      error: true,
      message: "Failed to update profile",
    };
  }
}

export async function getProfile() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return {
        error: true,
        message: "User not found",
      };
    }

    const { id, name, email: emailId, phone, dob, address, bio, image } = user;
    return {
      error: false,
      message: "User profile fetched successfully",
      data: {
        id,
        name: name as string,
        email: emailId,
        phone: phone as string,
        dob: dob as Date,
        address: address as string,
        bio: bio as string,
        image: image as string,
      },
    };
  } catch (error) {
    console.log("Error fetching user profile:", error);
    return {
      error: true,
      message: "Failed to fetch user profile",
    };
  }
}
