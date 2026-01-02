"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { FieldLabel, FormRow } from "@/components/registration/form-field"
import { Calendar } from "lucide-react"

export function PersonalInfo({ formState, setFormState }: any) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Personal Information</h3>
        <p className="text-sm text-muted-foreground">ផ្ទេរពត៌មានផ្ទាល់ខ្លួន</p>
      </div>

      <FormRow>
        <div>
          <FieldLabel label="First Name (English)" khmer="ឈ្មោះ (អង់គ្លេស)" />
          <Input required value={formState.firstNameEn} onChange={(e) => setFormState({ ...formState, firstNameEn: e.target.value })} />
        </div>
        <div>
          <FieldLabel label="Last Name (English)" khmer="ត្រកូល (អង់គ្លេស)" />
          <Input required value={formState.lastNameEn} onChange={(e) => setFormState({ ...formState, lastNameEn: e.target.value })} />
        </div>

        <div>
          <FieldLabel label="First Name (Khmer)" khmer="ឈ្មោះ (ខ្មែរ)" />
          <Input required value={formState.firstNameKm} onChange={(e) => setFormState({ ...formState, firstNameKm: e.target.value })} />
        </div>
        <div>
          <FieldLabel label="Last Name (Khmer)" khmer="ត្រកូល (ខ្មែរ)" />
          <Input required value={formState.lastNameKm} onChange={(e) => setFormState({ ...formState, lastNameKm: e.target.value })} />
        </div>

        <div>
          <FieldLabel label="Date of Birth" khmer="ថ្ងៃកំណើត" />
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input required type="date" className="pl-10" value={formState.dob} onChange={(e) => setFormState({ ...formState, dob: e.target.value })} />
          </div>
        </div>

        <div>
          <FieldLabel label="Gender" khmer="យេនឌ័រ" />
          <NativeSelect required value={formState.gender} onChange={(e) => setFormState({ ...formState, gender: e.target.value })}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </NativeSelect>
        </div>

        <div>
          <FieldLabel label="National ID Number" khmer="លេខអត្តសញ្ញាណ" />
          <Input required value={formState.nationalId} onChange={(e) => setFormState({ ...formState, nationalId: e.target.value })} />
        </div>
      </FormRow>
    </section>
  )
}
