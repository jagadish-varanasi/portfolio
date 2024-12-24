// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function main() {
//   const vara = await prisma.user.findUnique({
//     where: { email: "vara@gmail.com" },
//   });

//   if (!vara) return;

//   const project = await prisma.project.create({
//     data: {
//       name: "Project RAISE",
//       description: "Build RAISE in more user centric way",
//       startDate: new Date(),
//       endDate: new Date(),
//       tasks: {
//         create: [
//           {
//             title:
//               "You can't compress the program without quantifying the open-source SSD pixel!",
//             status: "INPROGRESS",
//             label: "DOCUMENTATION",
//             priority: "MEDIUM",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
//             status: "BACKLOG",
//             label: "DOCUMENTATION",
//             priority: "MEDIUM",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title: "We need to bypass the neural TCP card!",
//             status: "TODO",
//             label: "BUG",
//             priority: "HIGH",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
//             status: "BACKLOG",
//             label: "FEATURE",
//             priority: "MEDIUM",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "I'll parse the wireless SSL protocol, that should driver the API panel!",
//             status: "CANCELED",
//             label: "FEATURE",
//             priority: "MEDIUM",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "Use the digital TLS panel, then you can transmit the haptic system!",
//             status: "DONE",
//             label: "BUG",
//             priority: "HIGH",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
//             status: "DONE",
//             label: "FEATURE",
//             priority: "HIGH",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title: "We need to program the back-end THX pixel!",
//             status: "TODO",
//             label: "FEATURE",
//             priority: "LOW",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
//             status: "INPROGRESS",
//             label: "DOCUMENTATION",
//             priority: "HIGH",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "Generating the driver won't do anything, we need to index the online SSL application!",
//             status: "DONE",
//             label: "DOCUMENTATION",
//             priority: "MEDIUM",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
//             status: "BACKLOG",
//             label: "DOCUMENTATION",
//             priority: "MEDIUM",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title: "We need to override the online UDP bus!",
//             status: "BACKLOG",
//             label: "BUG",
//             priority: "MEDIUM",
//             description: "",
//             userId: vara.id,
//           },
//           {
//             title:
//               "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
//             status: "DONE",
//             label: "BUG",
//             priority: "HIGH",
//             description: "",
//             userId: vara.id,
//           },
//         ],
//       },
//     },
//   });

//   await prisma.projectOnUsers.create({
//     data: {
//       assignedBy: "admin",
//       projectId: project.id,
//       userId: vara!.id,
//     },
//   });
//   console.log({ vara });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
