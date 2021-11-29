import React, { ChangeEvent, useCallback, useState } from 'react';

import { FormRow, Label } from 'react-tec';

import { EditorPopup } from './EditorPopup';
import {
  ImageWrapperLabel,
  Image,
  UploadIcon,
  Input,
  ClearButtonIcon,
  ClearButton,
} from './styledComponents';

export type ProfileImageRowProps = {
  src?: string;
  file?: File;
  onChange: (file?: File) => void;
  filePattern?: RegExp;
  className?: string;
};
export const ProfileImageRow: React.FC<ProfileImageRowProps> = (props) => {
  const { file, onChange, src, filePattern, className = '' } = props;

  const [fileToEdit, setFileToEdit] = useState<File>();
  const [inputKey, setInputeKey] = useState(0);

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      const file = files?.[0];
      if (!file) {
        console.error('No file provided to input.');
        return;
      }

      setFileToEdit(file);
    },
    [filePattern],
  );

  return (
    <FormRow className={`ProfileImageRow ${className}`}>
      <Label htmlFor='profileImage'>Profile Image</Label>
      <ImageWrapperLabel htmlFor='profileImage'>
        {src || file ? (
          <>
            <Image src={file ? URL.createObjectURL(file) : src} alt='profile' />
            <ClearButton
              onClick={(e) => {
                e.preventDefault();
                onChange(undefined);
                setInputeKey(inputKey + 1);
              }}
            >
              <ClearButtonIcon />
            </ClearButton>
          </>
        ) : (
          <UploadIcon />
        )}
      </ImageWrapperLabel>
      <Input
        key={inputKey}
        accept='image/*'
        type='file'
        id='profileImage'
        onChange={onFileChange}
        pattern={filePattern?.toString()}
        multiple={false}
      />
      {fileToEdit && (
        <EditorPopup
          visible={!!fileToEdit}
          onClose={() => {
            setFileToEdit(undefined);
            setInputeKey((k) => k + 1);
          }}
          onSubmit={(editor) => {
            if (editor) {
              editor.getImage().toBlob((blob) => {
                if (blob) {
                  onChange(
                    new File([blob], 'profile_image', {
                      lastModified: Date.now(),
                    }),
                  );
                }
              });
            }
            setFileToEdit(undefined);
            setInputeKey((k) => k + 1);
          }}
          avatarEditorData={{
            image: fileToEdit,
          }}
        />
      )}
    </FormRow>
  );
};
