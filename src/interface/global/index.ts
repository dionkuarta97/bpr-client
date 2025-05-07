import React from 'react';
export type Row<T> = T & {
  actions?: {
    actionName: string;
    action: () => void;
    icon: React.ComponentType;
  }[];
};

export type Column<T> = {
  field: string;
  headerName: string;
  width: number;
  render?: (row: T) => React.ReactNode;
};
