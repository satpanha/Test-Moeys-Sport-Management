"use client"

import { Input } from "@/components/ui/input"
import { FieldLabel, FormRow } from "@/components/registration/form-field"

export function ContactInfo({ formState, setFormState }: any) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Contact Information</h3>
        <p className="text-sm text-muted-foreground">ព័ត៌មានទំនាក់ទំនង</p>
      </div>

      <FormRow>
        <div>
          <FieldLabel label="Email Address" khmer="អ៊ីម៉ែល" />
          <Input required type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
        </div>
        <div>
          <FieldLabel label="Phone Number" khmer="លេខទូរស័ព្ទ" />
          <div className="flex">
            <div className="px-3 py-2 rounded-l-xl bg-slate-50 border border-r-0">+855</div>
            <Input required type="tel" className="rounded-r-xl" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} />
          </div>
        </div>
      </FormRow>
    </section>
  )
}
