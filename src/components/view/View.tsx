import { client } from "@/sanity/lib/client";
import { Ping } from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

interface Props {
    slug: string;
}

export const View = async ({slug}: Props) => {
    const {views} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY,{slug});

    // TODO update number of views
  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping/>
        </div>
        <p className="view-text">
            <span className="font-black">{views === 1? '1 view':views + ' views'}</span>
        </p>
    </div>
  )
}
