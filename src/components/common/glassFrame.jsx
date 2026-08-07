import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

// Auth layout (historically "GlassFrame", name kept — 4 pages import it).
// Split-screen: brand panel with the looping product video under an indigo
// glass gradient on the left; frosted-glass form card on the right. The
// form side follows the light/dark tokens.
const FEATURES = [
  "Tüm pazaryeri siparişleriniz tek ekranda",
  "Kurye, stok ve lisans yönetimi",
  "Anlık sipariş bildirimleri ve otomatik onay",
];

const GlassFrame = ({ component, className, className2 }) => {
  return (
    <section className={cn("min-h-[100dvh] flex", className)}>
      {/* Brand panel */}
      <aside className="hidden lg:flex flex-col justify-between w-[42%] max-w-[34rem] p-10 xl:p-14 text-white relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          loop
          autoPlay
          muted
          playsInline
        >
          <source
            src="https://liwapos.com/lws/Pentegrasyonback.mp4"
            type="video/mp4"
          />
        </video>
        {/* Indigo glass over the video keeps the copy readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/90 via-[#5b4fe9]/80 to-[#7c3aed]/90" />

        <Link to="/" className="font-[conthrax] text-2xl relative">
          Pentegrasyon
        </Link>

        <div className="relative">
          <h2 className="text-3xl xl:text-4xl font-bold leading-tight">
            Restoranınızın tüm siparişleri tek panelde
          </h2>
          <p className="mt-3 text-indigo-100/90">
            GetirYemek, YemekSepeti, MigrosYemek ve TrendyolYemek
            entegrasyonlarıyla siparişlerinizi tek yerden yönetin.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-[0.65rem] font-bold">
                  ✓
                </span>
                <span className="text-sm text-indigo-50">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-indigo-200/80">
          Pentegrasyon bir LiwaSoft iştirakidir. · Müşteri Hizmetleri{" "}
          <a href="tel:08508407807" className="text-white hover:underline">
            0850 840 78 07
          </a>
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex-1 flex flex-col bg-[--white-2] text-[--black-1] relative overflow-hidden">
        {/* Soft glows behind the glass card */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[--primary-1]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-[--primary-2]/10 blur-3xl pointer-events-none" />

        <Link
          to="/"
          className="lg:hidden font-[conthrax] text-xl text-center text-[--primary-1] pt-8 relative"
        >
          Pentegrasyon
        </Link>

        <div className="flex-1 flex items-center justify-center px-6 py-10 relative">
          <div
            className={cn(
              "w-full max-w-md rounded-2xl border border-[--border-1] bg-[--white-1]/95 backdrop-blur-xl shadow-modal p-8 max-sm:p-6",
              className2
            )}
          >
            {component}
          </div>
        </div>

        {/* Visible at every breakpoint (was lg:hidden): the privacy policy
            has to be reachable from the auth pages, and on desktop the brand
            panel's copy of the company line doesn't carry the link. */}
        <p className="pb-6 px-6 text-center text-xs text-[--gr-1] relative">
          <span className="lg:hidden">
            Pentegrasyon bir LiwaSoft iştirakidir. · Müşteri Hizmetleri{" "}
            <a href="tel:08508407807" className="text-[--link-1]">
              0850 840 78 07
            </a>{" "}
            ·{" "}
          </span>
          <Link
            to="/privacy-policy"
            className="text-[--link-1] hover:underline"
          >
            Gizlilik Politikası ve Kullanım Şartları
          </Link>
        </p>
      </main>
    </section>
  );
};

export default GlassFrame;
