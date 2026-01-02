"use client"

import { FieldLabel, FormRow } from "@/components/registration/form-field"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"

export function LocationDetails({ formState, setFormState }: any) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Location Details</h3>
        <p className="text-sm text-muted-foreground">ព័ត៌មានទីកន្លែង</p>
      </div>

      <FormRow>
        <div>
          <FieldLabel label="Province" khmer="ខេត្ត/ក្រុង" />
          <NativeSelect required value={formState.province} onChange={(e) => setFormState({ ...formState, province: e.target.value })} className="w-full">
            <option value="">Select province</option>
            <option value="Phnom Penh">Phnom Penh</option>
            <option value="Siem Reap">Siem Reap</option>
          </NativeSelect>
        </div>
        <div>
          <FieldLabel label="Department" khmer="នាយកដ្ឋាន (ចន្ទ)" />
          <Input value={formState.department} onChange={(e) => setFormState({ ...formState, department: e.target.value })} />
        </div>
      </FormRow>
    </section>
  )
}
