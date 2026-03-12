const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/civicseva').then(async () => {
    await mongoose.connection.db.collection('users').deleteMany({});
    console.log("Successfully cleared all stale database users.");
    process.exit();
});
