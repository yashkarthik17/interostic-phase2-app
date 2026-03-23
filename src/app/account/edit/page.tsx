"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  FormInput,
  Button,
  SectionHeader,
} from "@/components/ui/shell";
import { defaultProfile } from "@/lib/store";
import { Camera } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState(defaultProfile.firstName);
  const [lastName, setLastName] = useState(defaultProfile.lastName);
  const [email, setEmail] = useState(defaultProfile.email);
  const [phone, setPhone] = useState(defaultProfile.phone);
  const [street, setStreet] = useState(defaultProfile.address.street);
  const [city, setCity] = useState(defaultProfile.address.city);
  const [state, setState] = useState(defaultProfile.address.state);
  const [zip, setZip] = useState(defaultProfile.address.zip);

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`;

  function handleSave() {
    router.push("/account");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Edit Profile" backHref="/account" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Avatar */}
        <div className="flex justify-center animate-fade-up delay-1">
          <div className="relative">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-navy text-white text-xl font-bold">
              {initials}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white shadow-md hover:opacity-90 transition-opacity active:scale-95"
            >
              <Camera size={14} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormInput label="First Name" value={firstName} onChange={setFirstName} />
                <FormInput label="Last Name" value={lastName} onChange={setLastName} />
              </div>
              <FormInput label="Email" type="email" value={email} onChange={setEmail} />
              <FormInput label="Phone" type="tel" value={phone} onChange={setPhone} />
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <SectionHeader title="Address" />
          <Card>
            <div className="space-y-4">
              <FormInput label="Street" value={street} onChange={setStreet} />
              <div className="grid grid-cols-3 gap-3">
                <FormInput label="City" value={city} onChange={setCity} />
                <FormInput label="State" value={state} onChange={setState} />
                <FormInput label="ZIP" value={zip} onChange={setZip} />
              </div>
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-4">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
