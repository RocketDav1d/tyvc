import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

type FileDropzoneProps = {
  onUpload: (files: File[]) => void;
  acceptedFormats: { [id: string]: string[] };
  supportedFormatsLabel: string;
};

function FileDropzone({
  onUpload,
  acceptedFormats,
  supportedFormatsLabel,
}: FileDropzoneProps) {
  const { t } = useTranslation('common');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFormats,
  });

  return (
    <div {...getRootProps()}>
      <div className="flex text-sm text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative font-medium text-primary bg-white rounded-md cursor-pointer hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
        >
          <span className="text-base underline">
            {t('upload-modal.select-files')}
          </span>
          <input {...getInputProps()} />
        </label>
      </div>
      {supportedFormatsLabel ? (
        <p className="mt-2 text-sm text-gray-500">{supportedFormatsLabel}</p>
      ) : null}
    </div>
  );
}

export default FileDropzone;
