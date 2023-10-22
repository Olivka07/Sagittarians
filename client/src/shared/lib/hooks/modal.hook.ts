import { useState, useEffect } from "react"

export const useModal = () => {
    const [modal, setModal] = useState<string | null>(null)

    const toggle = (value:string | null) => {
        setModal(value)
    }

    useEffect(() => {
        if (modal) {
            setTimeout(() => {
                setModal(null)
            }, 3000)
        }
    }, [modal])

    return {modal, toggle}
}