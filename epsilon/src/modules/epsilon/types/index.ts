export type AppModes = 'FULL' | 'POLICE' | 'DOC';

export type LeftPanelModes = 'FILES' | 'NETWORKS';

export type BottomPanelModes = 'TERMINAL';

export type RightPanelModes = 'OTHER';

export interface EpsilonContextType {
  appMode: AppModes
  setAppMode: (mode: AppModes) => void
  locked: boolean
  setLock: (value: boolean) => void

  // Left Panel
  isLeftPanelOpened: boolean
  setIsLeftPanelOpened: (value: boolean) => void
  leftPanelMode: LeftPanelModes
  setLeftPanelMode: (mode: LeftPanelModes) => void
  leftPanelSearch: string
  setLeftPanelSearch: (value: string | null) => void

  // Bottom Panel
  isBottomPanelOpened: boolean
  setIsBottomPanelOpened: (value: boolean) => void
  bottomPanelMode: BottomPanelModes
  setBottomPanelMode: (mode: BottomPanelModes) => void

  // Right Panel
  isRightPanelOpened: boolean
  setIsRightPanelOpened: (value: boolean) => void
  rightPanelMode: RightPanelModes
  setRightPanelMode: (mode: RightPanelModes) => void

  // Top Bar
  isTopBarOpened: boolean
  setIsTopBarOpened: (value: boolean) => void
}
