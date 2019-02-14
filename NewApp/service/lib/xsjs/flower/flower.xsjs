const Flowerlib = $.import('xsjs.flower', 'flower').flower;
const flowerLib = new Flowerlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET : {
                    flowerLib.doGet();
                    break;
                }
                case $.net.http.PUT : {
                    flowerLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    flowerLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    flowerLib.doDelete($.request.parameters.get("flowerid"));
                    break;
                }
                default: {
                    $.response.status = $.net.http.METHOD_NOT_ALLOWED;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());
