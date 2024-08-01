import React from 'react'
// import LiveTranscription from './LiveTranscription'
import Transcription from './Transcription'
import TextSummarization from './TextSummarization'
import Translation from './Translation'
import KeywordIdentifier from './KeywordIdentifier'
import InformationRetrieval from './InformationRetrieval'

const Features = () => {
  return (
  <>
  {/* <LiveTranscription /> */}
  <Transcription />
   <TextSummarization />
   <Translation /> 
   <KeywordIdentifier />
  <InformationRetrieval /> 
  </>
  )
}

export default Features