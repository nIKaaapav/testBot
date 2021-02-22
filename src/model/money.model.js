import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MoneySchema = new Schema({
    time:{
        type: Date,
        required: true
    },
    rates: {
        type: ObjectId,
        required: true,
    }
});

export default mongoose.model('money', MoneySchema);