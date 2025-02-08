export interface DesktopIcon {
  id: string;
  title: string;
  icon: string;    // path to icon image
  appType: 'notepad' | 'explorer' | 'taskmanager' | string;  // extensible for new apps
  position?: {     // optional for default positioning
    x: number;
    y: number;
  };
}

export interface AppState {
  content?: string;        // For Notepad content
  position?: {            // For window positions
    x: number;
    y: number;
  };
  isMaximized?: boolean;  // For window state
  // Add more app-specific state properties as needed
}

export interface AppProps {
  state?: AppState;
  onStateChange?: (newState: AppState) => void;
  windowId: string;
} 