/// <reference path="ajax.js" />
/// <reference path="settings.js" />

var Database = {

    methods: {
        createTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        readTables: function (obj) {
            return Ajax.send(obj, Settings.urls.readUrl)
        },
        updateTables: function (obj) {
            return Ajax.send(obj, Settings.urls.updateUrl)
        },
        screenTables: function (obj) {
            return Ajax.send(obj, Settings.urls.screensUrl)
        },
        logTables: function (obj) {
            return Ajax.send(obj, Settings.urls.logUrl)
        },
        colorsTables: function (obj) {
            return Ajax.send(obj, Settings.urls.kol)
        }
    }
}