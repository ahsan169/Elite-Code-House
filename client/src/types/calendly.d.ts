interface CalendlyInlineWidget {
  url: string;
  parentElement: HTMLElement;
}

interface CalendlyStatic {
  initInlineWidget(options: CalendlyInlineWidget): void;
}

declare global {
  interface Window {
    Calendly?: CalendlyStatic;
  }
}

export {};
