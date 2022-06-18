import { useRef } from "react"

export default function useThrottle(timeout: number)
{
    const timeoutId = useRef<NodeJS.Timeout>(null)

    return (callback: (...args: any) => any, ...args: any) => {
        if(timeoutId.current)
        {
            clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(() => callback(...args), timeout)
    }
}