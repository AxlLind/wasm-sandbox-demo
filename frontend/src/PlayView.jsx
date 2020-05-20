import React from 'react';
import { useLocation } from 'react-router';
import Game from './Game/Game';

function PlayView() {
  const query = new URLSearchParams(useLocation().search);
  const xPlayer = query.get('x');
  const oPlayer = query.get('o');
  return <Game xPlayer={xPlayer} oPlayer={oPlayer} />;
}

export default PlayView;
