"use client"

import { useState } from "react"
import { PersonalInfo } from "@/components/registration/sections/personal-info"
import { LocationDetails } from "@/components/registration/sections/location-details"
import { ContactInfo } from "@/components/registration/sections/contact-info"
import { SportSelection } from "@/components/registration/sections/sport-selection"
import { PhotoUpload } from "@/components/registration/photo-upload"
import { Button } from "@/components/ui/button"

const INITIAL = {
  firstNameEn: "",
  lastNameEn: "",
  firstNameKm: "",
  lastNameKm: "",
  dob: "",
  gender: "",
  nationalId: "",
  province: "",
  department: "",
  email: "",
  phone: "",
  category: "",
  sport: "",
  position: "",
  eventType: "",
}

export function RegistrationForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [formState, setFormState] = useState(INITIAL)

  const handleReset = () => setFormState(INITIAL)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation: required fields
    const required = ["firstNameEn", "lastNameEn", "firstNameKm", "lastNameKm", "dob", "gender", "nationalId", "province", "email", "phone", "category", "sport"]
    for (const key of required) {
      if (!formState[key as keyof typeof formState]) return alert(`Please complete ${key}`)
    }
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error('Failed to submit registration')
      const data = await res.json()
      onSubmit?.(data)
      alert('Registration submitted — ID: ' + data.id)
      handleReset()
    } catch (err) {
      console.error(err)
      alert('Failed to submit registration')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-6 bg-white rounded-2xl shadow-sm">
      <SportSelection formState={formState} setFormState={setFormState} />
      <hr />
      <LocationDetails formState={formState} setFormState={setFormState} />
      <PersonalInfo formState={formState} setFormState={setFormState} />
      <hr />
      <ContactInfo formState={formState} setFormState={setFormState} />
      <hr />
      <hr />
      <PhotoUpload />

      <div className="flex items-center justify-between sticky bottom-0 bg-white pt-6">
        <Button variant="ghost" onClick={handleReset} className="rounded-xl">Reset Form</Button>
        <Button type="submit" className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl">Submit Registration</Button>
      </div>
    </form>
  )
}
