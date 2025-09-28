'use client'

import { createContext } from "react"

export const wsContext = createContext<WebSocket | null>(null)