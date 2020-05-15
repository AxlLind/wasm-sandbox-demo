import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';

function PlayView() {
  const { state } = useLocation();

  if (!state || !state.botOne || !state.botTwo) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      Placeholder for debugging!
      <br />
      bot 1 = {state.botOne}
      <br />
      bot 2 = {state.botTwo}
    </div>
  );
}

export default PlayView;
