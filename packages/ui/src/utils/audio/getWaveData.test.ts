import { afterEach, describe, expect, test, vi } from 'vitest';
import { getWaveData } from './getWaveData';

const audioBlob = () =>
  ({
    arrayBuffer: async () => new ArrayBuffer(8),
  }) as Blob;

const stubAudioContext = (
  decodeAudioData: () => Promise<Partial<AudioBuffer>>,
) => {
  const close = vi.fn(async () => {});

  vi.stubGlobal(
    'AudioContext',
    class {
      decodeAudioData = decodeAudioData;

      close = close;
    },
  );

  return close;
};

describe('getWaveData', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('returns normalized wave and duration', async () => {
    const close = stubAudioContext(async () => ({
      duration: 2,
      getChannelData: () => new Float32Array([0.5, -0.5, 1, -1]),
    }));

    await expect(getWaveData(audioBlob(), 2)).resolves.toEqual({
      waveData: [50, 100],
      duration: 2,
    });
    expect(close).toHaveBeenCalledTimes(1);
  });

  test('closes the audio context when decoding fails', async () => {
    const close = stubAudioContext(async () => {
      throw new DOMException('Unable to decode audio data', 'EncodingError');
    });

    await expect(getWaveData(audioBlob())).rejects.toThrow(
      'Unable to decode audio data',
    );
    expect(close).toHaveBeenCalledTimes(1);
  });

  test('returns a flat wave for audio shorter than the segments', async () => {
    stubAudioContext(async () => ({
      duration: 0.001,
      getChannelData: () => new Float32Array([0.5]),
    }));

    const { waveData } = await getWaveData(audioBlob(), 30);

    expect(waveData).toHaveLength(30);
    expect(waveData.every((wave) => wave === 0)).toBe(true);
  });
});
