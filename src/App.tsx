import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import './App.css'
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constans';
import { ArrowIcon, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';


function App() {

  const {
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    loading
  } = useStore()

  // typescript infiere el tipo de 'fromText', por lo tanto toma string (tipo de fromText) como el tipo
  const debouncedFromText = useDebounce(fromText, 2000)

  useEffect(() => {
    if (debouncedFromText === "") return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        // no es ni null ni undefined
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Límite de peticiones por minuto alcanzado, pruebe en 20 seg') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  // copiar al portapapeles
  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  // leer texto con voz
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result) // API de solicitud de voz
    utterance.lang = toLanguage  // indica el lenguaje en el que hablara
    utterance.rate = 0.8  // velocidad de la voz
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}>
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div
                style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App


/**
 * PAQUETES
 * 1. react-bootstrap
 * 2. npm i openai -E
 * 
 * para test
 * 3. vitest
 * 4. happy-dom: simular dom
 * 5. @testing-library/react : tener utilidades para los componentes
 * 6. @testing-library/user-event: simula a un usurio (ejem teclea en textarea)
 * 
 * agregar en vite.config.ts
 * test: {
    environment: "happy-dom"
  }

  mas info en -> testing-library.com/docs/queries/about/
 */