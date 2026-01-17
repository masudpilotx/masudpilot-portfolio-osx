# MacOS Portfolio 🍎

A stunning, interactive portfolio website built with React and TypeScript that replicates the macOS desktop experience on the web.

![Portfolio Preview](public/screenshots/preview.png)

## ✨ Features

- **Authenticated macOS Experience**: Realistic desktop interface with Menu Bar, Dock, and Window Management.
- **Interactive Dock**: Smooth magnification effects powered by Framer Motion.
- **Window Management**:
  - Drag and drop windows
  - Minimize, Maximize, and Close animations
  - Z-index handling (focused window on top)
- **Included Apps**:
  - 📝 **About Me**: Personal biography and information
  - 💼 **Experience**: Interactive timeline of professional work
  - 🚀 **Projects**: Grid view of portfolio projects
  - 🛠 **Skills**: Visual breakdown of technical expertise
  - 💻 **Terminal**: Fully functional shell simulation
  - 🌐 **Safari**: Web browser simulation
  - 📝 **VS Code**: Integrated code editor view
  - 📧 **Contact**: Built-in contact form
  - 🎮 **Games**: Interactive mini-games
  - ⚙️ **Settings**: System preferences (Dark Mode, Wallpaper, etc.)
- **System Features**:
  - Functional Control Center (WiFi, Bluetooth, brightness, volume)
  - Dark/Light mode toggle
  - Spotlight Search (visual only)
  - Real-time clock and calendar

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/masudpilotx/masudpilot-portfolio-osx.git
   cd masudpilot-portfolio-osx
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Visit `http://localhost:5173` to view the application.

## 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory, ready to be deployed to Vercel, Netlify, or GitHub Pages.

## � Deployment

### GitHub Pages (Automated)

This project is configured to deploy to GitHub Pages easily.

1.  **Configure `vite.config.ts`**:

    - If deploying to a user site (e.g., `username.github.io`), set `base: "/"`.
    - If deploying to a project site (e.g., `username.github.io/repo`), set `base: "/repo-name/"`.

2.  **Deploy**:
    Run the following command to build and deploy to the `gh-pages` branch:

    ```bash
    npm run deploy
    ```

3.  **Enable GitHub Pages**:
    - Go to Repository Settings -> Pages.
    - Select Source: **Deploy from a branch**.
    - Select Branch: **gh-pages**.

## �📁 Project Structure

```
src/
├── components/
│   ├── apps/          # Individual application components (Safari, Terminal, etc.)
│   ├── common/        # Shared UI components (ErrorBoundary, etc.)
│   ├── desktop/       # Desktop properties (Icons, Widgets)
│   ├── layout/        # Main layout (Desktop, Dock, MenuBar)
│   ├── os/            # OS-level features (WindowManager, ControlCenter)
│   └── ui/            # Generic UI elements
├── hooks/             # Custom hooks (useTime, etc.)
├── store/             # Global state management (Zustand)
└── utils/             # Helper functions
```

## 🎨 Customization

### Changing Wallpaper

Update the wallpaper configuration in `src/store/useStore.ts` or add new images to `public/wallpapers/`.

### Adding a New App

1. Create a new component in `src/components/apps/`.
2. Add the app configuration to `defaultWindows` in `src/store/useStore.ts`.
3. Add the app logic to `src/components/layout/Dock.tsx` (if you want it in the dock) or `src/components/os/Spotlight.tsx`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed & Built with ❤️ by [Masud Pilot](https://github.com/masudpilotx)
