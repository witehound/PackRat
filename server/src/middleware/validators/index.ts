import { celebrate, Joi, Segments } from "celebrate";


export const JoiObjectId = (message = 'valid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)

// export default userRoutesValidator;
export * from "./userRoutesValidator.ts";
export * from "./tripRoutesValidator.ts";
export * from "./packRoutesValidator.ts";
export * from "./itemRoutesValidator.ts";