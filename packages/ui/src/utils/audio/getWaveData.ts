export const getWaveData = async (
  audioFile: Blob,
  waveSegments: number = 30,
): Promise<{
  waveData: number[];
  duration: number;
}> => {
  // @ts-ignore - Can ignore this cause AudioContext varies
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

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

    const rms = Math.sqrt(sum / waveSize);
    waveData.push(rms);
  }

  const maxAmp = Math.max(...waveData);
  if (maxAmp > 0) {
    // Normalize to [0; 1] range
    for (let i = 0; i < waveData.length; i++) {
      waveData[i] = (waveData[i] / maxAmp) * 100;
    }
  }

  audioContext.close();

  return { waveData, duration: audioBuffer.duration };
};
