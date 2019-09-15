import React, { useEffect, useState } from 'react';
import GuestLayout from '../guest-layout';
import { Widget, addResponseMessage, addUserMessage, toggleWidget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import styles from './styles.scss';
import { list } from 'postcss';

function handleNewUserMessage(newMessage) {
  console.log(`New message incoming! ${newMessage}`);
  
  fetch(`/api/ask?question=${newMessage}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          console.log(result.answers);

          if (!result.answers[0].source) {
            return addResponseMessage('I am sorry, could you please rephrase that?');
          }
          const source = result.answers[0].source.startsWith('http')
            ? `\n\nSee more about this topic at [${result.answers[0].source}](${result.answers[0].source}).`
            : '';

          addResponseMessage(`${result.answers[0].answer}${source}`);
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          addResponseMessage("I am sorry, could you please rephrase that?");
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      );
}

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
if (speechRecognition) {
  const recognition = new speechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  recognition.start();

  recognition.onresult = function(event) {
    console.log('You said: ', event.results[0][0].transcript);
  };
}


export default function () {
  useEffect(() => {
    toggleWidget();
  }, []);

  const [listening, setListening] = useState(false);


  const handleVoiceRecognition = () => {
    const recognition = new speechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();
  
    setListening(true);
    recognition.onresult = function(event) {
      setListening(false);
      const { transcript } = event.results[0][0];
      addUserMessage(transcript);
      handleNewUserMessage(transcript);
    };
  };

  return (
    <GuestLayout>
      <div className="container p-b-md p-r-md p-l-md has-text-centered">
        <h1>
          Chat with me
        </h1>
        <hr />
        <p className={styles.info}>
          To start, press on the bottom right icon!
        </p>
        <p className="microphone">
          {speechRecognition && !listening && (
            <button
              type="button"
              className="button"
              onClick={handleVoiceRecognition}
            >
              🎤🎤🎤 Press and ask 🎤🎤🎤
            </button>
          )}
          {listening && (
            <span>I am listening....</span>
          )}
        </p>
        <div className="chat">
          <Widget
            handleNewUserMessage={handleNewUserMessage}
            title="Chat to EU Demo"
            subtitle="For now I can answer about your rights on brexit or obtaining residence in Poland."
          />
        </div>
        <hr />
      </div>
    </GuestLayout>
  );
}
