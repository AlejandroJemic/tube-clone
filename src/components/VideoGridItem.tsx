import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

export type VideoGridItemProps = {
    id: string;
    title: string;
    channel: {
        id: string;
        name: string;
        profileUrl: string;
    };
    views: number;
    postedAt: Date;
    duration: number;
    thumbnailUrl: string;
    videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
})

function VideoGridItem({
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,
}: VideoGridItemProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current === null) return
        if (isVideoPlaying) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
        }
        else videoRef.current.pause()
    }, [isVideoPlaying])

    return (
        <div className="flex flex-col gap-2"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}>
            <a className="relative aspect-video"
                href={`/watch${id}`}>
                <img
                    className="block w-full h-full object-cover rounded-xl"
                    src={thumbnailUrl} alt={title}
                />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                    {formatDuration(duration)}
                </div>
                <video ref={videoRef} muted playsInline src={videoUrl}
                className={`block u-full object-cover  absolute inset-0 rounded-xl transition-opacity duration-200 opacity-0 ${isVideoPlaying ? "opacity-100" : "opacity-0"}`}/>
            </a>
           
            <div className="flex gap-2">
                <a className="flex-shrink-0"
                    href={`/@ ${channel.id}`}>
                    <img
                        className="size-10 rounded-full"
                        src={channel.profileUrl} alt={channel.name}
                    />
                </a>
                <div className="flex flex-col">
                    <a href={`/watch?v=${id}`} className="font-bold">{title}</a>
                    <a href={`/@${channel.id}`} className="text-sm text-secondary-text ">{channel.name}</a>
                    <span className="text-sm text-secondary-text">{VIEW_FORMATTER.format(views)} views • {formatTimeAgo(postedAt)}</span>
                </div>
            </div>
        </div>
    );
}

export default VideoGridItem;
