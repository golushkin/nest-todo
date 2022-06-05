import { Model } from "mongoose"
import { User } from "../../src/schemas/user.schema"

export const generateDbName = () => `${Date.now()}-${Math.round(Math.random() * 100_000_000_000)}`

export const createUser = async (userModel: Model<User>) => {
  return userModel.create({userName: 'test', pass: 'test'})
}