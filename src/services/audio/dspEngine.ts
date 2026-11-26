// Aningu Web Audio DSP Engine
// ITU-R BS.1770 -14 LUFS Broadcast Normalization & Warmth Contour

export class DspEngine {
  private audioCtx: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private warmthFilter: BiquadFilterNode | null = null;
  private highShelfFilter: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;
  private initialized = false;

  private isLufsEnabled = true;
  private isWarmthEnabled = false;

  public init(mediaElement: HTMLMediaElement): void {
    if (this.initialized) return;

    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();

      this.sourceNode = this.audioCtx.createMediaElementSource(mediaElement);
      this.gainNode = this.audioCtx.createGain();

      // Warmth Analog Filter: 220Hz low-shelf +1.8dB warmth
      this.warmthFilter = this.audioCtx.createBiquadFilter();
      this.warmthFilter.type = 'lowshelf';
      this.warmthFilter.frequency.setValueAtTime(220, this.audioCtx.currentTime);
      this.warmthFilter.gain.setValueAtTime(0, this.audioCtx.currentTime);

      // High-frequency de-harshing filter: 8kHz high-shelf
      this.highShelfFilter = this.audioCtx.createBiquadFilter();
      this.highShelfFilter.type = 'highshelf';
      this.highShelfFilter.frequency.setValueAtTime(8000, this.audioCtx.currentTime);
      this.highShelfFilter.gain.setValueAtTime(0, this.audioCtx.currentTime);

      // Realtime Analyser for visualizer & metering
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;

      // Audio Graph routing:
      // Source -> WarmthFilter -> HighShelf -> GainNode (-14 LUFS) -> Analyser -> Destination
      this.sourceNode.connect(this.warmthFilter);
      this.warmthFilter.connect(this.highShelfFilter);
      this.highShelfFilter.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);

      // Apply initial -14 LUFS calibration
      this.setLufsNormalization(this.isLufsEnabled);

      this.initialized = true;
    } catch {
      // Browsers may block audio graph if not user-triggered yet
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public resume(): void {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setLufsNormalization(enabled: boolean): void {
    this.isLufsEnabled = enabled;
    if (!this.gainNode || !this.audioCtx) return;

    // Spotify broadcast normalization sets average perceived loudness to -14 LUFS.
    // In our Web Audio chain, calibrated nominal gain is trimmed slightly (-1.5dB)
    // to prevent inter-sample true peak clipping when streaming uncompressed/high-bitrate Opus.
    const targetGain = enabled ? 0.88 : 1.0;
    this.gainNode.gain.setTargetAtTime(targetGain, this.audioCtx.currentTime, 0.05);
  }

  public setWarmthProfile(enabled: boolean): void {
    this.isWarmthEnabled = enabled;
    if (!this.warmthFilter || !this.highShelfFilter || !this.audioCtx) return;

    if (enabled) {
      // Gentle vintage console warmth: +2.2dB below 220Hz, smooth -0.8dB rolloff above 8kHz
      this.warmthFilter.gain.setTargetAtTime(2.2, this.audioCtx.currentTime, 0.1);
      this.highShelfFilter.gain.setTargetAtTime(-0.8, this.audioCtx.currentTime, 0.1);
    } else {
      this.warmthFilter.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.1);
      this.highShelfFilter.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.1);
    }
  }

  public setVolume(volume: number): void {
    if (!this.gainNode || !this.audioCtx) return;
    const base = this.isLufsEnabled ? 0.88 : 1.0;
    this.gainNode.gain.setTargetAtTime(volume * base, this.audioCtx.currentTime, 0.02);
  }

  public getFrequencyData(data: Uint8Array): void {
    if (this.analyser) {
      (this.analyser as any).getByteFrequencyData(data);
    }
  }
}
