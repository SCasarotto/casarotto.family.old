import { LanguageTag } from 'config/localData';

import { Permission } from './Permission';

export type UserProfile = {
  small?: string;
  large?: string;
};
export type UserMessageSound =
  | 'Default'
  | 'Starcraft Message'
  | 'Slack'
  | 'None';
export type UserChatSettings = {
  messageBackgroundColor?: string | null; // hex
  messageSound?: UserMessageSound | null;
  // Text To Speech
  textToSpeechVoice?: string | null; // Name of Voice
  textToSpeechVolume?: number | null; // 0-1
  textToSpeechRate?: number | null; // 0.1-10
  textToSpeechPitch?: number | null; // 0-2
  textToSpeechLang?: LanguageTag | null;
};
export type RawUser = {
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: number;
  profile: UserProfile | null;
  profileDateUpdated: number | null;
  permissions: Array<Permission>;
  chatSettings?: UserChatSettings;
  active: boolean;
};
export type User = RawUser & {
  uid: string;
};
