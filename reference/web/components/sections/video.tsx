import { Video as VideoPlayer } from '@/components/ui/video';
import { type Media } from "@/lib/types";

export function Video({ video, poster }: { video: Media; poster: Media }) {
  return (
    <section className="py-12 md:py-20 bg-forest-100 noise [--noise-blend-mode:color-burn]">
     <div className="container">
        <div className="mx-auto lg:max-w-[70%]">
          <VideoPlayer poster={poster.url} src={video.url} />
        </div>
     </div>
    </section>
  )
}
 