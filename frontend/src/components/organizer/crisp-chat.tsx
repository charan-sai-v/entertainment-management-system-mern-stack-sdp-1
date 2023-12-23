
import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("f49a50c0-cc7b-4039-b862-4c52e91bb6fe");
  }, [])

  return null
}

