import React from 'react';
import { useLocation } from 'react-router';
import Game from './Game/Game';

function PlayView() {
  const query = new URLSearchParams(useLocation().search);

  // Get the bots from the url params
  const xPlayer = query.get('xPlayer');
  const oPlayer = query.get('oPlayer');
  return (
    <div>
      <div>What a thing</div>
      <Game xPlayer={xPlayer} oPlayer={oPlayer} />
    </div>
  );
}

export default PlayView;
