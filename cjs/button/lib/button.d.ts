import { FunctionComponent, ReactNode, MouseEventHandler } from 'react';
export interface ButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLElement>;
    type?: string;
    size?: string;
    shape?: string;
    className?: string;
}
declare const Button: FunctionComponent<ButtonProps>;
export default Button;
