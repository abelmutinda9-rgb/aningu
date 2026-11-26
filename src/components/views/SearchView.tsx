import React, { useState, useEffect } from 'react';
import { Search, X, Play, Music, Mic2 } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { MusicService } from '../../services/music/musicService';
import { Track } from '../../types';

const GENRE_TILES = [
  { name: 'Pop', color: '#148A08' },
  { name: 'Hip-Hop', color: '#BC5900' },
  { name: 'R&B & Soul', color: '#8D67AB' },
  { name: 'Indie & Alt', color: '#E8115B' },
  { name: 'Chill', color: '#1E3264' },
  { name: 'Workout', color: '#777777' },
  { name: 'Focus', color: '#503750' },
  { name: 'Rock', color: '#E13300' },
  { name: 'Latin', color: '#E91429' },
  { name: 'Electronic', color: '#283EA3' },
  { name: 'Afrobeats', color: '#D84000' },
  { name: 'Jazz & Blues', color: '#431407' },
];

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    tracks: Track[];
    artists: any[];
    albums: any[];
    playlists: any[];
  }>({ tracks: [], artists: [], albums: [], playlists: [] });
  const [audiusTracks, setAudiusTracks] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { playTrack, selectAlbum, selectPlaylist } = usePlayer();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ tracks: [], artists: [], albums: [], playlists: [] });
      setAudiusTracks([]);
      return;
    }

    const local = MusicService.searchCatalog(query);
    setResults(local);

    setIsSearching(true);
    const timer = setTimeout(() => {
      MusicService.searchAudiusKeyless(query).then(tracks => {
        setAudiusTracks(tracks);
        setIsSearching(false);
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const hasResults =
    results.tracks.length > 0 ||
    results.artists.length > 0 ||
    results.albums.length > 0 ||
    audiusTracks.length > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 font-['Figtree'] pb-24">
      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search
          size={20}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#121212]"
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full h-12 pl-11 pr-10 rounded-full bg-white text-[#121212] placeholder-[#535353] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#535353] hover:text-black"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Query Results View */}
      {query ? (
        <div className="space-y-8">
          {isSearching && (
            <div className="text-xs text-[#a7a7a7] animate-pulse">
              Searching keyless music networks...
            </div>
          )}

          {results.tracks.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Result Card */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Top result</h2>
                <div
                  onClick={() => playTrack(results.tracks[0])}
                  className="p-5 bg-[#181818] hover:bg-[#242424] rounded-lg cursor-pointer transition-all group relative"
                >
                  <img
                    src={results.tracks[0].coverUrl}
                    alt={results.tracks[0].title}
                    className="w-24 h-24 rounded-md object-cover mb-4 shadow-lg"
                  />
                  <h3 className="text-2xl font-black text-white truncate">
                    {results.tracks[0].title}
                  </h3>
                  <p className="text-sm text-[#a7a7a7] mt-1">
                    Song • <span className="text-white font-semibold">{results.tracks[0].artist}</span>
                  </p>
                  <button className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-[#1ED760] text-black grid place-items-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-105">
                    <Play size={20} fill="currentColor" className="ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Songs List */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Songs</h2>
                <div className="space-y-1">
                  {results.tracks.slice(0, 4).map(track => (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] cursor-pointer group"
                    >
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {track.title}
                        </div>
                        <div className="text-xs text-[#a7a7a7] truncate">
                          {track.artist}
                        </div>
                      </div>
                      <span className="text-xs text-[#a7a7a7] tabular-nums mr-2">
                        {Math.floor(track.duration / 60)}:{Math.floor(track.duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Keyless Audius / Web Streams Results */}
          {audiusTracks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Music size={18} className="text-[#1ED760]" />
                Keyless Web & Audius Streams
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {audiusTracks.map(track => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="p-3 bg-[#181818] hover:bg-[#242424] rounded-md cursor-pointer transition-all group"
                  >
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full aspect-square object-cover rounded-md mb-2"
                    />
                    <div className="text-sm font-bold text-white truncate">
                      {track.title}
                    </div>
                    <div className="text-xs text-[#a7a7a7] truncate mt-0.5">
                      {track.artist}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasResults && !isSearching && (
            <div className="text-center py-16 text-[#a7a7a7]">
              <p className="text-lg font-semibold text-white">No results found for "{query}"</p>
              <p className="text-xs mt-1">Please make sure your words are spelled correctly or try different keywords.</p>
            </div>
          )}
        </div>
      ) : (
        /* Browse All Category Tiles */
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Browse all
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {GENRE_TILES.map(genre => (
              <div
                key={genre.name}
                onClick={() => setQuery(genre.name)}
                style={{ backgroundColor: genre.color }}
                className="relative aspect-square rounded-lg p-3 sm:p-4 cursor-pointer overflow-hidden shadow transition-transform hover:scale-102"
              >
                <span className="text-base sm:text-lg font-black text-white tracking-tight block">
                  {genre.name}
                </span>
                <div className="absolute -bottom-2 -right-3 w-16 h-16 sm:w-20 sm:h-20 bg-black/20 rounded-lg transform rotate-25 shadow-md flex items-center justify-center">
                  <Music size={24} className="text-white/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
