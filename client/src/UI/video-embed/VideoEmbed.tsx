import ReactPlayer from 'react-player'

interface VideoProps {
  url: string
}

export const VideoEmbed = (props: VideoProps) => {
  const { url } = props

  return <ReactPlayer src={url} height="210px" width="390px" controls />
}
