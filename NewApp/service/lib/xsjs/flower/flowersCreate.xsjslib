const FLOWER_TABLE = "NewApp::Flower";
const FLOWER_ID = "NewApp::flid";

const SetToJSON = $.import('xsjs.flower', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();

function flowersCreate(param){
	$.trace.error(JSON.stringify(param));
	var after = param.afterTableName;

    	//Get Input New Record Values
    	var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    	var oResult = pStmt.executeQuery();

    	var oFlowerItems = setToJSON.recordSetToJSON(oResult, "items");
    	var oFlower = oFlowerItems.items[0];
    	$.trace.error(JSON.stringify(oFlower));

    	//TODO now HERE you have oFlower object. Similar to xsjs/lib/flower/flower.xsjslib method doPost line 13

    	pStmt = param.connection.prepareStatement(`select \"${FLOWER_ID}\".NEXTVAL from dummy`);
    	var result = pStmt.executeQuery();

    	while (result.next()) {
		oFlower.id = result.getString(1);
	}
	$.trace.error(JSON.stringify(oFlower));
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement(`insert into \"${FLOWER_TABLE}\" values(?,?)`);
	Execute(pStmt, oFlower);
	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
	pStmt.executeUpdate();
	pStmt.close();
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );
	Execute(pStmt, oFlower);
}

function Execute(pStmt, oFlower) {
	pStmt.setString(1, oFlower.id.toString());
	pStmt.setString(2, oFlower.name.toString());		
	pStmt.executeUpdate();
	pStmt.close();	
}
