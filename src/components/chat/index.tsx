import * as React from 'react';
import GuestLayout from '../guest-layout';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import styles from './styles.scss';

function handleNewUserMessage(newMessage) {
  console.log(`New message incoming! ${newMessage}`);
  
  fetch(`/api/ask?question=${newMessage}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          console.log(result.answers);
          addResponseMessage(result.answers[0].answer);
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

export default function () {
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
        <div className="App">
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
