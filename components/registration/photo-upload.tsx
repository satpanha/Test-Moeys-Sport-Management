"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

export function PhotoUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file?: File) => {
    setError(null)
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return setError("File must be under 5MB")
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden">
          {preview ? <img src={preview} alt="avatar" className="object-cover w-full h-full" /> : <div className="text-slate-400">Avatar</div>}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => inputRef.current?.click()}>
              <Camera className="h-4 w-4 mr-2" /> Upload
            </Button>
            <Button variant="ghost" className="rounded-xl" onClick={() => { setPreview(null); inputRef.current!.value = "" }}>
              Remove
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">JPG, PNG, GIF • Max 5MB (optional)</p>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  )
}
