export default class Actions {
	static NORMAL = "NORMAL";
	static SINGIN = "SINGIN";
	static SUCCESSFUL = "SUCCESSFUL";
	static FAILED = "FAILED";
	static getNormal() {
	    return {
	        type: Actions.NORMAL
	    };
	}

	static getSignin(){
	    return {
	        type: Actions.SINGIN
	    };
	}

	static successful(userInfo){
	    return {
	        type: Actions.SUCCESSFUL,
	        userInfo
	    };
	}

	static failed(){
	    return {
	        type: Actions.FAILED
	    };
	}
}
