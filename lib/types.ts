export type Sport = "Athletics" | "Ball Games" | "Martial Arts" | "Traditional Sport" | "Recreational Sport"
export type SportStatus = "Ongoing" | "Completed" | "Upcoming"
export type AthleteStatus = "Approved" | "Pending" | "Rejected"

export interface Event {
  id: string
  name: string
  startDate: string
  endDate: string
  sports: Sport[]
}

export interface Athlete {
  id: string
  name: string
  province: string
  sport: string
  status: AthleteStatus
  medals: {
    gold: number
    silver: number
    bronze: number
  }
}

export interface MedalRecord {
  id: string
  athleteId: string
  eventId: string
  type: "Gold" | "Silver" | "Bronze"
}

export interface SportRecord {
  id: string
  name: string
  category: string
  participants: string
  status: SportStatus
}
