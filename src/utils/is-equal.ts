import { ProfileFormValues } from "@/components/profile/profile-info";

export function isEqual(obj1: ProfileFormValues, obj2: ProfileFormValues) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
