function currentUserIsAdmin() {
	var result = false;
	var {
		role = null
	} = window.current_user;

	var roles = [
		"ROLE_SUPER_ADMIN",
		"ROLE_ADMIN"
	] ;
	
	if (
		role &&
		roles.indexOf(role) !== -1
	) {
		result = true;
	}
	return result;
}

function currentUserIsManager() {
	var result = false;
	var {
		role = null
	} = window.current_user;

	var roles = [
		"ROLE_MANAGER",
	] ;
	
	if (
		role &&
		roles.indexOf(role) !== -1
	) {
		result = true;
	}
	return result;
}

function currentUserIsConseiller() {
	var result = false;
	var {
		role = null
	} = window.current_user;

	var roles = [
		"ROLE_CONSEILLER",
	] ;
	
	if (
		role &&
		roles.indexOf(role) !== -1
	) {
		result = true;
	}
	return result;
}

function currentUserIsAdminOrManager() {
	var result = false;
	if (
		currentUserIsAdmin() ||
		currentUserIsManager()
	) {
		result = true;
	}
	return result;
}

export {
	currentUserIsAdmin,
	currentUserIsManager,
	currentUserIsConseiller,
	currentUserIsAdminOrManager,
}