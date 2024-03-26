import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //method to create account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.createAccount(
        ID.unique,
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method make the user login forcibly
        // return userAccount;
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (err) {
      console.log("Error in createAccount method: ", err);
    }
  }

  //get data of the user, is he login or not
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.log("Error in getCurrentUser in auth.js");
    }
    return null;
  }

  //method to login user
  async login({ email, password }) {
    try {
      return await this.account.createSession(email, password);
    } catch (err) {
      console.log("Error in login in auth.js");
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.log("Error in logout in auth.js");
    }
  }
}

const authService = new AuthService();

export default authService;
