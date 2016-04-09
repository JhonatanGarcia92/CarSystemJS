/**
 * Created by Jhonatan Garcoa on 09/04/2016.
 */
var TPC = (function(){
    var tpc = {};
    tpc.replaceWithData = function (target, obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var pattern = '\{\{' + prop + '\}\}';
                var er = new RegExp(pattern, 'g');
                target.innerHTML = target.innerHTML.replace(er,obj[prop]);
            }
        }
    };
    return tpc;
})();
