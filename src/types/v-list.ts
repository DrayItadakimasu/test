export interface Header {
  title: string;
  value: string;
}

export interface ListEvent {
  getVisibleItems(): unknown[];
}