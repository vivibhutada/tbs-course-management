const { allow } = require("joi");

module.exports = {
    TIME_ZONES: {
        UTC: 'UTC',
        ASIA_KOLKATA: 'Asia/Kolkata',
        // AMERICA_NEW_YORK: 'America/New_York',
        // EUROPE_LONDON: 'Europe/London',
        // Add more time zones as needed
    },

    SystemDateFormat: 'YYYY-MM-DD', 
    SystemDateTimeFormat: 'YYYY-MM-DD HH:mm:ss', 
    UserDateTimeFormat: 'MMMM Do YYYY, h:mm:ss a', // User-friendly date format
    UserDateFormat: 'MMMM Do YYYY',
    InputDateFormat: 'YYYY-MM-DD', // to take date input from user
    ManageFileUpload: {
        FILE_SIZE_LIMIT: {
            UNIT: 'MB', // Possible values: 'KB', 'MB'
            SIZE: 1,    // Size in the specified unit
            NOOFfILES: 1 // No of file to be allowed

        },
        Images:{
            allowed:[
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp',
                'application/pdf',
            ],
            allowedmsg:"Only .pdf, .jpg, .jpeg, .png, .webp files are allowed."
        },
        Import:{
            allowed:[
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'application/vnd.ms-excel'
            ],
            allowedmsg:"Only .xlsx, .csv,and .xls files are allowed."
        },
        Default:{
            allowed:[
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'image/jpeg',
              'image/jpg',
              'image/png',
              'image/webp',
               'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
               'application/vnd.ms-excel'
            ],
            allowedmsg:"Only .pdf, .doc, .docx, .jpg, .jpeg, .png, .xlsx, .webp and .xls files are allowed."
        }
    },
   limit:2, //pagination limit
};
