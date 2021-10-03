const Guid = require("guid");

describe("/user/login", () => {
  const loginEndpoint = "http://localhost:3000/api/user/login";
  it("logs in with valid user", () => {
    let staticTestUser = {
      email: "kose651@gmail.com",
      password: "love123",
    };
    cy.request({
      method: "POST",
      url: loginEndpoint,
      body: staticTestUser,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
