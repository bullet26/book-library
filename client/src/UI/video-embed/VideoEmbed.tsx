import { FC } from 'react'
import ReactPlayer from 'react-player'

interface VideoProps {
  url: string
}

const VideoEmbed: FC<VideoProps> = (props) => {
  const { url } = props

  return <ReactPlayer url={url} height="350px" width="350px" controls />
}

export default VideoEmbed
