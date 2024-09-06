import { IconDefinition } from "@fortawesome/angular-fontawesome"

export interface NavType {
  id: number
  title: string
  icon: IconDefinition
  role: string
  path: string
}