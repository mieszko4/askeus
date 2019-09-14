import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <section className="hero is-info is-fullheight">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          Welcome to Ask EU
        </h1>
        <h2 className="subtitle">
          A friendly chatbot for getting the valid source of information about European Union
        </h2>
        <Link to="/chat" className="button">Ask now!</Link>
      </div>
    </div>
  </section>
);
