import React, { useState, useRef, FormEvent } from 'react';

import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor';
import { Popup, PopupProps, Label, Button } from 'react-tec';

import {
  Container,
  Row,
  RotateButtonWrapper,
  RotateButton,
  UndoRotationIcon,
  RedoRotationIcon,
  ButtonContainer,
  LeftButton,
  RightButton,
} from './styledComponents';

export type ProfileImageRowEditorPopupProps = PopupProps & {
  avatarEditorData: AvatarEditorProps;
  onSubmit: (editor: AvatarEditor | null) => void;
  onClose: () => void;
};
export const EditorPopup: React.FC<ProfileImageRowEditorPopupProps> = (
  props,
) => {
  const { visible, avatarEditorData, onClose, onSubmit } = props;

  const [editorScale, setEditorScale] = useState(1.1);
  const [rotation, setRotation] = useState(0);
  const editor = useRef<AvatarEditor>(null);

  return (
    <Popup visible={visible}>
      <Container>
        <Row>
          <AvatarEditor
            ref={editor}
            width={300}
            height={300}
            border={20}
            // borderRadius={editorRadius}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={editorScale}
            rotate={rotation}
            {...avatarEditorData}
          />
        </Row>
        <Row>
          <Label htmlFor='scale'>Zoom</Label>
          <input
            name='scale'
            id='scale'
            type='range'
            onChange={(e) => setEditorScale(Number(e.target.value))}
            min='0.5'
            max='2.5'
            step='0.01'
            value={editorScale}
          />
        </Row>
        <Row>
          <Label>Rotate</Label>
          <RotateButtonWrapper>
            <RotateButton onClick={() => setRotation(rotation + 90)}>
              <UndoRotationIcon />
            </RotateButton>
            <RotateButton onClick={() => setRotation(rotation - 90)}>
              <RedoRotationIcon />
            </RotateButton>
          </RotateButtonWrapper>
        </Row>
      </Container>
      <ButtonContainer>
        <LeftButton onClick={onClose}>Cancel</LeftButton>
        <RightButton onClick={() => onSubmit(editor.current)}>Done</RightButton>
      </ButtonContainer>
    </Popup>
  );
};
