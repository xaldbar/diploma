export interface AppRoute {
	url: string
	page: any
}

export const toLoginPage = () => '/login'

export const toCoursesPage = () => '/courses'
export const toCoursesIdPage = (id: string) => `/courses/${id}`

export const toWorksPage = () => '/works'
export const toWorksIdPage = (id: string) => `/works/${id}`
export const toGroupPage = (id: string) => `/groups/${id}`
export const toProfilePage = () => '/profile'
export const toErrorPage = () => '/404'

