import * as React from 'react';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

type ToastContextType = {
  toast: (props: ToastProps) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // Simple implementation - in a real app, you'd want to use a proper toast library
  const toast = React.useCallback((props: ToastProps) => {
    console.log('Toast:', props);
    // In a real implementation, this would show a toast notification
    alert(`${props.title}\n${props.description}`);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (context === undefined) {
    // Provide a default implementation if used outside a provider
    return {
      toast: (props: ToastProps) => {
        console.log('Toast (default):', props);
      }
    };
  }
  
  return context;
}
