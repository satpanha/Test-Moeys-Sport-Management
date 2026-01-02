"use client"

import { FieldLabel, FormRow } from "@/components/registration/form-field"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { useEffect } from "react"

const CATEGORIES = {
  "Athletics": ["Running", "Jumping"],
  "Ball Games": ["Football", "Basketball"],
}

export function SportSelection({ formState, setFormState }: any) {
  useEffect(() => {
    if (!formState.category) setFormState({ ...formState, sport: "" })
  }, [formState.category])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Sport Selection</h3>
        <p className="text-sm text-muted-foreground">ជ្រើសរវាងកីឡា</p>
      </div>

      <FormRow>
        <div>
          <FieldLabel label="Sport Category" khmer="ប្រភេទកីឡា" />
          <NativeSelect required value={formState.category} onChange={(e) => setFormState({ ...formState, category: e.target.value })} className="w-full">
            <option value="">Select category</option>
            {Object.keys(CATEGORIES).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </NativeSelect>
        </div>

        <div>
          <FieldLabel label="Sport" khmer="កីឡា" />
          <NativeSelect required disabled={!formState.category} value={formState.sport} onChange={(e) => setFormState({ ...formState, sport: e.target.value })} className="w-full">
            <option value="">Select sport</option>
            {((CATEGORIES as Record<string, string[]>)[formState.category] || []).map((s: string) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </NativeSelect>
        </div>

        <div>
          <FieldLabel label="Position / Role" khmer="តួនាទី" />
          <Input value={formState.position} onChange={(e) => setFormState({ ...formState, position: e.target.value })} />
        </div>

        <div>
          <FieldLabel label="Event Type" khmer="ប្រភេទព្រឹត្តិការណ៍" />
          <Input value={formState.eventType} onChange={(e) => setFormState({ ...formState, eventType: e.target.value })} />
        </div>
      </FormRow>
    </section>
  )
}
