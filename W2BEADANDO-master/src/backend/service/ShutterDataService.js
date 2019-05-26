function ShutterDataService(shutterDataDao) {
    winston = require('winston')
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' })
        ]
    });

    if(shutterDataDao !== undefined) {
        this.shutterDataDao = shutterDataDao;
    } else {
        this.shutterDataDao = require('../dao/ShutterDataDao');
    }
}

ShutterDataService.prototype.getAllShutterColors = function(successCallback, errorCallback){
    this.shutterDataDao.getAllShutterColors((colors) => {
        logger.info(`getAllShutterColors: ${colors.length} colors were found!`)
        successCallback(colors)
    }, (error) => {
        logger.error("Error in getAllShutterColors, cause: " + error)
        errorCallback(error)
    })
}

ShutterDataService.prototype.getAllShutterMaterials = function(successCallback, errorCallback){
    this.shutterDataDao.getAllShutterMaterials((materials) => {
        logger.info(`getAllShutterMaterials: ${materials.length} materials were found!`)
        successCallback(materials)
    }, (error) => {
        logger.error("Error in getAllShutterMaterials, cause: " + error)
        errorCallback(error)
    })
}

ShutterDataService.prototype.getAllShutterTypes = function(successCallback, errorCallback){
    this.shutterDataDao.getAllShutterTypes((shutterTypes) => {
        logger.info(`getAllShutterTypes: ${shutterTypes.length} shutter types were found!`)
        successCallback(shutterTypes)
    }, (error) => {
        logger.error("Error in getAllShutterTypes, cause: " + error)
        errorCallback(error)
    })
}

module.exports = ShutterDataService;
