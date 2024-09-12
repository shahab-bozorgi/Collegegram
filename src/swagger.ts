export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "CollegeGram API",
      description: "CollegeGram API Information",
      contact: {
        name: "Cherry Ring",
      },
    },
    servers: [
      {
        url: "http://5.34.194.155:" + process.env.PORT,
      },
      {
        url: "http://localhost:" + process.env.PORT,
      },
    ],
  },
  apis: ["src/api/**/*.ts", "src/api/**/*.js"],
};
