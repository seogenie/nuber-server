import { Greeting, SayHelloQueryArgs } from "../../../types/graph";

const resolvers = {
    Query : {
        sayHello: (_, args: SayHelloQueryArgs) : Greeting => {
            return {
                error: true,
                text: `hello ${args.name}`
            }
        }
    }
}

export default resolvers;