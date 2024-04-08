import Form from 'react-bootstrap/Form';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constans'
import { type FC } from 'react';
import { type FromLanguage, type Language, SectionType } from '../types.d';

type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

// 2 formas para indicar que sus propiedades son del tipo 'Props'

// forma 1
// export const LanguageSelector = ({ onChange }: Props) => {

// forma 2
// NOTA: FC es igual a FunctionComponent 👌, mas corto
export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>
                        {literal}
                    </option>
                ))
            }
        </Form.Select>
    )
}