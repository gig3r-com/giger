export interface IControlsProps {
    leftSideOption?: string | 'back';
    onLeftSideClick?: () => void;
    rightSideOption?: string;
    onRightSideClick?: () => void;
    navigateBack?: boolean;
}
