const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    //Referencia de checklist (Um checklist pode ter várias tasks)
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema);