import { getEmbeddedVideoUrl } from "@/utils";
import { Button } from "antd";

export const RenderVideo = ({ videoUrl }: { videoUrl: string }) => {

  const { embedUrl, type } = getEmbeddedVideoUrl(videoUrl);


  return <span >
    {videoUrl && type === 'iframe' && (
      <iframe
        width={720}
        className={` rounded-md ${' aspect-video'}`}
        src={embedUrl || ""}
        title="Embedded video"
        allowFullScreen
      ></iframe>
    )}

    {videoUrl && type === 'video' && (
      <video width={720} className={` rounded-md  aspect-video bg-gray-400`} controls>
        <source src={embedUrl || ""} />
        Your browser does not support the video tag.
      </video>


    )}

    {videoUrl && type === 'link' && (
      <a href={embedUrl || ''} target="_blank" rel="noopener noreferrer">
        <Button type='dashed' className="text-navy" >
          Click here to view the video
        </Button>

      </a>
    )}

    {videoUrl && type === 'invalid' && (
      <p className=" text-red-500 text-wrap whitespace-break-spaces">The entered URL is not valid. Please provide a valid URL.</p>
    )}
  </span>

}