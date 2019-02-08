var user = function (connection) {

    const USER_TABLE = "NewApp::User";

    this.doGet = function (obj) {
        const result = connection.executeQuery('SELECT * FROM "NewApp::User"');

        result.forEach(x => $.trace.error(JSON.stringify(x)));

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oUser) {

        oUser.usid = this.getNextval("NewApp::usid");

        const statement = createPreparedInsertStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };

    this.doPut = function (obj) {

      const statement = createPreparedUpdateStatement(USER_TABLE, obj);
      connection.executeUpdate(statement.sql, statement.aValues);

      connection.commit();
      $.response.status = $.net.http.CREATED;
      $.response.setBody(JSON.stringify(obj));
    };

    this.doDelete = function (rowID) {
        const statement = createPreparedDeleteStatement(USER_TABLE, rowID);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    function createPreparedInsertStatement(sTableName, oValueObject) {
      let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(value => {
            sColumnList += `"${value}",`;
            oResult.aParams.push(value);
        });

        Object.values(oValueObject).forEach(value => {
            sValueList += "?, ";
            oResult.aValues.push(value);
        });

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
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(value => {
            sColumnList += `"${value}",`;
            oResult.aParams.push(value);
        });

        Object.values(oValueObject).forEach(value => {
            sValueList += "?, ";
            oResult.aValues.push(value);
        });

        $.trace.error("svalue " + sValueList);
        $.trace.error("scolumn: " + sColumnList);

        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `update "${sTableName}" set (${sColumnList}) = (${sValueList}) where "${oResult.aParams[0]}" = '${oResult.aValues[0]}'`;

        $.trace.error("sql to update: " + oResult.sql);
        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, rowID) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        oResult.sql = `DELETE FROM "${sTableName}" WHERE "usid"=${rowID};`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };
};
