import { useReducer } from "react"
import { FromLanguage, Language, type Action, type State } from "../types"
import { AUTO_LANGUAGE } from "../constans"

// 1. crear estado inicial
export const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

// 2 crear un reducer
export function reducer(state: State, action: Action) {
    const { type } = action

    // intercambiar idiomas (<->)
    if (type === 'INTERCHANGE_LANGUAGES') {

        if(state.fromLanguage === AUTO_LANGUAGE) return state

        const loading = state.fromText !== ''

        return {
            ...state,
            loading,
            fromText: state.result,
            result: '',
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage,
        }
    }
    // cambiar el idioma de origen
    if (type === 'SET_FROM_LANGUAGE') {

        if(state.fromLanguage === action.payload) return state
        const loading = state.fromText !== ''

        return {
            ...state,
            fromLanguage: action.payload,
            result: '',
            loading
        }
    }
    // cambiar el idioma destino
    if (type === 'SET_TO_LANGUAGE') {

        if(state.toLanguage === action.payload) return state
        const loading = state.fromText !== ''

        return {
            ...state,
            toLanguage: action.payload,
            result: '',
            loading
        }
    }
    // cambior el texto de origen
    if (type === 'SET_FROM_TEXT') {

        const loading = action.payload !== ''

        return {
            ...state,
            loading,
            fromText: action.payload,
            result: '',
        }
    }
    // cambiar el texto destino/resultado
    if (type === 'SET_RESULT') {
        return {
            ...state,
            loading: false,
            result: action.payload
        }
    }

    return state
}

export function useStore() {
    // 3. usar useReducer
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState)

    const interchangeLanguages = () => {
        dispatch(({ type: 'INTERCHANGE_LANGUAGES' }))
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload })
    }

    const setToLanguage = (payload: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload })
    }

    const setFromText = (payload: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload })
    }

    const setResult = (payload: string) => {
        dispatch({ type: 'SET_RESULT', payload })
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult
    }
}