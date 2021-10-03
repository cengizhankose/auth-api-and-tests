describe("/user/register", () => {
  const registerEndpoint = "http://localhost:3000/api/user/register";
  it("creates user with valid body", () => {
    let body = {
      name: "TestName",
      email: "test@example.com",
      password: "TestPass",
    };
    cy.request("POST", registerEndpoint, body).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("TestName");
      expect(response.body.email).to.eq("test@example.com");
      expect(response.body.password).to.eq("TestPass");
    });
  });

  it("doesnt allow create user with invalid body", () => {
    let badTestUser = {
      name: "1",
      email: "test",
      password: "1",
    };
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badTestUser,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
  it("doesnt allow create user with invalid email", () => {
    let badTestUser = {
      name: "TestName",
      email: "test",
      password: "TestPass",
    };
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badTestUser,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq(
        '"email" length must be at least 6 characters long'
      );
    });
  });
  it("doesnt allow create user with invalid password", () => {
    let badTestUser = {
      name: "TestName",
      email: "test@example.com",
      password: "1",
    };
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badTestUser,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq(
        '"password" length must be at least 6 characters long'
      );
    });
  });

  it("returns 400 with no body", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
