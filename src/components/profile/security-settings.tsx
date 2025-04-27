"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Check,
  Copy,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
} from "lucide-react";

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showCurrentPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showNewPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Password Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Minimum 8 characters
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                At least one uppercase letter
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                At least one number
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                At least one special character
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <Label htmlFor="2fa" className="flex flex-col space-y-1">
                <span>Two-Factor Authentication</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Require a verification code when logging in
                </span>
              </Label>
            </div>
            <Switch id="2fa" defaultChecked />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Verification Methods</h3>
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Authenticator App</p>
                    <p className="text-xs text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              </div>
              <div className="pt-4 space-y-2 border-t">
                <Label htmlFor="backup-codes">Backup Codes</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="backup-codes"
                    value="XXXX-XXXX-XXXX-XXXX"
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Save these backup codes in a secure place to access your
                  account if you lose your device.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>
            Recent login activity on your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <p className="font-medium">Current Session</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  San Francisco, CA, USA • Chrome on macOS
                </p>
                <p className="text-xs text-muted-foreground">IP: 192.168.1.1</p>
              </div>
              <p className="text-sm">Just now</p>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">San Francisco, CA, USA</p>
                <p className="text-sm text-muted-foreground">
                  Safari on iPhone
                </p>
                <p className="text-xs text-muted-foreground">IP: 192.168.1.2</p>
              </div>
              <p className="text-sm">Yesterday at 2:30 PM</p>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <p className="font-medium">New York, NY, USA</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Firefox on Windows
                </p>
                <p className="text-xs text-muted-foreground">IP: 192.168.1.3</p>
              </div>
              <p className="text-sm">3 days ago</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">San Francisco, CA, USA</p>
                <p className="text-sm text-muted-foreground">Chrome on macOS</p>
                <p className="text-xs text-muted-foreground">IP: 192.168.1.1</p>
              </div>
              <p className="text-sm">1 week ago</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Full Login History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
