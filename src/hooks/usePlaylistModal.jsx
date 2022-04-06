import {useState} from 'react'

export function usePlaylistModal() {
    
  const [savePlaylistModal, setSavePlaylistModal] = useState(false);
  return {savePlaylistModal, setSavePlaylistModal}
}
