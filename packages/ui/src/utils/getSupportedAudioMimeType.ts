const audioMimeTypes = ['audio/mp4', 'audio/webm'];

export const getSupportedAudioMimeType = () => {
  const supportedMimeType = audioMimeTypes.find((mimeType) =>
    MediaRecorder.isTypeSupported(mimeType),
  );

  if (!supportedMimeType) {
    throw new Error(
      `None of these mime types are supported: ${audioMimeTypes.join(', ')}`,
    );
  }

  return supportedMimeType;
};
