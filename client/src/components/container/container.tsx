import {FC} from "react";
import styles from './container.module.css'

export interface ContainerProps {
	children?: React.ReactNode;
}

const Container: FC<ContainerProps> = (props) => {
	return (
		<div className={styles.container}>
			{props.children}
		</div>
	);
};

export default Container;