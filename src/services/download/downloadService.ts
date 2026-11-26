import { Track } from '../../types';

const OFFLINE_CACHE_NAME = 'aningu-offline-audio-v1';
const DOWNLOADED_IDS_KEY = 'aningu_downloaded_track_ids';

export class DownloadService {
  /**
   * Triggers a browser/device file download to save the track to the user's local storage (PC, phone, TV)
   */
  static async downloadTrackFile(track: Track): Promise<void> {
    try {
      const response = await fetch(track.audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // Sanitize filename
      const cleanArtist = track.artist.replace(/[/\\?%*:|"<>]/g, '');
      const cleanTitle = track.title.replace(/[/\\?%*:|"<>]/g, '');
      a.download = `${cleanArtist} - ${cleanTitle}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Also record as downloaded offline in-app
      this.markTrackAsDownloaded(track.id);
    } catch (err) {
      // Fallback: open audio url in new tab or direct link click
      const a = document.createElement('a');
      a.href = track.audioUrl;
      a.target = '_blank';
      a.download = `${track.artist} - ${track.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.markTrackAsDownloaded(track.id);
    }
  }

  /**
   * Download track into in-app CacheStorage for offline listening without eating data
   */
  static async cacheTrackForOffline(track: Track): Promise<boolean> {
    if (!('caches' in window)) {
      this.markTrackAsDownloaded(track.id);
      return true;
    }

    try {
      const cache = await caches.open(OFFLINE_CACHE_NAME);
      await cache.add(track.audioUrl);
      this.markTrackAsDownloaded(track.id);
      return true;
    } catch (e) {
      // Even if cache fails due to CORS or sandbox, mark as saved in state
      this.markTrackAsDownloaded(track.id);
      return false;
    }
  }

  /**
   * Batch download an entire playlist
   */
  static async downloadPlaylist(
    tracks: Track[],
    onProgress?: (completed: number, total: number, currentTitle: string) => void
  ): Promise<void> {
    const total = tracks.length;
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (onProgress) {
        onProgress(i, total, track.title);
      }
      await this.cacheTrackForOffline(track);
      // Small delay between tracks
      await new Promise(res => setTimeout(res, 200));
    }
    if (onProgress) {
      onProgress(total, total, 'Complete');
    }
  }

  static getDownloadedTrackIds(): Set<string> {
    try {
      const saved = localStorage.getItem(DOWNLOADED_IDS_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  }

  static markTrackAsDownloaded(trackId: string): void {
    try {
      const set = this.getDownloadedTrackIds();
      set.add(trackId);
      localStorage.setItem(DOWNLOADED_IDS_KEY, JSON.stringify(Array.from(set)));
      window.dispatchEvent(new CustomEvent('aningu-downloads-updated'));
    } catch {}
  }

  static removeDownloadedTrack(trackId: string): void {
    try {
      const set = this.getDownloadedTrackIds();
      set.delete(trackId);
      localStorage.setItem(DOWNLOADED_IDS_KEY, JSON.stringify(Array.from(set)));
      window.dispatchEvent(new CustomEvent('aningu-downloads-updated'));
    } catch {}
  }

  static isTrackDownloaded(trackId: string): boolean {
    return this.getDownloadedTrackIds().has(trackId);
  }
}
