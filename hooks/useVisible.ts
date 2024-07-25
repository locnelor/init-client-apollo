import { useCallback, useState } from "react";

const useVisible = () => {
    const [visible, setVisible] = useState(false);
    const onOpen = useCallback(() => setVisible(true), [])
    const onClose = useCallback(() => setVisible(false), [])
    return [visible, onOpen, onClose] as const
}
export default useVisible;