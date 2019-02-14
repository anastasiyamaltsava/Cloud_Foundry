var flower = function (connection) {

    const FLOWER_TABLE = "NewApp::Flower";
    const FLOWER_ID = "NewApp::flid";

    this.doGet = function (obj) {
        const result = connection.executeQuery('SELECT * FROM "${FLOWER_TABLE}"');

        result.forEach(x => $.trace.error(JSON.stringify(x)));

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oFlower) {

        oFlower.flid = this.getNextval(FLOWER_ID);

        const statement = createPreparedInsertStatement(FLOWER_TABLE, oFlower);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oFlower));
    };

    this.doPut = function (obj) {

      const statement = createPreparedUpdateStatement(FLOWER_TABLE, obj);
      connection.executeUpdate(statement.sql, statement.aValues);

      connection.commit();
      $.response.status = $.net.http.OK;
      $.response.setBody(JSON.stringify(obj));
    };

    this.doDelete = function (rowID) {
        const statement = createPreparedDeleteStatement(FLOWER_TABLE, rowID);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from "${FLOWER_TABLE}"`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    function createPreparedInsertStatement(sTableName, oValueObject) {
      let oResult = new Result();

        let sColumnList = '', sValueList = '';

        for(let key in oValueObject){
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);            
        }

        $.trace.error("svalue " + sValueList);
        $.trace.error("scolumn: " + sColumnList);

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createPreparedUpdateStatement(sTableName, oValueObject) {
        let oResult = new Result();

        let sColumnList = '', sValueList = '';

        for(let key in oValueObject){
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);            
        }

        $.trace.error("svalue " + sValueList);
        $.trace.error("scolumn: " + sColumnList);

        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `update "${sTableName}" set (${sColumnList}) = (${sValueList}) where "${oResult.aParams[0]}" = '${oResult.aValues[0]}'`;

        $.trace.error("sql to update: " + oResult.sql);
        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, rowID) {
        let oResult = new Result();

        oResult.sql = `DELETE FROM "${sTableName}" WHERE "flid"=${rowID};`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };
    
    function Result() {
        this.aParams = [];
        this.aValues = [];
        this.sql = "";
    };
};
