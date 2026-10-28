const closeAudioContext = (audioContext: AudioContext) => {
  try {
    Promise.resolve(audioContext.close()).catch(() => {});
  } catch {
    // Already closed: nothing to release
  }
};

export const getWaveData = async (
  audioFile: Blob,
  waveSegments: number = 30,
): Promise<{
  waveData: number[];
  duration: number;
}> => {
  // @ts-ignore - Can ignore this cause AudioContext varies
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  try {
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const rawData = audioBuffer.getChannelData(0);

    const waveSize = Math.floor(rawData.length / waveSegments);
    const waveData = [];

    // Calculate rms
    for (let i = 0; i < waveSegments; i++) {
      const start = i * waveSize;
      const end = start + waveSize;

      let sum = 0;
      for (let j = start; j < end && j < rawData.length; j++) {
        sum += rawData[j] * rawData[j];
      }

      // Audio shorter than waveSegments samples has empty segments
      const rms = waveSize > 0 ? Math.sqrt(sum / waveSize) : 0;
      waveData.push(rms);
    }

    const maxAmp = Math.max(...waveData);
    if (maxAmp > 0) {
      // Normalize to [0; 1] range
      for (let i = 0; i < waveData.length; i++) {
        waveData[i] = (waveData[i] / maxAmp) * 100;
      }
    }

    return { waveData, duration: audioBuffer.duration };
  } finally {
    // Close even when decoding fails: browsers limit live AudioContexts
    closeAudioContext(audioContext);
  }
};
