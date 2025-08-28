import { FC } from 'react'
import ReactPlayer from 'react-player'

interface VideoProps {
  url: string
}

const VideoEmbed: FC<VideoProps> = (props) => {
  const { url } = props

  return <ReactPlayer src={url} height="210px" width="390px" controls />
}

export default VideoEmbed
