import { ProfileType } from '../../../types';

export type NodeType = {
  name: string;
  type: 'info' | 'folder' | 'connection' | 'chat' | 'gig';
  isLocked?: boolean;
  files?: NodeType[];
  needFetching?: boolean;
  profileData?: ProfileType;
  data?: {};
  isRoot?: boolean;
};

export type DirectoryPropsType = {
  isProfile?: boolean;
  handle?: string;
};

export type ProfileNodeType = {
  handle: string;
};
