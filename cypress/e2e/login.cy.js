describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login modal correctly', () => {
    // membuka halaman home dan memverifikasi element yang terlihat ketika belum login
    cy.get('[data-cy="show-add-thread-modal-button"]').should('not.exist');
    cy.get('[data-cy="navbar-brand"]').contains('Forum App').should('be.visible');
    cy.get('[data-cy="navbar-login-button"]').contains('Login').should('be.visible');
    cy.get('[data-cy="navbar-login-button"]').contains('Login').click();

    // meverifikasi login dialog terlihat dan element yang harus ada pada login dialog
    cy.get('[data-cy="login-modal"]').contains('Login').should('be.visible');
    cy.get('[data-cy="login-email-input"]').should('be.visible');
    cy.get('[data-cy="login-password-input"]').should('be.visible');
    cy.get('[data-cy="login-button"]').contains('Login').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // membuka login modal dengan menekan tombol login pada navbar
    cy.get('[data-cy="navbar-login-button"]').contains('Login').click();

    // menekan tombol login pada login modal tanpa mengisi email
    cy.get('[data-cy="login-button"]').contains('Login').click();

    // memverifikasi window.alert untuk menampilkan pesan error dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // membuka login modal dengan menekan tombol login pada navbar
    cy.get('[data-cy="navbar-login-button"]').contains('Login').click();

    // mengisi email pada login modal
    cy.get('[data-cy="login-email-input"]').type('name@example.com');

    // menekan tombol login pada login modal tanpa mengisi password
    cy.get('[data-cy="login-button"]').contains('Login').click();

    // memverifikasi window.alert untuk menampilkan pesan error dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // membuka login modal dengan menekan tombol login pada navbar
    cy.get('[data-cy="navbar-login-button"]').contains('Login').click();

    // mengisi email yang salah pada login modal
    cy.get('[data-cy="login-email-input"]').type('name@example.com');

    // mengisi password yang salah pada login modal
    cy.get('[data-cy="login-password-input"]').type('password');

    // menekan tombol login pada login modal
    cy.get('[data-cy="login-button"]').contains('Login').click();

    // memverifikasi window.alert untuk menampilkan pesan error dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display button logout when name and password are correct', () => {
    // membuka login modal dengan menekan tombol login pada navbar
    cy.get('[data-cy="navbar-login-button"]').contains('Login').click();

    // mengisi email yang benar pada login modal
    cy.get('[data-cy="login-email-input"]').type('user@example.com');

    // mengisi password yang benar pada login modal
    cy.get('[data-cy="login-password-input"]').type('123456');

    // menekan tombol login pada login modal
    cy.get('[data-cy="login-button"]').contains('Login').click();

    // meverifikasi tombol logout dan tombol tambah diskusi terlihat
    cy.get('[data-cy="navbar-logout-button"]').contains('Logout').should('be.visible');
    cy.get('[data-cy="show-add-thread-modal-button"]').contains('Tambah Diskusi').should('be.visible');
  });
});
