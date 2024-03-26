import conf from "../conf/conf.js";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.log("Error in create post in cofig.js");
    }
  }

  //here slug can be considered as the particular document id

  async updataDocument(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (err) {
      console.log("Error in update Document in config.js");
    }
  }

  async deleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (err) {
      console.log("Error in deletedoc in config.js");
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (err) {
      console.log("Error in getPost in config.js");
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID
      );
    } catch (err) {
      console.log("Error in getPosts in config.js");
      return false;
    }
  }

  //file upload services
  async uploadFile(file) {
    try {
      return await this.uploadFile(conf.appwriteBucketID, ID.unique, file);
    } catch (err) {
      console.log("Error in uploadFlie in config.js");
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
      return true;
    } catch (err) {
      console.log("Error int delete File in config.js");
    }
  }

  //file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(cong.appwriteBucketID, fileId);
  }
}

const service = new Service();
export default service;
