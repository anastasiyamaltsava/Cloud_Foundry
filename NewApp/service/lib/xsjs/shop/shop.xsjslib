var shop = function (connection) {

    const SHOP_TABLE = "NewApp::ExtraInfo.Shops";

    this.doDelete = function (shid) {
        const statement = createPreparedDeleteStatement(SHOP_TABLE, {shid: shid});
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function createPreparedDeleteStatement(sTableName, oConditionObject) {
        let oResult = new Result();

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }

        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };

    function Result() {
        this.aParams = [];
        this.aValues = [];
        this.sql = "";
    };
};