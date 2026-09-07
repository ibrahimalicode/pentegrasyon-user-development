//COMP
import { cn } from "../../lib/utils";
import { DownloadI } from "../../assets/icon";

const DESKTOP_APP_URL = "https://liwapos.com/lws/pentegrasyon.exe";

// One link, rendered wherever a page offers the desktop app, so the URL and
// the label can never drift between pages.
const DownloadDesktopButton = ({ className }) => (
  <a
    href={DESKTOP_APP_URL}
    title="Pentegrasyon masaüstü uygulamasını indir"
    className={cn(
      "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[--green-1] text-sm font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--green-1]/40",
      className
    )}
  >
    <DownloadI className="size-5" strokeWidth={1.8} />
    Pentegrasyon Desktop
  </a>
);

export default DownloadDesktopButton;
