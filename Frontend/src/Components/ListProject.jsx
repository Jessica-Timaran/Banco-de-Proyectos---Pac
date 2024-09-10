import { List, ListItem } from '@tremor/react';

export function ListProject({ children }) {
  return (
    <div className="mx-auto w-full">
      <List>
        {children}
      </List>
    </div>
  );
}