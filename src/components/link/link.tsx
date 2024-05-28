import {FC, ReactNode} from 'react';
import { Link as RRDLink } from 'react-router-dom';
import styles from './link.module.css'

export interface LinkProps {
	children: ReactNode;
	to: string;
	className?: string;
}
const Link: FC<LinkProps> = (props) => {
	const className = props.className ? props.className + ' ' + styles.link : styles.link

	return (
		<RRDLink
			to={props.to}
			className={className}
		>
			{props.children}
		</RRDLink>
	);
};

export default Link;