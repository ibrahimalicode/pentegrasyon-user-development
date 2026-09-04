//MODULES
import React from "react";

// Route-level error boundary. Before this existed, ANY render error — e.g.
// an order arriving for a marketplace without a table renderer — unmounted
// the entire React tree and left a white screen on every page until a
// manual refresh. Now the crash is contained to the routed content with a
// reload prompt; the header and sidebar stay alive.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    // A route change gets a fresh try instead of a sticky error panel.
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[60dvh] w-full flex-col items-center justify-center gap-3 px-6 pt-24 text-center">
          <p className="text-base font-semibold text-[--black-1]">
            Bir şeyler ters gitti
          </p>
          <p className="max-w-sm text-sm text-[--gr-1]">
            Sayfa görüntülenirken bir hata oluştu. Yenilemek genellikle
            çözer; sorun sürerse destek ile iletişime geçin.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[--primary-1] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4338ca]"
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
