{
  version: 2,
    builds[
      {
        src: "index.js",
        use: "@vercel/node",
      }
    ],
    routes[
      {
        src: "/sendMail",
        methods: ["POST"],
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        dest: "/sendMail",
      }
    ];
}
