const USER_TABLE = "NewApp::User";
const USER_ID = "NewApp::usid";

const SetToJSON = $.import('xsjs.user', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();

function usersCreate(param){
    $.trace.error(JSON.stringify(param));
    var after = param.afterTableName;

    //Get Input New Record Values
    var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = setToJSON.recordSetToJSON(oResult, "items");
    var oUser = oUserItems.items[0];
    $.trace.error(JSON.stringify(oUser));

    //TODO now HERE you have oUser object. Similar to xsjs/lib/user/user.xsjslib method doPost line 13

	pStmt = param.connection.prepareStatement('select \"${USER_ID}\".NEXTVAL from dummy');
	var result = pStmt.executeQuery();

    while (result.next()) {
		oUser.id = result.getString(1);
	}

    $.trace.error(JSON.stringify(oUser));
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement(`insert into \"${USER_TABLE}\" values(?,?)`);
	Execute(pStmt, oUser);
	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
	pStmt.executeUpdate();
	pStmt.close();
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );
	Execute(pStmt, oUser);
}

function Execute(pStmt, oUser) {
	pStmt.setString(1, oUser.id.toString());
	pStmt.setString(2, oUser.name.toString());		
	pStmt.executeUpdate();
	pStmt.close();	
}

        return input;
    }
    else{

        return "";
    }
}
