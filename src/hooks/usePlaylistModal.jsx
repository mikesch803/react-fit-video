import {useState} from 'react'

export default function usePlaylistModal() {
    
  const [savePlaylistModal, setSavePlaylistModal] = useState(false);
  return {savePlaylistModal, setSavePlaylistModal}
}
