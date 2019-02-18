const FLOWER_TABLE = "NewApp::Flower";

const SetToJSON = $.import('xsjs.flower', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();
const CURR_TIMESTAMP_FUN = "current_timestamp";

function flowersUpdate(param) {
	var after = param.afterTableName;

  	var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  	var oResult = pStmt.executeQuery();

  	var oFlowerItems = setToJSON.recordSetToJSON(oResult, "items");
  	var oFlower = oFlowerItems.items[0];
  	$.trace.error(JSON.stringify(oFlower));

  	pStmt.close();
  	pStmt = param.connection.prepareStatement(`UPDATE \"${FLOWER_TABLE}\" SET "name"='${oFlower.name}', "ts_update" = ${CURR_TIMESTAMP_FUN} WHERE "flid"=${oFlower.flid}`);
  	exucuteAndClose(pStmt);
  // 	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
	// exucuteAndClose(pStmt);
	// pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?)" );
  // 	pStmt.setString(1, oFlower.flid.toString());
	// pStmt.setString(2, oFlower.name.toString());
  // 	exucuteAndClose(pStmt);
}

function exucuteAndClose(pStmt) {
	pStmt.executeUpdate();
	pStmt.close();
}
