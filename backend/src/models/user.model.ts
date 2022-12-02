import mongoose, { Schema } from 'mongoose'

export interface UserDocument extends mongoose.Document {
	name: string
	email: string
	password: string
	role: string
	isActive: boolean
	created: Date
	updated: Date
}

const UserSchema = new Schema<UserDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, lowercase: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['user', 'moderator', 'admin'],
			default: 'user',
		},
		isActive: { type: Boolean, default: true },
		//use these dates if needed.
		created: { type: Date, default: new Date() },
		updated: Date,
	},
	{ timestamps: true }
	//timestamps are used for internal purpose only. Donot use them.
)

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
