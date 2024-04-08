import { useEffect, useState } from "react";

// value: T     :   el tipo no lo sabemos 
// <T>   :  el tipo nos lo va a decir el usuario
// recibe el tipo por parametro ejem : useDebounce<string>('hello', 500)
export function useDebounce<T>(value: T, delay: number = 500){
    const [debouncedValue, setDebouncedValue] = useState(value)

    // cada vez que pase el tiempo delay actualizamos el valor
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {clearTimeout(timer)}
    },[value, delay])

    return debouncedValue
}

/**
 * Línea de tiempo de como se comporta el usuario
 * 
 * 0ms -> user type - 'h'
 *     useEffect ...L11
 * 150ms -> user type  - 'he'
 *     clear useEffect ... L15
 *     useEffect ... L11
 * 300ms -> user type  - 'hel'
 *     clear useEffect ... L15
 *     useEffect ... L11
 * 400ms -> user type  - 'hell'
 *     clear useEffect ... L15
 *     useEffect ... L11
 * 
 * ***** Transcurren 500 ms ****** 
 * 
 * 900ms -> L12 -> setDebouncedValue('hell')  -> debounceValue L18
 */