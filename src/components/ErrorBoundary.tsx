import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('Dhanus Gold Fitness - Uncaught Error in Component Tree:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFC400]/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="relative z-10 max-w-lg w-full bg-[#0A0A0A] border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center">
            {/* Gold Icon Badge */}
            <div className="w-16 h-16 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#FFC400]">
              <ShieldAlert className="w-8 h-8" />
            </div>

            {/* Error Title */}
            <span className="text-[10px] font-mono font-bold text-[#FFC400] uppercase tracking-[0.25em] block mb-2">
              Dhanus Gold Fitness · System Notice
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight leading-snug mb-3">
              Something Went Wrong
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-8">
              We encountered an unexpected issue while rendering this section. Our training equipment is still standing strong—let's get you back on track.
            </p>

            {/* Dev Error Details */}
            {this.state.error && (
              <div className="mb-8 p-3.5 bg-black/60 border border-zinc-800/80 rounded-xl text-left overflow-x-auto text-[11px] font-mono text-zinc-400">
                <p className="text-[#FFC400] font-bold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{this.state.error.name}: {this.state.error.message}</span>
                </p>
              </div>
            )}

            {/* Recovery Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-gold text-black font-sans font-black text-xs uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#FFC400]/15 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-black" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#FFC400]/40 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#FFC400]" />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
