import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import youtube from './api/youtube';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchRandomVideos();
  }, []);

  const fetchRandomVideos = async () => {
    const response = await youtube.get('/search', {
      params: {
        q: 'trending',
        type: 'video',
        maxResults: 10,
      },
    });

    setVideos(response.data.items);
    setSelectedVideo(null);
  };

  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        type: 'video',
        maxResults: 10,
      },
    });

    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="ui container">
      <SearchBar onFormSubmit={onTermSubmit} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            {selectedVideo ? (
              <VideoDetail video={selectedVideo} />
            ) : (
              <div>Wähle ein Video aus, um es anzusehen...</div>
            )}
          </div>
          <div className="five wide column">
            <VideoList videos={videos} onVideoSelect={onVideoSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
