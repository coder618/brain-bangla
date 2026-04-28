import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface IOrder extends Document {
  userId?: string;
  orderId: string;
  name: string;
  phone: string;
  address: string;
  postCode?: string;
  paymentMethod: string;
  transactionId?: string;
  items: IOrderItem[];
  total: number;
  status: string;
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String }
}, { _id: false });

const OrderSchema: Schema = new Schema({
  userId: { type: String },
  orderId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  postCode: { type: String },
  paymentMethod: { type: String, required: true, default: 'cod' },
  transactionId: { type: String },
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, required: true, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Avoid compiling model multiple times in serverless environment
export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);