import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 3000;
async function main() {
    try{
        await prisma.$connect();
        console.log("Connect  to Database Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(error){
        console.error("An Error occur: ", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();