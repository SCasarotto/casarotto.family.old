import { useState, useEffect, useCallback } from 'react';

import { SketchPicker } from 'react-color';
import {
  Button,
  Form,
  FormRow,
  Label,
  SegmentedGroup,
  SelectRow,
  usePopups,
} from 'react-tec';

import { useAppContext } from 'contexts';
import { UserMessageSound } from 'types';

import { saveChatSettings } from './requests';
import { Container, SettingsPanel } from './styledComponents';

// messageBackgroundColor?: string; // hex
// messageSound?: string; // url
// // Text To Speech
// textToSpeechVoice?: string; // Name of Voice
// textToSpeechVolume?: number; // 0-1
// textToSpeechRate?: number; // 0.1-10
// textToSpeechPitch?: number; // 0-2
// textToSpeechLang?: LanguageTag;

export const Settings: React.FC = () => {
  const popupFunctions = usePopups();
  const { user } = useAppContext();
  const [messageBackgroundColorToggle, setMessageBackgroundColorToggle] =
    useState<'Default' | 'Custom'>('Default');
  const [messageBackgroundColor, setMessageBackgroundColor] = useState<
    string | null
  >(null);
  const [messageSound, setMessageSound] = useState<UserMessageSound>('Default');

  useEffect(() => {
    if (user?.chatSettings) {
      const { messageBackgroundColor, messageSound } = user.chatSettings;

      if (messageBackgroundColor) {
        setMessageBackgroundColor(messageBackgroundColor);
        setMessageBackgroundColorToggle('Custom');
      }
      setMessageSound(messageSound ?? 'Default');
    } else {
      setMessageBackgroundColorToggle('Default');
      setMessageBackgroundColor(null);
      setMessageSound('Default');
    }
  }, [user]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user?.uid) {
        return;
      }
      const data = {
        uid: user.uid,
        userSettingsData: {
          messageBackgroundColor,
          messageSound,
        },
        popupFunctions,
      };
      saveChatSettings(data);
    },
    [user?.uid, messageBackgroundColor, messageSound, popupFunctions],
  );

  return (
    <Container>
      <SettingsPanel title='Settings'>
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <Label>Message Background Color</Label>
            <SegmentedGroup
              labelForKey='messageBackgroundColorToggle'
              checkedValue={messageBackgroundColorToggle}
              buttonArray={['Default', 'Custom']}
              onChange={(e) => {
                const colorToggle = e.target.value as 'Default' | 'Custom';
                setMessageBackgroundColorToggle(colorToggle);
                if (colorToggle === 'Default') {
                  setMessageBackgroundColor(null);
                }
              }}
            />
            {messageBackgroundColorToggle === 'Custom' && (
              <SketchPicker
                disableAlpha
                color={messageBackgroundColor ?? undefined}
                onChange={(color) => setMessageBackgroundColor(color.hex)}
              />
            )}
          </FormRow>
          <SelectRow
            title='New Message Sound'
            labelForKey='messageSound'
            value={{ label: messageSound, value: messageSound }}
            options={[
              { label: 'Default', value: 'Default' },
              { label: 'Starcraft Message', value: 'Starcraft Message' },
              { label: 'Slack', value: 'Slack' },
              { label: 'None', value: 'None' },
            ]}
            onChange={(selection) =>
              setMessageSound(selection?.value ?? 'Default')
            }
          />
          <Button type='submit'>Save</Button>
        </Form>
      </SettingsPanel>
    </Container>
  );
};
