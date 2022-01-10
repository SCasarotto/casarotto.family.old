import { UserMessageSound } from 'types';

import b2 from './b2.mp3';
import slack from './slack.mp3';
import starcraftChatSound from './starcraft_chat_sound.mp3';

export const messageSounds = {
  b2,
  starcraftChatSound,
  slack,
};
export const getMessageSoundUrl = (
  soundSelection?: UserMessageSound | null,
) => {
  switch (soundSelection) {
    case 'Starcraft Message':
      return starcraftChatSound;
    case 'Slack':
      return slack;
    case 'Default':
    case 'None':
    default:
      return b2;
  }
};
