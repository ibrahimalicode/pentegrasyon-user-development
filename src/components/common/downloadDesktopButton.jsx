//COMP
import { cn } from "../../lib/utils";
import { DownloadI } from "../../assets/icon";
import { TOOLBAR_BTN } from "./toolbarStyles";

const DESKTOP_APP_URL = "https://liwapos.com/lws/pentegrasyon.exe";

// One link, rendered wherever a page offers the desktop app, so the URL and
// the label can never drift between pages.
const DownloadDesktopButton = ({ className }) => (
  <a
    href={DESKTOP_APP_URL}
    title="Pentegrasyon masaüstü uygulamasını indir"
    className={cn(TOOLBAR_BTN, className)}
  >
    <DownloadI className="size-5" strokeWidth={1.8} />
    Pentegrasyon Desktop
  </a>
);

export default DownloadDesktopButton;
