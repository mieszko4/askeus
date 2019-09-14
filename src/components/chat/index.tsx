import * as React from 'react';
import style from './style.scss';
import GuestLayout from '../guest-layout';

export default function () {
  return (
    <GuestLayout>
      <div className="container p-b-md p-r-md p-l-md has-text-centered">
        <hr />
        <iframe 
        src="https://webchat.botframework.com/embed/askeus-bot?s=UvRyJ-7HVyc.qbtZC1m6oHCMgmZv7Ew6cz1lir3SJqf6hbVzBnOvdp4" 
        className={style.iframe}></iframe>
      </div>
    </GuestLayout>
  );
}
