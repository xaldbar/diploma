import './App.css'
import LoginPage from "./pages/login-page/login-page.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import CoursesPage from "./pages/courses-page/courses-page.tsx";
import NotFound from "./pages/not-found/not-found.tsx";
import Header from "./components/header/header.tsx";
import {toCoursesPage, toLoginPage, toProfilePage, toWorksPage} from "./core/routes/routes.ts";
import ProfilePage from "./pages/profile-page/profile-page.tsx";
import CoursePage from "./pages/course-page/course-page.tsx";
import WorksPage from "./pages/works-page/works-page.tsx";
import WorkPage from "./pages/work-page/work-page.tsx";
import GroupPage from "./pages/group-page/group-page.tsx";

function App() {
	const location = useLocation();

	const isLoginPage = location.pathname === '/login'


  	return (
		  <>
			  {!isLoginPage && <Header/>}
			  <Routes>
				  <Route path={'/'} element={<Navigate to={toLoginPage()} replace />}/>
				  <Route path={toCoursesPage()} element={<CoursesPage/>}/>
				  <Route path={'/courses/:id'} element={<CoursePage/>}/>

				  <Route path={toWorksPage()} element={<WorksPage/>}/>
				  <Route path={'/works/:id'} element={<WorkPage/>}/>

				  <Route path={toLoginPage()} element={<LoginPage/>} />
				  <Route path={toProfilePage()} element={<ProfilePage/>} />
				  <Route path={'/groups/:id'} element={<GroupPage/>} />
				  <Route path="*" element={<NotFound />} />
			  </Routes>
			  <ToastContainer/>
		  </>
  	)
}

export default App
