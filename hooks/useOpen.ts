"use client"

import { useCallback, useState } from "react"

const useOpen = () => {
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  return [open, onOpen, onClose] as const
}
export default useOpen