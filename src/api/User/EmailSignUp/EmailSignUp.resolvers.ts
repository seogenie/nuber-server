import User from "../../../entities/User";
import { 
    EmailSignUpMutationArgs, 
    EmailSignUpResponse 
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (
            _, 
            args: EmailSignUpMutationArgs 
        ): Promise<EmailSignUpResponse> => {
            const { email } = args
            try {
                const existingUser = await User.findOne({ email })
                if(existingUser){
                    return {
                        ok: false,
                        error: "you shuold log in instead",
                        token: null
                    }
                } else {
                    const phoneVerification = await Verification.findOne({
                        payload: args.phoneNumber,
                        verified: true
                    })
                    if(phoneVerification){
                        const newUser = await User.create({ ...args }).save()
                        if (newUser.email) {
                            const emailVerification = await Verification.create({
                                payload: newUser.email,
                                target: "EMAIL"
                            })
                            await sendVerificationEmail(
                                newUser.fullName, 
                                emailVerification.key
                            )
                        }
                        const token = createJWT(newUser.id)
                        return {
                            ok: true,
                            error: null,
                            token
                        }
                    } else {
                        return {
                            ok: false,
                            error: "인증된 번호를 가지고 있지 않습니다.",
                            token: null
                        }
                    }
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers