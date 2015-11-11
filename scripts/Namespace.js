function Namespace (packageName) {

    var $private = {};
    var $public = this;

    $public.init = function (packageName) {
        if (typeof packageName !== 'string') {
            return;
        }

        if (window[packageName] === undefined || window[packageName].constructor !== Object) {
            window[packageName] = {};
            return window[packageName];
        }

        window[packageName] = window[packageName] || {};
        return window[packageName];
    };

    return $public.init(packageName);
}
