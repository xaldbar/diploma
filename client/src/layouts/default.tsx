import {FC} from "react";
import styles from './default.module.css'
import Container from "../components/container/container.tsx";

interface DefaultLayoutProps {
	children: React.ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = (props) =>  {
	return (
		<div className={styles.defaultLayout}>
			<Container>
				{props.children}
			</Container>
		</div>
	);
}

export default DefaultLayout;