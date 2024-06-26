export enum Roles {
	MEMBER = 'MEMBER',
	LEADER = 'LEADER',
	TEACHER = 'TEACHER',
	ADMIN = 'ADMIN',
}

export enum  Permissions {
	EDIT_COURSE = 'EDIT_COURSE',
	DELETE_COURSE = 'DELETE_COURSE',
	CREATE_COURSE = 'CREATE_COURSE',

	CREATE_TEAM = 'CREATE_TEAM',
	EDIT_TEAM = 'EDIT_TEAM',
	DELETE_TEAM = 'DELETE_TEAM',

	CREATE_WORKS = 'CREATE_WORKS',
	EDIT_WORKS = 'EDIT_WORKS',
	DELETE_WORKS = 'DELETE_WORKS',

	EDIT_PROFILE = 'EDIT_PROFILE',
}