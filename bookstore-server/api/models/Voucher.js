const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    discountAmount: { 
        type: Number 
    }, 
    minOrderValue: { 
        type: Number 
    },  
    validFrom: { 
        type: Date, 
        default: Date.now 
    },  
    validUntil: { 
        type: Date 
    }, 
    usageLimit: { 
        type: Number, 
        default: 1 
    },  
    usedCount: { 
        type: Number, 
        default: 0 
    }, 
    isActive: { 
        type: Boolean, 
        default: true 
    },  
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});


const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
