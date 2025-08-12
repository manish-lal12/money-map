import { UserProfile } from "@/lib/get-dashboard-data";

export function isEqual(obj1: UserProfile, obj2: UserProfile) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
