import React from 'react';
import { useStore, AppId } from '../../store/useStore';
import { Window } from './Window';
import { AboutApp, ProjectsApp, ExperienceApp, SkillsApp, ContactApp, SettingsApp } from '../apps/Apps';
import { SafariApp } from '../apps/Safari';

const apps: Record<AppId, React.FC> = {
  about: AboutApp,
  projects: ProjectsApp,
  experience: ExperienceApp,
  skills: SkillsApp,
  contact: ContactApp,
  settings: SettingsApp,
  safari: SafariApp,
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
