import React from 'react';
import { useStore, AppId } from '../../store/useStore';
import { Window } from './Window';
import { AboutApp, ProjectsApp, ExperienceApp, SkillsApp, ContactApp, SettingsApp, VSCodeApp } from '../apps/Apps';
import { SafariApp } from '../apps/Safari';
import { Terminal } from '../apps/Terminal';
import { GamesApp } from '../apps/Games';
import { DownloadsApp } from '../apps/Downloads';

const apps: Record<AppId, React.FC> = {
  about: AboutApp,
  projects: ProjectsApp,
  experience: ExperienceApp,
  skills: SkillsApp,
  contact: ContactApp,
  settings: SettingsApp,
  safari: SafariApp,
  vscode: VSCodeApp,
  terminal: Terminal,
  games: GamesApp,
  downloads: DownloadsApp,
};

export const WindowManager: React.FC = () => {
  const { windows } = useStore();

  return (
    <>
      {Object.entries(windows).map(([id, state]) => {
        if (!state.isOpen) return null;
        
        const AppComponent = apps[id as AppId];
        return (
          <Window key={id} id={id as AppId}>
            <AppComponent />
          </Window>
        );
      })}
    </>
  );
};
