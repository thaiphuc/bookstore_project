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
    },  // Giá trị giảm giá theo số tiền
    minOrderValue: { 
        type: Number 
    },  // Giá trị đơn hàng tối thiểu để áp dụng voucher
    validFrom: { 
        type: Date, 
        default: Date.now 
    },  // Thời gian bắt đầu hiệu lực
    validUntil: { 
        type: Date 
    },  // Thời gian hết hiệu lực
    usageLimit: { 
        type: Number 
    },  // Số lần sử dụng tối đa
    usedCount: { 
        type: Number, 
        default: 0 
    },  // Số lần đã sử dụng
    isActive: { 
        type: Boolean, 
        default: true 
    },  // Trạng thái kích hoạt của voucher
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
